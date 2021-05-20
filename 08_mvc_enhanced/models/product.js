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
  constructor(title) {
    this.title = title;
  }

  save() {
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
};
