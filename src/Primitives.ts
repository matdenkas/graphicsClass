import { GL_Wrapper } from "./GLWrapper";
import { Object } from "./object";
import { ShaderProgramHelper } from "./ShaderProgramHelper";


/**
 * A simple plane. Two triangles. Centered around the origin in its object space.
 */
export class Plane extends Object {
    
    constructor(glw: GL_Wrapper) {
        super(glw);
        this.drawMode = GL_Wrapper.drawModes.TRIANGLES;

        this.geometry.setIndexes(new Uint16Array([0, 1, 2, 0, 2, 3, 0]));
        this.geometry.setVertexes(new Float32Array([
            -.5,  .5, 0,
            -.5, -.5, 0,
             .5, -.5, 0,
             .5,  .5, 0,
        ]));
        this.geometry.setColors(this.geometry.getVertexes().slice());

        this.programShader.attachShaderFromShaderLib(`v_O2W&color`, ShaderProgramHelper.shaderTypes.VERTEX);
        this.programShader.attachShaderFromShaderLib(`f_SafeSingleTriWColor`, ShaderProgramHelper.shaderTypes.FRAGMENT);
    }
}

/**
 * A tetrahedron (d4) is a four faced Plutonic Solid.
 * @source - https://en.wikipedia.org/wiki/Tetrahedron#Regular_tetrahedron
 * @source - https://mathworld.wolfram.com/PlatonicSolid.html
 */
export class Tetrahedron extends Object {
    constructor(glw: GL_Wrapper) {
        super(glw);
        this.drawMode = GL_Wrapper.drawModes.TRIANGLES;

        this.geometry.setIndexes(new Uint16Array([
            //face 1
            2, 3, 0,
            2, 0, 1,
            2, 1, 3,
            3, 0, 1,
        ]));
        this.geometry.setVertexes(new Float32Array([
            //0
            Math.sqrt((8/9)), 0, -(1/3),
            //1
            -Math.sqrt((2/9)), Math.sqrt((2/3)), -(1/3),
            //2
            -Math.sqrt((2/9)), -Math.sqrt((2/3)), -(1/3),
            //3
            0, 0, 1,
        ]));
        this.geometry.setColors(this.geometry.getVertexes().slice());

        this.programShader.attachShaderFromShaderLib(`v_O2W&color`, ShaderProgramHelper.shaderTypes.VERTEX);
        this.programShader.attachShaderFromShaderLib(`f_SafeSingleTriWColor`, ShaderProgramHelper.shaderTypes.FRAGMENT);
    }
}

/**
 * A cube containing 6 sides centered about the origin in its object space.
 * @source - https://textbooks.cs.ksu.edu/cis580/13-basic-3d-rendering/04-rendering-a-cube/ 
 */
export class Cube extends Object {
    constructor(glw: GL_Wrapper) {
        super(glw);
        this.drawMode = GL_Wrapper.drawModes.TRIANGLES;

        this.geometry.setIndexes(new Uint16Array([
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
        ]));
        this.geometry.setVertexes(new Float32Array([
             -.5,  .5, -.5,
              .5,  .5, -.5,
             -.5, -.5, -.5,
              .5, -.5, -.5,
             -.5,  .5,  .5,
              .5,  .5,  .5,
             -.5, -.5,  .5,
              .5, -.5,  .5,
        ]));
        this.geometry.setColors(this.geometry.getVertexes().slice());

        this.programShader.attachShaderFromShaderLib(`v_O2W&color`, ShaderProgramHelper.shaderTypes.VERTEX);
        this.programShader.attachShaderFromShaderLib(`f_SafeSingleTriWColor`, ShaderProgramHelper.shaderTypes.FRAGMENT);
    }
}

/**
 * A tetrahedron (d8) is a four faced Plutonic Solid.
 * @source - https://en.wikipedia.org/wiki/Octahedron
 * @source - https://mathworld.wolfram.com/PlatonicSolid.html
 */
export class Octahedron extends Object {
    constructor(glw: GL_Wrapper) {
        super(glw);
        this.drawMode = GL_Wrapper.drawModes.TRIANGLES;

        this.geometry.setIndexes(new Uint16Array([
            //Top
            1, 2, 0,
            1, 0, 3,
            1, 3, 5,
            1, 5, 2,

            //Bottom
            4, 0, 2,
            4, 3, 0,
            4, 5, 3,
            4, 2, 5,

        ]));
        this.geometry.setVertexes(new Float32Array([
            0, 0, 1, //0
            0, 1, 0, //1
            -1, 0, 0, //2
            1, 0, 0, //3
            0, -1, 0, //4
            0, 0, -1 //5
        ]));
        this.geometry.setColors(this.geometry.getVertexes().slice());

        this.programShader.attachShaderFromShaderLib(`v_O2W&color`, ShaderProgramHelper.shaderTypes.VERTEX);
        this.programShader.attachShaderFromShaderLib(`f_SafeSingleTriWColor`, ShaderProgramHelper.shaderTypes.FRAGMENT);
    }
}

/**
 * A tetrahedron (d12) is a four faced Plutonic Solid.
 * @source - https://people.sc.fsu.edu/~jburkardt/data/obj/dodecahedron.obj
 * @source - https://mathworld.wolfram.com/PlatonicSolid.html
 * 
 * OBJ Parsing regex
 * /.+\s* (-*\d+.*\d*)\s* (-*\d+.*\d*)\s* (-*\d+.*\d*)/
 */
