const { ObjectId } = require('mongodb');

var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,

    assert = require('assert');

// Create a new ObjectID
var objectId = new ObjectID();
objectId = ObjectId('62a495e1e0d6df4c7e17136d')
// Verify that the hex string is 24 characters long
assert.equal(24, objectId.toHexString().length);
console.log(objectId.toJSON())