const request = require('supertest');
const app = require('../app');
const expect = require('expect');
/**
 * Testing get products endpoint
 */
describe('GET /products', function () {
  it('respond with json containing a list of products', done => {
    request(app)
      .get('/products')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('respond with 8 records from products', done => {
    request(app)
      .get('/products?limit=8')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body.products.length).toEqual(8);
        return done();
      });
  });

  it('should not have any products', done => {
    request(app)
      .get('/products?search=thisproductdoesntexists')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body.products.length).toEqual(0);
        return done();
      });
  })

  it('should not find the route', done => {
    request(app)
      .get('/product')
      .set('Accept', 'application/json')
      .expect(404, done)
  })
});