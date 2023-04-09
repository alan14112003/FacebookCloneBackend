"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var commentSchema = new _mongoose["default"].Schema({
  content: {
    type: String,
    require: require
  },
  post_id: {
    type: 'ObjectId',
    ref: 'Post'
  },
  user_id: {
    type: 'ObjectId',
    ref: 'User'
  },
  re_comment_id: {
    type: 'ObjectId',
    ref: 'Comment',
    "default": null
  },
  reactions: [{
    type: 'ObjectId',
    ref: 'CommentReaction'
  }]
});
var _default = _mongoose["default"].model('Comment', commentSchema);
exports["default"] = _default;