// Jordan Edginton
// CS-385-02 Sp '22
// Assignment 3

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
    // gl.enable(gl.CULL_FACE);
    // gl.cullFace(gl.BACK_FACE);
    render(gl, cube);


    // render(gl, cube);
}


function render(gl, obj){
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    obj.render();
    obj.gl_position = vec4(obj.position, 1.0)

    obj.P = perspective();
    obj.MV = mult(.01, .01);
    // obj.vec4()


    requestAnimationFrame(render)
}

window.onload = init;