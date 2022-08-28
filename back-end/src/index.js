const express = require('express');
const error = require('./middlewares/error');
const userRouter = require('./routes/user.routes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.status(200).json('OK'));

app.use('/user', userRouter);

app.use(error);

module.exports = app;