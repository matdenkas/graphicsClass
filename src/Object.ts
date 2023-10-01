import { Transform } from "./Transform"
import { Geometry } from "./Geometry";
import { GL_Wrapper } from "./GLWrapper";
import { ShaderProgramHelper } from "./ShaderProgramHelper";


export abstract class Object {
    protected GLW: GL_Wrapper;

    public transform: Transform;
    public geometry: Geometry;
    protected programWrapper: ShaderProgramHelper;

    protected progLoaded: boolean;

    constructor(glw: GL_Wrapper) {
        this.transform = new Transform();
        this.geometry = new Geometry();

        this.GLW = glw;
        this.programWrapper = glw.makeSeededProgramWrapper();
        this.progLoaded = false;

    }

    public draw(context: GL_Wrapper) {

        if(!this.progLoaded) {
            console.error("Object received draw call with no program loaded! Aborting.");
            return;
        }

        var verticesBuffer = this.GLW.buildAndPushArrayBuffer(this.geometry.vertexes);
        var colorBuffer = this.GLW.buildAndPushArrayBuffer(this.geometry.colors);
        var indicesBuffer = this.GLW.buildAndPushElementArrayBuffer(this.geometry.indexes);

        this.GLW.bindAttributeNameToBuffer(verticesBuffer!, "vertex_position", 3, false, 0, 0);
        this.GLW.bindAttributeNameToBuffer(colorBuffer!, "vertex_color", 3, false, 0, 0);


        this.GLW.bindMatrixUniform(this.transform.computeTransformMatrix(), 4, `objectToWorld`);
        this.GLW.draw(indicesBuffer!, this.geometry.indexes.length);
    }
}