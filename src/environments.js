import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const envSchema = Joi.object({
  CLIENTID: Joi.string().required(),
  CLIENTSECRET: Joi.string().required(),
  PORT: Joi.number().default(5000),
  JWTSECREATE: Joi.string().required(),
})
  .unknown()
  .required();

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Env vars validation error: ${error.message}`);
}

export const port = value.PORT;
export const clientID = value.CLIENTID;
export const clientsecret = value.CLIENTSECRET;
export const jwtSecret = value.JWTSECREATE;
