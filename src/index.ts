import { GL_Wrapper } from "./GLWrapper";
import { Plane, Cube, WireCube } from "./Primitives"

const width = 800;
const height = 800;
const canvas = document.getElementById('screen') as HTMLCanvasElement;
canvas.width = width;
canvas.height = height;

var glw = new GL_Wrapper(canvas);

const assignmentColors = new Float32Array ([
    .4,   0,   0,
    .4,   0,   0,
    .4,   0,   0,
    .4,   0,   0,
    .4,   0,   0,
    .4,   0,   0,
    .4,   0,   0,
     1,   0 ,  1,
     1,   0 ,  1,
]);

const allBlack = new Float32Array ([
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
]);

let isMoving = false;
let isWire = false;
let colorMode = 0;
let lastColorMode = 0;
let body = document.getElementById('body') as HTMLElement;
body?.addEventListener('keydown', (evt: KeyboardEvent) => {
    if(evt.key == 't') { isMoving = !isMoving; }
    if(evt.key == 'c') {colorMode = ++colorMode % 3; }
    if(evt.key == 'w') {isWire  = !isWire; }
});


let cube = new Cube(glw);
let wCube = new WireCube(glw);
wCube.geometry.colors = allBlack;


let i = 0;
let t = 0;
setInterval(() => {

    if(isWire) {
        wCube.transform.setRotation(i, 45, i);
        wCube.transform.setTranslation(t -.5, 0, 0);
        wCube.draw();
    }
    else {
        cube.transform.setRotation(i, 45, i);
        cube.transform.setTranslation(t -.5, 0, 0);
        cube.draw();
    }
    glw.reportError();

    i = (i + 1)%360;
    if(isMoving) { t = (t + .01) % 1 }
    if(colorMode != lastColorMode) { colorModeChange(cube, colorMode)}
}, 1000/60);

function colorModeChange(c: Cube, colorMode: number) {
    lastColorMode = colorMode;

    if(colorMode == 0) {
        c.geometry.colors = c.geometry.vertexes.slice();
    }
    else if (colorMode == 1) {
        c.geometry.colors = assignmentColors;
    }
    else if(colorMode == 2) {
        c.geometry.colors = allBlack;
    }
}



