module.exports = function Router ( options , setupRouter ){

	/*Adicionando pacotes do Express para criar o Router*/
	var express      = require('express'); 		// call express
	var app          = express(); 				// define our app using express
	var bodyParser   = require('body-parser');
	var fs 		     = require('fs');
  var http 	     = require('http');
  var https 	     = require('https');

	//Configurando body parser , para parsear as requisicoes de POST
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	/*Criando Router*/
	this.router = express.Router();

	if ( setupRouter ){
			setupRouter ( app , bodyParser );
	}

	this.logRouteStack = function (){

		var index = 0;

		console.log('Route Stack:');

		for ( index = 1 ; index < this.router.stack.length ; index++ ){

			console.log('\t/' + options.address + this.router.stack[index].route.path);
		}
	}

	// Definindo Middleware para todas as requisicoes
	this.router.use(function(req, res, next) {

		console.log('[' + req.method + '] \t' +  req.url);

		/*Configura header de resposta*/

		if ( options.allowedMethods ){
				res.setHeader('Access-Control-Allow-Methods' , options.allowedMethods );
		}else{
			res.setHeader('Access-Control-Allow-Methods' , 'POST, GET, PUT, DELETE' );
		}

		if ( options.allowedHost !== '' ){
				res.setHeader('Access-Control-Allow-Origin' , options.allowedHost );
		}

		if ( options.allowedHeaders !==  '' ){
				res.setHeader('Access-Control-Allow-Headers' , 'Origin, X-Requested-With, Content-Type, Accept, ' + options.allowedHeaders );
		}else{
			res.setHeader('Access-Control-Allow-Headers' , 'Origin, X-Requested-With, Content-Type, Accept' );
		}

		if ( options.allowedCredentials ){
				res.setHeader('Access-Control-Allow-Credentials', true);
		}

		/*Trata Request*/
		next();
	});

	this.start = function (){

		console.log('Port: ' + options.port );

		this.logRouteStack();

		app.use('/' + options.address , this.router);

		if ( options.allowedSSL === false ){

			console.log("Start HTTP Mode");
			var serverHttp = http.createServer(app).listen(options.port);

		}else{

			console.log("Start HTTPS Mode");
			// SSL Configuration
			var sslCredentials = {
			    key: fs.readFileSync( options.ssl.key ),
			    cert: fs.readFileSync( options.ssl.certificate )
			};

			var serverHttps = https.createServer(sslCredentials, app).listen(options.port);
		}
	}
}
