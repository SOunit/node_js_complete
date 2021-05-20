const fs = require('fs');
const path = require('path');

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    // create products json path
    const p = path.join(
      path.dirname(require.main.filename),
      'data',
      'products.json'
    );

    // get products from file
    fs.readFile(p, (err, fileContent) => {
      // initialize products
      let products = [];

      // if data exists, update products
      if (!err) {
        products = JSON.parse(fileContent);
      }

      // add new product
      products.push(this);

      // save products to json file
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    // create products json path
    const p = path.join(
      path.dirname(require.main.filename),
      'data',
      'products.json'
    );

    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      }

      cb(JSON.parse(fileContent));
    });
  }
};
