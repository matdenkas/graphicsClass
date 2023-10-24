import { Camera } from "./Camera";
import { GL_Wrapper } from "./GLWrapper";
import { Scene } from "./Scene";
import { Plane, Cube, WireCube, Tetrahedron, Octahedron, Dodecahedron, Icosahedron, Sphere } from "./Primitives"

const width = 800;
const height = 800;
const canvas = document.getElementById('screen') as HTMLCanvasElement;
canvas.width = width;
canvas.height = height;

var glw = new GL_Wrapper(canvas);






const cameraAngels: Camera[] = []
cameraAngels.push(new Camera());
cameraAngels[0].setCameraToProjectionMatrix(90, width/height, .1, 2000);
cameraAngels[0].transform.setTranslation(-50, -25, 0);
cameraAngels[0].transform.setRotation(-90, 0, 0);

cameraAngels.push(new Camera());
cameraAngels[1].setCameraToProjectionMatrix(90, width/height, .1, 2000);
cameraAngels[1].transform.setTranslation(-25, -25, 0);
cameraAngels[1].transform.setRotation(-90, 0, 0);

cameraAngels.push(new Camera());
cameraAngels[2].setCameraToProjectionMatrix(90, width/height, .1, 2000);
cameraAngels[2].transform.setTranslation(0, -25, 0);
cameraAngels[2].transform.setRotation(-90, 0, 0);

cameraAngels.push(new Camera());
cameraAngels[3].setCameraToProjectionMatrix(90, width/height, .1, 2000);
cameraAngels[3].transform.setTranslation(25, -25, 0);
cameraAngels[3].transform.setRotation(-90, 0, 0);

cameraAngels.push(new Camera());
cameraAngels[4].setCameraToProjectionMatrix(90, width/height, .1, 2000);
cameraAngels[4].transform.setTranslation(50, -25, 0);
cameraAngels[4].transform.setRotation(-90, 0, 0);

cameraAngels.push(new Camera());
cameraAngels[5].setCameraToProjectionMatrix(90, width/height, .1, 2000);
cameraAngels[5].transform.setTranslation(75, -25, 0);
cameraAngels[5].transform.setRotation(-90, 0, 0);


cameraAngels.push(new Camera());
cameraAngels[6].setCameraToProjectionMatrix(60, width/height, .1, 2000);
cameraAngels[6].transform.setTranslation(0, 10, 0);
cameraAngels[6].transform.setRotation(30, 0, 0);

cameraAngels.push(new Camera());
cameraAngels[7].setCameraToProjectionMatrix(60, width/height, .1, 2000);
cameraAngels[7].transform.setTranslation(0, 5, -5);
cameraAngels[7].transform.setRotation(0, 0, 0);

cameraAngels.push(new Camera());


let scene1 = new Scene(cameraAngels[6]);

scene1.objects['Ground'] = new Cube(glw);
scene1.objects['Ground'].transform.setTranslation(0, -1.5, 0);
scene1.objects['Ground'].transform.setScaling(1000, .2, 1000);
scene1.objects['Ground'].geometry.setColors(.85, .75, .55, 1);

scene1.objects['Sky'] = new Cube(glw);
scene1.objects['Sky'].transform.setTranslation(0, 0, -200);
scene1.objects['Sky'].transform.setScaling(1000, 1000, .2);
scene1.objects['Sky'].geometry.setColors(.4, .8, .9, 1);

scene1.objects['Tetrahedron'] = new Tetrahedron(glw);
scene1.objects['Tetrahedron'].transform.setTranslation(-6, 0, -10);

scene1.objects['Cube'] = new Cube(glw);
scene1.objects['Cube'].transform.setTranslation(-3, 0, -10);

scene1.objects['Octahedron'] = new Octahedron(glw);
scene1.objects['Octahedron'].transform.setTranslation(0, 0, -10);

scene1.objects['Dodecahedron'] = new Dodecahedron(glw);
scene1.objects['Dodecahedron'].transform.setTranslation(3, 0, -10);

scene1.objects['Icosahedron'] = new Icosahedron(glw);
scene1.objects['Icosahedron'].transform.setTranslation(6, 0, -10);

