"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var hobbySchema = new _mongoose["default"].Schema({
  name: String,
  icon: String
});
var _default = _mongoose["default"].model('Hobby', hobbySchema);
exports["default"] = _default;