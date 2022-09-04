import formaterCurrency from './formaterCurrency';

export default (user) => formaterCurrency(user.reduce((a, b) => a + +b.installments.reduce((a, b) => +a + +b.value, 0), 0));