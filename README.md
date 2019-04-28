# Base Server

## Installation

```bashp
npm install @gfilho/base-server
```
## Usage

This is example show how create a server using the @gfilho/base-server
``` js

var Server = require('@gfilho/base-server');

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
server.run();
