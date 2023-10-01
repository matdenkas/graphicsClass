import { GL_Wrapper } from "./GLWrapper";
import { Object } from "./object";
import { ShaderProgramHelper } from "./ShaderProgramHelper";


export class Plane extends Object {
    

    constructor(glw: GL_Wrapper) {
        super(glw);

        this.geometry.indexes = new Uint16Array([0, 1, 2, 0, 2, 3, 0])
        this.geometry.vertexes = new Float32Array([
            -.5,  .5, 0,
            -.5, -.5, 0,
             .5, -.5, 0,
             .5,  .5, 0,
        ]);
        this.geometry.colors = this.geometry.vertexes.slice();

        this.programWrapper.attachShaderFromShaderLib(`v_O2W&color`, ShaderProgramHelper.shaderTypes.VERTEX);
        this.programWrapper.attachShaderFromShaderLib(`f_SafeSingleTriWColor`, ShaderProgramHelper.shaderTypes.FRAGMENT);
        this.GLW.attachProgramWrapper(this.programWrapper);
    }
}