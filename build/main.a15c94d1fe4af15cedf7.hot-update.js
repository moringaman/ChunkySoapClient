exports.id = "main";
exports.modules = {

/***/ "./src/helpers/api.js":
/*!****************************!*\
  !*** ./src/helpers/api.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);


 // import { fn } from '.';

var promiseRetry = __webpack_require__(/*! promise-retry */ "promise-retry");

/* harmony default export */ __webpack_exports__["default"] = ({
  /**
   * ( uses fetch to make authorized api requests )
   *
   * @param {*} url
   * @param {*} method
   * @param {*} data
   * @returns
   */
  send: function send(url, method, data) {
    var _arguments = arguments;
    return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var type, apiAddress, token, baseURL, myHeaders, raw, requestOptions;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              type = _arguments.length > 3 && _arguments[3] !== undefined ? _arguments[3] : "protected";
              // const apiAddress = process.env.RAZZLE_API_URI 
              apiAddress =  false ? undefined : "http://localhost:1337"; // fn.getApiAddress()

              _context.next = 4;
              return JSON.parse(sessionStorage.getItem("jwtToken"));

            case 4:
              token = _context.sent;
              // await fn.getTokenFromStorage('sessionToken')
              console.log("TOKEN ", token);
              baseURL = "".concat(apiAddress);
              myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");

              if (token !== "" && type !== "public") {
                myHeaders.append("Authorization", "Bearer ".concat(token));
              }

              raw = JSON.stringify(data);
              console.log("raw data ", raw);
              requestOptions = {
                method: method,
                headers: myHeaders,
                body: raw,
                redirect: "follow"
              };
              return _context.abrupt("return", fetch("".concat(baseURL).concat(url), requestOptions).then(function (response) {
                console.log("fetch response ", response);
                if (response.status === 200) return response.json();

                if (retries > 0) {
                  return fetch("".concat(baseURL).concat(url), requestOptions, retries - 1);
                  console.log("error", error);
                }
              }).then(function (result) {
                console.log("reftch result ", result);
                return result;
              })["catch"](function (error) {
                console.log(error);

                if (retries > 0) {
                  retries - 1;
                  return fetch("".concat(baseURL).concat(url), requestOptions);
                }
              }));

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }
});

/***/ })

};
//# sourceMappingURL=main.a15c94d1fe4af15cedf7.hot-update.js.map