/* global describe, it */

const chai = require('chai');
const request = require('request');
const Server = require('..');

describe('server', () => {
  it('start', () => {
    const config = {
      router: {
        address: 'api',
        port: 1234,
      },
    };

    const server = new Server(config);

    server.start();
    server.stop();
  });

  it('get', (done) => {
    const config = {
      router: {
        address: 'api',
        port: 1234,
      },
    };

    const server = new Server(config);

    server.get('/test', (req, res) => {
      res.json({ msg: 'Server is alive' });
    });

    server.start();

    request.get({ url: 'http://localhost:1234/api/test' },
      (error, response, body) => {
        chai.expect(response.statusCode).to.equal(200);

        const result = JSON.parse(body);
        chai.expect(result.msg).to.equal('Server is alive');

        server.stop();
        done();
      });
  });

  it('put', (done) => {
    const config = {
      router: {
        address: 'api',
        port: 1234,
      },
    };

    const server = new Server(config);

    server.put('/test', (req, res) => {
      res.json({ msg: 'Server is alive' });
    });

    server.start();

    request.put({ url: 'http://localhost:1234/api/test' },
      (error, response, body) => {
        chai.expect(response.statusCode).to.equal(200);

        const result = JSON.parse(body);
        chai.expect(result.msg).to.equal('Server is alive');

        server.stop();
        done();
      });
  });

  it('post', (done) => {
    const config = {
      router: {
        address: 'api',
        port: 1234,
      },
    };

    const server = new Server(config);

    server.post('/test', (req, res) => {
      res.json({ msg: 'Server is alive' });
    });

    server.start();

    request.post({ url: 'http://localhost:1234/api/test' },
      (error, response, body) => {
        chai.expect(response.statusCode).to.equal(200);

        const result = JSON.parse(body);
        chai.expect(result.msg).to.equal('Server is alive');

        server.stop();
        done();
      });
  });

  it('delete', (done) => {
    const config = {
      router: {
        address: 'api',
        port: 1234,
      },
    };

    const server = new Server(config);

    server.delete('/test', (req, res) => {
      res.json({ msg: 'Server is alive' });
    });

    server.start();

    request.del({ url: 'http://localhost:1234/api/test' },
      (error, response, body) => {
        chai.expect(response.statusCode).to.equal(200);

        const result = JSON.parse(body);
        chai.expect(result.msg).to.equal('Server is alive');

        server.stop();
        done();
      });
  });
});

describe('configuration', () => {
  it('without address', () => {
    const config = {
      router: {
        port: 1234,
      },
    };

    chai.expect(() => {
      const server = new Server(config);
      server.start();
      server.stop();
    }).to.throw('Invalid router configuration');
  });

  it('without port', () => {
    const config = {
      router: {
        address: 'test/api',
      },
    };

    chai.expect(() => {
      const server = new Server(config);
      server.start();
      server.stop();
    }).to.throw('Invalid router configuration');
  });
});
