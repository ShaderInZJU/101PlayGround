var VSHADER_SOURCE = 
    'attribute vec4 a_Postion;\n'+
    'void main() {\n'+
    '   gl_Postion = a_Position;\n'+
    '   gl_PointSize = 10.0;\n'+
    '}\n';

var FSHADER_SOURCE = 
    'void main(){\n'+
    '   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n'+
    '}\n';

function main(){
    var canvas = document.getElementById('webgl');

    var gl = getWebGLContext(canvas);

    if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE ))  {
        console.log('Failed to init');
        return;
    }


    gl.cleanColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);
}