export default (value) => {
  const format = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' };
  const currency = (+value).toLocaleString('pt-BR', format);
  return currency;
};