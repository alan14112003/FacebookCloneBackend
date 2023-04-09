"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var PostStatusEnum = /*#__PURE__*/function () {
  function PostStatusEnum() {
    _classCallCheck(this, PostStatusEnum);
  }
  _createClass(PostStatusEnum, null, [{
    key: "allName",
    value: function allName() {
      var _ref;
      return _ref = {}, _defineProperty(_ref, this.ONLY_ME, 'chỉ mình tôi'), _defineProperty(_ref, this.FRIENDS, 'bạn bè'), _defineProperty(_ref, this.PUBLIC, 'công khai'), _ref;
    }
  }, {
    key: "getNameByValue",
    value: function getNameByValue(value) {
      return this.allName()[value];
    }
  }]);
  return PostStatusEnum;
}();
_defineProperty(PostStatusEnum, "ONLY_ME", 0);
_defineProperty(PostStatusEnum, "FRIENDS", 1);
_defineProperty(PostStatusEnum, "PUBLIC", 2);
var _default = PostStatusEnum;
exports["default"] = _default;