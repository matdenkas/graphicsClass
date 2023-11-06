let SHADER_LIB = new Map<string, string>([
    ["v_SafeSingleTri", `attribute vec3 vertex_position;\nattribute vec3 vertex_color;\nvarying vec3 vColor;\nvoid main() {\ngl_Position = vec4(vertex_position, 1.0);\nvColor = vertex_color;\n}\n`],
    ["f_SafeSingleTriWColor", `
    precision highp float;
    varying vec4 vColor;
    void main() {
        gl_FragColor = vColor;
    }
    `],
    ["v_O2W&color", `
        attribute vec3 vertex_position;
        
        uniform vec4 color;
        uniform mat4 objectToWorld;
        uniform mat4 worldToCamera;
        uniform mat4 cameraToProjection;

        varying vec4 vColor;

        void main() {
            vec4 vertex =  cameraToProjection * worldToCamera * objectToWorld * vec4(vertex_position, 1);
            gl_Position = vertex;
            vColor = color;
        }
    `],
    ["vGouraudShading", 
    `#version 300 es
       
        in vec3 vertex_position;
        in vec3 vertex_normal;
        
        uniform mat4 objectToWorld;
        uniform mat4 worldToCamera;
        uniform mat4 cameraToProjection;

        in vec3 cameraPos;

        uniform vec3 lightPos;

        out vec3 N;
        out vec3 L;
        out vec3 E;
        out vec3 H;
        
        void main() {
            vec4 worldPosition = objectToWorld * vec4(vertex_position, 1);

            N = normalize(transpose(inverse(mat3(objectToWorld))) * vertex_normal);
            L = normalize(lightPos - worldPosition.xyz);
            E = normalize(cameraPos -worldPosition.xyz);
            H = normalize(L+E);
            
            gl_Position = cameraToProjection * worldToCamera * worldPosition;
        }
    `],
    ["fGouraudShading", 
        `#version 300 es
        precision highp float;       
        in vec3 N;
        in vec3 L;
        in vec3 E;
        in vec3 H;

        uniform vec3 lightColor;

        uniform vec3 ambientLight;
        uniform vec3 matDiffuse;
        uniform vec3 matSpecular;
        uniform float shininess;

        out vec4 frag_color;

        void main() {

            float kd = max(dot(L,N), 0.0);
            float ks = pow(max(dot(N,H), 0.0), shininess);

            if (dot(L,N) < 0.0) ks = 0.0; 
            frag_color = vec4(matDiffuse * ambientLight + kd * matDiffuse *  lightColor + ks * matSpecular * lightColor, 1);;
        }
    `],
]);

export { SHADER_LIB }



