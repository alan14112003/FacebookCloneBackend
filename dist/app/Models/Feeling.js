"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var feelingSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    require: require
  },
  src: String
});
var _default = _mongoose["default"].model('Feeling', feelingSchema);
exports["default"] = _default;