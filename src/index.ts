import { Camera } from "./Camera";
import { GL_Wrapper } from "./GLWrapper";
import { Plane, Cube, WireCube, Tetrahedron, Octahedron, Dodecahedron, Icosahedron, Sphere } from "./Primitives"

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

const allRed = new Float32Array ([
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
]);

const allBlue = new Float32Array ([
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
]);

const allGreen = new Float32Array ([
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
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



// let shape = new Tetrahedron(glw);
//let shape = new Sphere(glw, 0);
let shape1 = new Sphere(glw, 6);

let c = new Camera();
c.setCameraToProjectionMatrix(180, 1, .0001, 100000);

//DrawInterval
setInterval(() => {
    shape1.draw(c);
    glw.reportError();
}, 1000/16);

//Rotate
let i = 0;
setInterval(() => {
    shape1.transform.setRotation(i, i, i);
    i = (i + 1)%360;
}, 1000/16);






// function colorModeChange(c: Cube, colorMode: number) {
//     lastColorMode = colorMode;

//     if(colorMode == 0) {
//         c.geometry.setColors(c.geometry.getVertexes().slice());
//     }
//     else if (colorMode == 1) {
//         c.geometry.setColors(assignmentColors);
//     }
//     else if(colorMode == 2) {
//         c.geometry.setColors(allBlack);
//     }
// }



