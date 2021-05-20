const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    productCSS: true,
    formsCSS: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

exports.getAdminProducts = (req, res, next) => {
  res.render('admin/products', {
    pageTitle: 'Admin Products',
    path: '/admin/products',
    productCSS: true,
    formsCSS: true,
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Products',
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
    pageTitle: 'Cart',
    prods: [],
  });
};

exports.getIndex = (req, res, next) => {
  res.render('shop/index', {
    path: '/',
    productCSS: true,
    formsCSS: false,
    pageTitle: 'Shop',
    prods: [],
  });
};
