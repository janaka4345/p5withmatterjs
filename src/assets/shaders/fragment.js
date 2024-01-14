const fs = `
#ifdef GL_ES
precision mediump float;
#endif


uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;



void main(){
    vec2 position=gl_FragCoord.xy/u_resolution.xy;
    
    vec3 color=vec3(1.0,0.0,0.0);
    

    gl_FragColor=vec4(color ,1.0 );

}`;
export default fs;
