import * as Joi from 'joi';

export const validationSchema: Joi.Schema = Joi.object({
  APP_PREFIX: Joi.string().required(),
  PORT: Joi.number().required(),
  ENCRYPT_SALT_ROUND: Joi.number().required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_USERNAME: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
}).options({
  abortEarly: true,
});
