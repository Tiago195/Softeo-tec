import formaterCurrency from './formaterCurrency';

export default (user) => formaterCurrency(user.reduce((a, b) => a += b.installments.reduce((a, b) => a += b.isPaid ? +b.value : 0, 0), 0));