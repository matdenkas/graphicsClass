import { Object as GLObject } from "./object";
import { Camera } from "./Camera";
import { Light } from "./Light"



export class Scene {

    public objects: { [id: string] : GLObject } = {};
    public camera: Camera;
    public actions: { [id: string] : NodeJS.Timeout | number } = {};
    public light: Light;
    private isWire: boolean;

    private drawInterval: NodeJS.Timeout = setInterval(() => {
        Object.entries(this.objects).forEach(([key, val]) => { val.draw(this.camera, this.light, this.isWire); });
        
    }, 1000 / 60)

    constructor(camera: Camera, light: Light) {
        this.camera = camera;
        this.isWire = false;
        this.light = light;
    }

    ToggleWire() { this.isWire = !this.isWire; }
}