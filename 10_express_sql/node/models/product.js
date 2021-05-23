const Cart = require('../models/cart');
const db = require('../util/database');

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {}

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id) {}

  static deleteById(id) {}
};
