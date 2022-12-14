const { Installment, User } = require('../database/models');
const generateBulkInstallments = require('../utils/generateBulkInstallments');
const generateErrors = require('../utils/generateErrors');
const status = require('http-status-codes').default;


module.exports = {
  create: async (newInstallment) => {
    const user = await User.findByPk(newInstallment.userId);

    if (!user) throw generateErrors('User not found', status.NOT_FOUND);

    const bulkInstallments = generateBulkInstallments(newInstallment);
    const installments = await Installment.bulkCreate(bulkInstallments);

    return installments;
  },
  paid: async (id) => {
    const installment = await Installment.findByPk(id);

    if (!installment) throw generateErrors('Installment not found', status.NOT_FOUND);

    await Installment.update({ isPaid: 1 }, { where: { id } });
  }
};