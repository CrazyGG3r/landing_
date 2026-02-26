export const vertexShader = `
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

export const fragmentShader = `
uniform vec2  u_mouse; uniform vec2  u_resolution; uniform float u_pixelRatio;
uniform float u_shapeSize; uniform float u_roundness; uniform float u_borderSize;
uniform float u_circleSize; uniform float u_circleEdge;
uniform float u_impactSize; uniform float u_impactEdge;
uniform vec3  u_colorA; uniform vec3  u_colorB; uniform vec3  u_colorC;
uniform float u_spreadA; uniform float u_spreadB; uniform float u_spreadC;
uniform float u_intensityA; uniform float u_intensityB; uniform float u_intensityC;
uniform vec2  u_shapePos;
uniform float u_noise; uniform float u_smoke; uniform float u_dither; uniform float u_time;

vec2 coord(in vec2 p) {
    p = p/u_resolution.xy;
    if(u_resolution.x>u_resolution.y){ p.x*=u_resolution.x/u_resolution.y; p.x+=(u_resolution.y-u_resolution.x)/u_resolution.y/2.0; }
    else{ p.y*=u_resolution.y/u_resolution.x; p.y+=(u_resolution.x-u_resolution.y)/u_resolution.x/2.0; }
    p-=0.5; p*=vec2(-1.0,1.0); return p;
}
#define st0 coord(gl_FragCoord.xy)
#define mx  coord(u_mouse*u_pixelRatio)

float sdRoundRect(vec2 p,vec2 b,float r){vec2 d=abs(p-0.5)*4.2-b+vec2(r);return min(max(d.x,d.y),0.0)+length(max(d,0.0))-r;}
float sdCircle(vec2 st,vec2 c){return length(st-c)*2.0;}
float fill(float x,float sz,float e){return 1.0-smoothstep(sz-e,sz+e,x);}
float strokeEdge(float x,float size,float w,float edge){
    float afw=length(vec2(dFdx(x),dFdy(x)))*0.70710678;
    float d=smoothstep(size-edge-afw,size+edge+afw,x+w*0.5)-smoothstep(size-edge-afw,size+edge+afw,x-w*0.5);
    return clamp(d,0.0,1.0);
}
float hash21(vec2 p){p=fract(p*vec2(127.1,311.7));p+=dot(p,p+19.19);return fract(p.x*p.y);}
float vnoise(vec2 p){
    vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
    return mix(mix(hash21(i),hash21(i+vec2(1,0)),f.x),mix(hash21(i+vec2(0,1)),hash21(i+vec2(1,1)),f.x),f.y);
}
float fbm(vec2 p){
    float v=0.0,a=0.5; mat2 rot=mat2(0.87758,0.47943,-0.47943,0.87758);
    for(int i=0;i<5;i++){v+=a*vnoise(p);p=rot*p*2.0;a*=0.5;} return v;
}
float smokeWarp(vec2 p){
    float t1=u_time*0.10,t2=u_time*0.15;
    vec2 q=vec2(fbm(p+t1),fbm(p+vec2(5.2,1.3)+t1));
    vec2 r=vec2(fbm(p+q*1.5+t2),fbm(p+q*1.5+vec2(8.3,2.8)+t2));
    return fbm(p+r*0.8);
}
float bayer4(vec2 p){
    int x=int(mod(p.x,4.0)),y=int(mod(p.y,4.0)); float m[16];
    m[0]=0.0;m[1]=8.0;m[2]=2.0;m[3]=10.0;m[4]=12.0;m[5]=4.0;m[6]=14.0;m[7]=6.0;
    m[8]=3.0;m[9]=11.0;m[10]=1.0;m[11]=9.0;m[12]=15.0;m[13]=7.0;m[14]=13.0;m[15]=5.0;
    return m[y*4+x]/16.0;
}
void main(){
    vec2 st=st0+0.5, relMouse=mx*vec2(1.,-1.)+0.5, shapeOff=u_shapePos-0.5;
    float mInf=1.0-smoothstep(0.0,0.45,length(st-relMouse));

    // Impact circle drives the edge distortion (was circleSize/circleEdge)
    float baseEdge=fill(sdCircle(st,relMouse),u_impactSize,u_impactEdge);

    float noiseEdge=0.0;
    if(u_noise>0.0){float n=vnoise(st*16.0+u_time*2.0)*2.0-1.0; noiseEdge=n*u_noise*0.36*mInf;}
    float smokeEdge=0.0,smokeVol=0.0;
    if(u_smoke>0.0){
        vec2 p=(st-shapeOff-0.5)*3.5; float sw=smokeWarp(p);
        float df=1.0-smoothstep(0.0,0.5*max(mInf,0.05),length(st-relMouse));
        smokeEdge=(sw-0.5)*u_smoke*0.6*mInf; smokeVol=pow(sw,2.5)*df*u_smoke;
    }
    float shift=mInf*0.03; vec2 stOff=st-shapeOff;
    float extra=noiseEdge+smokeEdge;
    float eA=max(baseEdge+u_spreadA*mInf*0.14+extra,0.001);
    float eB=max(baseEdge+u_spreadB*mInf*0.14+extra,0.001);
    float eC=max(baseEdge+u_spreadC*mInf*0.14+extra,0.001);
    float maskA=strokeEdge(sdRoundRect(stOff+vec2(shift,0),vec2(u_shapeSize*0.9),u_roundness),0.0,u_borderSize,eA)*4.0*u_intensityA;
    float maskB=strokeEdge(sdRoundRect(stOff,vec2(u_shapeSize),u_roundness),0.0,u_borderSize,eB)*4.0*u_intensityB;
    float maskC=strokeEdge(sdRoundRect(stOff-vec2(shift,0),vec2(u_shapeSize*1.1),u_roundness),0.0,u_borderSize,eC)*4.0*u_intensityC;

    vec3 col=u_colorA*maskA+u_colorB*maskB+u_colorC*maskC;
    float white=strokeEdge(sdRoundRect(stOff,vec2(u_shapeSize),u_roundness),0.0,u_borderSize,baseEdge)*4.0;
    float blend=clamp(mInf*2.0,0.0,1.0);
    col=mix(vec3(1.0)*white,col,blend);
    
    // MODIFIED: Alpha is now controlled by cursor proximity
    // Base alpha from RGB masks (these are the circles)
    float rgbAlpha = max(maskA, max(maskB, maskC));
    
    // White shape alpha (background)
    float whiteAlpha = white;
    
    // Blend between them based on cursor: 
    // - Far from cursor: show base white shape
    // - Near cursor: show RGB circles
    float a = mix(whiteAlpha, rgbAlpha, blend);
    
    if(u_smoke>0.0){
        vec3 st2=mix(u_colorB,vec3(1.0),0.25); 
        col+=st2*smokeVol*0.55; 
        a=max(a,smokeVol*0.70);
    }
    if(u_dither>0.0&&a>0.001){
        vec2 spx=gl_FragCoord.xy/u_pixelRatio;
        vec2 dpx=spx+vec2(floor(mod(u_time*7.0,4.0)),floor(mod(u_time*5.0,4.0)));
        float thr=mix(bayer4(dpx),hash21(spx*0.5+u_time*13.7),0.35);
        float q=step(thr,a*(1.0/max(u_dither,0.001))*u_dither);
        col=mix(col,col*q,u_dither); 
        a=mix(a,a*q,u_dither);
    }
    gl_FragColor=vec4(clamp(col,0.0,1.0),clamp(a,0.0,1.0));
}`;