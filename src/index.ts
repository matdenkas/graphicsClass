import { GL_Wrapper } from "./GLWrapper";
import { Plane, Cube } from "./Primitives"
import { ShaderProgramHelper } from "./ShaderProgramHelper";

const width = 1080;
const height = 1080;
const canvas = document.getElementById('screen') as HTMLCanvasElement;
canvas.width = width;
canvas.height = height;

var glw = new GL_Wrapper(canvas);

let prog = glw.makeSeededProgramWrapper();
prog.attachShaderFromShaderLib(`v_O2W&color`, ShaderProgramHelper.shaderTypes.VERTEX);
prog.attachShaderFromShaderLib(`f_SafeSingleTriWColor`, ShaderProgramHelper.shaderTypes.FRAGMENT);
glw.attachProgramWrapper(prog);


let c = new Cube(glw);

let i = 0;
setInterval(() => {
    c.transform.setRotation(i, 45, i);
    i = (i + 1)%360;
    c.draw();
    glw.reportError();

}, 1000/60);



