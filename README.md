# Base Server

## Installation

```bashp
npm install @gfilho/base-server
```

## Usage

This is example show how create a server using the @gfilho/base-server
``` js

var Server = require('@gfilho/base-server');

// Requests
var Ping = function (router){

    var request_ping = router.route('/ping');

    request_ping.get( function( req , res ){
        res.json({ 'error' : 0 , 'data' : 'OK' });
    });
}

// Configuration of server
var config = {
  router : {
    "address" : "api",
    "port" : 1234,
    "allowedMethods" : "POST, GET, PUT, DELETE",
    "allowedHost": "",
    "allowedHeaders": "",
    "allowedCredentials" : false,
    "allowedSSL" : false,
    "ssl" : {
      "key" : "",
      "certificate": ""
    }
  }
}

// Instance of Server
var server = new Server (config);

// Include all requests
server.addRequest(Ping);

// Run Server
server.run();
