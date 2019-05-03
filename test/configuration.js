/* global describe, it */

const chai = require('chai');
const Server = require('..');

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
