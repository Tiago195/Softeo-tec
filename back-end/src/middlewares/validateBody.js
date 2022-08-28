const status = require('http-status-codes').default;

const generateErros = require('../utils/generateErrors');

const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) throw generateErros(error.message, status.BAD_REQUEST);

  next();
};



module.exports = validateBody;