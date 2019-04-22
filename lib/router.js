const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
const https = require('https');

class Router {
  constructor(logger, options, setupRouter) {
    this.logger = logger;
    this.options = options;
    this.app = express();

    // Setup body parser, to parse the POST request
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    // Create a router
    this.router = express.Router();

    // Define a midlewear for all requests
    this.router.use(this.midlewear);

    if (setupRouter) {
      setupRouter(this.app, bodyParser);
    }
  }

  midlewear(req, res, next) {
    this.logger.debug(`[ ${req.method} ] \t ${req.url}`);

    if (this.options.allowedMethods) {
      res.setHeader('Access-Control-Allow-Methods', this.options.allowedMethods);
    } else {
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    }

    if (this.options.allowedHost !== '') {
      res.setHeader('Access-Control-Allow-Origin', this.options.allowedHost);
    }

    if (this.options.allowedHeaders !== '') {
      res.setHeader('Access-Control-Allow-Headers', `Origin, X-Requested-With, Content-Type, Accept, ${this.options.allowedHeaders}`);
    } else {
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }

    if (this.options.allowedCredentials) {
      res.setHeader('Access-Control-Allow-Credentials', true);
    }

    next();
  }

  logRouteStack() {
    let index = 0;

    this.logger.info('Route Stack:');

    for (index = 1; index < this.router.stack.length; index += 1) {
      this.logger.info(`  /${this.options.address + this.router.stack[index].route.path}`);
    }
  }

  start() {
    this.logger.info(`Port: ${this.options.port}`);

    this.logRouteStack();

    this.app.use(`/${this.options.address}`, this.router);

    if (this.options.allowedSSL === false) {
      this.logger.info('Start HTTP Mode');
      http.createServer(this.app).listen(this.options.port);
    } else {
      this.logger.info('Start HTTPS Mode');

      const sslCredentials = {
        key: fs.readFileSync(this.options.ssl.key),
        cert: fs.readFileSync(this.options.ssl.certificate),
      };

      https.createServer(sslCredentials, this.app).listen(this.options.port);
    }
  }
}

module.exports = Router;
