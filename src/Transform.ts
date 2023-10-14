


export class Transform {

    private static r2d: number = Math.PI/180;

    private TranslationMatrix: number[][];
    private ScalingMatrix:     number[][];
    private XRotationMatrix:   number[][];
    private YRotationMatrix:   number[][];
    private ZRotationMatrix:   number[][];
    private rotations: number[];

    constructor(){

        this.TranslationMatrix = Transform.getIdentity();
        this.ScalingMatrix     = Transform.getIdentity();
        this.XRotationMatrix   = Transform.getIdentity();
        this.YRotationMatrix   = Transform.getIdentity();
        this.ZRotationMatrix   = Transform.getIdentity();
        this.rotations = [0, 0, 0];
    }

    private static getIdentity() {
        return [[1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1],];
    }

    /**
     * setTranslation
     * Loads this transform with a translation int the x, y, and z, direction
     * @param {number} x - The amount of units to translate in the x direction
     * @param {number} y - The amount of units to translate in the y direction
     * @param {number} z - The amount of units to translate in the z direction
     */
    public setTranslation(x: number, y: number, z: number) {
        let translation = Transform.getIdentity();
        translation[0][3] = x;
        translation[1][3] = y;
        translation[2][3] = z;
        this.TranslationMatrix = translation;
    }

    /**
     * getTranslation
     * Gets the currently set translation int the x, y, and z, direction
     * @returns {number[]} - The loaded translations [x, y, z]
     */
    public getTranslation() {
        return [this.TranslationMatrix[0][3], this.TranslationMatrix[1][3], this.TranslationMatrix[2][3]];
    }

    /**
     * setScaling
     * Loads this transform with a scaling in the x, y, and z, direction
     * @param {number} x - The amount of to scale in the x direction
     * @param {number} y - The amount of to scale in the y direction
     * @param {number} z - The amount of to scale in the z direction
     */
    public setScaling(x: number, y: number, z: number) {
        let scaling = Transform.getIdentity();
        scaling[0][0] = x;
        scaling[1][1] = y;
        scaling[2][2] = z;
        this.ScalingMatrix = scaling;
    }

    /**
     * getScaling
     * Gets the currently set scaling in the x, y, and z, direction
     * @returns {number[]} - The loaded scaling [x, y, z]
     */
    public getScaling() {
        return [this.ScalingMatrix[1][1], this.ScalingMatrix[2][2], this.ScalingMatrix[3][3]];
    }

    /**
     * setRotation
     * Loads this transform with a rotation in the x, y, and z, axis.
     * @NOTE - Units in degrees and rotations are always CCW
     * @param {number} x - The amount of DEGREES to rotate CCW in the x direction
     * @param {number} y - The amount of DEGREES to rotate CCW in the y direction
     * @param {number} z - The amount of DEGREES to rotate CCW in the z direction
     */
    public setRotation(x: number, y: number, z: number) {
        this.XRotationMatrix = this.createXRotationMatrix(x);
        this.YRotationMatrix = this.createYRotationMatrix(y)
        this.ZRotationMatrix = this.createZRotationMatrix(z);
        this.rotations = [x, y, z];
    }

    /**
     * getRotation
     * Gets the currently set rotation in the x, y, and z, axis
     * @returns {number[]} - The loaded rotation [x, y, z]
     */
    public getRotation(){
        return this.rotations
    }

    /**
     * computeTransformMatrix
     * Fully computes the full transform uniform
     * @returns {number[][]} - The matrix in column major order
     * @source - https://stackoverflow.com/questions/27205018/multiply-2-matrices-in-javascript
     */
    public computeTransformMatrix() {
        let matrix
        matrix = Transform.multiply4x4Matrixes(this.TranslationMatrix, this.XRotationMatrix); //T_RX
        matrix = Transform.multiply4x4Matrixes(matrix, this.YRotationMatrix); //T_RX_RY
        matrix = Transform.multiply4x4Matrixes(matrix, this.ZRotationMatrix); //T_RX_RY_RZ
        matrix = Transform.multiply4x4Matrixes(matrix, this.ScalingMatrix);   //T_RX_RY_RZ_S

        let transform = new Float32Array(16);
        for(let r = 0; r < 4; r++) {
            for(let c = 0; c < 4; c++) {
                transform[r + 4 * c] = matrix[r][c];
            }
        }
        return transform
    }

    /**
     * multiply4x4Matrixes
     * Multiplies two 4x4 matrixes
     * @param {number[][]}
     * @param {number[][]}
     * @returns {number[][]} - The matrix in column major order
     * @source - https://stackoverflow.com/questions/27205018/multiply-2-matrices-in-javascript
     */
    private static multiply4x4Matrixes(matrixA: number[][], matrixB: number[][]) {
        let transformMatrix = this.getIdentity();
        for(let r = 0; r < 4; r++) {
            for(let c = 0; c < 4; c++) {
                transformMatrix[r][c] = 0;
                for(let i = 0; i < 4; i++) {
                    transformMatrix[r][c] += matrixA[r][i] * matrixB[i][c]
                }
            }
        }
        //console.log (transformMatrix);
        return transformMatrix;
    }

    /**
     * createXRotationMatrix
     * Creates a rotation matrix for the x axis given degrees to rotate CCW
     * @param {number} degrees - The degrees to rotate
     * @returns {number[][]} - The rotation matrix in column major order
     */
    private createXRotationMatrix(degrees: number) {
        let radians = degrees * (Transform.r2d);
        let radCos = Math.cos(radians);
        let radSin = Math.sin(radians);
    
        /* Rotation matrix, its returned as one line as it has to be in column major order >:(
            1,      0,     0, 0
            0,  cos γ, sin γ, 0
            0  -sin γ  cos γ, 0
            0       0      0, 1
        */
        return [[1,     0,      0,   0], 
                [0, radCos,  radSin, 0], 
                [0, -radSin, radCos, 0], 
                [0,      0,      0,  1]];
    }

    /**
     * createYRotationMatrix
     * Creates a rotation matrix for the y axis given degrees to rotate CCW
     * @param {number} degrees - The degrees to rotate
     * @returns {number[][]} - The rotation matrix in column major order
     */
    private createYRotationMatrix(degrees: number) {
        let radians = degrees * (Transform.r2d);
        let radCos = Math.cos(radians);
        let radSin = Math.sin(radians);
    
        /* Rotation matrix, its returned as one line as it has to be in column major order >:(
            cos γ, -sin γ, 0, 0
            sin γ,  cos γ, 0, 0
            0       0      1, 0
            0       0      0, 1
        */
        return [[ radCos, 0, radSin, 0], 
                [0,       1,      0, 0], 
                [-radSin, 0, radCos, 0],
                [0,       0,      0, 1]];
    }


    /**
     * createZRotationMatrix
     * Creates a rotation matrix for the z axis given degrees to rotate CCW
     * @param {number} degrees - The degrees to rotate
     * @returns {number[][]} - The rotation matrix in column major order
     */
    private createZRotationMatrix(degrees: number) {
        let radians = degrees * (Transform.r2d);
        let radCos = Math.cos(radians);
        let radSin = Math.sin(radians);

        /* Rotation matrix, its returned as one line as it has to be in column major order >:(
            cos γ, -sin γ, 0, 0
            sin γ,  cos γ, 0, 0
            0       0      1, 0
            0       0      0, 1
        */ 
        return [[ radCos, radSin, 0, 0], 
                [-radSin, radCos, 0, 0], 
                [0,       0,      1, 0],
                [0,       0,      0, 1]];
    }

}
