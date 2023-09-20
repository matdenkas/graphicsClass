/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/GLWrapper.ts":
/*!**************************!*\
  !*** ./src/GLWrapper.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GL_Wrapper: () => (/* binding */ GL_Wrapper)\n/* harmony export */ });\n/* harmony import */ var _ShaderProgramHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShaderProgramHelper */ \"./src/ShaderProgramHelper.ts\");\n\nvar GL_Wrapper = /** @class */ (function () {\n    function GL_Wrapper(canvas) {\n        this.canvas = canvas;\n        this.context = canvas.getContext('experimental-webgl');\n        this.shaderProgramHelper = null;\n    }\n    /**\n     * makeSeededProgramWrapper\n     * Returns a program wrapper seeded with the context for this GL_Wrapper, but with no shader data. A user should load their shader\n     * code into the the program wrapper and then set then attach it too this class with attachProgramWrapper.\n     * @returns {ShaderProgramHelper} - A program wrapper seeded with the context for this GL_Wrapper, but with no shader data.\n     */\n    GL_Wrapper.prototype.makeSeededProgramWrapper = function () {\n        return new _ShaderProgramHelper__WEBPACK_IMPORTED_MODULE_0__.ShaderProgramHelper(this.context);\n    };\n    /**\n     * attachProgramWrapper\n     * sets a program wrapper to be actually used by this GLWrapper\n     * @param {ShaderProgramHelper} programWrapper - A program wrapper seeded with the context for this GL_Wrapper and with shader data..\n     */\n    GL_Wrapper.prototype.attachProgramWrapper = function (programWrapper) {\n        this.shaderProgramHelper = programWrapper;\n    };\n    /**\n     * buildAndPushArrayBuffer\n     * Creates an Array Buffer and pushes it to the GPU\n     * @param {BufferSource} data - The actual data to buffer over.\n     * @returns {WebGLBuffer}\n     */\n    GL_Wrapper.prototype.buildAndPushArrayBuffer = function (data) {\n        var buffer = this.context.createBuffer();\n        this.context.bindBuffer(this.context.ARRAY_BUFFER, buffer);\n        this.context.bufferData(this.context.ARRAY_BUFFER, data, this.context.STATIC_DRAW);\n        this.context.bindBuffer(this.context.ARRAY_BUFFER, null);\n        return buffer;\n    };\n    /**\n     * buildAndPushElementArrayBuffer\n     * Creates an Element Array Buffer and pushes it to the GPU\n     * @param {BufferSource} data - The actual data to buffer over.\n     * @returns {WebGLBuffer}\n     */\n    GL_Wrapper.prototype.buildAndPushElementArrayBuffer = function (data) {\n        var buffer = this.context.createBuffer();\n        this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, buffer);\n        this.context.bufferData(this.context.ELEMENT_ARRAY_BUFFER, data, this.context.STATIC_DRAW);\n        this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, null);\n        return buffer;\n    };\n    /**\n     * bindAttributeNameToBuffer\n     * This binds a buffer to an attribute. It also loads this information about how to read the buffer into the attribute.\n     * @param {WebGLBuffer} buffer - Reference to the buffer containing the attribute data.\n     * @param {string} attributeName - The string name of the attribute you are binding\n     * @param {number} amntPerVertex - The amount of values in this buffer to read for one instance of the attribute. floats or vectors?????\n     * @param {boolean} normalize - Does the data need to be normalized.\n     * @param {number} stride - The stride to jump per attribute??? is that not number??\n     * @param {number} offset - The offset to jump from the beginning of the buffer\n     */\n    GL_Wrapper.prototype.bindAttributeNameToBuffer = function (buffer, attributeName, amntPerVertex, normalize, stride, offset) {\n        if (this.shaderProgramHelper == null) {\n            throw \"No shader program to try and attach attribute \".concat(attributeName, \" to!\");\n        }\n        this.context.bindBuffer(this.context.ARRAY_BUFFER, buffer);\n        var loc = this.shaderProgramHelper.getAttributeLocation(attributeName);\n        this.context.vertexAttribPointer(loc, amntPerVertex, this.context.FLOAT, normalize, stride, offset);\n        this.context.enableVertexAttribArray(loc);\n        this.context.bindBuffer(this.context.ARRAY_BUFFER, null);\n    };\n    /**\n     * This function binds a matrix to a uniform in the program.\n     * @param matrix The matrix in column major order.\n     * @param size The size of the matrix 1x1 -> 1, 4x4 -> 4.\n     * @param uniformName The name of the uniform to bind this to.\n     */\n    GL_Wrapper.prototype.bindMatrixUniform = function (matrix, size, uniformName) {\n        if (this.shaderProgramHelper == null) {\n            throw \"No shader program to try and attach uniform \".concat(uniformName, \" to!\");\n        }\n        var loc = this.shaderProgramHelper.getUniformLocation(uniformName);\n        switch (size) {\n            case 2: {\n                this.context.uniformMatrix2fv(loc, false, matrix);\n                break;\n            }\n            case 3: {\n                this.context.uniformMatrix3fv(loc, false, matrix);\n                break;\n            }\n            case 4: {\n                this.context.uniformMatrix4fv(loc, false, matrix);\n                break;\n            }\n            default: {\n                throw \"Matrix size of \".concat(size, \" has no gl sibling!\");\n                break;\n            }\n        }\n    };\n    GL_Wrapper.prototype.draw = function (indexBuffer, indexLength) {\n        this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, indexBuffer);\n        this.context.clearColor(0, 0, 0, 1.0);\n        this.context.enable(this.context.DEPTH_TEST);\n        this.context.clear(this.context.COLOR_BUFFER_BIT);\n        this.context.viewport(0, 0, this.canvas.width, this.canvas.height);\n        this.context.drawElements(this.context.TRIANGLES, indexLength, this.context.UNSIGNED_SHORT, 0);\n    };\n    GL_Wrapper.prototype.getError = function () {\n        return this.context.getError();\n    };\n    return GL_Wrapper;\n}());\n\n\n\n//# sourceURL=webpack://my-webpack-project/./src/GLWrapper.ts?");

