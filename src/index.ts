import { GL_Wrapper } from "./GLWrapper";
import { ShaderProgramHelper } from "./ShaderProgramHelper";

//Define lots and lots of constants for what we are going to draw
const vertices = [   
    -0.5, 0.5,  0.0,
    -0.5, -0.5,  0.0,
    0.5, -0.5, 0.0, 
    ];
const indices = [0, 1, 2];

const colors = [   
        1.0,  0.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  0.0,  1.0, 
    ];


//Methods to calculate the rotation matrix. Totally didn't pick the wrong axis the first time ^^"
function createZRotationMatrix(degrees: number) {
    let radians = degrees * (Math.PI/180);
    let radCos = Math.cos(radians);
    let radSin = Math.sin(radians);

    /* Rotation matrix, its returned as one line as it has to be in column major order >:(
        cos γ, -sin γ, 0, 0
        sin γ,  cos γ, 0, 0
        0       0      1, 0
        0       0      0, 1
    */
    return [ radCos, radSin, 0, 0, -1 * radSin, radCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
}
function createXRotationMatrix(degrees: number) {
    let radians = degrees * (Math.PI/180);
    let radCos = Math.cos(radians);
    let radSin = Math.sin(radians);

    /* Rotation matrix, its returned as one line as it has to be in column major order >:(
        1,      0,     0, 0
        0,  cos γ, sin γ, 0
        0  -sin γ  cos γ, 0
        0       0      0, 1
    */
    return [ 1,     0,      0,      0, 
            0, radCos,  radSin,     0, 
            0, -1 * radSin, radCos, 0, 
            0,      0,      0,      1]
}

//
const rotShader = `
    attribute vec3 vertex_position;
    attribute vec3 vertex_color;

    uniform mat4 rot_mat;

    varying vec3 vColor;
    void main() {
        vec4 vertex = rot_mat * vec4(vertex_position, 1);
        gl_Position = vertex;
        vColor = vertex_color;
    }
    `

const width = 300;
const height = 300;
const canvas = document.getElementById('screen') as HTMLCanvasElement;
canvas.width = width;
canvas.height = height;

var glw = new GL_Wrapper(canvas);

var seededProgram = glw.makeSeededProgramWrapper();
seededProgram.attachShaderFromString(rotShader, ShaderProgramHelper.shaderTypes.VERTEX);
seededProgram.attachShaderFromShaderLib(`f_SafeSingleTriWColor`, ShaderProgramHelper.shaderTypes.FRAGMENT);
glw.attachProgramWrapper(seededProgram);

var verticesBuffer = glw.buildAndPushArrayBuffer(new Float32Array(vertices));
var colorBuffer = glw.buildAndPushArrayBuffer(new Float32Array(colors));
var indicesBuffer = glw.buildAndPushElementArrayBuffer(new Uint16Array(indices))

glw.bindAttributeNameToBuffer(verticesBuffer, "vertex_position", 3, false, 0, 0);
glw.bindAttributeNameToBuffer(colorBuffer, "vertex_color", 3, false, 0, 0);


let i = 0;
var delta = 1;
const val = setInterval(function() {
    glw.bindMatrixUniform(new Float32Array(createXRotationMatrix(i)), 4, `rot_mat`);
    glw.draw(indicesBuffer, indices.length);
    if(i >= 180) { delta = -1; }
    else if (i <= 0) { delta = 1; }
    i = i + delta;
    //console.log(glw.getError());
}, 1000/60);



