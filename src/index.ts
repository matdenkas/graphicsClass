import { GL_Wrapper } from "./GLWrapper";
import { Plane } from "./Primitives"
import { ShaderProgramHelper } from "./ShaderProgramHelper";

const width = 1080;
const height = 720;
const canvas = document.getElementById('screen') as HTMLCanvasElement;
canvas.width = width;
canvas.height = height;

var glw = new GL_Wrapper(canvas);

let prog = glw.makeSeededProgramWrapper();
prog.attachShaderFromShaderLib(`v_O2W&color`, ShaderProgramHelper.shaderTypes.VERTEX);
prog.attachShaderFromShaderLib(`f_SafeSingleTriWColor`, ShaderProgramHelper.shaderTypes.FRAGMENT);
glw.attachProgramWrapper(prog);

let p1 = new Plane(glw);
let p2 = new Plane(glw);
p2.transform.setTranslation(.5, 0, -.5);


let i = 0;
let r = 0;
setInterval(() => {
    p1.transform.setRotation(i, 0, 0);
    p2.transform.setRotation(0, -r, 0);
    i = (i + 1)%360;
    r = (r + 2)%360;
    p1.draw();
    p2.draw();
    glw.reportError();

}, 1000/60);



