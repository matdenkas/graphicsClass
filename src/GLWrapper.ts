import { ShaderProgramHelper } from "./ShaderProgramHelper";

export class GL_Wrapper {
    private canvas: HTMLCanvasElement;
    private context: WebGL2RenderingContext;

    private shaderProgramHelper: ShaderProgramHelper | null;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;  
        this.context = canvas.getContext('webgl2') as WebGL2RenderingContext
        this.shaderProgramHelper = null;
    }

    /**
     * makeSeededProgramWrapper
     * Returns a program wrapper seeded with the context for this GL_Wrapper, but with no shader data. A user should load their shader
     * code into the the program wrapper and then set then attach it too this class with attachProgramWrapper.
     * @returns {ShaderProgramHelper} - A program wrapper seeded with the context for this GL_Wrapper, but with no shader data.
     */
    public makeSeededProgramWrapper() {
        return new ShaderProgramHelper(this.context);
    }

    /**
     * attachProgramWrapper
     * sets a program wrapper to be actually used by this GLWrapper
     * @param {ShaderProgramHelper} programWrapper - A program wrapper seeded with the context for this GL_Wrapper and with shader data..
     */
    public attachProgramWrapper(programWrapper: ShaderProgramHelper) {
        this.shaderProgramHelper = programWrapper;
    }

    /**
     * buildAndPushArrayBuffer
     * Creates an Array Buffer and pushes it to the GPU
     * @param {BufferSource} data - The actual data to buffer over.
     * @returns {WebGLBuffer}
     */
    public buildAndPushArrayBuffer(data: BufferSource) {
        var buffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, buffer);
        this.context.bufferData(this.context.ARRAY_BUFFER, data, this.context.STATIC_DRAW);
        this.context.bindBuffer(this.context.ARRAY_BUFFER, null);
        return buffer;
    }

    /**
     * buildAndPushElementArrayBuffer
     * Creates an Element Array Buffer and pushes it to the GPU
     * @param {BufferSource} data - The actual data to buffer over.
     * @returns {WebGLBuffer}
     */
    public buildAndPushElementArrayBuffer(data: BufferSource) {
        var buffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, buffer);
        this.context.bufferData(this.context.ELEMENT_ARRAY_BUFFER, data, this.context.STATIC_DRAW);
        this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, null);
        return buffer;
    }


    /**
     * bindAttributeNameToBuffer
     * This binds a buffer to an attribute. It also loads this information about how to read the buffer into the attribute.
     * @param {WebGLBuffer} buffer - Reference to the buffer containing the attribute data.
     * @param {string} attributeName - The string name of the attribute you are binding
     * @param {number} amntPerVertex - The amount of values in this buffer to read for one instance of the attribute. floats or vectors?????
     * @param {boolean} normalize - Does the data need to be normalized.
     * @param {number} stride - The stride to jump per attribute??? is that not number??
     * @param {number} offset - The offset to jump from the beginning of the buffer
     */
    public bindAttributeNameToBuffer(buffer: WebGLBuffer, attributeName: string, amntPerVertex: number, normalize: boolean, stride: number, offset: number) {
        
        if (this.shaderProgramHelper == null) {
            throw `No shader program to try and attach attribute ${attributeName} to!`
        }

        this.context.bindBuffer(this.context.ARRAY_BUFFER, buffer);
        var loc = this.shaderProgramHelper.getAttributeLocation(attributeName);
        this.context.vertexAttribPointer(loc, amntPerVertex, this.context.FLOAT, normalize, stride, offset); 
        this.context.enableVertexAttribArray(loc);
        this.context.bindBuffer(this.context.ARRAY_BUFFER, null);
    }

    /**
     * This function binds a matrix to a uniform in the program.
     * @param matrix The matrix in column major order.
     * @param size The size of the matrix 1x1 -> 1, 4x4 -> 4.
     * @param uniformName The name of the uniform to bind this to.
     */
    public bindMatrixUniform(matrix: Float32Array, size: number, uniformName: string) {
        if (this.shaderProgramHelper == null) {
            throw `No shader program to try and attach uniform ${uniformName} to!`
        }

        let loc = this.shaderProgramHelper.getUniformLocation(uniformName);

        switch(size) {
            case 2: {
                this.context.uniformMatrix2fv(loc, false, matrix);
                break;
            }
            case 3: {
                this.context.uniformMatrix3fv(loc, false, matrix);
                break;
            }
            case 4: {
                this.context.uniformMatrix4fv(loc, false, matrix);
                break;
            }
            default: {
                throw `Matrix size of ${size} has no gl sibling!`;
                break;
            }
        }
    }

    public draw(indexBuffer: WebGLBuffer, indexLength: number) {
        this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, indexBuffer);
        this.context.clearColor(0, 0, 0, 1.0);
        this.context.enable(this.context.DEPTH_TEST);
        this.context.clear(this.context.COLOR_BUFFER_BIT);
        this.context.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawElements(this.context.TRIANGLES, indexLength, this.context.UNSIGNED_SHORT, 0);

    }

    public getError() {
        return this.context.getError();
    }
}