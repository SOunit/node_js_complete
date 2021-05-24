const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/index', {
        path: '/',
        pageTitle: 'Shop',
        prods: products,
        productCSS: true,
        formsCSS: false,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
        productCSS: true,
        formsCSS: false,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: 'Product Detail',
        path: '/products',
        productCSS: true,
        formsCSS: false,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// 1. get all products in cart
// 2. get all products
// 3. loop all products
// 4. check if product is in cart
// 5. create product data if product is in cart
exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      console.log(cart);
      return cart.getProducts();
    })
    .then((products) => {
      console.log(products);
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products,
        productCSS: true,
        formsCSS: false,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products && products.length > 0) {
        product = products[0];
      }
      // if product exists
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
      }
      // if product NOT exists
      return Product.findByPk(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    productCSS: true,
    formsCSS: false,
    pageTitle: 'Your Order',
    prods: [],
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    productCSS: true,
    formsCSS: false,
    pageTitle: 'Checkout',
    prods: [],
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};
