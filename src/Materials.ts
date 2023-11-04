import { GL_Wrapper } from "./GLWrapper";

export class Material {
    
    private ambientLight: number[];
    private ambientDiffuse: number[];
    private matSpecular: number[];
    private shininess: number;

    constructor(ambientLight: number[], ambientDiffuse: number[], materialSpecular: number[], shininess: number) {
        this.ambientLight = [...ambientLight];
        this.ambientDiffuse = [...ambientDiffuse];
        this.matSpecular = [...materialSpecular];
        this.shininess = shininess;
    }

    public assignMatUniform(GLW: GL_Wrapper) {
        GLW.bindVectorUniform(this.ambientLight, 'ambientLight');
        GLW.bindVectorUniform(this.ambientDiffuse, 'matDiffuse');
        GLW.bindVectorUniform(this.matSpecular, 'matSpecular');
        GLW.bindFloatUniform(this.shininess, 'shininess');
    }
}


let MAT_LIB = new Map<string, Material>([
    ['Rubber',  new Material([0.02, 0.02, 0.02], [0.01, 0.01, 0.01], [0.4, 0.4, 0.4], 10)],
    ['Silver',  new Material([0.19225, 0.19225, 0.19225], [0.50754, 0.50754, 0.50754], [0.508273, 0.508273, 0.508273], 51.2)],
    ['Ruby',    new Material([0.1745, 0.01175, 0.01175], [0.61424, 0.04136, 0.04136], [0.727811, 0.626959, 0.626959], 76.8)],
    ['Bronze',  new Material([0.25, 0.148, 0.06475], [0.4, 0.2368, 0.1036], [0.774597, 0.458561, 0.200621], 76.8)],
])

export { MAT_LIB }


// let MAT_LIB = new Map<string, Material>([
//     ['Rubber',  new Material([0.02, 0.02, 0.02, 1], [0.01, 0.01, 0.01, 1], [0.4, 0.4, 0.4, 1], 10)],
//     ['Silver',  new Material([0.19225, 0.19225, 0.19225, 1], [0.50754, 0.50754, 0.50754, 1], [0.508273, 0.508273, 0.508273, 1], 51.2)],
//     ['Ruby',    new Material([0.1745, 0.01175, 0.01175, 0.55], [0.61424, 0.04136, 0.04136, 0.55], [0.727811, 0.626959, 0.626959, 0.55], 76.8)],
//     ['Bronze',  new Material([0.25, 0.148, 0.06475, 1], [0.4, 0.2368, 0.1036, 1], [0.774597, 0.458561, 0.200621, 1], 76.8)],
// ])