const route = require('express').Router();
const installment = require('../controller/installment.controller');
const middlewares = require('../middlewares');
const schemas = require('../utils/schemas');

route.post('/create', middlewares.isValidBody(schemas.schemaNewInstallment), installment.create);
route.patch('/paid/:id', installment.paid);

module.exports = route;