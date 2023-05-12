"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _FriendController = _interopRequireDefault(require("../../../app/Http/Controllers/Users/FriendController"));
var _ValidateRouteMiddleware = require("../../../app/Http/Middleware/ValidateRouteMiddleware");
var _IdValidator = _interopRequireDefault(require("../../../app/Http/Validators/param/IdValidator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// lấy ra bộ định tuyến
var router = _express["default"].Router();
router.route('/').get(_FriendController["default"].allFriend);
router.route('/add_friend/:id').post((0, _ValidateRouteMiddleware.validateParam)(_IdValidator["default"], 'id'), _FriendController["default"].addFriend);
router.route('/accept_friend/:id').post((0, _ValidateRouteMiddleware.validateParam)(_IdValidator["default"], 'id'), _FriendController["default"].acceptFriend);
var _default = router;
exports["default"] = _default;