import { GL_Wrapper } from "./GLWrapper";
import { ShaderProgramHelper } from "./ShaderProgramHelper";
import { Transform } from "./Transform"

//Define lots and lots of constants for what we are going to draw
const vertices = [   
    -0.5, 0.5,  0.0,
    -0.5, -0.5,  0.0,
    0.5, -0.5, 0.0, 
    ];
const indices = [0, 1, 2];

const colors = [   
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0, 
    ];

const width = 1080;
const height = 720;
const canvas = document.getElementById('screen') as HTMLCanvasElement;
canvas.width = width;
canvas.height = height;

var glw = new GL_Wrapper(canvas);

var seededProgram = glw.makeSeededProgramWrapper();
seededProgram.attachShaderFromShaderLib(`v_O2W&color`, ShaderProgramHelper.shaderTypes.VERTEX);
seededProgram.attachShaderFromShaderLib(`f_SafeSingleTriWColor`, ShaderProgramHelper.shaderTypes.FRAGMENT);
glw.attachProgramWrapper(seededProgram);

var verticesBuffer = glw.buildAndPushArrayBuffer(new Float32Array(vertices));
var colorBuffer = glw.buildAndPushArrayBuffer(new Float32Array(colors));
var indicesBuffer = glw.buildAndPushElementArrayBuffer(new Uint16Array(indices))

glw.bindAttributeNameToBuffer(verticesBuffer, "vertex_position", 3, false, 0, 0);
glw.bindAttributeNameToBuffer(colorBuffer, "vertex_color", 3, false, 0, 0);



let i = 0;
let s = 0;
let t = 0;
let transform = new Transform();
const val = setInterval(function() {
    transform.setTranslation(t - .5, t - .5, t - .5);
    transform.setScaling(s, s, s)
    transform.setRotation(i, i, i);
    let u = transform.computeTransformMatrix();
    console.log(u);
    glw.bindMatrixUniform(u, 4, `objectToWorld`);
    glw.draw(indicesBuffer, indices.length);
    i = (i + 1)%360
    s = (s + .01)%2
    t = (s + .1)%1
    console.log(glw.getError());
    console.log(s, i, t);
}, 1000/60);



