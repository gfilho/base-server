module.exports = function ( config , requests , authCall ){

	var Router 	= require('./lib/router.js');

	var routerModule = new Router( config.router );

	this.addRequest = function( req ){
		req(routerModule.router);
	}

	this.run = function (){

		console.log('Start Server');

		routerModule.start();

		console.log('Server Running');
	}

}
