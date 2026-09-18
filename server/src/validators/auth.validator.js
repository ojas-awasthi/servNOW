const Joi = require("joi");

const registerSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().allow("").optional(),
  }),
  params: Joi.object(),
  query: Joi.object(),
});

const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  params: Joi.object(),
  query: Joi.object(),
});

module.exports = {
  registerSchema,
  loginSchema,
};