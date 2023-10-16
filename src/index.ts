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



let shape1 = new Icosahedron(glw);
shape1.transform.setScaling(.5, .5, .5);
shape1.transform.setTranslation(.5, 0, 0);

let c = new Camera();
c.transform.setTranslation(0, 0, 2);
c.setCameraToProjectionMatrix(60, width/height, 1, 2000);
console.log('proj:', c.getCameraToProjectionMatrix())

//DrawInterval
setInterval(() => {
    shape1.draw(c);
    glw.reportError();
}, 1000/16);

//Rotate
let i = 0;
let shapeRot = 0;
let shapeScale = 0;
let delta = .05
setInterval(() => {
    shape1.transform.setRotation(shapeRot, 0, 0);
    shape1.transform.setTranslation(0, 0, i);


    shape1.transform.setScaling(shapeScale / 2+1, shapeScale / 2 +1, shapeScale / 2 +1)
    console.log(shapeScale / 2 +.5)
    if(i > 1) {delta = -.05; }
    if(i < -1) {delta = .05; }
    i = i + delta
    shapeScale = shapeScale + delta;
    shapeRot = (shapeRot + 1)%360;
}, 1000/16);
//Rotate
let j = 0;
setInterval(() => {
    c.transform.setRotation(0, j, 0);
    j = (j + 1)%360;
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



