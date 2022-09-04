const serviceInstallment = require('../services/installment.service');
const status = require('http-status-codes').default;

module.exports = {
  create: async (req, res) => {
    const { userId, totalValue, qtyInstallments, service } = req.body;
    const newInstallments = { userId, totalValue, qtyInstallments, service };

    const installments = await serviceInstallment.create(newInstallments);

    return res.status(status.OK).json(installments);
  },
  paid: async (req, res) => {
    const { id } = req.params;

    await serviceInstallment.paid(id);

    return res.status(204).end();
  }
};