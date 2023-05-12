const Joi = require('joi')

const Schema = Joi.object({
  password: Joi.string().required().min(6),
})

export default Schema