let sphereLOD = 6
scene1.objects['Sphere'] = new Sphere(glw, sphereLOD);
scene1.objects['Sphere'].transform.setTranslation(-6, 5, -10);
scene1.objects['Sphere'].transform.setScaling(.2, .2, .2);
scene1.objects['Sphere1'] = new Sphere(glw, sphereLOD);
scene1.objects['Sphere1'].transform.setTranslation(-3, 5, -10);
scene1.objects['Sphere1'].transform.setScaling(.6, .6, .6);
scene1.objects['Sphere2'] = new Sphere(glw, sphereLOD);
scene1.objects['Sphere2'].transform.setTranslation(0, 5, -10);
scene1.objects['Sphere2'].transform.setScaling(.8, .8, .8);
scene1.objects['Sphere3'] = new Sphere(glw, sphereLOD);
scene1.objects['Sphere3'].transform.setTranslation(3, 5, -10);
scene1.objects['Sphere3'].transform.setScaling(1, 1, 1);
scene1.objects['Sphere4'] = new Sphere(glw, sphereLOD);
scene1.objects['Sphere4'].transform.setTranslation(6, 5, -10);
scene1.objects['Sphere4'].transform.setScaling(1.2, 1.2, 1.2);

let cameraPOS
scene1.objects['Show_Tetrahedron'] = new Tetrahedron(glw);
cameraPOS = cameraAngels[0].transform.getTranslation();
scene1.objects['Show_Tetrahedron'].transform.setTranslation(cameraPOS[0], cameraPOS[1] + 26, cameraPOS[2] - 25);

scene1.objects['Show_Cube'] = new Cube(glw);
cameraPOS = cameraAngels[1].transform.getTranslation();
scene1.objects['Show_Cube'].transform.setTranslation(cameraPOS[0], cameraPOS[1] + 26, cameraPOS[2] - 25);

scene1.objects['Show_Octahedron'] = new Octahedron(glw);
cameraPOS = cameraAngels[2].transform.getTranslation();
scene1.objects['Show_Octahedron'].transform.setTranslation(cameraPOS[0], cameraPOS[1] + 26, cameraPOS[2] - 25);

scene1.objects['Show_Dodecahedron'] = new Dodecahedron(glw);
cameraPOS = cameraAngels[3].transform.getTranslation();
scene1.objects['Show_Dodecahedron'].transform.setTranslation(cameraPOS[0], cameraPOS[1] + 26, cameraPOS[2] - 25);

scene1.objects['Show_Icosahedron'] = new Icosahedron(glw);
cameraPOS = cameraAngels[4].transform.getTranslation();
scene1.objects['Show_Icosahedron'].transform.setTranslation(cameraPOS[0], cameraPOS[1] + 26, cameraPOS[2] - 25);

scene1.objects['Show_Sp'] = new Sphere(glw , sphereLOD);
cameraPOS = cameraAngels[5].transform.getTranslation();
scene1.objects['Show_Sp'].transform.setTranslation(cameraPOS[0], cameraPOS[1] + 26, cameraPOS[2] - 25);






let rotation = 0;
scene1.actions['Standard rotations'] = setInterval(() => {
    Object.entries(scene1.objects).forEach(([key, value]) => {
        if(key != 'Sky' && key != 'Ground') {
            value.transform.setRotation(30, rotation, rotation);
        }
    });
    rotation = (rotation + 3)%360;
}, 1000 /30);


let sphereHeight = 5;
let delta = .05;
scene1.actions['Sphere Dance'] = setInterval(() => {
    Object.entries(scene1.objects).forEach(([key, value]) => {
        if(key.includes('Sphere')) {

            sphereHeight += delta;
            let translation = value.transform.getTranslation()
            value.transform.setTranslation(translation[0], sphereHeight, translation[2]);

        }
    });
    delta *= (sphereHeight > 7 || sphereHeight < 5 ? -1 : 1);
}, 1000/30);


let body = document.getElementById('body') as HTMLElement;
body?.addEventListener('keydown', (evt: KeyboardEvent) => {
    
    if(evt.key == 'w') { scene1.ToggleWire(); }

    if(evt.key == '1') { scene1.camera = cameraAngels[0]; }
    if(evt.key == '2') { scene1.camera = cameraAngels[1]; }
    if(evt.key == '3') { scene1.camera = cameraAngels[2]; }
    if(evt.key == '4') { scene1.camera = cameraAngels[3]; }
    if(evt.key == '5') { scene1.camera = cameraAngels[4]; }
    if(evt.key == '6') { scene1.camera = cameraAngels[5]; }
    if(evt.key == '7') { scene1.camera = cameraAngels[6]; }
    if(evt.key == '8') { scene1.camera = cameraAngels[7]; }
    if(evt.key == '9') { scene1.camera = cameraAngels[8]; }
});