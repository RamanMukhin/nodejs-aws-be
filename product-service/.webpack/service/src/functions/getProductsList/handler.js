/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/functions/getProductsList/handler.ts":
/*!**************************************************!*\
  !*** ./src/functions/getProductsList/handler.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"main\": () => (/* binding */ main)\n/* harmony export */ });\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ \"source-map-support/register\");\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @libs/apiGateway */ \"./src/libs/apiGateway.ts\");\n/* harmony import */ var _libs_lambda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @libs/lambda */ \"./src/libs/lambda.ts\");\n/* harmony import */ var src_productsRange_products__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/productsRange/products */ \"./src/productsRange/products.ts\");\n\r\n\r\n\r\n\r\nconst getProductsList = async (_event) => (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(src_productsRange_products__WEBPACK_IMPORTED_MODULE_3__.products);\r\nconst main = (0,_libs_lambda__WEBPACK_IMPORTED_MODULE_2__.middyfy)(getProductsList);\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZnVuY3Rpb25zL2dldFByb2R1Y3RzTGlzdC9oYW5kbGVyLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBR0E7QUFDQTtBQUdBO0FBRUE7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2R1Y3Qtc2VydmljZS8uL3NyYy9mdW5jdGlvbnMvZ2V0UHJvZHVjdHNMaXN0L2hhbmRsZXIudHM/OTIwZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlcic7XG5cbmltcG9ydCB0eXBlIHsgVmFsaWRhdGVkRXZlbnRBUElHYXRld2F5UHJveHlFdmVudCB9IGZyb20gJ0BsaWJzL2FwaUdhdGV3YXknO1xuaW1wb3J0IHsgZm9ybWF0SlNPTlJlc3BvbnNlIH0gZnJvbSAnQGxpYnMvYXBpR2F0ZXdheSc7XG5pbXBvcnQgeyBtaWRkeWZ5IH0gZnJvbSAnQGxpYnMvbGFtYmRhJztcblxuaW1wb3J0IHNjaGVtYSBmcm9tICcuL3NjaGVtYSc7XG5pbXBvcnQgeyBwcm9kdWN0cyB9IGZyb20gJ3NyYy9wcm9kdWN0c1JhbmdlL3Byb2R1Y3RzJztcblxuY29uc3QgZ2V0UHJvZHVjdHNMaXN0OiBWYWxpZGF0ZWRFdmVudEFQSUdhdGV3YXlQcm94eUV2ZW50PHR5cGVvZiBzY2hlbWE+ID0gYXN5bmMgKF9ldmVudCkgPT4gZm9ybWF0SlNPTlJlc3BvbnNlKHByb2R1Y3RzKTtcblxuZXhwb3J0IGNvbnN0IG1haW4gPSBtaWRkeWZ5KGdldFByb2R1Y3RzTGlzdCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/functions/getProductsList/handler.ts\n");

/***/ }),

/***/ "./src/libs/apiGateway.ts":
/*!********************************!*\
  !*** ./src/libs/apiGateway.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"formatJSONResponse\": () => (/* binding */ formatJSONResponse)\n/* harmony export */ });\nconst formatJSONResponse = (response) => {\r\n    return {\r\n        statusCode: 200,\r\n        headers: {\r\n            'Access-Control-Allow-Origin': '*',\r\n            'Access-Control-Allow-Credentials': true,\r\n        },\r\n        body: JSON.stringify(response)\r\n    };\r\n};\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGlicy9hcGlHYXRld2F5LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2R1Y3Qtc2VydmljZS8uL3NyYy9saWJzL2FwaUdhdGV3YXkudHM/NjI1MSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEFQSUdhdGV3YXlQcm94eUV2ZW50LCBBUElHYXRld2F5UHJveHlSZXN1bHQsIEhhbmRsZXIgfSBmcm9tIFwiYXdzLWxhbWJkYVwiXG5pbXBvcnQgdHlwZSB7IEZyb21TY2hlbWEgfSBmcm9tIFwianNvbi1zY2hlbWEtdG8tdHNcIjtcblxudHlwZSBWYWxpZGF0ZWRBUElHYXRld2F5UHJveHlFdmVudDxTPiA9IE9taXQ8QVBJR2F0ZXdheVByb3h5RXZlbnQsICdib2R5Jz4gJiB7IGJvZHk6IEZyb21TY2hlbWE8Uz4gfVxuZXhwb3J0IHR5cGUgVmFsaWRhdGVkRXZlbnRBUElHYXRld2F5UHJveHlFdmVudDxTPiA9IEhhbmRsZXI8VmFsaWRhdGVkQVBJR2F0ZXdheVByb3h5RXZlbnQ8Uz4sIEFQSUdhdGV3YXlQcm94eVJlc3VsdD5cblxuZXhwb3J0IGNvbnN0IGZvcm1hdEpTT05SZXNwb25zZSA9IChyZXNwb25zZSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxuICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzJzogdHJ1ZSxcbiAgICB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKVxuICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/libs/apiGateway.ts\n");

