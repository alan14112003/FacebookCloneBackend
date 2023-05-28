"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _ReactionController = _interopRequireDefault(require("../../../app/Http/Controllers/Users/ReactionController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// lấy ra bộ định tuyến
var router = _express["default"].Router();
router.route('/').get(_ReactionController["default"].all);
var _default = router;
exports["default"] = _default;