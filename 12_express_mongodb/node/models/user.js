const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor(userName, email, cart, id) {
    this.name = userName;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id ? mongodb.ObjectId(id) : null;
  }

  save = () => {
    const db = getDb();
    return db.collection('users').insertOne(this);
  };

  addToCart = (product) => {
    const updatedCart = { items: [{ ...product, quantity: 1 }] };
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  };

  static findById = (userId) => {
    const db = getDb();
    return db
      .collection('users')
      .findOne({ _id: new mongodb.ObjectId(userId) });
  };
}

module.exports = User;
