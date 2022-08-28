const generateErros = require('../utils/generateErrors');
const status = require('http-status-codes').default;

const validateQuery = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.query);

  if (error) throw generateErros('Invalid Date', status.BAD_REQUEST);

  next();
};

module.exports = validateQuery;