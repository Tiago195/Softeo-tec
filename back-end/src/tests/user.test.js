const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it, before, after } = require('mocha');
const app = require('../index');
const { User } = require('../database/models');
const { userMock } = require('./mocks');
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
});