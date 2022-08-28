const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it, before, after } = require('mocha');
const app = require('../index');
const { User } = require('../database/models');
const { userMock } = require('./mocks');
const userWtihInstallments = require('./mocks/userWtihInstallments');
// const jwt = require('../../utils/jwt');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração na rota de usuários', () => {
  describe('Verbo POST, rota "/user/create"', () => {
    const url = '/user/create';
    const newValidUser = {
      name: 'usuario teste',
      phoneNumber: '12345678911',
      email: 'email@email.com'
    };
    const newInvalidUser = {
      name: 'sou invalid',
      phoneNumber: '12345678911',
      email: 'meuEmailéinvalido.com'
    };
    let users;

    before(() => {
      sinon.stub(User, 'create').callsFake(userMock.create);
    });

    after(() => {
      User.create.restore();
    });

    it('Caso de sucesso', async () => {
      users = await chai.request(app).post(url).send(newValidUser);
      expect(users.body).to.be.eql({ ...newValidUser, id: 3 });
      expect(users).to.be.status(200);
    });

    it('Caso de falha', async () => {
      users = await chai.request(app).post(url).send(newInvalidUser);
      expect(users).to.be.status(400);
    });
  });
  describe('Verbo GET, rota "/user"', () => {
    const url = '/user';
    let users;

    before(() => {
      sinon.stub(User, 'findAll').resolves(userWtihInstallments);
    });

    after(() => {
      User.findAll.restore();
    });

    it('Caso de sucesso sem query', async () => {
      users = await chai.request(app).get(url);
      expect(users).to.be.status(200);
    });

    it('Caso de sucesso com query', async () => {
      const gt = new Date(2023, 2, 1).toLocaleDateString('en-CA');
      const lt = new Date(2023, 2, 28).toLocaleDateString('en-CA');

      users = await chai.request(app).get(url).query({ gt, lt });

      expect(users).to.be.status(200);
    });

    it('Caso de falha', async () => {
      const gt = new Date(2023, 2, 1).toLocaleDateString('en-CA');
      const invalidDate = new Date('2023-04-32').toLocaleDateString('en-CA');

      users = await chai.request(app).get(url).query({ gt, lt: invalidDate });
      expect(users).to.be.status(400);
    });
  });
});