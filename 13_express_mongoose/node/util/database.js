const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// connection pool
// to use one connection in other places
let _db;

const mongoConnect = (callback) => {
  // mongodb://[root_user_name]:[root_user_pass]@[service name]:[port=27017]/
  MongoClient.connect('mongodb://rootUser:rootPass@mongo:27017/')
    .then((client) => {
      console.log('connected!');
      _db = client.db('shop');
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
