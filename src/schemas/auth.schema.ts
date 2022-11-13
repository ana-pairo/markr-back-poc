import joi from "joi";

const signUpSCHEMA = joi.object({
  name: joi
    .string()
    .required()
    .trim()
    .regex(/^[a-zA-ZÀ-ü]+(?:\s[a-zA-ZÀ-ü]+)*$/),
  email: joi.string().email().required(),
  password: joi
    .string()
    .required()
    .min(5)
    .regex(/\d/)
    .regex(/[A-Z]/)
    .regex(/[^A-Z a-z0-9]/),
});

const signInSCHEMA = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().trim(),
});

export { signInSCHEMA, signUpSCHEMA };
