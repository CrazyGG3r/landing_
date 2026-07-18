import { useEffect, useRef, useMemo, useCallback } from 'react';
import { getCachedImage, preloadImages } from '../core/assetCache';
import { subscribeFrame } from '../core/frameScheduler';
import { getRenderProfile } from '../core/renderProfile';

const DEFAULT_GRID_MUL = Object.freeze([2, 1]);
const EMPTY_LIST = Object.freeze([]);

// Shaders
const vert = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const frag = `
precision mediump float;
varying vec2 vUv;

uniform float iTime;
uniform vec2  iResolution;
uniform float uScale;
uniform float uAspect;
uniform vec2  uGridMul;
uniform float uDigitSize;
uniform float uScanlineIntensity;
uniform float uGlitchAmount;
uniform float uFlickerAmount;
uniform float uNoiseAmp;
uniform float uChromaticAberration;
uniform float uDither;
uniform float uCurvature;
uniform vec3  uTint;
uniform vec2  uMouse;
uniform float uMouseStrength;
uniform float uUseMouse;
uniform float uPageLoadProgress;
uniform float uUsePageLoadAnimation;
uniform float uBrightness;
uniform float uEffectsIntensity;
uniform float uEmissionFlickerIntensity;
uniform float uEmissionFlickerFrequency;
uniform float uCornerBloomIntensity;
uniform float uCornerBloomEmission;
uniform vec3  uCornerBloomColor;
uniform float uEncodeBloomMask;
uniform sampler2D uImage;
uniform sampler2D uPreviousImage;
uniform float     uUseImage;
uniform float     uImageOpacity;
uniform float     uImageMix;
uniform vec2      uImageSize;
uniform vec2      uPreviousImageSize;
uniform vec2  uClickPos;
uniform float uClickTime;
uniform float uHasClick;
uniform sampler2D uDeadMask;
uniform vec2      uDeadMaskSize;

float time;

float hash21(vec2 p){ p=fract(p*234.56); p+=dot(p,p+34.56); return fract(p.x*p.y); }

float noise(vec2 p){
  return sin(p.x*10.0)*sin(p.y*(3.0+sin(time*0.090909)))+0.2;
}
mat2 rot(float a){ float c=cos(a),s=sin(a); return mat2(c,-s,s,c); }

float fbm(vec2 p){
  p *= 1.1;
  float f = 0.0, amp = 0.5*uNoiseAmp;
  f += amp*noise(p); p = rot(time*0.02)*p*2.0; amp *= 0.454545;
  f += amp*noise(p);
  return f;
}

float pattern(vec2 p, out vec2 q, out vec2 r){
  q = vec2(fbm(p+1.0), fbm(rot(0.1*time)*p+1.0));
  r = vec2(fbm(rot(0.1)*q), fbm(q));
  return fbm(p+r);
}

vec2 worldPos(vec2 uv){ return vec2(uv.x*uScale*uAspect, uv.y*uScale); }

float bgGrid(vec2 wp){
  vec2 grid = uGridMul*15.0;
  vec2 p = fract(wp*grid)*uDigitSize;
  float px5=p.x*5.0, py5=(1.0-p.y)*5.0;
  float x=fract(px5), y=fract(py5);
  float i=floor(py5)-2.0, j=floor(px5)-2.0;
  float nS=max(abs(i),abs(j)); nS*=nS;
  float b=step(0.1,0.6-nS*0.0625)*(0.2+y*0.8)*(0.75+x*0.25);
  return step(0.0,p.x)*step(p.x,1.0)*step(0.0,p.y)*step(p.y,1.0)*b*0.2;
}

bool isDeadCell(vec2 s){
  vec2 grid = uGridMul*15.0;
  vec2 uv = (floor(s*grid)+0.5) / uDeadMaskSize;
  return texture2D(uDeadMask, uv).r > 0.5;
}

float pixelActivity(vec2 index, float intensity){
  float i=index.x, j=index.y;
  float nC=i*i+j*j;
  float nD=(abs(i)+abs(j)); nD*=nD;
  float nS=max(abs(i),abs(j)); nS*=nS;
  float n;
  float sc = mod(iTime*0.3, 3.0);
  float t01 = fract(sc);
  if(sc < 1.0)      n = t01 < 0.15 || t01 > 0.85 ? (t01<0.5?nC:nD) : mix(nC,nD,smoothstep(0.0,1.0,t01));
  else if(sc < 2.0) n = t01 < 0.15 || t01 > 0.85 ? (t01<0.5?nD:nS) : mix(nD,nS,smoothstep(0.0,1.0,t01));
  else              n = t01 < 0.15 || t01 > 0.85 ? (t01<0.5?nS:nC) : mix(nS,nC,smoothstep(0.0,1.0,t01));

  float inBounds =
    step(-2.0,i)*step(i,2.0)*
    step(-2.0,j)*step(j,2.0);
  return step(0.1, intensity-n*0.0625)*inBounds;
}

float cellBrightness(vec2 p, float intensity){
  p = fract(p)*uDigitSize;
  float px5=p.x*5.0, py5=(1.0-p.y)*5.0;
  float x=fract(px5), y=fract(py5);
  float i=floor(py5)-2.0, j=floor(px5)-2.0;
  float b =
    pixelActivity(vec2(i,j),intensity)*
    (0.2+y*0.8)*
    (0.75+x*0.25);
  return step(0.0,p.x)*step(p.x,1.0)*step(0.0,p.y)*step(p.y,1.0)*b;
}

float rippleMask(vec2 s){
  if(uHasClick<0.5) return 0.0;
  float t=uClickTime, dist=distance(s,uClickPos), fade=exp(-t*1.2), rw=0.08, m=0.0;
  float r0=t*0.8; m+=smoothstep(rw,0.0,abs(dist-r0))*fade*step(dist,r0+rw);
  float r1=t*1.4; m+=smoothstep(rw,0.0,abs(dist-r1))*fade*step(dist,r1+rw);
  float r2=t*2.1; m+=smoothstep(rw,0.0,abs(dist-r2))*fade*step(dist,r2+rw);
  return clamp(m,0.0,1.0);
}

float onOff(float a,float b,float c){ return step(c,sin(iTime+a*cos(iTime*b)))*uFlickerAmount; }
float displace(vec2 l){
  float y=l.y-mod(iTime*0.25,1.0);
  return sin(l.y*20.0+iTime)*0.0125*onOff(4.0,2.0,0.8)*(1.0+cos(iTime*60.0))/(1.0+50.0*y*y);
}

vec3 getColor(
  vec2 wp,
  out float emission,
  out float imageInfluence,
  out float activeGlareMask,
  out float cornerBloomMask
){
  float bar=(step(mod(wp.y/uAspect+time*20.0,1.0),0.2)*0.4+1.0)*uScanlineIntensity;
  float d=displace(wp);
  wp.x += d + (uGlitchAmount!=1.0 ? d*(uGlitchAmount-1.0) : 0.0);

  vec2 grid = uGridMul*15.0;
  vec2 s = floor(wp*grid)/grid;
  vec2 p = wp*grid;

  float intensity;
  float dead = isDeadCell(s) ? 1.0 : 0.0;
  if(dead > 0.5){
    intensity = -9999.0;
  } else {
    vec2 q,r;
    intensity = pattern(s*0.1,q,r)*1.3-0.03;

    if(uUseMouse>0.5){
      float dist = distance(s, uMouse);
      intensity -= exp(-dist*8.0)*uMouseStrength*10.0;
    }
    float rpl = rippleMask(s);
    intensity -= rpl*(1.0-smoothstep(0.1,0.35,intensity))*0.8;

    if(uUsePageLoadAnimation>0.5){
      float cr = fract(sin(dot(s,vec2(12.9898,78.233)))*43758.5453);
      intensity *= smoothstep(0.0,1.0,clamp((uPageLoadProgress-cr*0.8)/0.2,0.0,1.0));
    }
  }

  float mid = cellBrightness(p, intensity);
  const float off = 0.002;
  float sum =
    cellBrightness(p+vec2(-off,-off)*grid, intensity)+
    cellBrightness(p+vec2( 0.0,-off)*grid, intensity)+
    cellBrightness(p+vec2( off,-off)*grid, intensity)+
    cellBrightness(p+vec2(-off, 0.0)*grid, intensity)+
    cellBrightness(p+vec2( 0.0, 0.0)*grid, intensity)+
    cellBrightness(p+vec2( off, 0.0)*grid, intensity)+
    cellBrightness(p+vec2(-off,  off)*grid, intensity)+
    cellBrightness(p+vec2( 0.0,  off)*grid, intensity)+
    cellBrightness(p+vec2( off,  off)*grid, intensity);

  float fx = clamp(uEffectsIntensity, 0.0, 2.0);
  float backgroundPixel = bgGrid(wp);
  float activeMask = smoothstep(0.08, 0.32, mid)*(1.0-dead);
  float neighborAverage = max((sum-mid)/8.0, 0.0);
  float haloMask =
    smoothstep(0.025, 0.42, neighborAverage)*
    (1.0-activeMask*0.5)*
    (1.0-dead);
  float inactivePixelMask =
    clamp(backgroundPixel*5.0, 0.0, 1.0)*
    (1.0-activeMask)*
    (1.0-dead);
  float inactiveEmission = mix(0.045, 0.075, clamp(fx*0.5, 0.0, 1.0));

  float legacyActive = step(0.15, mid);
  float legacyEmission = mix(0.06, 1.0, legacyActive)*(1.0-dead);
  float preciseEmission = clamp(
    activeMask+
    inactivePixelMask*inactiveEmission+
    haloMask*0.24*fx,
    0.0,
    1.0
  );
  emission = mix(legacyEmission, preciseEmission, clamp(fx, 0.0, 1.0));
  float inactiveImageInfluence =
    mix(0.12, 0.20, clamp(fx*0.5, 0.0, 1.0));
  imageInfluence = clamp(
    activeMask+
    inactivePixelMask*inactiveImageInfluence+
    haloMask*0.08*fx,
    0.0,
    1.0
  )*(1.0-dead);
  // Reuse the active core and its already-computed phosphor neighbourhood for
  // a single-pass post-composite glare. Inactive pixels never seed this mask.
  activeGlareMask = clamp(
    activeMask+haloMask*0.42*step(0.08, activeMask+neighborAverage),
    0.0,
    1.0
  )*(1.0-dead);

  // Tight active-corner seed. The final composite spreads this mask outside
  // the source pixel, keeping the procedural stage inexpensive.
  vec2 digitUv = fract(p)*uDigitSize;
  vec2 pixelUv = fract(vec2(
    digitUv.x*5.0,
    (1.0-digitUv.y)*5.0
  ));
  vec2 nearestCorner = min(pixelUv,1.0-pixelUv);
  float cornerShape =
    1.0-smoothstep(0.02,0.30,length(nearestCorner));
  float activePixelSeed = step(0.001,mid)*(1.0-dead);
  cornerBloomMask = mix(
    activePixelSeed,
    cornerShape*activePixelSeed,
    0.14
  );

  // A restrained base softening removes digital harshness before overlays are
  // composited. The existing neighbourhood makes this effectively free.
  float softenedMid = mix(mid, neighborAverage, 0.075);
  vec3 col =
    vec3(backgroundPixel)+vec3(0.9)*softenedMid+sum*0.1*bar;

  // Approximate the original RGB separation from the already-computed cell
  // state instead of evaluating the entire procedural field two more times.
  if(uChromaticAberration!=0.0){
    vec2 caWorld = vec2(
      uChromaticAberration/iResolution.x*uScale*uAspect,
      0.0
    );
    vec2 caCell = caWorld*grid;
    float shiftedR = cellBrightness(p+caCell, intensity);
    float shiftedB = cellBrightness(p-caCell, intensity);
    col *= 1.35;
    col.r += (shiftedR-mid)*0.315;
    col.b += (shiftedB-mid)*0.315;
  }

  // Analytic phosphor core and halo: no extra render target or blur pass.
  col += vec3(
    activeMask*0.28+
    inactivePixelMask*inactiveEmission*0.35+
    haloMask*0.18
  )*fx;
  return col;
}

vec2 barrel(vec2 uv){ vec2 c=uv*2.0-1.0; c*=1.0+uCurvature*dot(c,c); return c*0.5+0.5; }

vec2 fitUv(vec2 uv, vec2 imageSize, out float mask){
  if (imageSize.x <= 0.0 || imageSize.y <= 0.0) {
    mask = 0.0;
    return uv;
  }

  float canvasAspect = iResolution.x / iResolution.y;
  float imgAspect = imageSize.x / imageSize.y;

  // Scale factors for cover: we want the image to be at least as wide AND tall as canvas
  float scaleX, scaleY;
  if (imgAspect > canvasAspect) {
    // Image is wider → fit by height (crop left/right)
    scaleX = imgAspect / canvasAspect;
    scaleY = 1.0;
  } else {
    // Image is taller → fit by width (crop top/bottom)
    scaleX = 1.0;
    scaleY = canvasAspect / imgAspect;
  }

  // Center the scaled image
  vec2 offset = vec2((1.0 - scaleX) * 0.5, (1.0 - scaleY) * 0.5);

  // Map canvas UV to image UV (values will exceed 0..1 where cropping occurs)
  vec2 imgUv = (uv - offset) / vec2(scaleX, scaleY);

  // Mask is always 1.0 inside canvas because we cover entirely (no empty areas)
  mask = 1.0;

  // Clamp to texture edges to avoid sampling outside image bounds
  vec2 clamped = clamp(imgUv, 0.0, 1.0);

  // Flip Y to correct WebGL origin
  clamped.y = 1.0 - clamped.y;

  return clamped;
}

void main(){
  time = iTime*0.333333;
  float lensFx = clamp(uEffectsIntensity, 0.0, 2.0);
  vec2 windowUv = vUv;
  vec2 edgeDistance = min(windowUv, 1.0-windowUv);
  float edgeX = 1.0-smoothstep(0.0, 0.24, edgeDistance.x);
  float edgeY = 1.0-smoothstep(0.0, 0.24, edgeDistance.y);
  float edgeInfluence = max(edgeX, edgeY);
  float cornerInfluence = edgeX*edgeY;
  float glassInfluence =
    edgeInfluence*edgeInfluence*clamp(lensFx*0.5, 0.0, 1.0);
  // Refraction happens in the final composite so every base-scene contribution
  // (including corner bloom) is optically bent before chromatic dispersion.
  vec2 uv = windowUv;
  if(uCurvature!=0.0) uv=barrel(uv);
  vec2 wp = worldPos(uv);

  float emission;
  float imageInfluence;
  float activeGlareMask;
  float cornerBloomMask;
  vec3 col = getColor(
    wp,
    emission,
    imageInfluence,
    activeGlareMask,
    cornerBloomMask
  );
  float cornerBloomBase =
    cornerBloomMask*uCornerBloomIntensity;
  float cornerBloomEnergy =
    cornerBloomBase*uCornerBloomEmission;
  float overlayAmount = clamp(
    uUseImage*uImageOpacity,
    0.0,
    1.0
  );
  // Keep the image multiplier on its original active/inactive emission values.
  // The visible bloom remains untouched without an overlay and eases to a
  // restrained remainder as a preview becomes fully opaque.
  float imageSafeBloom = 1.0-overlayAmount;
  float visibleBloom = mix(1.0,0.12,overlayAmount);
  float isolatedCornerEnergy =
    cornerBloomEnergy*imageSafeBloom;
  emission = clamp(
    emission+isolatedCornerEnergy*0.26,
    0.0,
    1.0
  );
  activeGlareMask = clamp(
    activeGlareMask+isolatedCornerEnergy*0.30,
    0.0,
    1.0
  );

  if(uUseImage>0.5){
    float imgMask;
    vec2 imgUv = fitUv(uv, uImageSize, imgMask);
    vec3 imgCol = texture2D(uImage, imgUv).rgb * imgMask;
    if(uImageMix<0.999){
      float previousMask;
      vec2 previousUv = fitUv(uv, uPreviousImageSize, previousMask);
      vec3 previousCol =
        texture2D(uPreviousImage, previousUv).rgb*previousMask;
      imgCol = mix(previousCol, imgCol, smoothstep(0.0,1.0,uImageMix));
    }
    float preciseMix = clamp(uEffectsIntensity, 0.0, 1.0);
    vec3 factor =
      mix(max(col,vec3(emission)),vec3(imageInfluence),preciseMix);
    factor *= step(0.0001, emission+imageInfluence);
    vec3 mult = imgCol * factor;
    col = mix(col, mult, uImageOpacity);
  }
  col *= uTint*uBrightness;
  // Base fuzz remains adjustable independently; emission adds the hotter,
  // brighter component in the selected bloom colour.
  col += uCornerBloomColor*(
    cornerBloomBase*visibleBloom*0.01+
    cornerBloomEnergy*visibleBloom*0.02
  );
  float peak = max(col.r, max(col.g, col.b));
  float glareLevel =
    activeGlareMask*
    smoothstep(0.16, 0.92, peak)*
    clamp(uEffectsIntensity, 0.0, 2.0);
  float flickerPhase =
    hash21(floor(wp*uGridMul*15.0)+vec2(17.0, 41.0))*6.2831853;
  float emissionFlicker = max(
    0.0,
    1.0+
    sin(iTime*uEmissionFlickerFrequency*6.2831853+flickerPhase)*
    0.18*uEmissionFlickerIntensity
  );
  glareLevel *= emissionFlicker;
  vec3 glareHue = mix(uTint, col/max(peak, 0.001), 0.58);
  col += glareHue*glareLevel*0.11;
  peak = max(col.r, max(col.g, col.b));
  float knee = smoothstep(0.72, 1.25, peak)*clamp(uEffectsIntensity,0.0,1.0);
  vec3 mapped = 1.0-exp(-max(col,vec3(0.0))*1.65);
  col = mix(col, mapped, knee*0.72);
  // Soft transmission scatter and a restrained Fresnel lift make the rim read
  // as glass rather than as a geometric screen distortion.
  float lensFresnel = glassInfluence*glassInfluence;
  float edgeLuma = dot(col, vec3(0.2126, 0.7152, 0.0722));
  vec3 scattered = mix(col, vec3(edgeLuma)*uTint, 0.18);
  col = mix(col, scattered, lensFresnel*0.62);
  col *= 1.0-lensFresnel*0.018;
  col += mix(uTint,vec3(1.0),0.35)*
    lensFresnel*(0.004+cornerInfluence*0.004);
  if(uDither>0.0) col+=(hash21(gl_FragCoord.xy)-0.5)*(uDither*0.003922);
  float outputAlpha = mix(
    1.0,
    cornerBloomMask*visibleBloom,
    step(0.5,uEncodeBloomMask)
  );
  gl_FragColor=vec4(col,outputAlpha);
}`;

