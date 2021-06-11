exports.id = "main";
exports.modules = {

/***/ "./src/containers/CheckoutPage.js":
/*!****************************************!*\
  !*** ./src/containers/CheckoutPage.js ***!
  \****************************************/
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
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/layout */ "./src/styles/layout.js");
/* harmony import */ var _components_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/ui */ "./src/components/ui/index.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components */ "./src/components/index.js");
/* harmony import */ var _styles_ui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styles/ui */ "./src/styles/ui/index.js");
/* harmony import */ var _styles_typography__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../styles/typography */ "./src/styles/typography.js");
/* harmony import */ var _styles_ui_basket__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../styles/ui/basket */ "./src/styles/ui/basket.js");
/* harmony import */ var _styles_variables__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../styles/variables */ "./src/styles/variables.js");
/* harmony import */ var _helpers_functions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../helpers/functions */ "./src/helpers/functions.js");


var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/containers/CheckoutPage.js";

function _templateObject4() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  position: absolute;\n   min-width: 750px;\n   margin-top: 10px;\n   ", "\n   left: 12%;\n   text-align: center;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    flex: 1.3;\n    ", "\n    min-width: 450px;\n    min-height: 800px;\n    margin-top: 40px;\n    padding: 20px 10px;\n       &::-webkit-scrollbar {\n        display: none;\n        }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    width: 50%;\n    min-width: 700px;\n    flex: 2;\n    padding: 0px;\n    margin: 0px 10px 20px 10px;   \n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n    display: flex;\n    flex-wrap: wrap;\n    max-width: 1394px;\n    margin: 50px auto;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}













var CheckoutPage = function CheckoutPage() {
  // do logged in check
  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useSelector"])(function (state) {
    return state.basket;
  }),
      basket = _useSelector.basket;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(0),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),
      total = _useState2[0],
      setTotal = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(0.00),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState3, 2),
      postage = _useState4[0],
      setPostage = _useState4[1];

  var initialState = {
    step: 1
  };

  var _useReducer = Object(react__WEBPACK_IMPORTED_MODULE_2__["useReducer"])(_components__WEBPACK_IMPORTED_MODULE_7__["checkoutReducer"], initialState),
      _useReducer2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useReducer, 2),
      cartState = _useReducer2[0],
      cartDispatch = _useReducer2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    if (_helpers_functions__WEBPACK_IMPORTED_MODULE_12__["getCartTotal"](basket.products) < 25 || basket.postage > 4) {
      console.log("BASKET POSTAGE ", basket.postage);
      setPostage(basket.postage || 0.00);
    } else {
      setPostage(0);
    }

    setTotal(_helpers_functions__WEBPACK_IMPORTED_MODULE_12__["getCartTotal"](basket.products, postage));
  }, [basket]);
  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    setTotal(_helpers_functions__WEBPACK_IMPORTED_MODULE_12__["getCartTotal"](basket.products, postage));
  }, [postage]); // const handleChange = (e) => {
  //     console.log("EVENT ", e.target.value, e.target.name)
  // }

  var steps = [{
    no: 1,
    label: 'Account'
  }, {
    no: 2,
    label: 'Shipping'
  }, {
    no: 3,
    label: 'Payment'
  }, {
    no: 4,
    label: 'Success'
  }];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
    src: "/drips-dark.svg",
    style: {
      position: 'absolute',
      right: 0,
      top: 0,
      width: 500,
      zIndex: 0
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 13
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_5__["Section"], {
    light: true,
    height: 1500,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_5__["Container"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_9__["Heading1"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 21
    }
  }, "Checkout"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(CheckoutWrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(CheckoutActions, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_7__["CheckoutSteps"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 25
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(BasketSection, {
    style: {
      borderLeft: '1px solid #D8D8D8'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_10__["BasketWrapper"], {
    style: {
      transform: 'translateY(-120px)'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_10__["ProductRow"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_9__["Heading2"], {
    style: {
      flex: 3
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 21
    }
  }, "Your Basket")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    style: {
      maxHeight: 700
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 17
    }
  }, basket.products.length > 0 ? basket.products.map(function (el) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_10__["ProductRow"], {
      key: el._id,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 68,
        columnNumber: 25
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_9__["Paragraph"], {
      style: {
        flex: 1
      },
      big: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 69,
        columnNumber: 25
      }
    }, el.product_qty, " x"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui__WEBPACK_IMPORTED_MODULE_8__["ProductFrame"], {
      sml: true,
      style: {
        flex: 1,
        marginRight: 20
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 72,
        columnNumber: 29
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
      src: el.product_picture_1,
      style: {
        display: 'block',
        maxHeight: '70px',
        maxWidth: '70px',
        width: 'auto',
        height: 'auto'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 73,
        columnNumber: 33
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      style: {
        flex: 3,
        paddingRight: 20
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 80,
        columnNumber: 29
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_9__["Paragraph"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 81,
        columnNumber: 29
      }
    }, el.product_name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      style: {
        flex: 1,
        marginRight: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 85,
        columnNumber: 29
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_9__["Paragraph"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 86,
        columnNumber: 33
      }
    }, "\xA3", el.total_price.toFixed(2))));
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_9__["Heading2"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 26
    }
  }, "You Dont Have any Items in you basket yet")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_10__["ProductRow"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_10__["Divider"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 25
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_10__["ProductRow"], {
    narrow: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_ui__WEBPACK_IMPORTED_MODULE_6__["SimpleTextInput"], {
    withButton: true,
    buttonText: "Apply",
    label: "Redeem Coupon / Discount Code",
    type: "text",
    placeholder: "COUPON CODE",
    handleChange: function handleChange() {},
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 29
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_10__["ProductRow"], {
    narrow: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101,
      columnNumber: 21
    }
  }, "Subtotal. \xA3 ", _helpers_functions__WEBPACK_IMPORTED_MODULE_12__["getCartTotal"](basket.products).toFixed(2)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_10__["ProductRow"], {
    narrow: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 21
    }
  }, "Postage. \xA3", postage.toFixed(2)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_10__["ProductRow"], {
    narrow: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 21
    }
  }, "Sales Tax. \xA3 ", 0.00.toFixed(2)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_ui_basket__WEBPACK_IMPORTED_MODULE_10__["ProductRow"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_9__["Heading1"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111,
      columnNumber: 25
    }
  }, "Total. \xA3", total.toFixed(2)))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (CheckoutPage);
var CheckoutWrapper = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div(_templateObject());
var CheckoutActions = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div(_templateObject2());
var BasketSection = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div(_templateObject3(), ''
/* border: 1px solid gray; */
);
var Steps = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div(_templateObject4(), ''
/* right: 40%; */
);

/***/ })

};
//# sourceMappingURL=main.007ff6909ab64017f9fb.hot-update.js.map