"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var Joi = require('joi');
var Schema = Joi.object({
  password: Joi.string().required().min(6)
});
var _default = Schema;
exports["default"] = _default;