/***/ }),

/***/ "./src/libs/lambda.ts":
/*!****************************!*\
  !*** ./src/libs/lambda.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"middyfy\": () => (/* binding */ middyfy)\n/* harmony export */ });\n/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @middy/core */ \"@middy/core\");\n/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_middy_core__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @middy/http-json-body-parser */ \"@middy/http-json-body-parser\");\n/* harmony import */ var _middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\nconst middyfy = (handler) => {\r\n    return _middy_core__WEBPACK_IMPORTED_MODULE_0___default()(handler).use(_middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_1___default()());\r\n};\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGlicy9sYW1iZGEudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvZHVjdC1zZXJ2aWNlLy4vc3JjL2xpYnMvbGFtYmRhLnRzPzZiMjUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1pZGR5IGZyb20gXCJAbWlkZHkvY29yZVwiXG5pbXBvcnQgbWlkZHlKc29uQm9keVBhcnNlciBmcm9tIFwiQG1pZGR5L2h0dHAtanNvbi1ib2R5LXBhcnNlclwiXG5cbmV4cG9ydCBjb25zdCBtaWRkeWZ5ID0gKGhhbmRsZXIpID0+IHtcbiAgcmV0dXJuIG1pZGR5KGhhbmRsZXIpLnVzZShtaWRkeUpzb25Cb2R5UGFyc2VyKCkpXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/libs/lambda.ts\n");

/***/ }),

