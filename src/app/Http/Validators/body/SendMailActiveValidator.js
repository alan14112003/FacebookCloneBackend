const Joi = require('joi')

const Schema = Joi.object({
  email: Joi.string().email().required(),
})

module.exports = Schema
