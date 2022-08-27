const express = require('express');
const userRouter = require('./routes/user.routes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.status(200).json('OK'));

app.use('/user', userRouter);

module.exports = app;