const { createLogger, format, transports } = require('winston');
const Router = require('./lib/router.js');

class Server {
  contructor(config, setupRouter) {
    this.logger = createLogger({
      level: 'debug',
      format: format.simple(),
      transports: [new transports.Console()],
    });

    this.router = new Router(this.logger, config, setupRouter);
  }

  addRequest(req) {
    req(this.router.router);
  }

  run() {
    this.logger.info('Start Server');
    this.router.start();
    this.logger.info('Server Running');
  }
}

module.exports = Server;
