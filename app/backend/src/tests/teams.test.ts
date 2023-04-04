import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { teamsMock } from './mock/teamsMock';
import Teams from '../database/models/Teams';


chai.use(chaiHttp);

const { expect } = chai;
const OK = 200;

describe('Testes da rota /teams', () => {
afterEach(() => {
    sinon.restore();
  })


  it('Busca por todos as teams cadastradas - findAll', async function () {
    sinon.stub(Teams,'findAll')
    .resolves(teamsMock as any);

    const {status, body} = await chai
    .request(app)
    .get('/teams');
    expect(status).to.be.equal(OK);
    expect(body).to.deep.equal(teamsMock);
  });


    it('Busca por id cadastrado - findById', async function () {
      sinon.stub(Teams,'findByPk')
      .resolves(teamsMock[0]  as any);

      const {status, body} = await chai
      .request(app)
      .get('/teams/1');
      expect(status).to.be.equal(OK);
      expect(body).to.deep.equal(teamsMock[0]);
  });
});
