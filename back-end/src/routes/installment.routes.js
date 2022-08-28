const route = require('express').Router();
const installment = require('../controller/installment.controller');

route.post('/create', installment.create);

module.exports = route;