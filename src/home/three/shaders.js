/** ColorBends — exact ReactBits port */
export const CB_VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main(){ vUv = aPos * .5 + .5; gl_Position = vec4(aPos, 0., 1.); }
`;

export const CB_FRAG = `
precision highp float;
#define MC 8
uniform vec2  uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2  uRot;
uniform int   uColorCount;
uniform vec3  uColors[MC];
uniform int   uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2  uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
uniform float uExposure;
varying vec2 vUv;

void main(){
  float t = uTime * uSpeed;
  vec2 p  = vUv * 2.0 - 1.0;
  p      += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x*uRot.x - p.y*uRot.y, p.x*uRot.y + p.y*uRot.x);
  vec2 q  = vec2(rp.x*(uCanvas.x/uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2*dot(q,q);
  q += 0.2*cos(t) - 7.56;
  q += (uPointer - rp) * uMouseInfluence * 0.2;

  vec3 col = vec3(0.0); float a = 1.0;
  vec2 s = q; vec3 sumCol = vec3(0.0); float cover = 0.0;

  for(int i = 0; i < MC; ++i){
    if(i >= uColorCount) break;
    s -= 0.01;
    vec2 r  = sin(1.5*(s.yx*uFrequency) + 2.0*cos(s*uFrequency));
    float m0 = length(r + sin(5.0*r.y*uFrequency - 3.0*t + float(i))/4.0);
    float kB = clamp(uWarpStrength, 0.0, 1.0);
    float gain = 1.0 + max(uWarpStrength-1.0, 0.0);
    vec2 warped = s + (r-s)*kB*gain;
    float m1 = length(warped + sin(5.0*warped.y*uFrequency - 3.0*t + float(i))/4.0);
    float m  = mix(m0, m1, pow(kB, 0.3));
    float w  = 1.0 - exp(-6.0/exp(6.0*m));
    sumCol  += uColors[i] * w;
    cover    = max(cover, w);
  }
  col = clamp(sumCol, 0.0, 1.0);
  a   = (uTransparent > 0) ? cover : 1.0;

  if(uNoise > 0.0001){
    float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898,78.233)))*43758.5453);
    col = clamp(col + (n-.5)*uNoise, 0.0, 1.0);
  }
  col *= max(uExposure, 0.0);
  gl_FragColor = vec4((uTransparent>0) ? col*a : col, a);
}
`;

/** Glass mesh vertex */
export const GL_VERT = `
varying vec3 vNormal;
varying vec3 vViewPos;
varying vec3 vWorldPos;
varying vec2 vUv;
void main(){
  vUv = uv;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  vec4 mv = viewMatrix * wp;
  vViewPos = -mv.xyz;
  vNormal  = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mv;
}
`;

/** Glass mesh fragment — frosted blur + caustics + silhouette rim */
export const GL_FRAG = `
precision highp float;
uniform sampler2D uBuffer;
uniform vec2  uRes;
uniform float uTime;
uniform float uIOR;
uniform float uChroma;
uniform float uFrost;
uniform float uSmoke;
uniform float uRoughness;
uniform float uFresnel;
uniform float uRimIntensity;
uniform float uRimPower;
uniform float uRimStart;
varying vec3 vNormal;
varying vec3 vViewPos;
varying vec3 vWorldPos;
varying vec2 vUv;

float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.,a=.5;
  for(int i=0;i<6;i++){v+=a*noise(p);p*=2.1;a*=.48;}
  return v;
}
float caustic(vec2 uv, float t){
  vec2 p=uv*4.5; float c=0.;
  for(int i=0;i<4;i++){
    float fi=float(i);
    vec2 q=p+vec2(cos(t*.35+fi*1.9),sin(t*.28+fi*2.4))*.7;
    c+=.8/(abs(sin(q.x+sin(q.y+t*.25)))+.12);
  }
  return clamp(c*.09,0.,1.);
}

