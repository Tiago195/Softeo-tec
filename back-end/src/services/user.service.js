const { User, Installment } = require('../database/models');
const { Op } = require('sequelize');

const currentDate = new Date(new Date().getFullYear(), new Date().getMonth());

module.exports = {
  create: async (newUser) => {
    // console.log(newUser);
    const user = await User.create(newUser);

    return user;
  },
  getAll: async (gt = currentDate, lt) => {
    const dateGT = new Date(gt);
    const dateLT = new Date(lt);

    const users = await User.findAll({
      include: {
        model: Installment,
        where: { month: { [Op.gte]: dateGT, [Op.lte]: dateLT } },
        as: 'installments'
      }
    });

    return users;
  }
};