/***/ }),

/***/ "./src/ShaderLibrary.ts":
/*!******************************!*\
  !*** ./src/ShaderLibrary.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SHADER_LIB: () => (/* binding */ SHADER_LIB)\n/* harmony export */ });\nvar SHADER_LIB = new Map([\n    [\"v_SafeSingleTri\", \"attribute vec3 vertex_position;\\nattribute vec3 vertex_color;\\nvarying vec3 vColor;\\nvoid main() {\\ngl_Position = vec4(vertex_position, 1.0);\\nvColor = vertex_color;\\n}\\n\"],\n    [\"f_SafeSingleTriWColor\", \"precision highp float;\\nvarying vec3 vColor;\\nvoid main() {\\ngl_FragColor = vec4(vColor, 1.0);\\n}\\n\"]\n]);\n\n\n\n//# sourceURL=webpack://my-webpack-project/./src/ShaderLibrary.ts?");

/***/ }),

/***/ "./src/ShaderProgramHelper.ts":
/*!************************************!*\
  !*** ./src/ShaderProgramHelper.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ShaderProgramHelper: () => (/* binding */ ShaderProgramHelper)\n/* harmony export */ });\n/* harmony import */ var _ShaderLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShaderLibrary */ \"./src/ShaderLibrary.ts\");\n\nvar ShaderProgramHelper = /** @class */ (function () {\n    function ShaderProgramHelper(context) {\n        this.context = context;\n        this.program = context.createProgram();\n    }\n    /**\n     * attachShaderFromShaderLib\n     * Loads a shader from shader library.\n     * @param {string} shaderSourceName - The name of the shader in the library.\n     * @param {ShaderProgramHelper.shaderTypes} shadertype -  The type of shader the code is for.\n     */\n    ShaderProgramHelper.prototype.attachShaderFromShaderLib = function (shaderSourceName, shadertype) {\n        if (!_ShaderLibrary__WEBPACK_IMPORTED_MODULE_0__.SHADER_LIB.has(shaderSourceName)) {\n            throw \"Cannot find shader: \".concat(shaderSourceName, \" in shader library!\");\n        }\n        ;\n        this.attachShaderFromString(_ShaderLibrary__WEBPACK_IMPORTED_MODULE_0__.SHADER_LIB.get(shaderSourceName), shadertype);\n    };\n    /**\n     * attachShaderFromString\n     * Loads a shader from a string.\n     * @param {string} shaderSourceStr - The string of shader source code.\n     * @param {ShaderProgramHelper.shaderTypes} shadertype -  The type of shader the code is for.\n     */\n    ShaderProgramHelper.prototype.attachShaderFromString = function (shaderSourceStr, shadertype) {\n        //Map our enums to OpenGL enums.\n        var glShaderTypeID;\n        switch (shadertype) {\n            case ShaderProgramHelper.shaderTypes.VERTEX: {\n                glShaderTypeID = this.context.VERTEX_SHADER;\n                break;\n            }\n            case ShaderProgramHelper.shaderTypes.FRAGMENT: {\n                glShaderTypeID = this.context.FRAGMENT_SHADER;\n                break;\n            }\n            default: {\n                throw \"Cant implement shadertype: \".concat(shadertype, \" in func attachShaderFromString!\");\n            }\n        }\n        //Make the shader and compile it\n        var shaderObj = this.context.createShader(glShaderTypeID);\n        this.context.shaderSource(shaderObj, shaderSourceStr);\n        this.context.compileShader(shaderObj);\n        if (!this.context.getShaderParameter(shaderObj, this.context.COMPILE_STATUS)) {\n            var info = this.context.getShaderInfoLog(shaderObj);\n            throw \"Could not compile shader \".concat(shadertype, \". \\n\\n\").concat(info);\n        }\n        //Attach the shader to the program\n        this.context.attachShader(this.program, shaderObj);\n    };\n    /**\n     * useProgram\n     * Links, compiles program. Then sets this program to be used for the context it was made with.\n     */\n    ShaderProgramHelper.prototype.useProgram = function () {\n        this.context.linkProgram(this.program);\n        if (!this.context.getProgramParameter(this.program, this.context.LINK_STATUS)) {\n            var info = this.context.getProgramInfoLog(this.program);\n            throw \"Could not compile WebGL program. \\n\\n\".concat(info);\n        }\n        this.context.useProgram(this.program);\n    };\n    /**\n     * getAttributeLocation\n     * Get the location of an attribute in the program by its name.\n     * This will compile link and set the program to be used!\n     * @param {string} name - The text name attribute to find the location of\n     * @returns {number}\n     */\n    ShaderProgramHelper.prototype.getAttributeLocation = function (name) {\n        //TODO::Make it to where we don't have to link and select the program every \n        //time we want to look up and attribute!\n        this.useProgram();\n        return this.context.getAttribLocation(this.program, name);\n    };\n    /**\n * getAttributeLocation\n * Get the location of a uniform in the program by its name.\n * This will compile link and set the program to be used!\n * @param {string} name - The text name uniform to find the location of\n * @returns {number}\n */\n    ShaderProgramHelper.prototype.getUniformLocation = function (name) {\n        //TODO::Make it to where we don't have to link and select the program every \n        //time we want to look up and uniform!\n        this.useProgram();\n        return this.context.getUniformLocation(this.program, name);\n    };\n    return ShaderProgramHelper;\n}());\n\n(function (ShaderProgramHelper) {\n    var shaderTypes;\n    (function (shaderTypes) {\n        shaderTypes[shaderTypes[\"VERTEX\"] = 0] = \"VERTEX\";\n        shaderTypes[shaderTypes[\"FRAGMENT\"] = 1] = \"FRAGMENT\";\n    })(shaderTypes = ShaderProgramHelper.shaderTypes || (ShaderProgramHelper.shaderTypes = {}));\n})(ShaderProgramHelper || (ShaderProgramHelper = {}));\n\n\n//# sourceURL=webpack://my-webpack-project/./src/ShaderProgramHelper.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _GLWrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GLWrapper */ \"./src/GLWrapper.ts\");\n/* harmony import */ var _ShaderProgramHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShaderProgramHelper */ \"./src/ShaderProgramHelper.ts\");\n\n\nvar vertices = [\n    -0.5, 0.5, 0.0,\n    -0.5, -0.5, 0.0,\n    0.5, -0.5, 0.0,\n];\nvar indices = [0, 1, 2];\nvar colors = [\n    1.0, 0.0, 0.0,\n    0.0, 1.0, 0.0,\n    0.0, 0.0, 1.0,\n];\nfunction delay(ms) {\n    return new Promise(function (resolve) { return setTimeout(resolve, ms); });\n}\nfunction createZRotationMatrix(degrees) {\n    var radians = degrees * (Math.PI / 180);\n    var radCos = Math.cos(radians);\n    var radSin = Math.sin(radians);\n    /* Rotation matrix, its returned as one line as it has to be in column major order >:(\n        cos γ, -sin γ, 0, 0\n        sin γ,  cos γ, 0, 0\n        0       0      1, 0\n        0       0      0, 1\n    */\n    return [radCos, radSin, 0, 0, -1 * radSin, radCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];\n}\nfunction createXRotationMatrix(degrees) {\n    var radians = degrees * (Math.PI / 180);\n    var radCos = Math.cos(radians);\n    var radSin = Math.sin(radians);\n    /* Rotation matrix, its returned as one line as it has to be in column major order >:(\n        cos γ, -sin γ, 0, 0\n        sin γ,  cos γ, 0, 0\n        0       0      1, 0\n        0       0      0, 1\n    */\n    return [1, 0, 0, 0,\n        0, radCos, radSin, 0,\n        0, -1 * radSin, radCos, 0,\n        0, 0, 0, 1];\n}\nvar str = \"\\n    attribute vec3 vertex_position;\\n    attribute vec3 vertex_color;\\n\\n    uniform mat4 rot_mat;\\n\\n    varying vec3 vColor;\\n    void main() {\\n        vec4 vertex = rot_mat * vec4(vertex_position, 1);\\n        gl_Position = vertex;\\n        vColor = vertex_color;\\n    }\\n    \";\nvar width = 300;\nvar height = 300;\nvar canvas = document.getElementById('screen');\ncanvas.width = width;\ncanvas.height = height;\nvar glw = new _GLWrapper__WEBPACK_IMPORTED_MODULE_0__.GL_Wrapper(canvas);\nvar seededProgram = glw.makeSeededProgramWrapper();\n//seededProgram.attachShaderFromShaderLib(`v_SafeSingleTri`, ShaderProgramHelper.shaderTypes.VERTEX);\nseededProgram.attachShaderFromString(str, _ShaderProgramHelper__WEBPACK_IMPORTED_MODULE_1__.ShaderProgramHelper.shaderTypes.VERTEX);\nseededProgram.attachShaderFromShaderLib(\"f_SafeSingleTriWColor\", _ShaderProgramHelper__WEBPACK_IMPORTED_MODULE_1__.ShaderProgramHelper.shaderTypes.FRAGMENT);\nglw.attachProgramWrapper(seededProgram);\nvar verticesBuffer = glw.buildAndPushArrayBuffer(new Float32Array(vertices));\nvar colorBuffer = glw.buildAndPushArrayBuffer(new Float32Array(colors));\nvar indicesBuffer = glw.buildAndPushElementArrayBuffer(new Uint16Array(indices));\nglw.bindAttributeNameToBuffer(verticesBuffer, \"vertex_position\", 3, false, 0, 0);\nglw.bindAttributeNameToBuffer(colorBuffer, \"vertex_color\", 3, false, 0, 0);\nvar i = 0;\nvar delta = 1;\nvar val = setInterval(function () {\n    glw.bindMatrixUniform(new Float32Array(createXRotationMatrix(i)), 4, \"rot_mat\");\n    glw.draw(indicesBuffer, indices.length);\n    if (i >= 180) {\n        delta = -1;\n    }\n    else if (i <= 0) {\n        delta = 1;\n    }\n    i = i + delta;\n    console.log(glw.getError());\n    console.log(i);\n}, 1000 / 60);\n\n\n//# sourceURL=webpack://my-webpack-project/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;