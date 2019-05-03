const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
const https = require('https');
const jsonschema = require('jsonschema');

class Router {
  constructor(logger, options) {
    this.logger = logger;
    this.options = options;
    this.app = express();

    // Validate configuration
    this.validateConfiguration(options);

    // Setup body parser, to parse the POST request
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    // Create a router
    this.router = express.Router();

    // Define a midlewear for all requests
    this.router.use((req, res, next) => { this.midlewear(req, res, next); });

    // Setup http server
    this.server = this.createServer();
  }

  validateConfiguration(configuration) {
    const configSchema = {
      id: '/ConfSchema',
      type: 'object',
      properties: {
        router: { $ref: '/RouterSchema' },
      },
      required: ['router'],
    };

    const routerSchema = {
      id: '/RouterSchema',
      type: 'object',
      properties: {
        address: { type: 'string' },
        port: { type: 'number' },
        header: { $ref: '/HeaderSchema' },
        ssl: { $ref: '/SslSchema' },
      },
      required: ['address', 'port'],
    };

    const headerSchema = {
      id: '/HeaderSchema',
      type: 'object',
      properties: {
        allowedMethods: { type: 'string' },
        allowedHost: { type: 'string' },
        allowedHeaders: { type: 'string' },
        allowedCredentials: { type: 'boolean' },
      },
    };

    const sslSchema = {
      id: '/SslSchema',
      type: 'object',
      properties: {
        key: { type: 'string' },
        certificate: { type: 'string' },
      },
      required: ['key', 'certificate'],
    };

    const schema = new jsonschema.Validator();
    schema.addSchema(headerSchema, '/HeaderSchema');
    schema.addSchema(sslSchema, '/SslSchema');
    schema.addSchema(routerSchema, '/RouterSchema');

    const result = schema.validate(configuration, configSchema);

    if (!result.valid) {
      this.logger.error('Invalid router configuration');
      this.logger.error(result);

      throw Error('Invalid router configuration');
    }
  }

  midlewear(req, res, next) {
    this.logger.debug(`[ ${req.method} ] ${req.url}`);

    if (typeof this.options.header === 'undefined') {
      next();
      return;
    }

    if (typeof this.options.header.allowedMethods !== 'undefined') {
      res.setHeader('Access-Control-Allow-Methods', this.options.router.header.allowedMethods);
    } else {
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    }

    if (typeof this.options.header.allowedHost !== 'undefined') {
      res.setHeader('Access-Control-Allow-Origin', this.options.router.header.allowedHost);
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
    }

    if (typeof this.options.header.allowedHeaders !== 'undefined') {
      res.setHeader('Access-Control-Allow-Headers', this.options.router.header.allowedHeaders);
    }

    if (typeof this.options.header.allowedCredentials !== 'undefined') {
      res.setHeader('Access-Control-Allow-Credentials', true);
    } else {
      res.setHeader('Access-Control-Allow-Credentials', false);
    }

    next();
  }

  logRouteStack() {
    let index = 0;

    this.logger.info('Route Stack:');

    for (index = 1; index < this.router.stack.length; index += 1) {
      this.logger.info(`  /${this.options.router.address + this.router.stack[index].route.path}`);
    }
  }

  createServer() {
    let server = null;

    this.logger.info(`Port: ${this.options.router.port}`);

    this.logRouteStack();

    this.app.use(`/${this.options.router.address}`, this.router);

    if (this.options.router.ssl) {
      this.logger.info('Start HTTPS Mode');

      if ((!this.options.router.ssl.key) || (!this.options.router.ssl.certificate)) {
        this.logger.error('Fail to start server HTTPS mode');
        throw Error('Fail to start server HTTPS mode');
      }

      const sslCredentials = {
        key: fs.readFileSync(this.options.router.ssl.key),
        cert: fs.readFileSync(this.options.router.ssl.certificate),
      };

      server = https.createServer(sslCredentials, this.app);
    } else {
      this.logger.info('Start HTTP Mode');
      server = http.createServer(this.app);
    }

    return server;
  }

  start() {
    this.server.listen(this.options.router.port);
  }

  stop() {
    this.server.close();
  }

  get(path, callback) {
    const request = this.router.route(path);
    request.get(callback);
  }

  post(path, callback) {
    const request = this.router.route(path);
    request.post(callback);
  }

  put(path, callback) {
    const request = this.router.route(path);
    request.put(callback);
  }

  delete(path, callback) {
    const request = this.router.route(path);
    request.delete(callback);
  }
}

module.exports = Router;
