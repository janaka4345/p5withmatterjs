const fs = `
#ifdef GL_ES
precision mediump float;
#endif


uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_image;



void main(){
    vec2 position=gl_FragCoord.xy/u_resolution.xy;

    vec4 color=texture2D(u_image,vec2(position.x*0.1+0.1,position.y));
    
    // vec3 color=vec3(position.x,position.y,0.0);
    

    // gl_FragColor=vec4(color ,1.0 );
    gl_FragColor=vec4(color);

}`;
export default fs;