const postFrag = `
precision mediump float;
varying vec2 vUv;

uniform sampler2D uScene;
uniform vec2 uResolution;
uniform float uEffectsIntensity;
uniform float uLensBlurIntensity;
uniform float uLensBlurRange;
uniform float uLensChromaticIntensity;
uniform float uLensChromaticRange;
uniform float uCornerBloomIntensity;
uniform float uCornerBloomEmission;
uniform vec3 uCornerBloomColor;

void main(){
  vec2 uv = clamp(vUv, 0.0, 1.0);
  vec2 radial = uv-0.5;
  vec2 edgeDistance = min(uv, 1.0-uv);

  // Soft bevel refraction samples the already-composited terminal scene. The
  // chromatic split below therefore remains the final optical operation.
  float bevelEdgeX =
    1.0-smoothstep(0.0, 0.24, edgeDistance.x);
  float bevelEdgeY =
    1.0-smoothstep(0.0, 0.24, edgeDistance.y);
  float bevelField = max(bevelEdgeX, bevelEdgeY);
  float bevelSlope = 4.0*bevelField*(1.0-bevelField);
  vec2 bevelNormal = vec2(
    (radial.x<0.0?-1.0:1.0)*bevelEdgeX,
    (radial.y<0.0?-1.0:1.0)*bevelEdgeY
  );
  bevelNormal /= max(length(bevelNormal), 0.0001);

  float blurEdgeX =
    1.0-smoothstep(0.0, uLensBlurRange, edgeDistance.x);
  float blurEdgeY =
    1.0-smoothstep(0.0, uLensBlurRange, edgeDistance.y);
  float cornerField = blurEdgeX*blurEdgeY;
  float blurAmount = clamp(
    cornerField*cornerField*
    uLensBlurIntensity*
    uEffectsIntensity,
    0.0,
    1.0
  );

  float chromaticEdgeX =
    1.0-smoothstep(0.0, uLensChromaticRange, edgeDistance.x);
  float chromaticEdgeY =
    1.0-smoothstep(0.0, uLensChromaticRange, edgeDistance.y);
  float chromaticField = max(chromaticEdgeX, chromaticEdgeY);
  float chromaticAmount = clamp(
    chromaticField*chromaticField*
    uLensChromaticIntensity*
    uEffectsIntensity*0.75,
    0.0,
    1.0
  );

  vec2 opticalNormal = vec2(
    (radial.x<0.0?-1.0:1.0)*max(blurEdgeX,chromaticEdgeX),
    (radial.y<0.0?-1.0:1.0)*max(blurEdgeY,chromaticEdgeY)
  );
  opticalNormal /= max(length(opticalNormal), 0.0001);

  vec2 texel = 1.0/max(uResolution, vec2(1.0));
  float refractionStrength = clamp(uEffectsIntensity,0.0,1.5);
  vec2 refractionOffset =
    bevelNormal*
    texel*
    (2.0+2.5*refractionStrength)*
    bevelSlope*
    refractionStrength;
  vec2 sampleUv = clamp(uv+refractionOffset,0.0,1.0);
  float blurPixels = 1.0+6.0*clamp(uLensBlurIntensity,0.0,2.0);
  float chromaticPixels =
    1.0+5.0*clamp(uLensChromaticIntensity,0.0,2.0);
  vec2 blurOffset = opticalNormal*texel*blurPixels*blurAmount;
  vec2 chromaticOffset =
    opticalNormal*texel*chromaticPixels*chromaticAmount;

  vec4 centerSample = texture2D(uScene,sampleUv);
  float bloomControl = clamp(uCornerBloomIntensity,0.0,2.0);
  vec2 nearRadius = texel*(1.0+0.75*bloomControl);
  vec2 farRadius = texel*(3.0+1.5*bloomControl);
  float nearBloom =
    texture2D(uScene,clamp(sampleUv+nearRadius,0.0,1.0)).a+
    texture2D(uScene,clamp(sampleUv-nearRadius,0.0,1.0)).a+
    texture2D(
      uScene,
      clamp(sampleUv+vec2(nearRadius.x,-nearRadius.y),0.0,1.0)
    ).a+
    texture2D(
      uScene,
      clamp(sampleUv+vec2(-nearRadius.x,nearRadius.y),0.0,1.0)
    ).a;
  float farBloom =
    texture2D(
      uScene,
      clamp(sampleUv+vec2(farRadius.x,0.0),0.0,1.0)
    ).a+
    texture2D(
      uScene,
      clamp(sampleUv-vec2(farRadius.x,0.0),0.0,1.0)
    ).a+
    texture2D(
      uScene,
      clamp(sampleUv+vec2(0.0,farRadius.y),0.0,1.0)
    ).a+
    texture2D(
      uScene,
      clamp(sampleUv-vec2(0.0,farRadius.y),0.0,1.0)
    ).a;
  float exteriorBloom = max(
    nearBloom*0.20+
    farBloom*0.11-
    centerSample.a*0.62,
    0.0
  );
  float fuzzyBloom = clamp(
    exteriorBloom+centerSample.a*0.10,
    0.0,
    1.0
  );
  float bloomEmission = clamp(uCornerBloomEmission,0.0,2.0);
  vec3 cornerGlow =
    uCornerBloomColor*
    fuzzyBloom*
    bloomControl*
    (0.22+0.50*bloomEmission);
  vec3 center = centerSample.rgb+cornerGlow;
  if(
    blurAmount<0.001&&
    chromaticAmount<0.001&&
    bloomControl<0.001
  ){
    gl_FragColor = vec4(center,1.0);
    return;
  }
  vec3 outer = texture2D(
    uScene,
    clamp(sampleUv+blurOffset+chromaticOffset*0.62,0.0,1.0)
  ).rgb+cornerGlow*0.78;
  vec3 inner = texture2D(
    uScene,
    clamp(sampleUv-blurOffset-chromaticOffset,0.0,1.0)
  ).rgb+cornerGlow*0.78;

  vec3 blurred = center*0.5+(outer+inner)*0.25;
  vec3 col = mix(center, blurred, blurAmount);
  vec3 dispersed = vec3(outer.r, col.g, inner.b);
  col = mix(col, dispersed, chromaticAmount);
  gl_FragColor = vec4(col,1.0);
}`;

