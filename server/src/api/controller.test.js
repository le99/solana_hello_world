require('dotenv').config();

const app = require('../../app');


//https://mochajs.org
//https://www.chaijs.com/guide/styles/#assert
const assert = require('chai').assert;

const request = require('supertest');

describe('GET /', ()=>{

  before(async () => {
  });

  after(async () => {
  });

  it('success', async ()=>{
    let res = await request(app)
      .get('/api')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200);
      

    assert.deepEqual(res.body, {msg: "ok"});

    

  });


});
