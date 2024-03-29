var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;

/**
 * Connects to the MongoDB Database with the provided URL
 */
exports.connect = function(url, callback){
	console.log(url);
    MongoClient.connect(url, function(err, _db){
    	console.log(url);
    	if (err) { throw new Error('Could not connect: '+err); }
    	db = _db;
    	connected = true;
    	console.log("Connected successfully !!");
    	callback(db);
    });
};

/**
 * Returns the collection on the selected database
 */
exports.collection = function(name){
    if (!connected) {
      throw new Error('Must connect to Mongo before calling "collection"');
    } 
    return db.collection(name);
  
};