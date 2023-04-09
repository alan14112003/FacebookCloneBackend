"use strict";

var Joi = require('joi');
var Schema = Joi.object({
  email: Joi.string().email().required()
});
module.exports = Schema;