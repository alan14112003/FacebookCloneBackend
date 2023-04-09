"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.createToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var createToken = function createToken(payload) {
  var exp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '1y';
  return _jsonwebtoken["default"].sign(payload, process.env.SECRET_KEY_JWT, {
    expiresIn: exp
  });
};
exports.createToken = createToken;
var verifyToken = function verifyToken(token) {
  return _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY_JWT);
};
exports.verifyToken = verifyToken;