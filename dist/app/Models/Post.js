"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _SoftDelete = _interopRequireDefault(require("../../config/SoftDelete"));
var _PostStatusEnum = _interopRequireDefault(require("../Enums/Posts/PostStatusEnum"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var postSchema = new _mongoose["default"].Schema({
  content: {
    type: String,
    require: require
  },
  user_id: {
    type: 'ObjectId',
    ref: 'User'
  },
  feeling_id: {
    type: 'ObjectId',
    ref: 'Feeling',
    "default": null
  },
  videos: [{
    type: 'ObjectId',
    ref: 'PostVideo'
  }],
  images: [{
    type: 'ObjectId',
    ref: 'PostImage'
  }],
  reactions: [{
    type: 'ObjectId',
    ref: 'PostReaction'
  }],
  comments: [{
    type: 'ObjectId',
    ref: 'Comment'
  }],
  status: {
    type: Number,
    "enum": Object.keys(_PostStatusEnum["default"].allName()).map(function (k) {
      return Number(k);
    }),
    "default": _PostStatusEnum["default"].PUBLIC
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
postSchema.plugin(_SoftDelete["default"], {
  overrideMethods: 'all',
  deleted_by: true,
  deleted_at: true
});
var _default = _mongoose["default"].model('Post', postSchema);
exports["default"] = _default;