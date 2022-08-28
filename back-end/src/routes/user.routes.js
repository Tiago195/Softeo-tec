const route = require('express').Router();
const user = require('../controller/user.controller');
const middlewares = require('../middlewares');
const schemas = require('../utils/schemas');

route.post('/create', middlewares.isValidBody(schemas.schemaNewUser), user.create);
route.get('/', middlewares.isValidQuery(schemas.schemaDate), user.getAll);
module.exports = route;