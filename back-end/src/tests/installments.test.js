const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it, before, after } = require('mocha');
const app = require('../index');
const { Installment } = require('../database/models');
const installmentsMock = require('./mocks/installments');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração na rota de parcelas', () => {
  describe('Verbo POST, rota "/installment/create"', () => {
    const url = '/installment/create';
    let installments;
    const newValidInstallMents = {
      userId: 2,
      totalValue: 150,
      qtyInstallments: 3
    };
    before(() => {
      sinon.stub(Installment, 'findOne').resolves(true);
      sinon.stub(Installment, 'bulkCreate').resolves(installmentsMock);
    });

    after(() => {
      Installment.bulkCreate.restore();
      Installment.findOne.restore();
    });

    it('Caso de sucesso', async () => {
      installments = await chai.request(app).post(url).send(newValidInstallMents);

      expect(installments).to.be.status(200);
    });
  });
});