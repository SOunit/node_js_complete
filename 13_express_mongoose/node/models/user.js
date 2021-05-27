const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
  // add id explicitly to create user with same id
  _id: { type: Schema.Types.ObjectId, required: false },
});

module.exports = mongoose.model('User', userSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class User {
//   constructor(userName, email, cart, id) {
//     this.name = userName;
//     this.email = email;
//     this.cart = cart; // {items: []}
//     this._id = id ? mongodb.ObjectId(id) : null;
//   }

//   save = () => {
//     const db = getDb();
//     return db.collection('users').insertOne(this);
//   };

//   addToCart = (product) => {
//     // check if item exists in cart
//     const cartProductIndex = this.cart.items.findIndex((cp) => {
//       return cp.productId.toString() === product._id.toString();
//     });

//     console.log('index', cartProductIndex);

//     // setup variable to mutate cart
//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];

//     if (cartProductIndex >= 0) {
//       // update cart item
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       // create cart item
//       updatedCartItems.push({
//         productId: new mongodb.ObjectId(product._id),
//         quantity: newQuantity,
//       });
//     }

//     // set new info
//     const updatedCart = { items: updatedCartItems };

//     // save new info
//     const db = getDb();
//     return db
//       .collection('users')
//       .updateOne(
//         { _id: mongodb.ObjectId(this._id) },
//         { $set: { cart: updatedCart } }
//       );
//   };

//   getCart = () => {
//     const db = getDb();

//     // get product ids in cart
//     const productIds = this.cart.items.map((i) => {
//       return i.productId;
//     });

//     // get product data from mongodb
//     return db
//       .collection('products')
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then((products) => {
//         // return products data with cart data
//         return products.map((p) => {
//           // get quantity from cart item
//           const quantitty = this.cart.items.find((i) => {
//             return i.productId.toString() === p._id.toString();
//           }).quantity;

//           // return product data with cart data
//           return { ...p, quantity: quantitty };
//         });
//       });
//   };

//   deleteItemFromCart = (productId) => {
//     const updatedCartItem = this.cart.items.filter((item) => {
//       return item.productId.toString() !== productId.toString();
//     });
//     // save new info
//     const db = getDb();
//     return db
//       .collection('users')
//       .updateOne(
//         { _id: mongodb.ObjectId(this._id) },
//         { $set: { cart: { items: updatedCartItem } } }
//       );
//   };

//   addOrder = () => {
//     const db = getDb();

//     // create order info
//     return this.getCart()
//       .then((products) => {
//         const order = {
//           items: products,
//           user: {
//             _id: mongodb.ObjectId(this._id),
//             name: this.name,
//           },
//         };

//         // insert order in mongodb
//         return db.collection('orders').insertOne(order);
//       })
//       .then((result) => {
//         // update cart
//         this.cart = { items: [] };
//         // update cart in mongodb
//         return db
//           .collection('users')
//           .updateOne(
//             { _id: mongodb.ObjectId(this._id) },
//             { $set: { cart: { items: [] } } }
//           );
//       })
//       .catch((err) => console.log(err));
//   };

//   getOrders = () => {
//     const db = getDb();
//     return db
//       .collection('orders')
//       .find({ 'user._id': mongodb.ObjectId(this._id) })
//       .toArray();
//   };

//   static findById = (userId) => {
//     const db = getDb();
//     return db
//       .collection('users')
//       .findOne({ _id: new mongodb.ObjectId(userId) });
//   };
// }

// module.exports = User;
