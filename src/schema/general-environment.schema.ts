import * as Joi from 'joi'

export default {
  PORT: Joi.number().default(3000),
  JWT_SECRET: Joi.string().required()
}
