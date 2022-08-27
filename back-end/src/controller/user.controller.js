const service = require('../services/user.service');

module.exports = {
  create: async (req, res) => {
    const { name } = req.body;
    const newUser = { name };

    const user = await service.create(newUser);

    return res.status(200).json(user);
  }
};