/***/ "./src/productsRange/products.ts":
/*!***************************************!*\
  !*** ./src/productsRange/products.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"products\": () => (/* binding */ products)\n/* harmony export */ });\nconst products = [\r\n    {\r\n        count: 1,\r\n        description: \"Short Product Description1\",\r\n        id: \"1111ec4b-b10c-48c5-9345-fc73c48a80a2\",\r\n        price: 1.1,\r\n        title: \"FirstProduct\"\r\n    },\r\n    {\r\n        count: 2,\r\n        description: \"Short Product Description2\",\r\n        id: \"2222ec4b-b10c-48c5-9345-fc73c48a80a2\",\r\n        price: 2.2,\r\n        title: \"SecondProduct\"\r\n    },\r\n    {\r\n        count: 3,\r\n        description: \"Short Product Description3\",\r\n        id: \"3333ec4b-b10c-48c5-9345-fc73c48a80a2\",\r\n        price: 3.3,\r\n        title: \"ThirdProduct\"\r\n    },\r\n    {\r\n        count: 4,\r\n        description: \"Short Product Description4\",\r\n        id: \"4444ec4b-b10c-48c5-9345-fc73c48a80a2\",\r\n        price: 4.4,\r\n        title: \"FourthProduct\"\r\n    },\r\n    {\r\n        count: 5,\r\n        description: \"Short Product Description5\",\r\n        id: \"5555ec4b-b10c-48c5-9345-fc73c48a80a2\",\r\n        price: 5.5,\r\n        title: \"FifthProduct\"\r\n    },\r\n    {\r\n        count: 6,\r\n        description: \"Short Product Description6\",\r\n        id: \"6666ec4b-b10c-48c5-9345-fc73c48a80a2\",\r\n        price: 6.6,\r\n        title: \"SixthProduct\"\r\n    },\r\n    {\r\n        count: 7,\r\n        description: \"Short Product Description7\",\r\n        id: \"7777ec4b-b10c-48c5-9345-fc73c48a80a2\",\r\n        price: 7.7,\r\n        title: \"SeventhProduct\"\r\n    },\r\n];\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcHJvZHVjdHNSYW5nZS9wcm9kdWN0cy50cy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvZHVjdC1zZXJ2aWNlLy4vc3JjL3Byb2R1Y3RzUmFuZ2UvcHJvZHVjdHMudHM/YTQzYyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgcHJvZHVjdHMgPSBbXHJcbiAge1xyXG4gICAgY291bnQ6IDEsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJTaG9ydCBQcm9kdWN0IERlc2NyaXB0aW9uMVwiLFxyXG4gICAgaWQ6IFwiMTExMWVjNGItYjEwYy00OGM1LTkzNDUtZmM3M2M0OGE4MGEyXCIsXHJcbiAgICBwcmljZTogMS4xLFxyXG4gICAgdGl0bGU6IFwiRmlyc3RQcm9kdWN0XCJcclxuICB9LFxyXG4gIHtcclxuICAgIGNvdW50OiAyLFxyXG4gICAgZGVzY3JpcHRpb246IFwiU2hvcnQgUHJvZHVjdCBEZXNjcmlwdGlvbjJcIixcclxuICAgIGlkOiBcIjIyMjJlYzRiLWIxMGMtNDhjNS05MzQ1LWZjNzNjNDhhODBhMlwiLFxyXG4gICAgcHJpY2U6IDIuMixcclxuICAgIHRpdGxlOiBcIlNlY29uZFByb2R1Y3RcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgY291bnQ6IDMsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJTaG9ydCBQcm9kdWN0IERlc2NyaXB0aW9uM1wiLFxyXG4gICAgaWQ6IFwiMzMzM2VjNGItYjEwYy00OGM1LTkzNDUtZmM3M2M0OGE4MGEyXCIsXHJcbiAgICBwcmljZTogMy4zLFxyXG4gICAgdGl0bGU6IFwiVGhpcmRQcm9kdWN0XCJcclxuICB9LFxyXG4gIHtcclxuICAgIGNvdW50OiA0LFxyXG4gICAgZGVzY3JpcHRpb246IFwiU2hvcnQgUHJvZHVjdCBEZXNjcmlwdGlvbjRcIixcclxuICAgIGlkOiBcIjQ0NDRlYzRiLWIxMGMtNDhjNS05MzQ1LWZjNzNjNDhhODBhMlwiLFxyXG4gICAgcHJpY2U6IDQuNCxcclxuICAgIHRpdGxlOiBcIkZvdXJ0aFByb2R1Y3RcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgY291bnQ6IDUsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJTaG9ydCBQcm9kdWN0IERlc2NyaXB0aW9uNVwiLFxyXG4gICAgaWQ6IFwiNTU1NWVjNGItYjEwYy00OGM1LTkzNDUtZmM3M2M0OGE4MGEyXCIsXHJcbiAgICBwcmljZTogNS41LFxyXG4gICAgdGl0bGU6IFwiRmlmdGhQcm9kdWN0XCJcclxuICB9LFxyXG4gIHtcclxuICAgIGNvdW50OiA2LFxyXG4gICAgZGVzY3JpcHRpb246IFwiU2hvcnQgUHJvZHVjdCBEZXNjcmlwdGlvbjZcIixcclxuICAgIGlkOiBcIjY2NjZlYzRiLWIxMGMtNDhjNS05MzQ1LWZjNzNjNDhhODBhMlwiLFxyXG4gICAgcHJpY2U6IDYuNixcclxuICAgIHRpdGxlOiBcIlNpeHRoUHJvZHVjdFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBjb3VudDogNyxcclxuICAgIGRlc2NyaXB0aW9uOiBcIlNob3J0IFByb2R1Y3QgRGVzY3JpcHRpb243XCIsXHJcbiAgICBpZDogXCI3Nzc3ZWM0Yi1iMTBjLTQ4YzUtOTM0NS1mYzczYzQ4YTgwYTJcIixcclxuICAgIHByaWNlOiA3LjcsXHJcbiAgICB0aXRsZTogXCJTZXZlbnRoUHJvZHVjdFwiXHJcbiAgfSxcclxuXTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/productsRange/products.ts\n");

/***/ }),

/***/ "@middy/core":
/*!******************************!*\
  !*** external "@middy/core" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@middy/core");

/***/ }),

/***/ "@middy/http-json-body-parser":
/*!***********************************************!*\
  !*** external "@middy/http-json-body-parser" ***!
  \***********************************************/
/***/ ((module) => {

module.exports = require("@middy/http-json-body-parser");

/***/ }),

/***/ "source-map-support/register":
/*!**********************************************!*\
  !*** external "source-map-support/register" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = require("source-map-support/register");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/functions/getProductsList/handler.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;