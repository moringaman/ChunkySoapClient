exports.id = "main";
exports.modules = {

/***/ "./src/components/ui/ShippingOption.js":
/*!*********************************************!*\
  !*** ./src/components/ui/ShippingOption.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "@babel/runtime/helpers/objectWithoutProperties");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../styles/typography */ "./src/styles/typography.js");


var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/ui/ShippingOption.js";

function _templateObject4() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    transform: translateY(-20px);\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        border: 3px #79CBB7 solid;\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    width: 550px;\n    height: 80px;\n    padding: 20px 40px;\n    border: 3px #F7F2F2 solid;\n    border-radius: 10px;\n    margin: 20px 0px 0px 0px;\n    cursor: pointer;\n    ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n     opacity: 0;\n     position: fixed;\n     width: 0;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}





var ShippingOption = function ShippingOption(_ref) {
  var option = _ref.option,
      checked = _ref.checked,
      selected = _ref.selected,
      rest = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref, ["option", "checked", "selected"]);

  var handleSelection = function handleSelection(_id) {
    console.log("touched", _id);
    checked(_id);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Label, {
    htmlFor: option.id,
    selected: selected === option.id,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 8
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Option, {
    type: "radio",
    name: "delivery",
    id: option.id,
    value: option.id,
    onChange: function onChange() {
      return handleSelection(option.id);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 8
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(CarrierOption, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 8
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
    src: "".concat(option.shipping_image.formats.thumbnail.url),
    style: {
      maxHeight: 60,
      maxWidth: 120,
      marginRight: 20
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 13
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_4__["Paragraph"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 13
    }
  }, option.shipping_carrier, " - ", option.shipping_description, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 74
    }
  }), "Price:  \xA3 ", option.shipping_cost.toFixed(2))));
};

/* harmony default export */ __webpack_exports__["default"] = (ShippingOption);
var Option = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.input(_templateObject());
var Label = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.label(_templateObject2(), function (props) {
  return props.selected && Object(styled_components__WEBPACK_IMPORTED_MODULE_3__["css"])(_templateObject3());
});
var CarrierOption = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.div(_templateObject4());

/***/ })

};
//# sourceMappingURL=main.d374a43e39b8981d11b5.hot-update.js.map