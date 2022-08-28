const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it, before, after } = require('mocha');
const app = require('../index');
const { Installment, User } = require('../database/models');
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
    const newInvalidInstallMentsOne = {
      userId: 2,
      totalValue: 150,
      qtyInstallments: 11
    };
    const newInvalidInstallMentsTwo = {
      userId: -1,
      totalValue: 150,
      qtyInstallments: 3
    };
    before(() => {
      sinon.stub(User, 'findByPk')
        .onCall(0).resolves(true)
        .onCall(1).resolves(false);
      sinon.stub(Installment, 'bulkCreate').resolves(installmentsMock);
    });

    after(() => {
      Installment.bulkCreate.restore();
      User.findByPk.restore();
    });

    it('Caso de sucesso', async () => {
      installments = await chai.request(app).post(url).send(newValidInstallMents);

      expect(installments).to.be.status(200);
    });

    it('Caso de falha', async () => {
      installments = await chai.request(app).post(url).send(newInvalidInstallMentsOne);

      expect(installments).to.be.status(400);
    });

    it('Caso de falha, porque usuario nao foi encontrado', async () => {
      installments = await chai.request(app).post(url).send(newInvalidInstallMentsTwo);

      expect(installments).to.be.status(404);
    });
  });
});