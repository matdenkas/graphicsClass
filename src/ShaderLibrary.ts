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
    ["vGouraudShading", `#version 300 es
       
        in vec3 vertex_position;
        in vec3 vertex_normal;
        
        uniform mat4 objectToWorld;
        uniform mat4 worldToCamera;
        uniform mat4 cameraToProjection;

        uniform vec3 lightPos;
        uniform vec3 lightColor;

        uniform vec3 ambientLight;
        uniform vec3 matDiffuse;
        uniform vec3 matSpecular;
        uniform float shininess;

        out vec4 vColor;

        
        void main() {
            vec4 worldPosition = objectToWorld * vec4(vertex_position, 1);

            vec3 N = normalize(transpose(inverse(mat3(objectToWorld))) * vertex_normal);
            vec3 L = normalize(lightPos - worldPosition.xyz);
            vec3 E = normalize(-worldPosition.xyz);
            vec3 H = normalize(L+E);
            
            float kd = max(dot(L,N), 0.0);
            float ks = pow(max(dot(N,H), 0.0), shininess);


            if (dot(L,N) < 0.0) ks = 0.0; 
            
            gl_Position = cameraToProjection * worldToCamera * worldPosition;
            vColor = vec4(matDiffuse * ambientLight + kd * matDiffuse *  lightColor + ks * matSpecular * lightColor, 1);
        }
    `],
    ["fGouraudShading", 
        `#version 300 es
        
        precision highp float;
        in vec4 vColor;
        precision highp float;
        out vec4 frag_color;

        void main() {
            frag_color = vColor;
        }
    `],
]);

export { SHADER_LIB }



