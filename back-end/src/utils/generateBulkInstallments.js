const currentDate = new Date();

module.exports = (newInstallment) => (
  Array.from({ length: newInstallment.qtyInstallments })
    .map((_el, index) => ({
      userId: newInstallment.userId,
      value: (newInstallment.totalValue / newInstallment.qtyInstallments).toFixed(2),
      month: new Date(currentDate.getFullYear(), currentDate.getMonth() + index + 1, 5)
    }))
);