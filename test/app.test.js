const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

describe('GET /movies', () => {
    it(`Returns an array of movies`, () => {
        return request(app)
            .get('/movies')
            .expect(200)
            .then((res) => {
                expect(res.body).to.be.an('array');
                expect(res.body.length >= 1).to.be.true;
            })
    });
})