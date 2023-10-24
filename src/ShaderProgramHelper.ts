import { SHADER_LIB } from "./ShaderLibrary";
export class ShaderProgramHelper {

    private program: WebGLProgram | null;
    private context: WebGL2RenderingContext;

    constructor(context: WebGL2RenderingContext) {
        this.context = context
        this.program = context.createProgram();
    }

    /**
     * attachShaderFromShaderLib
     * Loads a shader from shader library.
     * @param {string} shaderSourceName - The name of the shader in the library.
     * @param {ShaderProgramHelper.shaderTypes} shadertype -  The type of shader the code is for.
     */
    public attachShaderFromShaderLib(shaderSourceName: string, shadertype: ShaderProgramHelper.shaderTypes) {
        if (!SHADER_LIB.has(shaderSourceName)) { throw `Cannot find shader: ${shaderSourceName} in shader library!`};
        this.attachShaderFromString(SHADER_LIB.get(shaderSourceName), shadertype);
    }


    /**
     * attachShaderFromString
     * Loads a shader from a string.
     * @param {string} shaderSourceStr - The string of shader source code.
     * @param {ShaderProgramHelper.shaderTypes} shadertype -  The type of shader the code is for.
     */
    public attachShaderFromString(shaderSourceStr: string, shadertype: ShaderProgramHelper.shaderTypes) {
        
        //Map our enums to OpenGL enums.
        let glShaderTypeID;
        switch (shadertype) {
            case ShaderProgramHelper.shaderTypes.VERTEX: {
                glShaderTypeID = this.context.VERTEX_SHADER;
                break;
            }
            case ShaderProgramHelper.shaderTypes.FRAGMENT: {
                glShaderTypeID = this.context.FRAGMENT_SHADER;
                break;
            }
            default: {
                throw `Cant implement shadertype: ${shadertype} in func attachShaderFromString!`
            }
        }

        //Make the shader and compile it
        let shaderObj = this.context.createShader(glShaderTypeID);
        this.context.shaderSource(shaderObj!, shaderSourceStr);
        this.context.compileShader(shaderObj!);
        if (!this.context.getShaderParameter(shaderObj!, this.context.COMPILE_STATUS)) {
            const info = this.context.getShaderInfoLog(shaderObj!);
            throw `Could not compile shader ${shadertype}. \n\n${info}`;
        }

        //Attach the shader to the program
        this.context.attachShader(this.program!, shaderObj!);
    }

    /**
     * useProgram
     * Links, compiles program. Then sets this program to be used for the context it was made with.
     */
    public useProgram() {
    

        this.context.useProgram(this.program);
    }

    public linkProgram() {
        this.context.linkProgram(this.program!);
        if (!this.context.getProgramParameter(this.program!, this.context.LINK_STATUS)) {
            const info = this.context.getProgramInfoLog(this.program!);
            throw `Could not compile WebGL program. \n\n${info}`;
        }
    }


    /**
     * getAttributeLocation
     * Get the location of an attribute in the program by its name.
     * This will compile link and set the program to be used!
     * @param {string} name - The text name attribute to find the location of
     * @returns {number}
     */
    public getAttributeLocation(name: string) {

        //TODO::Make it to where we don't have to link and select the program every 
        //time we want to look up and attribute!
        return this.context.getAttribLocation(this.program!, name);
    }

        /**
     * getAttributeLocation
     * Get the location of a uniform in the program by its name.
     * This will compile link and set the program to be used!
     * @param {string} name - The text name uniform to find the location of
     * @returns {number}
     */
        public getUniformLocation(name: string) {

            //TODO::Make it to where we don't have to link and select the program every 
            //time we want to look up and uniform!
            //this.useProgram();
            return this.context.getUniformLocation(this.program!, name);
        }
}

export namespace ShaderProgramHelper {
    export enum shaderTypes {
        VERTEX,
        FRAGMENT
    }
}