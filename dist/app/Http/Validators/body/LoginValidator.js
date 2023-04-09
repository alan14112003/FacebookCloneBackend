"use strict";

var Joi = require('joi');
var Schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6)
});
module.exports = Schema;