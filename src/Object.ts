import { Transform } from "./Transform"
import { Geometry } from "./Geometry";
import { GL_Wrapper } from "./GLWrapper";
import { ShaderProgramHelper } from "./ShaderProgramHelper";
import { Camera } from "./Camera"
import { Material } from "./Materials"
import { Light } from "./Light";



export abstract class Object {
    protected GLW: GL_Wrapper;

    public transform: Transform;
    public geometry: Geometry;
    public material: Material;
    public programShader: ShaderProgramHelper;

    private verticesBuffer: WebGLBuffer;
    private colorBuffer: WebGLBuffer;
    private indicesBuffer: WebGLBuffer;
    private normalBuffer: WebGLBuffer;

    protected drawMode: GL_Wrapper.drawModes;
    constructor(glw: GL_Wrapper) {
        this.transform = new Transform();
        this.geometry = new Geometry();
        this.programShader = glw.makeSeededProgramWrapper();
        this.GLW = glw;
    }

    /**
     * draw()
     * Draws the object to the loaded context.
     */
    public draw(camera: Camera, light: Light, isWire = false) {
        let stamp = Date.now();
        
        if (this.geometry.bufferNeeded) {
            this.buffer();
            this.geometry.bufferNeeded = false;
        }
        
        this.GLW.attachProgramWrapper(this.programShader);
        
        this.GLW.bindAttributeNameToBuffer(this.verticesBuffer!, "vertex_position", 3, false, 0, 0);
        this.GLW.bindAttributeNameToBuffer(this.normalBuffer!, "vertex_normal", 3, false, 0, 0);
        
        
        this.GLW.bindMatrixUniform(this.transform.computeTransformMatrix(), 4, `objectToWorld`);
        this.GLW.bindMatrixUniform(camera.getWorldToCameraMatrix(), 4, `worldToCamera`);
        this.GLW.bindMatrixUniform(camera.getCameraToProjectionMatrix(), 4, `cameraToProjection`);

        light.assignUniforms(this.GLW);
        
        this.material.assignMatUniform(this.GLW);

        this.GLW.draw(this.indicesBuffer!, this.geometry.getIndexes().length, isWire ? GL_Wrapper.drawModes.LINES : GL_Wrapper.drawModes.TRIANGLES);
        
        console.log(`Draw obj: ${(Date.now() - stamp) / 1000}`)
    }

    private buffer() {
        console.log('Buffer needed')
        this.GLW.deleteBuffer(this.verticesBuffer);
        this.GLW.deleteBuffer(this.colorBuffer);
        this.GLW.deleteBuffer(this.indicesBuffer);
        this.GLW.deleteBuffer(this.normalBuffer);

        this.verticesBuffer = this.GLW.buildAndPushArrayBuffer(this.geometry.getVertexes());
        this.indicesBuffer = this.GLW.buildAndPushElementArrayBuffer(this.geometry.getIndexes());
        this.normalBuffer = this.GLW.buildAndPushArrayBuffer(this.geometry.getNormals());
    }
}