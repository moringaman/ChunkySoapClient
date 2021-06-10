exports.id = "main";
exports.modules = {

/***/ "./src/components/ui/ProductItem.js":
/*!******************************************!*\
  !*** ./src/components/ui/ProductItem.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_ui_productFrame__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../styles/ui/productFrame */ "./src/styles/ui/productFrame.js");
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-feather */ "react-feather");
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_feather__WEBPACK_IMPORTED_MODULE_5__);


var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/components/ui/ProductItem.js";

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n        &, ::before{\n        position: relative;\n        padding: 15px 25px 15px 0px ;\n        border-radius: 50px;\n        max-width: 360px;\n        min-width: 360px;\n        height: 20px;\n        background-color: #F6F2F2;\n        display: flex;\n        ", "\n        ", "\n        justify-content: space-between;\n        }\n        &::before {\n            content: '';\n            background-color: #EFB4F9;\n            min-width: 130px;\n            transform: translateY(-14px);\n            ", "\n            position: absolute;\n            color: white;\n        }\n\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n       &, ::after {\n        position: relative;\n        text-align: center;\n        padding: 15px 15px;\n        border-radius: 50px;\n        max-height: 20px;\n        max-width: 60px;\n        color: white;\n        background-color: #F9B233;\n        z-index: 10;\n        transform: translate(300px, -280px);\n       }\n "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

// import { useRouter } from 'next/router'



 // import { Router } from 'next/router'

var ProductItem = function ProductItem(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({}),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),
      product = _useState2[0],
      setProduct = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(false),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState3, 2),
      hovered = _useState4[0],
      setHovered = _useState4[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    if (props.product) {
      console.log("PRODUCT ", props.product);
      setProduct(props.product);
    }
  }, [props]);
  var product_picture_1 = product.product_picture_1,
      product_featured = product.product_featured,
      product_name = product.product_name,
      product_discount = product.product_discount,
      product_price = product.product_price,
      _id = product._id,
      categories = product.categories;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 25,
      marginTop: 25
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui_productFrame__WEBPACK_IMPORTED_MODULE_4__["default"], {
    onClick: function onClick() {
      return props.clickEvent(_id);
    },
    onMouseOver: function onMouseOver() {
      return setHovered(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHovered(false);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
    // src={props.image ? `http://localhost:1337${props.image.url}` : '/noimage.png'} 
    src: product_picture_1 ? "".concat(product_picture_1.url) : '/noimage.png',
    alt: "product-image",
    style: {
      maxHeight: 250
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_5__["Eye"], {
    color: "white",
    size: 36,
    style: {
      position: 'fixed',
      bottom: 30,
      right: 40,
      visibility: hovered ? 'visible' : 'hidden',
      transition: 'all 0.5 ease-in'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 17
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Pill, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h2", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 16
    }
  }, props.info)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h2", {
    style: {
      marginLeft: 10,
      fontSize: 24,
      marginTop: -15,
      marginBottom: 10
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 13
    }
  }, product_name && product_name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Prices, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h3", {
    style: {
      zIndex: 300,
      color: 'white',
      marginLeft: 15,
      fontSize: 20
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 17
    }
  }, categories && categories[0].category_name), product_discount > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h3", {
    style: {
      opacity: 0.3,
      marginLeft: 45,
      fontSize: 20,
      textDecoration: 'line-through'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 45
    }
  }, "\xA3  ", product_price.toFixed(2)) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h3", {
    style: {
      fontSize: 20
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 17
    }
  }, "\xA3", product_price - (product_price * product_discount / 100).toFixed(2))));
};

/* harmony default export */ __webpack_exports__["default"] = (ProductItem);
var Pill = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.div(_templateObject());
var Prices = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.div(_templateObject2(), ''
/* margin-top: 10px; */
, ''
/* z-index: 200; */
, ''
/* z-index: 300; */
);

/***/ })

};
//# sourceMappingURL=main.af5c6d49eeda8bd58dd1.hot-update.js.map