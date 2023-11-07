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

    uniform vec3 lightPos1;
    uniform vec3 lightPos2;
    uniform vec3 lightPos3;

    out vec3 N;

    out vec3 L1;
    out vec3 L2;
    out vec3 L3;

    out vec3 E;

    out vec3 H1;
    out vec3 H2;
    out vec3 H3;
    
    void main() {
        vec4 worldPosition = objectToWorld * vec4(vertex_position, 1);

        N = normalize(transpose(inverse(mat3(objectToWorld))) * vertex_normal);
        
        L1 = normalize(lightPos1 - worldPosition.xyz);
        L2 = normalize(lightPos2 - worldPosition.xyz);
        L3 = normalize(lightPos3 - worldPosition.xyz);
        
        E = normalize(cameraPos -worldPosition.xyz);
        
        H1 = normalize(L1+E);
        H2 = normalize(L2+E);
        H3 = normalize(L3+E);
        
        gl_Position = cameraToProjection * worldToCamera * worldPosition;
    }
    `],
    ["fGouraudShading", 
        `#version 300 es
        precision highp float;       
        in vec3 N;

        in vec3 L1;
        in vec3 L2;
        in vec3 L3;

        in vec3 E;

        in vec3 H1;
        in vec3 H2;
        in vec3 H3;

        uniform vec3 lightColor1;
        uniform vec3 lightColor2;
        uniform vec3 lightColor3;

        uniform vec3 ambientLight;
        uniform vec3 matDiffuse;
        uniform vec3 matSpecular;
        uniform float shininess;

        out vec4 frag_color;

        void main() {

            float kd1 = max(dot(L1,N), 0.0);
            float ks1 = pow(max(dot(N,H1), 0.0), shininess);
            float kd2 = max(dot(L2,N), 0.0);
            float ks2 = pow(max(dot(N,H2), 0.0), shininess);
            float kd3 = max(dot(L3,N), 0.0);
            float ks3 = pow(max(dot(N,H3), 0.0), shininess);

            if (dot(L1,N) < 0.0) ks1 = 0.0; 
            frag_color += vec4(matDiffuse * ambientLight + kd1 * matDiffuse *  lightColor1 + ks1 * matSpecular * lightColor1, 1);

            if (dot(L2,N) < 0.0) ks2 = 0.0; 
            frag_color += vec4(matDiffuse * ambientLight + kd2 * matDiffuse *  lightColor2 + ks2 * matSpecular * lightColor2, 1);

            if (dot(L3,N) < 0.0) ks3 = 0.0; 
            frag_color += vec4(matDiffuse * ambientLight + kd3 * matDiffuse *  lightColor3 + ks3 * matSpecular * lightColor3, 1);

            frag_color = normalize(frag_color);
        }
    `],
]);

export { SHADER_LIB }



