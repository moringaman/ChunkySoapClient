exports.id = "main";
exports.modules = {

/***/ "./src/containers/HomePage.js":
/*!************************************!*\
  !*** ./src/containers/HomePage.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HomePage; });
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../helpers */ "./src/helpers/index.js");
/* harmony import */ var _styles_layout__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../styles/layout */ "./src/styles/layout.js");
/* harmony import */ var _styles_typography__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../styles/typography */ "./src/styles/typography.js");
/* harmony import */ var _styles_ui__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../styles/ui */ "./src/styles/ui/index.js");
/* harmony import */ var _components_ui_ProductSlider__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/ui/ProductSlider */ "./src/components/ui/ProductSlider.js");
/* harmony import */ var _styles_components_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../styles/components/button */ "./src/styles/components/button.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../components */ "./src/components/index.js");
/* harmony import */ var _hooks_useModal__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../hooks/useModal */ "./src/hooks/useModal.js");
/* harmony import */ var _styles_variables__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../styles/variables */ "./src/styles/variables.js");
/* harmony import */ var _helpers_functions__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../helpers/functions */ "./src/helpers/functions.js");






var _jsxFileName = "/home/webnostix/Codebase/ChunkySoap2021/client/src/containers/HomePage.js";

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  overflow: hidden;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }















