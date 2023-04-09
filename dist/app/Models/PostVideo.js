"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var postVideoSchema = new _mongoose["default"].Schema({
  src: {
    type: String,
    require: require
  },
  post_id: {
    type: 'ObjectId',
    ref: 'Post'
  }
});
var _default = _mongoose["default"].model('PostVideo', postVideoSchema, 'post_videos');
exports["default"] = _default;