// Include base-server
const Server = require('../');

// Configuration of server
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
  res.json({ msg: 'Server is alive' });
});

// Run Server
server.start();