// GL helpers
function hexToRgb(hex){
  let h=hex.replace('#','').trim();
  if(h.length===3) h=h.split('').map(c=>c+c).join('');
  const n=parseInt(h,16);
  return [((n>>16)&255)/255,((n>>8)&255)/255,(n&255)/255];
}
function mkShader(gl,t,src){ const s=gl.createShader(t); gl.shaderSource(s,src); gl.compileShader(s); return s; }
function mkProg(gl,v,f){
  const p=gl.createProgram();
  gl.attachShader(p,mkShader(gl,gl.VERTEX_SHADER,v));
  gl.attachShader(p,mkShader(gl,gl.FRAGMENT_SHADER,f));
  gl.bindAttribLocation(p,0,'position');
  gl.bindAttribLocation(p,1,'uv');
  gl.linkProgram(p);
  return p;
}

function loadImgTex(gl,url, isRemote, cachedImg, onReady){
  const tex=gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D,tex);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([0,0,0,255]));
  const applyToTex = (imgEl) => {
    gl.bindTexture(gl.TEXTURE_2D,tex);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,imgEl);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    if (onReady) onReady(imgEl);
  };

  if (cachedImg) {
    if (cachedImg.complete && cachedImg.naturalWidth > 0) {
      applyToTex(cachedImg);
    } else {
      cachedImg.addEventListener('load', () => applyToTex(cachedImg), { once: true });
    }
    return tex;
  }

  const img=new Image();
  if (isRemote) img.crossOrigin='anonymous';
  img.onload=()=>applyToTex(img);
  img.onerror=()=>console.warn('FaultyTerminal image failed to load:', url);
  img.src=url;
  return tex;
}

