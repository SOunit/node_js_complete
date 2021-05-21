const fs = require('fs');
const path = require('path');
const {
  getProducts,
} = require('../../07_02_mvc_save_json/controllers/products');

// create products json path
const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const getProductsFromFile = (cb) => {
  // try to get data from json
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      // err means
      // data NOT exists in json file
      cb([]);
    } else {
      // data exists in json file
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile((products) => {
      // add new product
      products.push(this);

      // save products to json file
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
