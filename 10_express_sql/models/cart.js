const fs = require('fs');
const path = require('path');

// create products json path
const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

module.exports = class Cart {
  static addProduct = (id, productPrice) => {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        // memo: avoiding mutate old variable is good pratice to reduce bug
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        // if added product is new
        updatedProduct = { id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  };

  static deleteProduct = (id, productPrice) => {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const cart = JSON.parse(fileContent);
      const updatedCart = { ...cart };
      const product = updatedCart.products.find((prod) => prod.id === id);

      // in case product NOT exist in cart
      if (!product) {
        return;
      }

      // update products in cart
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );

      // update total price in cart
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * product.qty;

      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  };

  static getCart = (cb) => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb(null);
      } else {
        const cart = JSON.parse(fileContent);
        cb(cart);
      }
    });
  };
};
