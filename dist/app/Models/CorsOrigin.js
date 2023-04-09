"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var corsOriginSchema = new _mongoose["default"].Schema({
  domain: String
});
var _default = _mongoose["default"].model('CorsOrigin', corsOriginSchema);
exports["default"] = _default;