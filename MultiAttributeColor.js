//MultiPoint.js

var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Color;\n' +
    'attribute float a_PointSize;\n' +
    'varying vec4 v_Color;\n' +     
    'void main (){\n' +
    '   gl_Position =a_Position;\n' +
    '   gl_PointSize = a_PointSize;\n' +
    '   v_Color = a_Color;\n' +     
    '}\n';

var FSHADER_SOURCE =
    'varying vec4 v_Color;\n' +
    'void main(){\n' +
    '   gl_FragColor= v_Color;\n' + 
    '}\n';

function main() {
    var canvas = document.getElementById("webgl");
    if (!canvas) {
        console.log("Failed to retrieve <canvas> element");
        return false;
    }
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log("Failed to get the rendering context for WebGL");
        return false;
    }
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to initialize shaders");
        return false;
    }
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log("Failed to set the positions of the vertices");
        return false;
    }
   
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
   
    gl.drawArrays(gl.POINTS, 0, n);
}

function initVertexBuffers(gl) {
    var verticesColors = new Float32Array([
        0.0, 0.5, 1.0, 0.0, 0.0,
        - 0.5, -0.5, 0.0, 1.0, 0.0,
        0.5, -0.5, 0.0, 0.0, 1.0,
    ]);
    var sizes = new Float32Array([10.0, 20.0, 30.0]);     
    var n = 3;      

  
    var vertexBuffer = gl.createBuffer();
    var sizeBuffer = gl.createBuffer();
    if (!vertexBuffer || !sizeBuffer) {
        console.log("Failed to create the buffer object");
        return -1;
    }
  
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    //gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
   
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var FSIZE = verticesColors.BYTES_PER_ELEMENT;
  
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log("Failed to get the storage location of a_Position");
        return -1;
    }
   
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
 
    gl.enableVertexAttribArray(a_Position);


    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    if (a_Color < 0) {
        console.log("Failed to get the storage location of a_Color");
        return -1;
    }
   
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);

    gl.enableVertexAttribArray(a_Color);

    
    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);
    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    if (a_PointSize < 0) {
        console.log("Failed to get the storage location of a_PointSize");
        return -1;
    }
    gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_PointSize);
    return n;
}