function HomePage(props) {
  var featured;
  var products = Object(react_redux__WEBPACK_IMPORTED_MODULE_7__["useSelector"])(function (state) {
    return state.products;
  });
  console.log('PRODUCTS ', products);

  if (products.length > 0) {
    featured = products.products.filter(function (el) {
      return el.product_featured === true;
    });
  }

  var popular = products === null || products === void 0 ? void 0 : products.products.sort(function (a, b) {
    return a.product_sold_quantity > b.product_sold_quantity ? 1 : -1;
  });
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_7__["useDispatch"])();
  var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_8__["useHistory"])();

  var _useModal = Object(_hooks_useModal__WEBPACK_IMPORTED_MODULE_17__["default"])({
    selectedProduct: selectedProduct,
    products: products
  }),
      isShowing = _useModal.isShowing,
      toggle = _useModal.toggle;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_6__["useState"])({}),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5___default()(_useState, 2),
      selectedProduct = _useState2[0],
      setSelectedProduct = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_6__["useState"])([]),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5___default()(_useState3, 2),
      currentCart = _useState4[0],
      setCurrentCart = _useState4[1];

  var envVar = "sk_test_rvboOk0S3wSR1tPGYuzzcjpV"; // Optin State - later add to custom optin hook

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_6__["useState"])({
    'email': ''
  }),
      _useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5___default()(_useState5, 2),
      optinMail = _useState6[0],
      setOptinMail = _useState6[1];

  Object(react__WEBPACK_IMPORTED_MODULE_6__["useEffect"])(function () {
    console.log("KEYS: ", envVar);

    if (process.browser) {
      var cartInStorage = localStorage.getItem("soap-cart");

      if (cartInStorage) {
        setCurrentCart(JSON.parse(cartInStorage));
        dispatch({
          type: "SET_INITIAL_BASKET",
          payload: JSON.parse(cartInStorage)
        });
      }
    }

    if (products.products.length) return;

    _apiCall();
  }, []);

  var _apiCall = /*#__PURE__*/function () {
    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee() {
      var res;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _helpers__WEBPACK_IMPORTED_MODULE_10__["myApi"].send("/products", "GET", undefined, "public");

            case 2:
              res = _context.sent;
              console.log("MYAPI PRODUCTS ", res);
              dispatch({
                type: "FETCH_PRODUCTS",
                payload: res
              });
              console.log("HOME PROPS ", props);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function _apiCall() {
      return _ref.apply(this, arguments);
    };
  }();

  Object(react__WEBPACK_IMPORTED_MODULE_6__["useEffect"])(function () {
    console.log("Changed Cart", currentCart);
  }, [currentCart]);

  var handleClick = function handleClick(id) {
    console.log("event");
    var selected = products.products.filter(function (product) {
      return product.id === id;
    });
    setSelectedProduct(selected[0]);
    console.log("SELECTED", selectedProduct);
    toggle();
  };

  var viewProduct = function viewProduct(id) {
    history.push("/product/".concat(id));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_6___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_11__["Hero"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("img", {
    src: "/drips.png",
    alt: "drips",
    style: {
      "float": "right",
      width: "500px",
      transform: "translateY(-30px)"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("img", {
    src: "/logo-big.svg",
    alt: "chunky soap",
    style: {
      "float": "left",
      width: "450px",
      transform: "translateX(-40px)"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("img", {
    className: "girl-pic",
    src: "/girl.webp",
    alt: "chunky soap girl",
    style: {
      position: "absolute",
      width: "480px",
      transform: "translateX(-120px)",
      top: 188
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 9
    }
  }), _styles_variables__WEBPACK_IMPORTED_MODULE_18__["heroBubbles"].map(function (b, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_styles_ui__WEBPACK_IMPORTED_MODULE_13__["Bubble"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, b, {
      key: i,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 112,
        columnNumber: 11
      }
    }));
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
    style: {
      top: 260,
      left: "800px",
      width: 550,
      position: "absolute"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_12__["BannerHeading"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 11
    }
  }, "Natural soap bars & creams for all skin types"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_12__["BannerHeading2"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 120,
      columnNumber: 11
    }
  }, "Because beauty is a fragile gift.."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_styles_components_button__WEBPACK_IMPORTED_MODULE_15__["default"], {
    primary: true,
    big: true,
    style: {
      marginLeft: '70px',
      marginTop: '50px'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 121,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
    className: "script-font",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 122,
      columnNumber: 13
    }
  }, "Visit Shop")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_styles_layout__WEBPACK_IMPORTED_MODULE_11__["Container"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 128,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Bubbles, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 129,
      columnNumber: 9
    }
  }, _styles_variables__WEBPACK_IMPORTED_MODULE_18__["bodyBubbles"].map(function (b, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_styles_ui__WEBPACK_IMPORTED_MODULE_13__["Bubble"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, b, {
      key: i,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 131,
        columnNumber: 13
      }
    }));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_16__["ProductSearch"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 134,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_12__["SectionHeading"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 135,
      columnNumber: 9
    }
  }, "Featured Products"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components_ui_ProductSlider__WEBPACK_IMPORTED_MODULE_14__["default"], {
    perPage: 3,
    data: featured,
    handleClick: handleClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 136,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_16__["CategoryRow"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 137,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_styles_typography__WEBPACK_IMPORTED_MODULE_12__["SectionHeading"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 138,
      columnNumber: 9
    }
  }, "Most Popular Products"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components_ui_ProductSlider__WEBPACK_IMPORTED_MODULE_14__["default"], {
    perPage: 3,
    data: popular,
    handleClick: handleClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 139,
      columnNumber: 9
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
    style: {
      marginTop: '-100px'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 141,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_16__["OptIn"], {
    cols: "100%",
    height: 200,
    valid: false,
    loading: false,
    btnText: "Subscribe",
    placeholder: "your email address",
    label: "Subscribe to our newsletter to get special deals",
    handleChange: function handleChange(e) {
      setOptinMail(_objectSpread(_objectSpread({}, optinMail), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, 'email', e.target.value)));
    },
    handleSubmit: function handleSubmit() {
      console.log('submitting: ', optinMail);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 7
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_16__["Footer"], {
    height: 800,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 154,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_16__["Modal"], {
    isShowing: isShowing,
    hide: toggle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 155,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_16__["ProductPreview"], {
    product: selectedProduct,
    viewProduct: viewProduct,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 156,
      columnNumber: 9
    }
  })));
}
var Bubbles = styled_components__WEBPACK_IMPORTED_MODULE_9___default.a.div(_templateObject());

/***/ })

};
//# sourceMappingURL=main.c1226022860c096472dd.hot-update.js.map