function resolveImageUrl(imageUrl){
  if (!imageUrl) return { url: null, isRemote: false };
  const isRemote = /^https?:\/\//i.test(imageUrl);
  if (isRemote) {
    return { url: `https://api.allorigins.win/raw?url=${encodeURIComponent(imageUrl)}`, isRemote: true };
  }
  return { url: imageUrl, isRemote: false };
}

function buildDeadMask(gl, deadZones, gridMul, scale, aspect){
  const gx=Math.ceil(gridMul[0]*15*scale*aspect);
  const gy=Math.ceil(gridMul[1]*15*scale);
  const data=new Uint8Array(gx*gy);
  deadZones.forEach(({x1,y1,x2,y2})=>{
    const cx0=Math.floor(x1*gx), cx1=Math.ceil(x2*gx);
    const cy0=Math.floor(y1*gy), cy1=Math.ceil(y2*gy);
    for(let cy=cy0;cy<cy1;cy++) for(let cx=cx0;cx<cx1;cx++){
      if(cx>=0&&cx<gx&&cy>=0&&cy<gy) data[cy*gx+cx]=255;
    }
  });
  const tex=gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D,tex);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.LUMINANCE,gx,gy,0,gl.LUMINANCE,gl.UNSIGNED_BYTE,data);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
  return {tex,gx,gy};
}

