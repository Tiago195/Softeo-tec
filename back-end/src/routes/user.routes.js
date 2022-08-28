const route = require('express').Router();
const user = require('../controller/user.controller');
const { schemaNewUser, validateBody } = require('../middlewares/validateBody');

route.post('/create', validateBody(schemaNewUser), user.create);
module.exports = route;