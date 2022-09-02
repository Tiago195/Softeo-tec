const { User, Installment } = require('../database/models');
const installmentsService = require('./installment.service');
const { Op } = require('sequelize');

const currentDate = new Date(new Date().getFullYear(), new Date().getMonth());

module.exports = {
  create: async (newUser) => {
    const { name, email, phoneNumber, totalValue, qtyInstallments, service } = newUser;

    let response = await User.create({ name, email, phoneNumber });

    if (totalValue && qtyInstallments && service) {
      const createIntallMentes = await installmentsService.create({ totalValue, qtyInstallments, userId: response.id, service });
      response.dataValues.installments = createIntallMentes;
    }

    return response;
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