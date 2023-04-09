"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _ValidateRouteMiddleware = require("../../app/Http/Middleware/ValidateRouteMiddleware");
var _ValidateUserMiddleware = require("../../app/Http/Middleware/ValidateUserMiddleware");
var _RegisterValidator = _interopRequireDefault(require("../../app/Http/Validators/body/RegisterValidator"));
var _SendMailActiveValidator = _interopRequireDefault(require("../../app/Http/Validators/body/SendMailActiveValidator"));
var _LoginValidator = _interopRequireDefault(require("../../app/Http/Validators/body/LoginValidator"));
var _AuthController = _interopRequireDefault(require("../../app/Http/Controllers/AuthController"));
var _PassportStrategy = _interopRequireDefault(require("../../config/PassportStrategy"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import passport from 'passport'

// lấy ra bộ định tuyến
var router = _express["default"].Router((0, _ValidateRouteMiddleware.validateBody)());
router.route('/token').get(_ValidateUserMiddleware.validateUser, function (req, res) {
  res.send(req.user);
});
router.route('/send-mail-active').post((0, _ValidateRouteMiddleware.validateBody)(_SendMailActiveValidator["default"]), _AuthController["default"].sendMailActive);
router.route('/callback/google').get(_PassportStrategy["default"].authenticate('google', {
  session: false
}), _AuthController["default"].callbackGoogle);
router.route('/login').post((0, _ValidateRouteMiddleware.validateBody)(_LoginValidator["default"]), _AuthController["default"].login);
router.route('/register').post((0, _ValidateRouteMiddleware.validateBody)(_RegisterValidator["default"]), _AuthController["default"].register);
router.route('/redirect/google').get(_PassportStrategy["default"].authenticate('google', {
  scope: ['email', 'profile']
}));
router.route('/verify-email').get(_AuthController["default"].verifyEmail);
var _default = router;
exports["default"] = _default;