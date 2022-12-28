const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')
const db = require('../src/dbClient')

chai.use(chaiHttp)

describe('User REST API', () => {
  
    beforeEach(() => {
      // Clean DB before each test
      db.flushdb()
    })
    
    after(() => {
      app.close()
      db.quit()
    })

  describe('POST /user', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'wsh',
        firstname: 'wsh2',
        lastname: 'wsh3'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    
    it('pass wrong parameters', (done) => {
      const user = {
        firstname: 'wsh2',
        lastname: 'wsh3'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
  })

  describe('GET /user', ()=> {

    it('gets a user', (done) => {

    const user = {
      username: 'wsh',
      firstname: 'wsh2',
      lastname: 'wsh3'
    }
    chai.request(app)
        .post('/user')
        .send(user)
        .then(() => {
          chai.request(app)
            .get('/user/'+user.username)
            .send(user)
            .then((res) => {
            chai.expect(res).to.have.status(201)
            chai.expect(res.body.status).to.equal('success')
            chai.expect(res).to.be.json
            done()
          })
          .catch((err) => {
            throw err
         })
        })
  })
  

})
})
