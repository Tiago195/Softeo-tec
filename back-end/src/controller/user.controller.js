const service = require('../services/user.service');

module.exports = {
  create: async (req, res) => {
    const { name, email, phoneNumber } = req.body;
    const newUser = { name, email, phoneNumber };

    const user = await service.create(newUser);

    return res.status(200).json(user);
  }
};