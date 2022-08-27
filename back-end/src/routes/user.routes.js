const route = require('express').Router();
const user = require('../controller/user.controller');

route.post('/create', user.create);

module.exports = route;