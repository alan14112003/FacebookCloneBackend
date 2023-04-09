const Joi = require('joi')
import userGenderEnum from '~/app/Enums/Users/UserGenderEnum'

const Schema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  birthdate: Joi.date().max('now').required(),
  gender: Joi.number()
    .integer()
    .valid(...Object.keys(userGenderEnum.allName()).map((k) => Number(k))),
})

export default Schema
