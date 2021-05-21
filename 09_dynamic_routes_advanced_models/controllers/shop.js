const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      path: '/',
      productCSS: true,
      formsCSS: false,
      pageTitle: 'Shop',
      prods: products,
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
      productCSS: true,
      formsCSS: false,
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: 'Product Detail',
      path: '/products',
      productCSS: true,
      formsCSS: false,
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    productCSS: true,
    formsCSS: false,
    pageTitle: 'Your Cart',
    prods: [],
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
