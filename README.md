# @gfilho/base-server
A lightweight wrapper for Express that allows easily setup HTTP headers and SSL.

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8de6566518794445a0211569e86e9ae3)](https://app.codacy.com/app/gfilho/base-server?utm_source=github.com&utm_medium=referral&utm_content=gfilho/base-server&utm_campaign=Badge_Grade_Dashboard)
[![Build Status](https://travis-ci.com/gfilho/base-server.svg?branch=master)](https://travis-ci.com/gfilho/base-server)
[![codecov](https://codecov.io/gh/gfilho/base-server/branch/master/graph/badge.svg)](https://codecov.io/gh/gfilho/base-server)

## Getting Started

### Installation

```bashp
npm install @gfilho/base-server --save
```

### Simple Server
This is example show how create a simple REST server using the @gfilho/base-server:

``` js
var Server = require('@gfilho/base-server');

// Setup Server
const config = {
  router: {
    address: 'api',
    port: 1234,
  },
};

// Instance of Server
const server = new Server(config);

// Bind requests
server.get('/ping', (req, res) => {
  res.json({ msg: 'Ops! I received a GET' });
});

// Run Server
server.start();
```

### Complete Server
This is example show a REST server using all features allowed by @gfilho/base-server:
``` js
var Server = require('@gfilho/base-server');

// Setup Server
const config = {
  router: {
    address: 'api',
    port: 1234,
    header: {
      allowedMethods: 'GET PUT POST DEL',
      allowedHost: 'mydomain.com',
      allowedHeaders: 'MySpecialHeader',
      allowedCredentials: true,
    },
    ssl: {
      key: 'examples/ssl/key.pem',
      certificate: 'examples/ssl/server.crt',
    },
  },
};

// Instance of Server
const server = new Server(config);

// Bind requests
server.get('/ping', (req, res) => {
  res.json({ msg: 'Server https is alive' });
});

server.put('/ping', (req, res) => {
  res.json({ msg: 'Ops! I received a PUT' });
});

server.post('/ping', (req, res) => {
  res.json({ msg: 'Ops! I received a POST' });
});

server.delete('/ping', (req, res) => {
  res.json({ msg: 'Ops! I received a DEL' });
});

// Run Server
server.start();
```

## License

[MIT](LICENSE)
