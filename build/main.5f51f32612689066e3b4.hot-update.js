exports.id = "main";
exports.modules = {

/***/ "./src/components/ui/ProductSlider.js":
/*!********************************************!*\
  !*** ./src/components/ui/ProductSlider.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "@babel/runtime/helpers/toConsumableArray");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "@babel/runtime/helpers/objectWithoutProperties");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ProductItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ProductItem */ "./src/components/ui/ProductItem.js");
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../styles/layout */ "./src/styles/layout.js");





var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/ui/ProductSlider.js";

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n      background-color: black;\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  border: none;\n  border-radius: 50%;\n  background-color: gray;\n  cursor: pointer;\n  width: 15px;\n  height: 15px;\n  margin: 8px;\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: flex;\n  height: 50px;\n  width: 100%;\n  flex-direction: row;\n  justify-content: center;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}






var ProductSlider = function ProductSlider(_ref) {
  var data = _ref.data,
      handleClick = _ref.handleClick,
      perPage = _ref.perPage,
      rest = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_4___default()(_ref, ["data", "handleClick", "perPage"]);

  // TODO: Add dots with data array slice
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])([]),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_useState, 2),
      sliceArray = _useState2[0],
      setSliceArray = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(1),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_useState3, 2),
      currentPage = _useState4[0],
      setCurrentPage = _useState4[1];

  var productsPerPage = perPage;
  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    if (data && data.length > 0) {
      var slices = data.length / productsPerPage;
      setSliceArray(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(Array(slices)));
    }
  }, [data]);

  var selectPage = function selectPage(e) {
    setCurrentPage(e.target.value);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment, null, data && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_8__["SlideGrid"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, rest, {
    mb: '100px',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 7
    }
  }), data.length > 1 ? data.slice(currentPage === 1 ? 0 : currentPage * productsPerPage, productsPerPage).map(function (product, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_ProductItem__WEBPACK_IMPORTED_MODULE_7__["default"], {
      product: product,
      info: "New",
      key: i,
      clickEvent: handleClick,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 15
      }
    });
  }) : [data].map(function (product, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_ProductItem__WEBPACK_IMPORTED_MODULE_7__["default"], {
      product: product,
      info: "New",
      key: i,
      clickEvent: handleClick,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 43,
        columnNumber: 15
      }
    });
  })), data && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Dots, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 7
    }
  }, data.length > 3 && sliceArray.map(function (el, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Dot, {
      page: currentPage,
      value: i + 1,
      key: i,
      onClick: function onClick(e) {
        return selectPage(e);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 13
      }
    });
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (ProductSlider);
var Dots = styled_components__WEBPACK_IMPORTED_MODULE_6___default.a.div(_templateObject());
var Dot = styled_components__WEBPACK_IMPORTED_MODULE_6___default.a.button(_templateObject2(), function (props) {
  return props.page === props.value && Object(styled_components__WEBPACK_IMPORTED_MODULE_6__["css"])(_templateObject3());
});

/***/ })

};
//# sourceMappingURL=main.5f51f32612689066e3b4.hot-update.js.map