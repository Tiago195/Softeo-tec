const service = require('../services/user.service');
const status = require('http-status-codes').default;

module.exports = {
  create: async (req, res) => {
    const user = await service.create(req.body);

    return res.status(200).json(user);
  },
  getAll: async (req, res) => {
    const { gt, lt } = req.query;
    // console.log(gt, lt);
    const users = await service.getAll(gt, lt);

    return res.status(status.OK).json(users);
  }
};