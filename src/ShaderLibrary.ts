let SHADER_LIB = new Map<string, string>([
    ["v_SafeSingleTri", `attribute vec3 vertex_position;\nattribute vec3 vertex_color;\nvarying vec3 vColor;\nvoid main() {\ngl_Position = vec4(vertex_position, 1.0);\nvColor = vertex_color;\n}\n`],
    ["f_SafeSingleTriWColor", `
        precision highp float;
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `],
    ["v_O2W&color", `
        attribute vec3 vertex_position;
        attribute vec3 vertex_color;

        uniform mat4 objectToWorld;
        uniform mat4 worldToCamera;
        uniform mat4 cameraToProjection;

        varying vec3 vColor;

        void main() {
            vec4 vertex =  cameraToProjection * worldToCamera * objectToWorld * vec4(vertex_position, 1);
            gl_Position = vertex;
            vColor = vertex_color;
        }
    `]
]);

export { SHADER_LIB }