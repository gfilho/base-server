/* global describe, it */

const chai = require('chai');
const path = require('path');
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

  it('http mode', () => {
    const config = {
      router: {
        address: 'test/api',
        port: 1234,
      },
    };

    const server = new Server(config);
    server.start();
    server.stop();
  });

  it('without key', () => {
    const config = {
      router: {
        address: 'test/api',
        port: 1234,
        ssl: {
          certificate: path.resolve(__dirname, './keys/server.crt'),
        },
      },
    };

    chai.expect(() => {
      const server = new Server(config);
      server.start();
      server.stop();
    }).to.throw('Invalid router configuration');
  });

  it('without certificate', () => {
    const config = {
      router: {
        address: 'test/api',
        port: 1234,
        ssl: {
          key: path.resolve(__dirname, './keys/key.pem'),
        },
      },
    };

    chai.expect(() => {
      const server = new Server(config);
      server.start();
      server.stop();
    }).to.throw('Invalid router configuration');
  });

  it('certificate with invalid path', () => {
    const config = {
      router: {
        address: 'test/api',
        port: 1234,
        ssl: {
          key: path.resolve(__dirname, './keys/key.pem'),
          certificate: 'invalid_path/keys/server.crt',
        },
      },
    };

    chai.expect(() => {
      const server = new Server(config);
      server.start();
      server.stop();
    }).to.throw('Fail to start server HTTPS mode');
  });

  it('key with invalid path', () => {
    const config = {
      router: {
        address: 'test/api',
        port: 1234,
        ssl: {
          key: 'invalid_path/keys/key.pem',
          certificate: path.resolve(__dirname, './keys/server.crt'),
        },
      },
    };

    chai.expect(() => {
      const server = new Server(config);
      server.start();
      server.stop();
    }).to.throw('Fail to start server HTTPS mode');
  });

  it('https mode', () => {
    const config = {
      router: {
        address: 'api',
        port: 1234,
        ssl: {
          key: path.resolve(__dirname, './keys/key.pem'),
          certificate: path.resolve(__dirname, './keys/server.crt'),
        },
      },
    };

    const server = new Server(config);

    server.start();
    server.stop();
  });
});
