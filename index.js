module.exports = function ( config , setupRouter ){

	var Router 	= require('./lib/router.js');

	var routerModule = new Router( config.router , setupRouter );

	this.addRequest = function( req ){
		req(routerModule.router);
	}

	this.run = function (){

		console.log('Start Server');

		routerModule.start();

		console.log('Server Running');
	}

}
