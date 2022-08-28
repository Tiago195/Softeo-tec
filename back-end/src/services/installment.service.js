const { Installment } = require('../database/models');
const generateBulkInstallments = require('../utils/generateBulkInstallments');
const generateErrors = require('../utils/generateErrors');
const status = require('http-status-codes').default;


module.exports = {
  create: async (newInstallment) => {
    const user = await await Installment.findOne({ userId: newInstallment.userId });
    if (!user) throw generateErrors('User not found', status.BAD_REQUEST);

    const bulkInstallments = generateBulkInstallments(newInstallment);
    const installments = await Installment.bulkCreate(bulkInstallments);

    return installments;
  },
};