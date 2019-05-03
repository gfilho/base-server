const { createLogger, format, transports } = require('winston');
const Router = require('./lib/router.js');

class Server {
  constructor(config) {
    this.logger = createLogger({
      level: 'debug',
      format: format.simple(),
      transports: [new transports.Console()],
    });

    this.router = new Router(this.logger, config);
    this.logger.info('Initialize Server');
  }

  addModule(module) {
    this.router.addModule(module);
  }

  start() {
    this.logger.info('Start Server');
    this.router.start();
    this.logger.info('Server Running');
  }

  stop() {
    this.logger.info('Stop Server');
    this.router.stop();
  }

  get(path, callback) {
    this.router.get(path, callback);
  }

  post(path, callback) {
    this.router.post(path, callback);
  }

  put(path, callback) {
    this.router.put(path, callback);
  }

  del(path, callback) {
    this.router.del(path, callback);
  }
}

module.exports = Server;
