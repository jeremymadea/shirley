var config = require( '../config.js' );

var MongoClient = require( 'mongodb' ).MongoClient;
var Server      = require( 'mongodb' ).Server;
var assert      = require( 'assert' );

var mongo = new MongoClient( new Server( 'localhost', 27017 ));

mongo.open( function( err, mongo ) {
    assert.equal( err, null );
    var db = mongo.db( config.dbname );
    db.collection( config.collection, {strict: true}, function( err, collection ) { 
        if (err) {
            console.log("Creating sample '%s' collection.", config.collection );
            load_sample_data();
        }
    }); 
});

var db = mongo.db( config.dbname );
/* db.collection( config.collection, function( err, collection ) { 
    if (err) {
        console.log("Creating sample '%s' collection.", config.collection );
        load_sample_data();
    }
}); */ 

//shirley.get( '/r/:name', control.redirectTo );
exports.redirectTo = function( req, res ) { 
    var name = req.params.name; 
    console.log( 'Looking up entry by name: ' + name );  
    db.collection( config.collection, function( err, collection ) { 
        collection.findOne( 
            { 'name': name }, 
            function( err, item ) { 
                console.log( item._id );
                res.redirect( item._id ); 
            } 
        );
    });
};

//shirley.get( '/n/:name', control.getByName );
exports.getByName = function( req, res ) { 
    var name = req.params.name; 
    console.log( 'Getting entry by name: ' + name );  
    db.collection( config.collection, function( err, collection ) { 
        collection.findOne( 
            { 'name': name }, 
            function( err, item ) { 
                res.send( item ); 
            } 
        );
    });
};

//shirley.get( '/t/*',     control.getByTags ); 
exports.getByTags  = function( req, res ) { 
    var tags = req.params[0].split( '/' );
    console.log( 'Getting bookmark by tags: ' + tags.join() );
    db.collection( config.collection, function( err, collection ) {
        collection.find( 
            { 'tags': { '$in': tags }}).toArray( 
            function( err, items ) {
                res.send( items );
            }
        );
    });
};

//shirley.post( '/add', control.addNew );  
exports.addNew = function( req, res ) { 
    var link = {
        "_id" : req.body._id, 
        "name": req.body.name, 
        "desc": req.body.desc,
        "tags": req.body.tags,
        "time": new Date()
    };
    console.log( 'Adding bookmark: ' + JSON.stringify( link ));
    db.collection( config.collection, function( err, collection ) {
        collection.insert( link, {safe:true}, function( err, result ) {
            if (err) {
                res.send( {'error':'An error has occurred'} );
            } else {
                console.log( 'Success: ' + JSON.stringify( result[0] ));
                res.send( result[0] );
            }
        });
    });
};


var load_sample_data = function() {
 
    var bookmarks = [
    { '_id':  'http://www.youtube.com/watch?v=0A5t5_O8hdA', 
      'name': 'serious', 
      'desc': 'Leslie Nielsen video clip.', 
      'tags': [ 'Leslie Nielsen', 'movie', 'clip', 'airplane', 'shirley', 'surely' ], 
      'date': new Date() },

    { '_id':  'http://madea.net/', 
      'name': 'madea', 
      'desc': 'Jeremy Madea: Systems Engineer and Architect', 
      'tags': [ 'Jeremy Madea', 'architect', 'engineer', 'programmer', 'administrator', 'webmaster' ], 
      'date': new Date() },

    { '_id':  'http://nodejs.org/', 
      'name': 'node.js', 
      'desc': "Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications.", 
      'tags': [ 'node', 'js', 'javascript', 'server', 'chrome', 'v8' ], 
      'date': new Date() },

    { '_id':  'http://www.mongodb.org/', 
      'name': 'mongodb', 
      'desc': 'MongoDB is an open source document database, and the leading NoSQL database.', 
      'tags': [ 'mongodb', 'nosql', 'database', 'json', 'document oriented' ], 
      'date': new Date() },
    
    ];
     
    db.collection( config.collection, function( err, collection ) {
        collection.insert( bookmarks, {safe:true}, function(err, result) {} );
    });
     
};