export default function FaultyTerminal({
  scale=2, gridMul=DEFAULT_GRID_MUL, digitSize=1.1, timeScale=0.5, pause=false,
  scanlineIntensity=0.5, glitchAmount=1, flickerAmount=1, noiseAmp=1,
  chromaticAberration=1.5, dither=0, curvature=0.1, tint='#eef0f2',
  mouseReact=true, mouseStrength=0.5,
  dpr=Math.min(typeof window!=='undefined'?window.devicePixelRatio||1:1,2),
  pageLoadAnimation=true, brightness=0.6,
  effectsIntensity=1,
  emissionFlickerIntensity=0.6,
  emissionFlickerFrequency=1,
  cornerBloomIntensity=0.65,
  cornerBloomEmission=0.55,
  cornerBloomColor='#d8eeff',
  lensBlurIntensity=1,
  lensBlurRange=0.24,
  lensChromaticIntensity=1,
  lensChromaticRange=0.24,
  imageUrl=null, imageOpacity=1,
  preloadUrls=EMPTY_LIST,
  deadZones=EMPTY_LIST,
  onReady,
  style,
}){
  const ctnRef=useRef(null);
  const glRef=useRef(null);
  const progRef=useRef(null);
  const uniRef=useRef({});
  const deadRef=useRef(null);
  const deadDirtyRef=useRef(true);
  const staticDirtyRef=useRef(true);
  const deadZonesRef=useRef(deadZones);
  const imgTexRef=useRef(null);
  const previousImgTexRef=useRef(null);
  const imageMixRef=useRef(1);
  const texCacheRef=useRef(new Map());
  const imageUrlRef=useRef(imageUrl);
  const mouseRef=useRef({x:0.5,y:0.5});
  const smoothRef=useRef({x:0.5,y:0.5});
  const mouseDirtyRef=useRef(false);
  const frozenRef=useRef(0);
  const loadStartRef=useRef(0);
  const timeOffRef=useRef(Math.random()*100);
  const clickRef=useRef({x:0,y:0,startT:0,active:false});
  const aspectRef=useRef(1);
  const opacityRef=useRef(imageOpacity);
  const opacityTargetRef=useRef(imageOpacity);
  const onReadyRef=useRef(onReady);
  const readyStateRef=useRef({
    shader: false,
    assets: preloadUrls.length === 0,
    notified: false,
  });
  const renderProfile=useMemo(getRenderProfile,[]);
  const renderDpr=Math.min(dpr,renderProfile.maxDpr);

  const pauseRef = useRef(pause);
  const mouseReactRef = useRef(mouseReact);
  const pageLoadAnimationRef = useRef(pageLoadAnimation);
  const brightnessRef = useRef(brightness);
  const effectsIntensityRef = useRef(effectsIntensity);
  const emissionFlickerIntensityRef = useRef(emissionFlickerIntensity);
  const emissionFlickerFrequencyRef = useRef(emissionFlickerFrequency);
  const cornerBloomIntensityRef = useRef(cornerBloomIntensity);
  const cornerBloomEmissionRef = useRef(cornerBloomEmission);
  const cornerBloomColorRef = useRef(hexToRgb(cornerBloomColor));
  const lensBlurIntensityRef = useRef(lensBlurIntensity);
  const lensBlurRangeRef = useRef(lensBlurRange);
  const lensChromaticIntensityRef = useRef(lensChromaticIntensity);
  const lensChromaticRangeRef = useRef(lensChromaticRange);
  const mouseStrengthRef = useRef(mouseStrength);
  const scanlineIntensityRef = useRef(scanlineIntensity);
  const glitchAmountRef = useRef(glitchAmount);
  const flickerAmountRef = useRef(flickerAmount);
  const noiseAmpRef = useRef(noiseAmp);
  const chromaticAberrationRef = useRef(chromaticAberration);
  const ditherValRef = useRef(0);
  const curvatureRef = useRef(curvature);
  const tintVecRef = useRef(hexToRgb(tint));
  const scaleRef = useRef(scale);
  const gridMulRef = useRef(gridMul);
  const digitSizeRef = useRef(digitSize);
  const timeScaleRef = useRef(timeScale);

  const tintVec=useMemo(()=>hexToRgb(tint),[tint]);
  const cornerBloomColorVec=useMemo(
    ()=>hexToRgb(cornerBloomColor),
    [cornerBloomColor],
  );
  const ditherVal=useMemo(()=>typeof dither==='boolean'?(dither?1:0):dither,[dither]);
  const notifyReady=useCallback(()=>{
    const ready=readyStateRef.current;
    if(ready.notified||!ready.shader||!ready.assets) return;
    ready.notified=true;
    onReadyRef.current?.();
  },[]);

  useEffect(()=>{
    deadZonesRef.current = deadZones;
    deadDirtyRef.current = true;
  },[deadZones]);
  useEffect(()=>{ opacityTargetRef.current = imageOpacity; },[imageOpacity]);
  useEffect(()=>{ onReadyRef.current = onReady; },[onReady]);
  useEffect(()=>{ pauseRef.current = pause; },[pause]);
  useEffect(()=>{ mouseReactRef.current = mouseReact; staticDirtyRef.current = true; },[mouseReact]);
  useEffect(()=>{ pageLoadAnimationRef.current = pageLoadAnimation; staticDirtyRef.current = true; },[pageLoadAnimation]);
  useEffect(()=>{ brightnessRef.current = brightness; staticDirtyRef.current = true; },[brightness]);
  useEffect(()=>{
    const value=Number(effectsIntensity);
    effectsIntensityRef.current=Number.isFinite(value)?Math.min(2,Math.max(0,value)):1;
    staticDirtyRef.current=true;
  },[effectsIntensity]);
  useEffect(()=>{
    const value=Number(emissionFlickerIntensity);
    emissionFlickerIntensityRef.current=
      Number.isFinite(value)?Math.min(2,Math.max(0,value)):0.6;
    staticDirtyRef.current=true;
  },[emissionFlickerIntensity]);
  useEffect(()=>{
    const value=Number(emissionFlickerFrequency);
    emissionFlickerFrequencyRef.current=
      Number.isFinite(value)?Math.min(4,Math.max(0,value)):1;
    staticDirtyRef.current=true;
  },[emissionFlickerFrequency]);
  useEffect(()=>{
    const value=Number(cornerBloomIntensity);
    cornerBloomIntensityRef.current=
      Number.isFinite(value)?Math.min(2,Math.max(0,value)):0.65;
    staticDirtyRef.current=true;
  },[cornerBloomIntensity]);
  useEffect(()=>{
    const value=Number(cornerBloomEmission);
    cornerBloomEmissionRef.current=
      Number.isFinite(value)?Math.min(2,Math.max(0,value)):0.55;
    staticDirtyRef.current=true;
  },[cornerBloomEmission]);
  useEffect(()=>{
    cornerBloomColorRef.current=cornerBloomColorVec;
    staticDirtyRef.current=true;
  },[cornerBloomColorVec]);
  useEffect(()=>{
    const value=Number(lensBlurIntensity);
    lensBlurIntensityRef.current=
      Number.isFinite(value)?Math.min(2,Math.max(0,value)):1;
    staticDirtyRef.current=true;
  },[lensBlurIntensity]);
  useEffect(()=>{
    const value=Number(lensBlurRange);
    lensBlurRangeRef.current=
      Number.isFinite(value)?Math.min(0.5,Math.max(0.04,value)):0.24;
    staticDirtyRef.current=true;
  },[lensBlurRange]);
  useEffect(()=>{
    const value=Number(lensChromaticIntensity);
    lensChromaticIntensityRef.current=
      Number.isFinite(value)?Math.min(2,Math.max(0,value)):1;
    staticDirtyRef.current=true;
  },[lensChromaticIntensity]);
  useEffect(()=>{
    const value=Number(lensChromaticRange);
    lensChromaticRangeRef.current=
      Number.isFinite(value)?Math.min(0.5,Math.max(0.04,value)):0.24;
    staticDirtyRef.current=true;
  },[lensChromaticRange]);
  useEffect(()=>{ mouseStrengthRef.current = mouseStrength; staticDirtyRef.current = true; },[mouseStrength]);
  useEffect(()=>{ scanlineIntensityRef.current = scanlineIntensity; staticDirtyRef.current = true; },[scanlineIntensity]);
  useEffect(()=>{ glitchAmountRef.current = glitchAmount; staticDirtyRef.current = true; },[glitchAmount]);
  useEffect(()=>{ flickerAmountRef.current = flickerAmount; staticDirtyRef.current = true; },[flickerAmount]);
  useEffect(()=>{ noiseAmpRef.current = noiseAmp; staticDirtyRef.current = true; },[noiseAmp]);
  useEffect(()=>{ chromaticAberrationRef.current = chromaticAberration; staticDirtyRef.current = true; },[chromaticAberration]);
  useEffect(()=>{ ditherValRef.current = ditherVal; staticDirtyRef.current = true; },[ditherVal]);
  useEffect(()=>{ curvatureRef.current = curvature; staticDirtyRef.current = true; },[curvature]);
  useEffect(()=>{ tintVecRef.current = tintVec; staticDirtyRef.current = true; },[tintVec]);
  useEffect(()=>{ scaleRef.current = scale; staticDirtyRef.current = true; deadDirtyRef.current = true; },[scale]);
  useEffect(()=>{ gridMulRef.current = gridMul; staticDirtyRef.current = true; deadDirtyRef.current = true; },[gridMul]);
  useEffect(()=>{ digitSizeRef.current = digitSize; staticDirtyRef.current = true; },[digitSize]);
  useEffect(()=>{ timeScaleRef.current = timeScale; },[timeScale]);

  const loadImageTexture = useCallback((url) => {
    const gl = glRef.current;
    if (!gl) return;
    const resolved = resolveImageUrl(url);
    if (!resolved.url) {
      previousImgTexRef.current = imgTexRef.current;
      imgTexRef.current = null;
      imageMixRef.current = 1;
      return;
    }
    const cached = texCacheRef.current.get(resolved.url);
    if (cached) {
      if (imgTexRef.current === cached) return;
      previousImgTexRef.current = imgTexRef.current;
      imgTexRef.current = cached;
      imageMixRef.current = previousImgTexRef.current?.ready ? 0 : 1;
      return;
    }
    const cachedImg = getCachedImage(resolved.url);
    const entry = { tex: null, ready: false, size: null };
    const tex = loadImgTex(gl, resolved.url, resolved.isRemote, cachedImg, (imgEl) => {
      entry.ready = true;
      entry.size = { w: imgEl.naturalWidth || imgEl.width, h: imgEl.naturalHeight || imgEl.height };
    });
    entry.tex = tex;
    if (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0) {
      entry.ready = true;
      entry.size = { w: cachedImg.naturalWidth, h: cachedImg.naturalHeight };
    }
    texCacheRef.current.set(resolved.url, entry);
    previousImgTexRef.current = imgTexRef.current;
    imgTexRef.current = entry;
    imageMixRef.current = previousImgTexRef.current?.ready ? 0 : 1;
  }, []);

  useEffect(() => {
    imageUrlRef.current = imageUrl;
    loadImageTexture(imageUrl);
  }, [imageUrl, loadImageTexture]);

  useEffect(() => {
    const urls = Array.from(new Set((preloadUrls || []).filter(Boolean)));
    if (urls.length === 0) {
      readyStateRef.current.assets = true;
      notifyReady();
      return undefined;
    }
    readyStateRef.current.assets = false;
    const resolvedUrls = urls.map((url) => resolveImageUrl(url)).filter((r) => r.url);
    const preloadList = resolvedUrls.map((r) => r.url);
    let cancelled = false;
    let frameId = 0;
    let attempts = 0;

    const prepareTextures = () => {
      const gl = glRef.current;
      if (!gl) {
        attempts += 1;
        if (attempts >= 4) return;
        frameId = requestAnimationFrame(prepareTextures);
        return;
      }

      preloadImages(preloadList).finally(() => {
        if (cancelled || glRef.current !== gl) return;
        resolvedUrls.forEach((r) => {
          if (texCacheRef.current.has(r.url)) return;
          const cachedImg = getCachedImage(r.url);
          const entry = { tex: null, ready: false, size: null };
          const tex = loadImgTex(gl, r.url, r.isRemote, cachedImg, (imgEl) => {
            entry.ready = true;
            entry.size = { w: imgEl.naturalWidth || imgEl.width, h: imgEl.naturalHeight || imgEl.height };
          });
          entry.tex = tex;
          if (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0) {
            entry.ready = true;
            entry.size = { w: cachedImg.naturalWidth, h: cachedImg.naturalHeight };
          }
          texCacheRef.current.set(r.url, entry);
        });
        try {
          gl.finish();
        } catch {
          // The transition safety timeout handles a lost WebGL context.
        }
        readyStateRef.current.assets = true;
        notifyReady();
      });
    };

    prepareTextures();
    return () => {
      cancelled = true;
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [notifyReady, preloadUrls]);

  const onMouseMove=useCallback(e=>{
    if (!mouseReactRef.current) return;
    const ctn=ctnRef.current; if(!ctn) return;
    const r=ctn.getBoundingClientRect();
    if(r.width<=0||r.height<=0) return;
    mouseRef.current={x:(e.clientX-r.left)/r.width, y:1-(e.clientY-r.top)/r.height};
    mouseDirtyRef.current=true;
  },[]);

  const onClick=useCallback(e=>{
    const ctn=ctnRef.current; if(!ctn) return;
    const r=ctn.getBoundingClientRect();
    if(r.width<=0||r.height<=0) return;
    clickRef.current={
      x:(e.clientX-r.left)/r.width*scaleRef.current*aspectRef.current,
      y:(1-(e.clientY-r.top)/r.height)*scaleRef.current,
      startT:performance.now(), active:true,
    };
  },[]);

  useEffect(()=>{
    const ctn=ctnRef.current; if(!ctn) return undefined;
    const textureCache=texCacheRef.current;
    const canvas=document.createElement('canvas');
    canvas.style.cssText='width:100%;height:100%;display:block;cursor:crosshair;';
    ctn.appendChild(canvas);
    const gl=canvas.getContext('webgl',{
      antialias:renderProfile.antialias,
    }); if(!gl) return undefined;
    glRef.current=gl;
    gl.clearColor(0,0,0,1);

    const prog=mkProg(gl,vert,frag);
    const postProg=mkProg(gl,vert,postFrag);
    const postProgramReady=Boolean(
      gl.getProgramParameter(postProg,gl.LINK_STATUS),
    );
    progRef.current=prog;
    gl.useProgram(prog);

    const posBuf=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,posBuf);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
    const pL=gl.getAttribLocation(prog,'position');
    gl.enableVertexAttribArray(pL); gl.vertexAttribPointer(pL,2,gl.FLOAT,false,0,0);
    const uvBuf=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,uvBuf);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([0,0,2,0,0,2]),gl.STATIC_DRAW);
    const uL=gl.getAttribLocation(prog,'uv');
    gl.enableVertexAttribArray(uL); gl.vertexAttribPointer(uL,2,gl.FLOAT,false,0,0);

    const sceneTexture=gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D,sceneTexture);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    const sceneFramebuffer=gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER,sceneFramebuffer);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      sceneTexture,
      0,
    );
    gl.bindFramebuffer(gl.FRAMEBUFFER,null);

    const uni={};
    [
      'iTime','iResolution','uScale','uAspect','uGridMul','uDigitSize',
      'uScanlineIntensity','uGlitchAmount','uFlickerAmount','uNoiseAmp',
      'uChromaticAberration','uDither','uCurvature','uTint','uMouse',
      'uMouseStrength','uUseMouse','uPageLoadProgress','uUsePageLoadAnimation',
      'uBrightness','uEffectsIntensity','uEmissionFlickerIntensity',
      'uEmissionFlickerFrequency','uCornerBloomIntensity',
      'uCornerBloomEmission','uCornerBloomColor','uEncodeBloomMask',
      'uImage','uPreviousImage','uUseImage',
      'uImageOpacity','uImageMix','uImageSize','uPreviousImageSize','uClickPos',
      'uClickTime','uHasClick','uDeadMask','uDeadMaskSize',
    ].forEach(n=>{ uni[n]=gl.getUniformLocation(prog,n); });
    uniRef.current=uni;
    const postUni={};
    [
      'uScene','uResolution','uEffectsIntensity','uLensBlurIntensity',
      'uLensBlurRange','uLensChromaticIntensity','uLensChromaticRange',
      'uCornerBloomIntensity','uCornerBloomEmission','uCornerBloomColor',
    ].forEach(n=>{ postUni[n]=gl.getUniformLocation(postProg,n); });

    function uploadStatics(){
      gl.useProgram(prog);
      gl.uniform1f(uni.uScale,scaleRef.current);
      gl.uniform2fv(uni.uGridMul,gridMulRef.current);
      gl.uniform1f(uni.uDigitSize,digitSizeRef.current);
      gl.uniform1f(uni.uScanlineIntensity,scanlineIntensityRef.current);
      gl.uniform1f(uni.uGlitchAmount,glitchAmountRef.current);
      gl.uniform1f(uni.uFlickerAmount,flickerAmountRef.current);
      gl.uniform1f(uni.uNoiseAmp,noiseAmpRef.current);
      gl.uniform1f(uni.uChromaticAberration,chromaticAberrationRef.current);
      gl.uniform1f(uni.uDither,ditherValRef.current);
      gl.uniform1f(uni.uCurvature,curvatureRef.current);
      gl.uniform3f(uni.uTint,tintVecRef.current[0],tintVecRef.current[1],tintVecRef.current[2]);
      gl.uniform1f(uni.uMouseStrength,mouseStrengthRef.current);
      gl.uniform1f(uni.uUseMouse,mouseReactRef.current?1:0);
      gl.uniform1f(uni.uUsePageLoadAnimation,pageLoadAnimationRef.current?1:0);
      gl.uniform1f(uni.uBrightness,brightnessRef.current);
      gl.uniform1f(uni.uEffectsIntensity,effectsIntensityRef.current);
      gl.uniform1f(
        uni.uEmissionFlickerIntensity,
        emissionFlickerIntensityRef.current,
      );
      gl.uniform1f(
        uni.uEmissionFlickerFrequency,
        emissionFlickerFrequencyRef.current,
      );
      gl.uniform1f(
        uni.uCornerBloomIntensity,
        cornerBloomIntensityRef.current,
      );
      gl.uniform1f(
        uni.uCornerBloomEmission,
        cornerBloomEmissionRef.current,
      );
      gl.uniform3f(
        uni.uCornerBloomColor,
        cornerBloomColorRef.current[0],
        cornerBloomColorRef.current[1],
        cornerBloomColorRef.current[2],
      );
      gl.uniform1i(uni.uImage,0);
      gl.uniform1i(uni.uPreviousImage,1);
      gl.uniform1i(uni.uDeadMask,2);
      if(postProgramReady){
        gl.useProgram(postProg);
        gl.uniform1i(postUni.uScene,0);
        gl.uniform1f(
          postUni.uEffectsIntensity,
          effectsIntensityRef.current,
        );
        gl.uniform1f(
          postUni.uLensBlurIntensity,
          lensBlurIntensityRef.current,
        );
        gl.uniform1f(postUni.uLensBlurRange,lensBlurRangeRef.current);
        gl.uniform1f(
          postUni.uLensChromaticIntensity,
          lensChromaticIntensityRef.current,
        );
        gl.uniform1f(
          postUni.uLensChromaticRange,
          lensChromaticRangeRef.current,
        );
        gl.uniform1f(
          postUni.uCornerBloomIntensity,
          cornerBloomIntensityRef.current,
        );
        gl.uniform1f(
          postUni.uCornerBloomEmission,
          cornerBloomEmissionRef.current,
        );
        gl.uniform3f(
          postUni.uCornerBloomColor,
          cornerBloomColorRef.current[0],
          cornerBloomColorRef.current[1],
          cornerBloomColorRef.current[2],
        );
      }
      gl.useProgram(prog);
      staticDirtyRef.current=false;
    }
    uploadStatics();
    loadImageTexture(imageUrlRef.current);

    let postReady=false;
    function resize(){
      const w=Math.max(1,ctn.offsetWidth);
      const h=Math.max(1,ctn.offsetHeight);
      const targetWidth=Math.max(1,Math.floor(w*renderDpr));
      const targetHeight=Math.max(1,Math.floor(h*renderDpr));
      const nextAspect=w/h;
      if(
        canvas.width===targetWidth&&
        canvas.height===targetHeight&&
        Math.abs(aspectRef.current-nextAspect)<0.0001
      ) return;
      canvas.width=targetWidth;
      canvas.height=targetHeight;
      gl.viewport(0,0,canvas.width,canvas.height);
      gl.bindTexture(gl.TEXTURE_2D,sceneTexture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        canvas.width,
        canvas.height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null,
      );
      gl.bindFramebuffer(gl.FRAMEBUFFER,sceneFramebuffer);
      postReady =
        postProgramReady&&
        gl.checkFramebufferStatus(gl.FRAMEBUFFER)===
        gl.FRAMEBUFFER_COMPLETE;
      gl.bindFramebuffer(gl.FRAMEBUFFER,null);
      aspectRef.current=nextAspect;
      gl.useProgram(prog);
      gl.uniform2f(uni.iResolution,canvas.width,canvas.height);
      gl.uniform1f(uni.uAspect,aspectRef.current);
      gl.uniform2f(
        uni.uMouse,
        smoothRef.current.x*scaleRef.current*aspectRef.current,
        smoothRef.current.y*scaleRef.current,
      );
      if(postProgramReady){
        gl.useProgram(postProg);
        gl.uniform2f(
          postUni.uResolution,
          canvas.width,
          canvas.height,
        );
      }
      gl.useProgram(prog);
      deadDirtyRef.current=true;
    }
    let resizeFrame=0;
    const ro=new ResizeObserver(()=>{
      if(resizeFrame) cancelAnimationFrame(resizeFrame);
      resizeFrame=requestAnimationFrame(()=>{
        resizeFrame=0;
        resize();
      });
    });
    ro.observe(ctn);
    resize();

    let contextLost=false;
    let readyNotified=false;
    const onContextLost=e=>{ e.preventDefault(); contextLost=true; };
    const onContextRestored=()=>{
      contextLost=false;
      deadDirtyRef.current=true;
      staticDirtyRef.current=true;
    };
    canvas.addEventListener('webglcontextlost',onContextLost);
    canvas.addEventListener('webglcontextrestored',onContextRestored);

    const update=t=>{
      if(contextLost||(pauseRef.current&&readyNotified)) return;
      if(pageLoadAnimationRef.current&&loadStartRef.current===0) loadStartRef.current=t;
      const usePost =
        postReady&&
        (
          effectsIntensityRef.current>0.0001||
          lensBlurIntensityRef.current>0.0001||
          lensChromaticIntensityRef.current>0.0001
        );
      gl.bindFramebuffer(
        gl.FRAMEBUFFER,
        usePost?sceneFramebuffer:null,
      );
      gl.viewport(0,0,canvas.width,canvas.height);
      gl.useProgram(prog);
      gl.uniform1f(uni.uEncodeBloomMask,usePost?1:0);

      const e=(t*0.001+timeOffRef.current)*timeScaleRef.current;
      gl.uniform1f(uni.iTime,e); frozenRef.current=e;

      if(pageLoadAnimationRef.current&&loadStartRef.current>0)
        gl.uniform1f(uni.uPageLoadProgress,Math.min((t-loadStartRef.current)/2000,1));

      if(mouseReactRef.current&&mouseDirtyRef.current){
        const sm=smoothRef.current, m=mouseRef.current;
        sm.x+=(m.x-sm.x)*0.08; sm.y+=(m.y-sm.y)*0.08;
        gl.uniform2f(uni.uMouse, sm.x*scaleRef.current*aspectRef.current, sm.y*scaleRef.current);
        if(Math.abs(m.x-sm.x)<0.0001&&Math.abs(m.y-sm.y)<0.0001) mouseDirtyRef.current=false;
      }

      const ck=clickRef.current;
      if(ck.active){
        const el=(t-ck.startT)/1000;
        if(el>2.5) ck.active=false;
        gl.uniform2f(uni.uClickPos,ck.x,ck.y);
        gl.uniform1f(uni.uClickTime,el);
        gl.uniform1f(uni.uHasClick,1.0);
      } else gl.uniform1f(uni.uHasClick,0.0);

      if(deadDirtyRef.current){
        if(deadRef.current) gl.deleteTexture(deadRef.current.tex);
        deadRef.current=buildDeadMask(gl,deadZonesRef.current,gridMulRef.current,scaleRef.current,aspectRef.current);
        gl.uniform2f(uni.uDeadMaskSize,deadRef.current.gx,deadRef.current.gy);
        deadDirtyRef.current=false;
      }

      if(staticDirtyRef.current) uploadStatics();

      const imgEntry=imgTexRef.current;
      const previousEntry=previousImgTexRef.current||imgEntry;
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D,imgEntry?.tex||null);
      if(previousEntry?.tex){
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D,previousEntry.tex);
      }else{
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D,null);
      }
      const targetOpacity = opacityTargetRef.current;
      const currentOpacity = opacityRef.current;
      const nextOpacity = currentOpacity + (targetOpacity - currentOpacity) * 0.08;
      opacityRef.current = nextOpacity;
      const useImage = imgEntry && imgEntry.ready && nextOpacity > 0.001;
      if(imgEntry?.ready){
        const effectAmount=effectsIntensityRef.current;
        if(effectAmount<=0){
          imageMixRef.current=1;
        }else if(imageMixRef.current<0.999){
          imageMixRef.current +=
            (1-imageMixRef.current)*(0.1+Math.min(effectAmount,2)*0.035);
        }else{
          imageMixRef.current=1;
          previousImgTexRef.current=imgEntry;
        }
      }
      gl.uniform1f(uni.uUseImage, useImage ? 1 : 0);
      gl.uniform1f(uni.uImageOpacity,nextOpacity);
      gl.uniform1f(uni.uImageMix,imageMixRef.current);
      if (imgEntry?.size) {
        gl.uniform2f(uni.uImageSize, imgEntry.size.w, imgEntry.size.h);
      } else {
        gl.uniform2f(uni.uImageSize, 1, 1);
      }
      if(previousEntry?.size){
        gl.uniform2f(
          uni.uPreviousImageSize,
          previousEntry.size.w,
          previousEntry.size.h,
        );
      }else{
        gl.uniform2f(uni.uPreviousImageSize,1,1);
      }
      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D,deadRef.current.tex);

      gl.drawArrays(gl.TRIANGLES,0,3);
      if(usePost){
        gl.bindFramebuffer(gl.FRAMEBUFFER,null);
        gl.viewport(0,0,canvas.width,canvas.height);
        gl.useProgram(postProg);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D,sceneTexture);
        gl.drawArrays(gl.TRIANGLES,0,3);
      }
      if(!readyNotified){
        // Force the driver's deferred shader work to complete while the
        // transition shutter is closed, never during the visible reveal.
        try {
          gl.finish();
        } catch {
          // A lost context is handled by the bounded transition fallback.
        }
        readyNotified=true;
        readyStateRef.current.shader=true;
        notifyReady();
      }
    };
    const unsubscribeFrame=subscribeFrame(update,{
      fps:renderProfile.animationFps,
    });

    ctn.addEventListener('mousemove',onMouseMove);
    ctn.addEventListener('click',onClick);

    return()=>{
      unsubscribeFrame(); ro.disconnect();
      if(resizeFrame) cancelAnimationFrame(resizeFrame);
      ctn.removeEventListener('mousemove',onMouseMove);
      ctn.removeEventListener('click',onClick);
      canvas.removeEventListener('webglcontextlost',onContextLost);
      canvas.removeEventListener('webglcontextrestored',onContextRestored);
      if(canvas.parentElement===ctn) ctn.removeChild(canvas);
      if(deadRef.current?.tex) gl.deleteTexture(deadRef.current.tex);
      textureCache.forEach((entry) => gl.deleteTexture(entry.tex));
      textureCache.clear();
      gl.deleteFramebuffer(sceneFramebuffer);
      gl.deleteTexture(sceneTexture);
      gl.deleteBuffer(posBuf);
      gl.deleteBuffer(uvBuf);
      gl.deleteProgram(postProg);
      gl.deleteProgram(prog);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      loadStartRef.current=0; timeOffRef.current=Math.random()*100;
    };
  },[
    renderDpr,renderProfile,loadImageTexture,
    onMouseMove,onClick,notifyReady,
  ]);

  return (
    <div
      ref={ctnRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: '#000',
        ...style,
      }}
    />
  );
}
