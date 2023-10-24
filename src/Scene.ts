import { Object as GLObject } from "./object";
import { Camera } from "./Camera";



export class Scene {

    public objects: { [id: string] : GLObject } = {};
    public camera: Camera;
    public actions: { [id: string] : NodeJS.Timeout | number } = {};
    private isWire: boolean;

    private drawInterval: NodeJS.Timeout = setInterval(() => {
        let stamp = Date.now();
        Object.entries(this.objects).forEach(([key, val]) => { val.draw(this.camera, this.isWire); });

        console.log(`Frame took: ${(Date.now() - stamp) / 1000}`)
        
    }, 1000 / 30)

    constructor(camera: Camera) {
        this.camera = camera;
        this.isWire = false;
    }

    ToggleWire() { this.isWire = !this.isWire; }
}