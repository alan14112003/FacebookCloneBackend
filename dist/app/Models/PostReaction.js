"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var postReactionSchema = new _mongoose["default"].Schema({
  post_id: {
    type: 'ObjectId',
    ref: 'Post'
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
var _default = _mongoose["default"].model('PostReaction', postReactionSchema, 'post_reaction');
exports["default"] = _default;