"use strict";

var Joi = require("joi");
var idSchema = Joi.object({
  param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
});
module.exports = idSchema;