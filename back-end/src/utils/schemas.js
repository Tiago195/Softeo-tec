const joi = require('joi').extend(require('@joi/date'));

const schemaNewUser = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().email().required(),
  phoneNumber: joi.string().length(11).required(),
  totalValue: joi.number(),
  qtyInstallments: joi.number(),
  service: joi.string()
});

const schemaDate = joi.object({
  gt: joi.date().format('YYYY-MM-DD'),
  lt: joi.date().format('YYYY-MM-DD'),
});

const schemaNewInstallment = joi.object({
  userId: joi.number().required(),
  totalValue: joi.number().required(),
  qtyInstallments: joi.number().min(1).max(10).required(),
  service: joi.string().required()
});

module.exports = {
  schemaNewUser,
  schemaDate,
  schemaNewInstallment
};