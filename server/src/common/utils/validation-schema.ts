import * as Joi from 'joi';

export const validationSchema: Joi.Schema = Joi.object({
  PORT: Joi.number().required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_USERNAME: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
}).options({
  abortEarly: true,
});
