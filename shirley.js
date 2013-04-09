var express = require('express');

var config = require('./config.js');
var control = require('./lib/controllers.js');

var shirley = express();

shirley.use( express.logger() );
shirley.use( express.bodyParser() );
shirley.use( express.static( __dirname + '/html' ));

shirley.get( '/t/*',     control.getByTags ); 
shirley.get( '/r/:name', control.redirectTo ); 
shirley.get( '/n/:name', control.getByName );

shirley.post( '/add', control.addNew ); 


shirley.listen( config.port ); 
console.log('Server listening on port %d.', config.port );
