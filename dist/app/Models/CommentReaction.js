"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var CommentReactionSchema = new _mongoose["default"].Schema({
  comment_id: {
    type: 'ObjectId',
    ref: 'Comment'
  },
  reaction_id: {
    type: 'ObjectId',
    ref: 'Reaction'
  },
  user_id: {
    type: 'ObjectId',
    ref: 'User'
  }
});
var _default = _mongoose["default"].model('CommentReaction', CommentReactionSchema, 'comment_reaction');
exports["default"] = _default;