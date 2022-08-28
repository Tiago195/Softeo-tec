const joi = require('joi');
const status = require('http-status-codes').default;

const generateErros = require('../utils/generateErros');

const schemaNewUser = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().email().required(),
  phoneNumber: joi.string().length(11).required(),
});

const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) throw generateErros(error.message, status.BAD_REQUEST);

  next();
};

module.exports = {
  validateBody,
  schemaNewUser
};