import { Transform } from "./Transform"
import { Geometry } from "./Geometry";
import { GL_Wrapper } from "./GLWrapper";
import { ShaderProgramHelper } from "./ShaderProgramHelper";
import { Camera } from "./Camera"



export abstract class Object {
    protected GLW: GL_Wrapper;

    public transform: Transform;
    public geometry: Geometry;
    public programShader: ShaderProgramHelper;

    private verticesBuffer: WebGLBuffer;
    private colorBuffer: WebGLBuffer;
    private indicesBuffer: WebGLBuffer;

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
    public draw(camera: Camera, isWire = false) {
        
        if (this.geometry.bufferNeeded) {
            this.buffer();
            this.geometry.bufferNeeded = false;
        }

        this.GLW.attachProgramWrapper(this.programShader);

        this.GLW.bindAttributeNameToBuffer(this.verticesBuffer!, "vertex_position", 3, false, 0, 0);

        this.GLW.bindMatrixUniform(this.transform.computeTransformMatrix(), 4, `objectToWorld`);
        this.GLW.bindMatrixUniform(camera.getWorldToCameraMatrix(), 4, `worldToCamera`);
        this.GLW.bindMatrixUniform(camera.getCameraToProjectionMatrix(), 4, `cameraToProjection`);
        this.GLW.bindVectorUniform(this.geometry.getColors(), 'color');
        this.GLW.draw(this.indicesBuffer!, this.geometry.getIndexes().length, isWire ? GL_Wrapper.drawModes.LINES : GL_Wrapper.drawModes.TRIANGLES);
    }

    private buffer() {
        this.GLW.deleteBuffer(this.verticesBuffer);
        this.GLW.deleteBuffer(this.colorBuffer);
        this.GLW.deleteBuffer(this.indicesBuffer);

        this.verticesBuffer = this.GLW.buildAndPushArrayBuffer(this.geometry.getVertexes());
        this.indicesBuffer = this.GLW.buildAndPushElementArrayBuffer(this.geometry.getIndexes());
    }
}