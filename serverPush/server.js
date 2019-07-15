//'use strict'
//Out
//  const app = require('../src/app');
//const http = require('http');
//const debug = require('debug')('nodestr:server');
//const express = require('experess');
//const bodyParser = require('body-parser');

var express = require('express')
  , app = express()
  , server = require('http').createServer(app).listen(4555)
  , io = require('socket.io').listen(server)
  , bodyParser = require('body-parser');
//Out
//  app.set('port', port);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  var port = process.env.PORT || 8080;
  var router = express.Router();
  /* Socket irá aqui depois */
  var emitir = function(req, res, next){
	var notificar = req.query.notificacao || '';
		if(notificar != '')	 {
		io.emit('notificacao', notificar);
		next();
	} else {
			next();
		}
	}
  app.use(emitir);
  app.use('/api', router);
//Out
  // const router = route.get('/', (req, res, next) => {
	  // res.status(200).send({
		  // title: "Node Store API",
		  // version: "0.0.1"
	  // });
  // });
//app.use('/', router);

  router.route('/notificar')
    .get(function(req, res){
    //aqui vamos receber a mensagem
    res.json({message: "testando essa rota"})
    })
  app.listen(port);
  console.log('conectado a porta ' + port);
  
  // funciton normalizePort(val) {}
  
  // function onError(val) {
	// IF (error.syscall !== 'listen') {
		// throw error;
	// }

	// const bind = typeof port === 'string ? 'Pipe ' + port : 'Port ' + port;

	// switch (error.code) {
	// case 'EACCES':
		// console.error(bind + ' requires elevated privileges');
		// process.exit(1);
		// break;
	// case 'EADDRINUSE':
		// console.error(bind + ' is already in use');
		// process.exit(1);
		// break;
	// default:
		// throw error;
	// }
//}
  