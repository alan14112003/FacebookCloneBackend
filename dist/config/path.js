"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var rootDir = _path["default"].resolve(__dirname, '..');
var appDir = "".concat(rootDir, "/app");
var _default = {
  rootDir: rootDir,
  appDir: appDir
};
exports["default"] = _default;