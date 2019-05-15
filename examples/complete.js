var Server = require('..');

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
