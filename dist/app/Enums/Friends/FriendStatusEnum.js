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
var FriendStatusEnum = /*#__PURE__*/function () {
  function FriendStatusEnum() {
    _classCallCheck(this, FriendStatusEnum);
  }
  _createClass(FriendStatusEnum, null, [{
    key: "allName",
    value: function allName() {
      var _ref;
      return _ref = {}, _defineProperty(_ref, this.REQUEST, 'yêu cầu'), _defineProperty(_ref, this.FOLLOW, 'theo dõi'), _defineProperty(_ref, this.CONNECT, 'bạn bè'), _defineProperty(_ref, this.BEST, 'bạn thân'), _defineProperty(_ref, this.FAVOURITE, 'yêu thích'), _ref;
    }
  }, {
    key: "getNameByValue",
    value: function getNameByValue(value) {
      return this.allName()[value];
    }
  }]);
  return FriendStatusEnum;
}();
_defineProperty(FriendStatusEnum, "REQUEST", 0);
_defineProperty(FriendStatusEnum, "FOLLOW", 1);
_defineProperty(FriendStatusEnum, "CONNECT", 2);
_defineProperty(FriendStatusEnum, "BEST", 3);
_defineProperty(FriendStatusEnum, "FAVOURITE", 4);
var _default = FriendStatusEnum;
exports["default"] = _default;