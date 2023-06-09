"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _PostController = _interopRequireDefault(require("../../../app/Http/Controllers/Users/PostController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// lấy ra bộ định tuyến
var router = _express["default"].Router();
router.route('/').post(_PostController["default"].create).get(_PostController["default"].all);
var _default = router;
exports["default"] = _default;