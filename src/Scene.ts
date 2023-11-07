import { Object as GLObject } from "./object";
import { Camera } from "./Camera";
import { Light } from "./Light"



export class Scene {

    public objects: { [id: string] : GLObject } = {};
    public camera: Camera;
    public actions: { [id: string] : NodeJS.Timeout | number } = {};
    public light1: Light;
    public light2: Light;
    public light3: Light;
    private isWire: boolean;

    private drawInterval: NodeJS.Timeout = setInterval(() => {
        Object.entries(this.objects).forEach(([key, val]) => { val.draw(this.camera, this.light1, this.light2, this.light3, this.isWire); });
        
    }, 1000 / 60)

    constructor(camera: Camera, light1: Light, light2: Light, light3: Light) {
        this.camera = camera;
        this.isWire = false;
        this.light1 = light1;
        this.light2 = light2;
        this.light3 = light3;
    }

    ToggleWire() { this.isWire = !this.isWire; }
}