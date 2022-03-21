

function Cube(gl) {

    let program = initShaders(gl, "Cube-vertex-shader", "Cube-fragment-shader");

    let positions = [

        .5, .5, -.5,
        .5, -.5, -.5,                     //        2 / 6  *         * 0 / 4
        -.5, .5, -.5,
        -.5, -.5, -.5,                    //        3 / 7  *         * 1 / 5

        .5, .5, .5,
        .5, -.5, .5,
        -.5, .5, .5,
        -.5, -.5, .5
        ];

    let indices = [

        // front
        0, 1, 2,
        3, 1, 2,

        // top
        2, 0, 4,
        4, 6, 2,

        // right
        0, 1, 5,
        5, 4, 0,

        // left
        2, 6, 7,
        3, 6, 2,

        // bottom
        3, 7, 1,
        1, 5, 7,

        // back
        6, 4, 5,
        5, 6, 7
    ];

    var edges = [
        0, 2,  // "Front" face edges
        1, 0,
        2, 3,
        3, 1,
        4, 5,  // "Back" face edges
        4, 6,
        6, 7,
        7, 5,
        0, 4,  // "Side" edges
        1, 5,
        2, 6,
        3, 7
    ];

    gl.getUniformLocation(program, "R")
    positions.numComponents = 3;

    positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW );

    indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW );

    edges.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, edges.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(edges), gl.STATIC_DRAW );

    positions.aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.enableVertexAttribArray( positions.aPosition );

    let MV = gl.getUniformLocation(program, "MV");
    if (MV) { this.MV = mat4(); }
    

    this.render = function () {
        gl.useProgram( program );

        gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
        gl.vertexAttribPointer( positions.aPosition, positions.numComponents,
            gl.FLOAT, false, 0, 0 );

        gl.uniformMatrix4fv(MV, false, flatten(this.MV));

        // Render the wireframe version of the cube
        /**gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, edges.buffer );
        gl.drawElements( gl.LINES, edges.length, gl.UNSIGNED_SHORT, 0 );*/

        // Render the solid version of the cube
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
        gl.drawElements( gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0 );
    }

};
