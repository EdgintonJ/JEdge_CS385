// Jordan Edginton
// CS-385-02 Sp '22
// Assignment 3

let angle = 0;

function init(){
    const canvas = document.getElementById("webgl-canvas");
    const gl = canvas.getContext("webgl2");
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    /*let frontColor = vec4(0, 0xbb, 0xff, 1);
    let backColor = vec4(1, 1, 1, 0);
    let fColor = gl_FrontFacing ?
        frontColor : backColor;*/

    gl.clearColor(0, 0xbb, 0xff, 1);
    let cube = new Cube(gl);
    gl.clearDepth(1.0); // default
    gl.enable(gl.DEPTH_TEST);
    render(gl, cube);


    // render(gl, cube);
}


function render(gl, obj){
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    angle += 5;
    obj.MV = rotate(angle, [1, 1, 1]);  // rotate around the axis (1, 1, 1)
    // obj.MV = scalem(0.95, 1.05, 1)
    obj.render()
    requestAnimationFrame(render)

}

window.onload = init;
