exports.id = "main";
exports.modules = {

/***/ "./src/components/ui/Category.js":
/*!***************************************!*\
  !*** ./src/components/ui/Category.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../styles/ui */ "./src/styles/ui/index.js");
/* harmony import */ var _styles_typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../styles/typography */ "./src/styles/typography.js");
/* harmony import */ var _styles_variables__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../styles/variables */ "./src/styles/variables.js");

var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/ui/Category.js";

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    width: 40px;\n    height: 40px;\n    border-radius: 50%;\n    background-color:", ";\n    margin-right: 20px;\n    ", "\n    ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}








var Category = function Category(_ref) {
  var name = _ref.name,
      id = _ref.id,
      image = _ref.image;
  var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["useHistory"])();

  var navigate = function navigate(id) {
    history.push("/category/".concat(id));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_ui__WEBPACK_IMPORTED_MODULE_4__["CategoryFrame"], {
    onClick: function onClick() {
      return navigate(id);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: image,
    style: {
      height: 250,
      transform: 'rotate(10deg) translateY(20px)'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 13
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    style: {
      transform: 'translateY(150px) rotate(10deg)',
      display: 'flex',
      alignItems: 'center'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Dot, {
    name: name,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 13
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_5__["Heading2"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 13
    }
  }, name))));
};

/* harmony default export */ __webpack_exports__["default"] = (Category);
var Dot = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject(), _styles_variables__WEBPACK_IMPORTED_MODULE_6__["palette"].secondayColor, function (props) {
  return props.name === 'Soaps' && "\n        background-color: ".concat(_styles_variables__WEBPACK_IMPORTED_MODULE_6__["palette"].tertiaryColor, "\n    ");
}, function (props) {
  return props.name === 'Shampoo' && "\n        background-color: ".concat(_styles_variables__WEBPACK_IMPORTED_MODULE_6__["palette"].primaryColor, "\n    ");
});

/***/ })

};
//# sourceMappingURL=main.bdbe541c8cd471906eb3.hot-update.js.map