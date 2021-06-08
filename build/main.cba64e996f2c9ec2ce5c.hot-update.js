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
      var type, apiAddress, token, baseURL, myHeaders, raw, requestOptions, retryFetch;
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
              }; // return fetch(`${baseURL}${url}`, requestOptions)
              //   .then((response) => {
              //     console.log("fetch response ", response);
              //     if(response.status === 200) return response.json();
              //     if (retries > 0) {
              //       return fetch(`${baseURL}${url}`, requestOptions, retries - 1)
              //       console.log("error", error)
              //     }
              //   })
              //   .then((result) => {
              //     console.log("reftch result ", result);
              //     return result;
              //   })
              //   .catch(error => {
              //     console.log(error)
              //     if (retries > 0) {
              //       retries - 1
              //       return fetch(`${baseURL}${url}`, requestOptions)
              //     }
              //   }
              //   );

              /**
               * (retryFetch returns fetch which recursively calls itself if the request fails)
               *
               * @param {*} url
               * @param {*} options
               * @param {integer} retries
               * @returns fetch
               */

              retryFetch = function retryFetch(url, options) {
                var retries = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
                var retryCodes = [401, 408, 500, 502, 503, 504, 522, 524];
                return fetch(url, options).then(function (response) {
                  console.log('STATUS', response.status);
                  if (response.status === 200) return response.json();

                  if (retries > 0 && retryCodes.includes(response.status)) {
                    console.log('retries ', retries);
                    return retryFetch(url, options, retries - 1);
                  } else {
                    throw new Error(response);
                  }
                })["catch"](console.error);
              };

              return _context.abrupt("return", retryFetch("".concat(baseURL).concat(url), requestOptions));

            case 15:
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
//# sourceMappingURL=main.cba64e996f2c9ec2ce5c.hot-update.js.map