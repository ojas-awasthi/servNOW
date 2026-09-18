const Joi = require("joi");

const createPaymentSchema = Joi.object({
  body: Joi.object({
    booking: Joi.string().required(),
    paymentMethod: Joi.string()
      .valid("card", "upi", "netbanking", "wallet", "mock")
      .required(),
  }),
  params: Joi.object(),
  query: Joi.object(),
});

const transactionIdSchema = Joi.object({
  body: Joi.object(),
  params: Joi.object({
    id: Joi.string().required(),
  }),
  query: Joi.object(),
});

module.exports = {
  createPaymentSchema,
  transactionIdSchema,
};