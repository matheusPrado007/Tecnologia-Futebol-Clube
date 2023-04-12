import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as jwt from 'jsonwebtoken';


import { app } from '../app';

import { mockMatches, inProgressFalse, inProgressTrue } from './mock/matchesMock';
import Matches from '../database/models/Matches';
import { token, user } from './mock/mockLogin';



chai.use(chaiHttp);

const { expect } = chai;
const OK = 200;


describe('Testes da rota /matches', () => {
afterEach(() => {
    sinon.restore();
  })


  it('Busca por todos as Matches cadastradas - findAll', async function () {
    sinon.stub(Matches,'findAll')
    .resolves(mockMatches as any);

    const {status, body} = await chai
    .request(app)
    .get('/matches');

    expect(status).to.be.equal(OK);
    expect(body).to.be.deep.equal(mockMatches);
  });


  it('Retornar um status 200', async () => {
    sinon.stub(Matches, 'update').resolves();
    sinon.stub(jwt, 'verify').callsFake(() => user);
    
    const { status, body } = await chai.request(app)
    .patch('/matches/200/finish').send().set('Authorization', token);
    
    expect(status).to.be.equal(OK);
    expect(body).to.have.property( "message", "Finished" );
  }); 

    it('Retorna /matches?inProgress=false', async function () {

      const { status, body } = await chai
      .request(app)
      .get('/matches?inProgress=false');

      expect(status).to.be.equal(OK);
      expect(body).to.be.deep.equal(inProgressFalse);
  });

  it('Retorna /matches?inProgress=true', async function () {

    const { status, body } = await chai
    .request(app)
    .get('/matches?inProgress=true');

    expect(status).to.be.equal(OK);
    expect(body).to.be.deep.equal(inProgressTrue);
});
});
