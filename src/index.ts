import { Camera } from "./Camera";
import { GL_Wrapper } from "./GLWrapper";
import { Scene } from "./Scene";
import { Plane, Cube, WireCube, Tetrahedron, Octahedron, Dodecahedron, Icosahedron, Sphere } from "./Primitives"
import { Light } from "./Light"
import { MAT_LIB } from "./Materials";

const width = 800;
const height = 800;
const canvas = document.getElementById('screen') as HTMLCanvasElement;
canvas.width = width;
canvas.height = height;

var glw = new GL_Wrapper(canvas);






const cameraAngels: Camera[] = []

cameraAngels.push(new Camera());
cameraAngels[0].setCameraToProjectionMatrix(60, width/height, .1, 2000);
cameraAngels[0].transform.setTranslation(0, 10, 0);
cameraAngels[0].transform.setRotation(30, 0, 0);

cameraAngels.push(new Camera());
cameraAngels[1].setCameraToProjectionMatrix(60, width/height, .1, 2000);
cameraAngels[1].transform.setTranslation(0, 5, -5);
cameraAngels[1].transform.setRotation(0, 0, 0);

cameraAngels.push(new Camera());


let scene1 = new Scene(cameraAngels[0], new Light, new Light, new Light);
scene1.light1.transform.setTranslation(0, 5, -5.5);
scene1.light2.transform.setTranslation(0, 0, -5.5);
scene1.light3.transform.setTranslation(0, 5, 0);
let sphereLOD = 6;
scene1.objects['CameraLoc1'] = new Sphere(glw, sphereLOD);
scene1.objects['CameraLoc1'].transform.setTranslation(0, 5, -5.5);
scene1.objects['CameraLoc1'].transform.setScaling(.2, .2, .2)

scene1.objects['CameraLoc2'] = new Sphere(glw, sphereLOD);
scene1.objects['CameraLoc2'].transform.setTranslation(0, 5, -5.5);
scene1.objects['CameraLoc2'].transform.setScaling(.2, .2, .2)

scene1.objects['CameraLoc3'] = new Sphere(glw, sphereLOD);
scene1.objects['CameraLoc3'].transform.setTranslation(0, 5, -5.5);
scene1.objects['CameraLoc3'].transform.setScaling(.2, .2, .2)

// scene1.objects['Sphere'] = new Sphere(glw, sphereLOD);
// scene1.objects['Sphere'].transform.setTranslation(0, 6, -7);
// scene1.objects['Sphere'].transform.setScaling(.2, .2, .2);
const keys = ['Rubber', 'Silver', 'Ruby', 'Bronze'];
let iX =-3.5;
let iY =2.5;
let iZ =-7;
let sideLength = 7;
for (let x = 0; x < sideLength; x++) {
    for (let y = 0; y < sideLength; y++) {
        for (let z = 0; z < sideLength; z++) {

            let sphereName = `Sphere${x}${y}${z}`;
            scene1.objects[sphereName] = new Sphere(glw, sphereLOD);
            scene1.objects[sphereName].transform.setTranslation(x + iX, y + iY, z +iZ);
            scene1.objects[sphereName].transform.setScaling(.2, .2, .2);
            scene1.objects[sphereName].material = MAT_LIB.get(keys[Math.floor(Math.random() * keys.length)]);
            // console.log(scene1.objects[sphereName].material)
        }
    
    }
    
}


let allowRotation = false;
let rotation = 0;
scene1.actions['Standard rotations'] = setInterval(() => {
    Object.entries(scene1.objects).forEach(([key, value]) => {
        if(key != 'Sky' && key != 'Ground') {
            if(allowRotation) {
                value.transform.setRotation(rotation, rotation, 0);
            }
            
        }
    });
    rotation = (rotation + 3)%360;
}, 1000 /30);


let sphereHeight = 5;
let delta = .05;
scene1.actions['Sphere Dance'] = setInterval(() => {
    Object.entries(scene1.objects).forEach(([key, value]) => {
        if(key.includes('afwafa')) {

            sphereHeight += delta;
            let translation = value.transform.getTranslation()
            value.transform.setTranslation(translation[0], sphereHeight, translation[2]);
            delta *= (sphereHeight > 7 || sphereHeight < 5 ? -1 : 1);

        }
        
    });
    
}, 1000/30);


let moveLight = false
let lightHeight1 = 0;
let lightDelta1 = .1;
scene1.actions['LightMove1'] = setInterval(() => {

    if(moveLight) {
        lightHeight1 += lightDelta1;
        let translation = scene1.light1.transform.getTranslation()
        scene1.light1.transform.setTranslation(lightHeight1, translation[1], translation[2]);
        scene1.objects['CameraLoc1'].transform.setTranslation(lightHeight1, translation[1], translation[2]);
        lightDelta1 *= (lightHeight1 > 4 || lightHeight1 < -4 ? -1 : 1);
        //console.log(translation);

    }

}, 1000/30);

let lightHeight2 = 0;
let lightDelta2 = .1;
scene1.actions['LightMove2'] = setInterval(() => {

    if(moveLight) {
        lightHeight2 += lightDelta2;
        let translation = scene1.light2.transform.getTranslation()
        scene1.light2.transform.setTranslation(translation[0], lightHeight2, translation[2]);
        scene1.objects['CameraLoc2'].transform.setTranslation(translation[0], lightHeight2, translation[2]);
        lightDelta2 *= (lightHeight2 > 4 || lightHeight2 < -4 ? -1 : 1);
        //console.log(translation);

    }

}, 1000/30);


let lightHeight3 = 0;
let lightDelta3 = .1;
scene1.actions['LightMove3'] = setInterval(() => {

    if(moveLight) {
        lightHeight3 += lightDelta3;
        let translation = scene1.light3.transform.getTranslation()
        scene1.light3.transform.setTranslation(translation[0], translation[1], lightHeight3);
        scene1.objects['CameraLoc3'].transform.setTranslation(translation[0], translation[1], lightHeight3);
        lightDelta3 *= (lightHeight3 > 4 || lightHeight3 < -4 ? -1 : 1);
        //console.log(translation);

    }

}, 1000/30);



let body = document.getElementById('body') as HTMLElement;
body?.addEventListener('keydown', (evt: KeyboardEvent) => {
    
    let delta = .2;
    if(evt.key == 's') { let c = scene1.camera.transform.getTranslation(); scene1.camera.transform.setTranslation(c[0], c[1], c[2] += delta); }
    if(evt.key == 'w') { let c = scene1.camera.transform.getTranslation(); scene1.camera.transform.setTranslation(c[0], c[1], c[2] -= delta); }
    if(evt.key == 'd') { let c = scene1.camera.transform.getTranslation(); scene1.camera.transform.setTranslation(c[0] += delta, c[1], c[2]); }
    if(evt.key == 'a') { let c = scene1.camera.transform.getTranslation(); scene1.camera.transform.setTranslation(c[0] -= delta, c[1], c[2]); }
    if(evt.key == ' ') { let c = scene1.camera.transform.getTranslation(); scene1.camera.transform.setTranslation(c[0], c[1] += delta, c[2]); }
    if(evt.key == 'c') { let c = scene1.camera.transform.getTranslation(); scene1.camera.transform.setTranslation(c[0], c[1] -= delta, c[2]); }
    if(evt.key == 'l') { moveLight = !moveLight; }
    if(evt.key == 'r') { allowRotation = !allowRotation; }

    if(evt.key == '1') { scene1.camera = cameraAngels[0]; }
    if(evt.key == '2') { scene1.camera = cameraAngels[1]; }
});