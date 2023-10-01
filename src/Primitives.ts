import { GL_Wrapper } from "./GLWrapper";
import { Object } from "./object";
import { ShaderProgramHelper } from "./ShaderProgramHelper";


export class Plane extends Object {
    

    constructor(glw: GL_Wrapper) {
        super(glw);
        this.drawMode = GL_Wrapper.drawModes.TRIANGLES;

        this.geometry.indexes = new Uint16Array([0, 1, 2, 0, 2, 3, 0])
        this.geometry.vertexes = new Float32Array([
            -.5,  .5, 0,
            -.5, -.5, 0,
             .5, -.5, 0,
             .5,  .5, 0,
        ]);
        this.geometry.colors = this.geometry.vertexes.slice();

        this.programShader.attachShaderFromShaderLib(`v_O2W&color`, ShaderProgramHelper.shaderTypes.VERTEX);
        this.programShader.attachShaderFromShaderLib(`f_SafeSingleTriWColor`, ShaderProgramHelper.shaderTypes.FRAGMENT);
    }
}


//https://textbooks.cs.ksu.edu/cis580/13-basic-3d-rendering/04-rendering-a-cube/
export class Cube extends Object {
    constructor(glw: GL_Wrapper) {
        super(glw);
        this.drawMode = GL_Wrapper.drawModes.TRIANGLES;

        this.geometry.indexes = new Uint16Array([
            0, 1, 2, // Side 0
            2, 1, 3,
            4, 0, 6, // Side 1
            6, 0, 2,
            7, 5, 6, // Side 2
            6, 5, 4,
            3, 1, 7, // Side 3 
            7, 1, 5,
            4, 5, 0, // Side 4 
            0, 5, 1,
            3, 7, 2, // Side 5 
            2, 7, 6
        ]);
        this.geometry.vertexes = new Float32Array([
             -.5,  .5, -.5,
              .5,  .5, -.5,
             -.5, -.5, -.5,
              .5, -.5, -.5,
             -.5,  .5,  .5,
              .5,  .5,  .5,
             -.5, -.5,  .5,
              .5, -.5,  .5,
        ]);
        this.geometry.colors = this.geometry.vertexes.slice();


        this.programShader.attachShaderFromShaderLib(`v_O2W&color`, ShaderProgramHelper.shaderTypes.VERTEX);
        this.programShader.attachShaderFromShaderLib(`f_SafeSingleTriWColor`, ShaderProgramHelper.shaderTypes.FRAGMENT);
    }
}

export class WireCube extends Object {
    constructor(glw: GL_Wrapper) {
        super(glw);
        this.drawMode = GL_Wrapper.drawModes.LINES;

        this.geometry.indexes = new Uint16Array([
            0, 1, 2, 0, // Side 0
            2, 1, 3, 2,
            4, 0, 6, 4,// Side 1
            6, 0, 2, 6,
            7, 5, 6, 7,// Side 2
            6, 5, 4, 6,
            3, 1, 7, 3,// Side 3 
            7, 1, 5, 7,
            4, 5, 0, 4,// Side 4 
            0, 5, 1, 0,
            3, 7, 2, 3,// Side 5 
            2, 7, 6, 2,
        ]);
        this.geometry.vertexes = new Float32Array([
             -.5,  .5, -.5,
              .5,  .5, -.5,
             -.5, -.5, -.5,
              .5, -.5, -.5,
             -.5,  .5,  .5,
              .5,  .5,  .5,
             -.5, -.5,  .5,
              .5, -.5,  .5,
        ]);
        this.geometry.colors = this.geometry.vertexes.slice();


        this.programShader.attachShaderFromShaderLib(`v_O2W&color`, ShaderProgramHelper.shaderTypes.VERTEX);
        this.programShader.attachShaderFromShaderLib(`f_SafeSingleTriWColor`, ShaderProgramHelper.shaderTypes.FRAGMENT);
    }
}

