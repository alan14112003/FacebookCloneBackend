"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var idSchema = _joi["default"].object({
  content: _joi["default"].string().required(),
  feeling_id: _joi["default"].string().regex(/^[0-9a-fA-F]{24}$/),
  status: _joi["default"].number(),
  images: _joi["default"].array().items(_joi["default"].string()),
  videos: _joi["default"].array().items(_joi["default"].string())
});
var _default = idSchema;
exports["default"] = _default;