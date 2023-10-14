import { GL_Wrapper } from "./GLWrapper";
import { Plane, Cube, WireCube, Tetrahedron, Octahedron, Dodecahedron, Icosahedron } from "./Primitives"

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


// let cube0 = new Cube(glw);
// cube0.transform.setTranslation(Math.sqrt((8/9)), 0, -(1/3));
// cube0.transform.setScaling(.1, .1, .1);
// cube0.geometry.setColors(allBlack)
// cube0.draw();

// let cube2 = new Cube(glw);
// cube2.transform.setTranslation(-Math.sqrt((2/9)), Math.sqrt((2/3)), -(1/3));
// cube2.transform.setScaling(.1, .1, .1);
// cube2.geometry.setColors(allRed);
// cube2.draw();

// let cube3 = new Cube(glw);
// cube3.transform.setTranslation(-Math.sqrt((2/9)), -Math.sqrt((2/3)), -(1/3));
// console.log(cube3.transform.computeTransformMatrix());
// console.log(-(1/3));
// cube3.transform.setScaling(.1, .1, .1);
// cube3.geometry.setColors(allBlue);
// cube3.draw();

// let cube4 = new Cube(glw);
// cube4.transform.setTranslation(0, 0, 1);
// cube4.transform.setScaling(.1, .1, .1);
// cube4.geometry.setColors(allGreen);
// cube4.draw();


// let cube5 = new Cube(glw);
// cube5.transform.setScaling(.01, .01, .01);
// cube5.draw();

// let shape = new Tetrahedron(glw);
let shape = new Icosahedron(glw);
shape.draw();





let i = 0;
setInterval(() => {


    shape.transform.setRotation(i, 0, i);
    shape.draw();
    glw.reportError();
    i = (i + 1)%360;
}, 1000/60);

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



