const serviceInstallment = require('../services/installment.service');
const status = require('http-status-codes').default;

module.exports = {
  create: async (req, res, next) => {
    const { userId, totalValue, qtyInstallments, service } = req.body;
    const newInstallments = { userId, totalValue, qtyInstallments, service };

    const installments = await serviceInstallment.create(newInstallments);

    return res.status(status.OK).json(installments);
  }
};