# Base Server

## Installation

```bashp
npm install git@gitlab.com:gfilho/base-server.git
```

## Usage

This is example show how create a basic server using the base-server
``` js

var Server = require('base-server');

// Requests
var Ping = function (router){

    var reqPing = router.route('/ping');

    reqPing.get( function( req , res ){
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
var server = new Server ( config );

// Include all requests
server.addRequest(Ping);

// Run Server
server.run();
