import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { app } from '../app';
import Users from '../database/models/Users';
import { user, validateLogin, token, role } from './mock/mockLogin';



chai.use(chaiHttp);

const { expect } = chai;
const OK = 200;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;

describe('Testes da rota /login e /login/role', () => {
afterEach(() => {
    sinon.restore();
  })

  it('Retorna um status 200 e token', async () => {
    sinon.stub(Users, 'findOne').resolves(user);
    sinon.stub(bcrypt, 'compareSync').resolves(true);
    sinon.mock(jwt).expects('sign').returns(token);


    const { status, body } =  await chai
      .request(app)
      .post('/login')
      .send(validateLogin);

    expect(status).to.be.equal(OK);
    expect(body).to.deep.equal({ token });
  });

  it('Retorna erro 400', async function () {

    const {status, body} = await chai
    .request(app)
    .post('/login')
    .send({
        email: 'user@example.com'
    });
    expect(status).to.be.equal(BAD_REQUEST);
    expect(body).to.have.property("message", 'All fields must be filled');
  });

  it('Retorna erro 401', async function () {

    const {status, body} = await chai
    .request(app)
    .post('/login')
    .send({
        email: 'user@example.com',
        password: 123
    });
    expect(status).to.be.equal(UNAUTHORIZED);
    expect(body).to.have.property("message", 'Invalid email or password');
  });

  it('Retorna erro 401', async function () {

    const {status, body} = await chai
    .request(app)
    .post('/login')
    .send({
        email: '213',
        password: '123456'
    });
    expect(status).to.be.equal(UNAUTHORIZED);
    expect(body).to.have.property("message", 'Invalid email or password');
  });

  it('Retornar um status 401', async () => {
    sinon.stub(Users, 'findOne').resolves(user);
    sinon.stub(bcrypt, 'compareSync').resolves(true);
    sinon.mock(jwt).expects('sign').returns({token: 'vcvxc'});


    const { status, body } = await chai
      .request(app)
      .get('/login/role')
      .send(role);

    expect(status).to.be.equal(UNAUTHORIZED);
    expect(body).to.deep.equal({ message: "Token not found" });
  }); 
});