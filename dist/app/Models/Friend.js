"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _FriendStatusEnum = _interopRequireDefault(require("../Enums/Friends/FriendStatusEnum"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var friendSchema = new _mongoose["default"].Schema({
  user_from_id: {
    type: 'ObjectId',
    ref: 'User'
  },
  user_to_id: {
    type: 'ObjectId',
    ref: 'User'
  },
  status: {
    type: Number,
    "enum": Object.keys(_FriendStatusEnum["default"].allName()).map(function (k) {
      return Number(k);
    }),
    "default": _FriendStatusEnum["default"].REQUEST
  }
});
var _default = _mongoose["default"].model('Friend', friendSchema);
exports["default"] = _default;