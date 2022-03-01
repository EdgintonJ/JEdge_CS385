// const DefaultNumSides = 8;

function Cube(gl) {

    /* // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "Cube-vertex-shader";
    var fragShdr = fragmentShaderId || "Cube-fragment-shader";

    this.program = initShaders(gl, vertShdr, fragShdr);

    if ( this.program < 0 ) {
        alert( "Error: Cone shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }

    var n = numSides || DefaultNumSides; // Number of sides

    var theta = 0.0;
    var dTheta = 2.0 * Math.PI / n;
    
    // Record the number of components for each vertex's position in the Cone object's 
    //   positions property. (that's why there's a "this" preceding the positions here).
    //   Here, we both create the positions object, as well as initialize its
    //   numComponents field.
    //
    this.positions = { numComponents : 3 };
    
    // Initialize temporary arrays for the Cone's indices and vertex positions
    //
    var positions = [ 0.0, 0.0, 0.0 ];
    var indices = [ 0 ];


    // positions.push( 0.0, 0.0, 1.0 );
    
    // Close the triangle fan by repeating the first (non-center) point.
    //

    positions.push( 1.0, 0.0, 0.0 );
    positions.push( 0.0, 1.0, 0.0 );

    indices.push(1);
    indices.push(2);

    // Record the number of indices in one of our two disks that we're using to make the
    //   cone.  At this point, the indices array contains the correct number of indices for a
    //   single disk, and as we render the cone as two disks of the same size, this value is
    //   precisely what we need.
    //
    this.indices = { count : indices.length };

    // Now build up the list for the cone.  First, add the apex vertex onto the index list
    //
    indices.push(n + 1);

    // Next, we need to append the rest of the vertices for the permieter of the disk.
    // However, the cone's perimeter vertices need to be reversed since it's effectively a
    // reflection of the bottom disk.
    //
    indices = indices.concat( indices.slice(1,n+2).reverse() );*/

    let program = initShaders(gl, "Cube-vertex-shader", "Cube-fragment-shader");

    let positions = [
            // --> Insert your vertex positions here
        .5, .5, -.5,
        .5, -.5, -.5,                     //        2 / 6  *         * 0 / 4
        -.5, .5, -.5,
        -.5, -.5, -.5,                    //        3 / 7  *         * 1 / 5

        .6, .5, .5,
        .6, -.5, .5,
        -.4, .5, .5,
        -.4, -.5, .5
        ];

    let indices = [
        // --> Insert you index values here
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

    positions.numComponents = 3;

    positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW );

    indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW );

    positions.aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.enableVertexAttribArray( positions.aPosition );

    this.render = function () {
        gl.useProgram( program );

        gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
        gl.vertexAttribPointer( positions.aPosition, positions.numComponents,
            gl.FLOAT, false, 0, 0 );

        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
        gl.drawElements( gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0 );
        // gl.drawElements( gl., indices.length, gl.UNSIGNED_SHORT, 0 );
    }

    /*this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW );

    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW );

    this.positions.attributeLoc = gl.getAttribLocation( this.program, "aPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );

    this.render = function () {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );
 
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

        // Draw the cone's base
        //
        gl.drawElements( gl.POINTS, this.indices.count, gl.UNSIGNED_SHORT, 0 );

        // Draw the cone's top
        //
        var offset = this.indices.count * 2 /* sizeof(UNSIGNED_INT) ;
        gl.drawElements( gl.POINTS, this.indices.count, gl.UNSIGNED_SHORT, offset );*/
    // }
};
