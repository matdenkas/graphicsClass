import { Transform } from "./Transform"
import { Geometry } from "./Geometry";
import { GL_Wrapper } from "./GLWrapper";
import { ShaderProgramHelper } from "./ShaderProgramHelper";



export abstract class Object {
    protected GLW: GL_Wrapper;

    public transform: Transform;
    public geometry: Geometry;
    public programShader: ShaderProgramHelper;

    protected drawMode: GL_Wrapper.drawModes;
    constructor(glw: GL_Wrapper) {
        this.transform = new Transform();
        this.geometry = new Geometry();
        this.programShader = glw.makeSeededProgramWrapper();
        this.GLW = glw;
    }

    public draw() {
        var verticesBuffer = this.GLW.buildAndPushArrayBuffer(this.geometry.vertexes);
        var colorBuffer = this.GLW.buildAndPushArrayBuffer(this.geometry.colors);
        var indicesBuffer = this.GLW.buildAndPushElementArrayBuffer(this.geometry.indexes);

        this.GLW.attachProgramWrapper(this.programShader);

        this.GLW.bindAttributeNameToBuffer(verticesBuffer!, "vertex_position", 3, false, 0, 0);
        this.GLW.bindAttributeNameToBuffer(colorBuffer!, "vertex_color", 3, false, 0, 0);


        this.GLW.bindMatrixUniform(this.transform.computeTransformMatrix(), 4, `objectToWorld`);
        this.GLW.draw(indicesBuffer!, this.geometry.indexes.length, this.drawMode);
    }
}