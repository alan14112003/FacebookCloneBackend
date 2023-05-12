"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _user = _interopRequireDefault(require("./user"));
var _friend = _interopRequireDefault(require("./friend"));
var _ValidateUserMiddleware = require("../../../app/Http/Middleware/ValidateUserMiddleware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// lấy ra bộ định tuyến
var router = _express["default"].Router();

// routes user
router.use('/users', _user["default"]);

// routes friend
router.use('/friends', _ValidateUserMiddleware.validateUser, _friend["default"]);
var _default = router;
exports["default"] = _default;