export class Dodecahedron extends Object {
    constructor(glw: GL_Wrapper) {
        super(glw);
        this.drawMode = GL_Wrapper.drawModes.TRIANGLES;

        this.geometry.setIndexes(new Uint16Array([
            18, 2, 1, 
            11, 18, 1, 
            14, 11, 1, 
            7, 13, 1, 
            17, 7, 1, 
            2, 17, 1, 
            19, 4, 3, 
            8, 19, 3,
            15, 8, 3, 
            12, 16, 3, 
            0, 12, 3, 
            4, 0, 3, 
            6, 15, 3, 
            5, 6, 3, 
            16, 5, 3, 
            5, 14, 1, 
            6, 5, 1, 
            13, 6, 1,
            9, 17, 2, 
            10, 9, 2, 
            18, 10, 2, 
            10, 0, 4, 
            9, 10, 4, 
            19, 9, 4, 
            19, 8, 7, 
            9, 19, 7, 
            17, 9, 7, 
            8, 15, 6, 
            7, 8, 6, 
            13, 7, 6, 
            11, 14, 5, 
            12, 11, 5, 
            16, 12, 5, 
            12, 0, 10, 
            11, 12, 10, 
            18, 11, 10
        ]));
        this.geometry.setVertexes(new Float32Array([
            -0.57735 , -0.57735 , 0.57735,
            0.934172 , 0.356822 , 0,
            0.934172 , -0.356822 , 0,
            -0.934172 , 0.356822 , 0,
            -0.934172 , -0.356822 , 0,
            0 , 0.934172 , 0.356822,
            0 , 0.934172 , -0.356822,
            0.356822 , 0 , -0.934172,
            -0.356822 , 0 , -0.934172,
            0 , -0.934172 , -0.356822,
            0 , -0.934172 , 0.356822,
            0.356822 , 0 , 0.934172,
            -0.356822 , 0 , 0.934172,
            0.57735 , 0.57735 , -0.57735,
            0.57735 , 0.57735 , 0.57735,
            -0.57735 , 0.57735 , -0.57735,
            -0.57735 , 0.57735 , 0.57735,
            0.57735 , -0.57735 , -0.57735,
            0.57735 , -0.57735 , 0.57735,
            -0.57735 , -0.57735 , -0.57735,
        ]));
        this.geometry.setColors(this.geometry.getVertexes().slice());

        this.programShader.attachShaderFromShaderLib(`v_O2W&color`, ShaderProgramHelper.shaderTypes.VERTEX);
        this.programShader.attachShaderFromShaderLib(`f_SafeSingleTriWColor`, ShaderProgramHelper.shaderTypes.FRAGMENT);
    }
}

export class Icosahedron extends Object {
    constructor(glw: GL_Wrapper) {
        super(glw);
        this.drawMode = GL_Wrapper.drawModes.TRIANGLES;

        this.geometry.setIndexes(new Uint16Array([
            1, 2, 6, 
            1, 7, 2, 
            3, 4, 5, 
            4, 3, 8, 
            6, 5, 11, 
            5, 6, 10, 
            9, 10, 2, 
            10, 9, 3, 
            7, 8, 9, 
            8, 7, 0, 
            11, 0, 1, 
            0, 11, 4, 
            6, 2, 10, 
            1, 6, 11, 
            3, 5, 10, 
            5, 4, 11, 
            2, 7, 9, 
            7, 1, 0, 
            3, 9, 8, 
            4, 8, 0

        ]));
        this.geometry.setVertexes(new Float32Array([
            0 , -0.525731 , 0.850651,
            0.850651 , 0 , 0.525731,
            0.850651 , 0 , -0.525731,
            -0.850651 , 0 , -0.525731,
            -0.850651 , 0 , 0.525731,
            -0.525731 , 0.850651 , 0,
            0.525731 , 0.850651 , 0,
            0.525731 , -0.850651 , 0,
            -0.525731 , -0.850651 , 0,
            0 , -0.525731 , -0.850651,
            0 , 0.525731 , -0.850651,
            0 , 0.525731 , 0.850651,
        ]));
        this.geometry.setColors(this.geometry.getVertexes().slice());

        this.programShader.attachShaderFromShaderLib(`v_O2W&color`, ShaderProgramHelper.shaderTypes.VERTEX);
        this.programShader.attachShaderFromShaderLib(`f_SafeSingleTriWColor`, ShaderProgramHelper.shaderTypes.FRAGMENT);
    }
}

/**
 * The wireframe of a cube centered around the origin in object space.
 */
export class WireCube extends Object {
    constructor(glw: GL_Wrapper) {
        super(glw);
        this.drawMode = GL_Wrapper.drawModes.LINES;

        this.geometry.setIndexes(new Uint16Array([
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
        ]));
        this.geometry.setVertexes(new Float32Array([
             -.5,  .5, -.5,
              .5,  .5, -.5,
             -.5, -.5, -.5,
              .5, -.5, -.5,
             -.5,  .5,  .5,
              .5,  .5,  .5,
             -.5, -.5,  .5,
              .5, -.5,  .5,
        ]));
        this.geometry.setColors(this.geometry.getVertexes().slice());


        this.programShader.attachShaderFromShaderLib(`v_O2W&color`, ShaderProgramHelper.shaderTypes.VERTEX);
        this.programShader.attachShaderFromShaderLib(`f_SafeSingleTriWColor`, ShaderProgramHelper.shaderTypes.FRAGMENT);
    }
}

