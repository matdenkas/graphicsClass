import { Transform } from "./Transform"
import { GL_Wrapper } from "./GLWrapper";

export class Light {
    public transform: Transform;
    public color: number[];

    constructor() {
        this.transform = new Transform();
        this.color = [1, 1, 1];
    }

    public assignUniforms(GLW: GL_Wrapper, id: string) {
        GLW.bindVectorUniform(this.transform.getTranslation(), `lightPos${id}`);
        GLW.bindVectorUniform(this.color, `lightColor${id}`);
    }
}