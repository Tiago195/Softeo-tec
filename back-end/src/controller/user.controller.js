const service = require('../services/user.service');
const status = require('http-status-codes').default;

module.exports = {
  create: async (req, res) => {
    const { name, email, phoneNumber } = req.body;
    const newUser = { name, email, phoneNumber };

    const user = await service.create(newUser);

    return res.status(200).json(user);
  },
  getAll: async (req, res) => {
    const { gt, lt } = req.query;
    // console.log(gt, lt);
    const users = await service.getAll(gt, lt);

    return res.status(status.OK).json(users);
  }
};