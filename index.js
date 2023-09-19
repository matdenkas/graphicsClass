const width = 300;
const height = 300;
$(document).ready(function() {

    canvas = $("#my_canvas").get([0]);
    canvas.width = width;
    canvas.height = height;
    gl_ctx = canvas.getContext('experimental-webgl');
    
    
    var vertices = [   
        -0.5,0.5,0.0,
        -0.5,-0.5,0.0,
        0.5,-0.5,0.0, ];
    var indices = [0, 1, 2];
    var colors = [   
        -0.5,0.5,0.0,
        -0.5,-0.5,0.0,
        0.5,-0.5,0.0, ];


    var vertexBuffer = gl_ctx.createBuffer();
    gl_ctx.bindBuffer(gl_ctx.ARRAY_BUFFER, vertexBuffer);
    gl_ctx.bufferData(gl_ctx.ARRAY_BUFFER, new Float32Array(vertices), gl_ctx.STATIC_DRAW);
    gl_ctx.bindBuffer(gl_ctx.ARRAY_BUFFER, null);

    var indexBuffer = gl_ctx.createBuffer();
    gl_ctx.bindBuffer(gl_ctx.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl_ctx.bufferData(gl_ctx.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl_ctx.STATIC_DRAW);
    gl_ctx.bindBuffer(gl_ctx.ELEMENT_ARRAY_BUFFER, null);

    var colorBuffer = gl_ctx.createBuffer();
    gl_ctx.bindBuffer(gl_ctx.ARRAY_BUFFER, colorBuffer);
    gl_ctx.bufferData(gl_ctx.ARRAY_BUFFER, new Float32Array(colors), gl_ctx.STATIC_DRAW);
    gl_ctx.bindBuffer(gl_ctx.ARRAY_BUFFER, null);
    


    const vCode = "\
                    attribute vec3 coordinates; \
                    attribute vec3 aVertexColor \
                                                \
                    varying lowp vec3 vColor;   \
                    void main(void) { \
                        gl_Position = vec4(coordinates, 1.0); \
                        vColor = aVertexColor; \
                    }";

    var vertShader = gl_ctx.createShader(gl_ctx.VERTEX_SHADER);
    gl_ctx.shaderSource(vertShader, vCode);
    gl_ctx.compileShader(vertShader);


    const fCode = " \
                varying lowp vec3 vColor; \
                void main(void) { \
                    gl_FragColor = vec4(color, 0.5); \
                }";

    // const fCode = " \
    //         void main(void) { \
    //             gl_FragColor = vec4(0.1, 0.1, 0.1, 0.5); \
    //         }";

    var fragShader = gl_ctx.createShader(gl_ctx.FRAGMENT_SHADER);
    gl_ctx.shaderSource(fragShader, fCode);
    gl_ctx.compileShader(fragShader);


    var shaderProgram = gl_ctx.createProgram();
    gl_ctx.attachShader(shaderProgram, vertShader);
    gl_ctx.attachShader(shaderProgram, fragShader);
    gl_ctx.linkProgram(shaderProgram);
    gl_ctx.useProgram(shaderProgram);

    
    gl_ctx.bindBuffer(gl_ctx.ARRAY_BUFFER, vertexBuffer);
    gl_ctx.bindBuffer(gl_ctx.ELEMENT_ARRAY_BUFFER, indexBuffer);
    
    var coord = gl_ctx.getAttribLocation(shaderProgram, "coordinates");
    gl_ctx.vertexAttribPointer(coord, 3, gl_ctx.FLOAT, false, 0, 0); 
    gl_ctx.enableVertexAttribArray(coord);

    // gl_ctx.bindBuffer(gl_ctx.ARRAY_BUFFER, null);
    // gl_ctx.bindBuffer(gl_ctx.ELEMENT_ARRAY_BUFFER, null);


    gl_ctx.bindBuffer(gl_ctx.ARRAY_BUFFER, colorBuffer);

    var color = gl_ctx.getAttribLocation(shaderProgram, "aVertexColor");
    gl_ctx.vertexAttribPointer(color, 3, gl_ctx.FLOAT, false, 0, 0); 
    gl_ctx.enableVertexAttribArray(color);

    // gl_ctx.bindBuffer(gl_ctx.ARRAY_BUFFER, null);

    gl_ctx.clearColor(0, 0, 0, 1.0);
    gl_ctx.enable(gl_ctx.DEPTH_TEST);
    gl_ctx.clear(gl_ctx.COLOR_BUFFER_BIT);
    gl_ctx.viewport(0, 0, canvas.width, canvas.height);

    gl_ctx.drawElements(gl_ctx.TRIANGLES, indices.length, gl_ctx.UNSIGNED_SHORT,0);

});