void main(){
  /* Poisson disk — 12 taps */
  vec2 disk[12];
  disk[0]=vec2(.000,.800); disk[1]=vec2(.469,.643);
  disk[2]=vec2(.800,.000); disk[3]=vec2(.643,-.469);
  disk[4]=vec2(.000,-.800);disk[5]=vec2(-.469,-.643);
  disk[6]=vec2(-.800,.000);disk[7]=vec2(-.643,.469);
  disk[8]=vec2(.300,.400); disk[9]=vec2(-.300,.400);
  disk[10]=vec2(.300,-.400);disk[11]=vec2(-.300,-.400);

  vec2 sc = gl_FragCoord.xy / uRes;
  vec3 N  = normalize(vNormal);
  vec3 V  = normalize(vViewPos);
  float eta = 1.0 / uIOR;
  float k   = max(1.0 - eta*eta*(1.0 - dot(N,V)*dot(N,V)), 0.0);
  vec3 refDir  = eta*(-V) - (eta*dot(N,V) + sqrt(k))*N;
  vec2 refShift = refDir.xy * 0.022;

  /* Frost noise */
  vec2 nuv = vUv*5.5 + uTime*.035;
  float frostA = fbm(nuv)*.7 + fbm(nuv*2.3+vec2(4.1,2.7))*.3;
  float jitter = frostA * uFrost;
  float rad    = 0.048 * jitter;

  /* 12-tap chromatic blur */
  vec3 sumR=vec3(0.),sumG=vec3(0.),sumB=vec3(0.);
  for(int i=0;i<12;i++){
    vec2 off = disk[i]*rad;
    float ca = uChroma*(float(i)*.055+.55);
    sumR += texture2D(uBuffer, sc+refShift+off*(1.+ca)).rgb;
    sumG += texture2D(uBuffer, sc+refShift+off        ).rgb;
    sumB += texture2D(uBuffer, sc+refShift+off*(1.-ca)).rgb;
  }
  vec3 frosted = vec3(
    (sumR.r+sumG.r+sumB.r)/36.,
    (sumR.g+sumG.g+sumB.g)/36.,
    (sumR.b+sumG.b+sumB.b)/36.);

  /* Smoke */
  vec2 suv = vWorldPos.xy*.75 + vec2(uTime*.055, uTime*.032);
  float sm = fbm(suv)*fbm(suv*1.6+vec2(2.1,3.7));
  vec3 smokeCol = mix(vec3(.38,.12,.72), vec3(.05,.02,.22), sm);
  frosted = mix(frosted, smokeCol, uSmoke*(.28+sm*.28));

  /* Caustics */
  float caust = caustic(vWorldPos.xy*.45+uTime*.04, uTime);
  float ct    = sin(uTime*.3)*.5+.5;
  vec3 causticTint = mix(vec3(1.,.15,.15), mix(vec3(.1,1.,.1),vec3(.1,.1,1.),ct), ct);
  frosted += causticTint * caust * .30;

  /* Fresnel + specular */
  float NdV     = max(dot(N,V), 0.0);
  float fresnel = pow(1.0-NdV, 4.2) * uFresnel;
  vec3 L1 = normalize(vec3(2.,4.,5.));
  vec3 L2 = normalize(vec3(-3.,-1.,3.));
  float spec1 = pow(max(dot(reflect(-L1,N),V),0.),120.)*.95;
  float spec2 = pow(max(dot(reflect(-L2,N),V),0.),18.)*.25;
  vec3 specCol = (vec3(.95,.9,1.)*spec1 + vec3(.7,.5,1.)*spec2) * (1.0 - clamp(uRoughness, 0.0, 1.0));

  /* Iridescent rim */
  float iri   = pow(1.0-NdV, 2.5);
  vec3 iriCol = mix(vec3(.2,.6,1.), vec3(1.,.2,.4), sin(iri*6.+uTime*.4)*.5+.5)*iri*.45;

  /* Base colour */
  vec3 col = mix(frosted, vec3(.88,.85,1.), .08) + specCol + iriCol;
  col += vec3(.55,.35,.9)*fresnel*.18;
  col += vec3(.5,.2,.9)*pow(max(1.-length(vUv-.5)*2.,0.),2.5)*.12;
  col = mix(col, frosted, clamp(uRoughness, 0.0, 1.0));

  /* Silhouette rim — tight band only at outermost edge */
  float rim    = smoothstep(uRimStart, 1.0, pow(1.0-NdV, uRimPower));
  float rs     = sin(uTime*.5)*.5+.5;
  vec3 rimCol  = mix(vec3(.4,.7,1.), vec3(1.,.25,.6), rs);
  col         += rimCol * rim * uRimIntensity;

  float alpha  = clamp(mix(.78,.98,fresnel) + rim*.85, 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
}
`;
