const Joi = require("joi");

const idSchema = Joi.object({
  param: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

module.exports = idSchema;
