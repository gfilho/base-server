var Server = require('..');

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
