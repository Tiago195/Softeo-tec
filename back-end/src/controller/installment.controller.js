const service = require('../services/installment.service');
const status = require('http-status-codes').default;

module.exports = {
  create: async (req, res, next) => {
    const { userId, totalValue, qtyInstallments } = req.body;
    const newInstallments = { userId, totalValue, qtyInstallments };

    const installments = await service.create(newInstallments);

    return res.status(status.OK).json(installments);
  }
};