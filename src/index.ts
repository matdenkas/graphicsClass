import { GL_Wrapper } from "./GLWrapper";
import { ShaderProgramHelper } from "./ShaderProgramHelper";


const vertexShaderSource = `
                attribute vec3 vertex_position;
                attribute vec3 vertex_color;

                varying vec3 vColor;
            
                void main() {
            
                    gl_Position = vec4(vertex_position, 1.0);
                    vColor = vertex_color;
                }
            `;

const fragmentShaderSource = `
            precision highp float;
            varying vec3 vColor;

            void main() {
            
                gl_FragColor = vec4(vColor, 1.0); // return reddish-purple
            }
        `;

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

const width = 300;
const height = 300;
const canvas = document.getElementById('screen') as HTMLCanvasElement;
canvas.width = width;
canvas.height = height;

var glw = new GL_Wrapper(canvas);

var seededProgram = glw.makeSeededProgramWrapper();
seededProgram.attachShaderFromString(vertexShaderSource, ShaderProgramHelper.shaderTypes.VERTEX);
seededProgram.attachShaderFromString(fragmentShaderSource, ShaderProgramHelper.shaderTypes.FRAGMENT);
glw.attachProgramWrapper(seededProgram);

var verticesBuffer = glw.buildAndPushArrayBuffer(new Float32Array(vertices));
var colorBuffer = glw.buildAndPushArrayBuffer(new Float32Array(colors));
var indicesBuffer = glw.buildAndPushElementArrayBuffer(new Uint16Array(indices))

glw.bindAttributeNameToBuffer(verticesBuffer, "vertex_position", 3, false, 0, 0);
glw.bindAttributeNameToBuffer(colorBuffer, "vertex_color", 3, false, 0, 0);

glw.draw(indicesBuffer, indices.length);


