const app = require('../src/server')
const request = require('supertest')

describe('Test authentication', () => {
  it('should not respond because it is not authenticated', done => {
    request(app)
      .post('/example/example-post')
      .send({ name: 'john' })
      .expect(500)
      .expect(res => {
        expect(res.body.error).toBe('Invalid credentials')
      })
      .end(done)
  })

  it('should respond because it is authenticated', done => {
    request(app)
      .post('/example/example-post')
      .auth('user', 'password')
      .send({ name: 'john' })
      .expect(200, done)
  })

  it('should respond because the endpoint is not authenticated', done => {
    request(app)
      .get('/example/example-get')
      .expect(200, done)
  })
})