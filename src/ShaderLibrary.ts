let SHADER_LIB = new Map<string, string>([
    ["v_SafeSingleTri", `attribute vec3 vertex_position;\nattribute vec3 vertex_color;\nvarying vec3 vColor;\nvoid main() {\ngl_Position = vec4(vertex_position, 1.0);\nvColor = vertex_color;\n}\n`],
    ["f_SafeSingleTriWColor", `precision highp float;\nvarying vec3 vColor;\nvoid main() {\ngl_FragColor = vec4(vColor, 1.0);\n}\n`]
]);

export { SHADER_LIB }