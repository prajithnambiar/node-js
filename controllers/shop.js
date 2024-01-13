const Product = require("../model/product.js");
const Cart = require("../model/cart.js");
const e = require("express");

exports.getProducts = (req, res, next) => {
  // res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
  Product.findAll()
    .then((product) => {
      res.render("shop/product-list", {
        prod: product,
        pageTitle: "All products",
        path: "/products",
      }); // this will render the shop templating engine
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getProduct = (req, res, next) => {
  const prodid = req.params.productId;
  Product.findByPk(prodid)
    .then((prod) => {
      res.render("shop/product-detail", {
        product: prod,
        pageTitle: prod.title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((product) => {
      res.render("shop/index", {
        prod: product,
        pageTitle: "Shop",
        path: "/",
      }); // this will render the shop templating engine
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getCart = (req, res, next) => {
  Product.fetchAll((products) => {});
};
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.getProdById(prodId, (product) => {
    Cart.fetchProduct(prodId, product.price);
  });

  res.redirect("/cart");
};
exports.getOrders = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/orders", {
      prod: products,
      pageTitle: "My Orders",
      path: "/orders",
    });
  });
};
exports.getCheckout = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("/checkout", {
      prod: products,
      pageTitle: "Checkout",
      path: "/checkout",
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        products: cartProducts,
        pageTitle: "My Cart",
        path: "/cart",
      });
    });
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.getProdById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};
