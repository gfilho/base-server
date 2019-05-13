/* global describe, it */

const chai = require('chai');
const request = require('request');
const Server = require('..');

describe('header', () => {
  it('allowedMethods', (done) => {
    const config = {
      router: {
        address: 'api',
        port: 1234,
        header: {
          allowedMethods: 'GET PUT',
        },
      },
    };

    const server = new Server(config);

    server.get('/test', (req, res) => {
      res.json({ msg: 'Get request' });
    });

    server.start();

    request.get({ url: 'http://localhost:1234/api/test' },
      (error, response, body) => {
        chai.expect(response.statusCode).to.equal(200);

        chai.expect(response.headers['access-control-allow-methods']).to.equal('GET PUT');

        const result = JSON.parse(body);
        chai.expect(result.msg).to.equal('Get request');

        server.stop();
        done();
      });
  });
  it('allowedHost', (done) => {
    const config = {
      router: {
        address: 'api',
        port: 1234,
        header: {
          allowedHost: 'mydomain.com',
        },
      },
    };

    const server = new Server(config);

    server.get('/test', (req, res) => {
      res.json({ msg: 'Get request' });
    });

    server.start();

    request.get({ url: 'http://localhost:1234/api/test' },
      (error, response, body) => {
        chai.expect(response.statusCode).to.equal(200);

        chai.expect(response.headers['access-control-allow-origin']).to.equal('mydomain.com');

        const result = JSON.parse(body);
        chai.expect(result.msg).to.equal('Get request');

        server.stop();
        done();
      });
  });
  it('allowedCredentials', (done) => {
    const config = {
      router: {
        address: 'api',
        port: 1234,
        header: {
          allowedCredentials: true,
        },
      },
    };

    const server = new Server(config);

    server.get('/test', (req, res) => {
      res.json({ msg: 'Get request' });
    });

    server.start();

    request.get({ url: 'http://localhost:1234/api/test' },
      (error, response, body) => {
        chai.expect(response.statusCode).to.equal(200);

        chai.expect(response.headers['access-control-allow-credentials']).to.equal('true');

        const result = JSON.parse(body);
        chai.expect(result.msg).to.equal('Get request');

        server.stop();
        done();
      });
  });
});
