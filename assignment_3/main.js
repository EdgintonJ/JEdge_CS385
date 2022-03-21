// Jordan Edginton
// CS-385-02 Sp '22
// Assignment 3


let angle = 0;
let gl;
let canvas;

function init(){
    canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    gl.clearColor(0, 0xbb, 0xff, 1);
    let cube = new Cube(gl);
    gl.clearDepth(1.0); // default
    gl.enable(gl.DEPTH_TEST);
    setTimeout(() => {
        requestAnimationFrame(render(cube));
    }, 1000 / 10);

}


function render(obj){

    angle += 5;
    obj.MV = translate(0, 0, 0)
    obj.MV = rotate(angle, [1, 1, 1]);  // rotate around the axis (1, 1, 1)
    obj.P = lookAt(vec3(0, 0, -0.5), vec3(0, 0, 0), vec3(0, 1, 0))
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    obj.render()
    setTimeout(() => {
        requestAnimationFrame(render(obj));
    }, 1000 / 10);

}

window.onload = init;
