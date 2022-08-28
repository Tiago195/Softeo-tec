const joi = require('joi').extend(require('@joi/date'));

const schemaNewUser = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().email().required(),
  phoneNumber: joi.string().length(11).required(),
});

const schemaDate = joi.object({
  gt: joi.date().format('YYYY-MM-DD'),
  lt: joi.date().format('YYYY-MM-DD'),
});

module.exports = {
  schemaNewUser,
  schemaDate
};