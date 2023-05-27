import Joi from 'joi'

const idSchema = Joi.object({
  content: Joi.string().required(),
  feeling_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  status: Joi.number(),
  images: Joi.array().items(Joi.string()),
  videos: Joi.array().items(Joi.string()),
})

export default idSchema
