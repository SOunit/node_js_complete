const fs = require('fs');
const path = require('path');

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
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        // fetch existing product
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];

        // update product
        updatedProducts[existingProductIndex] = this;

        // save products to json file
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        // create new id
        this.id = Math.random().toString();

        // add new product
        products.push(this);

        // save products to json file
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
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
