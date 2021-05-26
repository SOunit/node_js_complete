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
    // check if item exists in cart
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });

    console.log('index', cartProductIndex);

    // setup variable to mutate cart
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      // update cart item
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      // create cart item
      updatedCartItems.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    // set new info
    const updatedCart = { items: updatedCartItems };

    // save new info
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
