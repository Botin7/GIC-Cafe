const Product = require("../models/product");
const Pizza = require("../models/addPizza.model");
const Order = require("../models/order");
const additional = require("../models/addtional");
const Booking = require("../models/booking");
const Chat = require("../models/Chat");
const path = require("path");

exports.getProductForm = (req, res, next) => {
  if (req.cookies["username"] == "admin2021") {
    res.render("add-product", {
      name: "Botin",
      path: "/all-product",
      pageTitle: "Add Product",
    });
  } else {
    res.write("You are not an admin, imposter!");
    res.end();
  }
};

exports.postProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageURL;
  const price = req.body.price;
  const description = req.body.description;
  const category = req.body.category;

  const pizza = new Pizza({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
    category: category,
  });
  pizza
    .save()
    .then((result) => {
      console.log("Pizza is created");
      res.redirect("/admin-page");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editProductPage = (req, res, next) => {
  const products = Product.findById(req.params.prodId);
  res.render("edit-product", {
    product: products[0],
    path: "/edit-product/:prodId",
    pageTitle: "Edit Product",
    name: "Selasak",
  });
};

exports.editProductPost = (req, res, next) => {
  const updatedProduct = new Product(
    req.body.id,
    req.body.title,
    req.body.price,
    req.body.imageURL,
    req.body.description
  );
  updatedProduct.update();
  // res.redirect('/');
  res.redirect("/products/" + updatedProduct.id);
};

exports.deleteProduct = (req, res, next) => {
  Product.deleteById(req.body.id);
  res.redirect("/all-product");
};

exports.additional = (req, res, next) => {
  const variation = req.body.variation;
  const choice = req.body.choice;

  const Additional = new additional({
    variation: variation,
    choice: choice,
  });
  additional
    .save()
    .then((result) => {
      console.log("Pizza is created");
      res.redirect("/product-page");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postOrder = (req, res, next) => {
  const price = req.body.price;
  const id = req.body.productID;
  const service = req.body.service;
  const name = req.body.name;
  const phone = req.body.phone;
  const amount = req.body.amount;
  const total = Math.round(price * amount * 100) / 100;
  const payment = req.body.payment;
  const localtime = req.body.localtime;
  const time = req.body.time;
  const choice = req.body.choice;
  const variation = req.body.variation;
  const location = req.body.location;
  const people = req.body.people;
  const product = req.body.product;
  const username = req.body.username;
  const surgar = req.body.surgar;

  const order = new Order({
    service: service,
    name: name,
    phone: phone,
    amount: amount,
    payment: payment,
    total: total,
    localtime: localtime,
    location: location,
    people: people,
    product: product,
    username: username,
    time: time,
    choice: choice,
    variation: variation,
    surgar: surgar,
  });
  order
    .save()
    .then((result) => {
      console.log("order is created");
      // res.redirect('/recipt');
      res.render("Recipt", {
        service: service,
        name: name,
        phone: phone,
        amount: amount,
        payment: payment,
        localtime: localtime,
        location: location,
        people: people,
        product: product,
        id: id,
        price: price,
        total: total,
        username: username,
        time: time,
        choice: choice,
        variation: variation,
        surgar: surgar,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postBooking = (req, res, next) => {
  const price = req.body.price;
  const id = req.body.productID;
  const service = req.body.service;
  const name = req.body.name;
  const phone = req.body.phone;
  const amount = req.body.amount;
  const total = Math.round(price * amount * 100) / 100;
  const payment = req.body.payment;
  const localtime = req.body.localtime;
  const time = req.body.time;
  const choice = req.body.choice;
  const variation = req.body.variation;
  const location = req.body.location;
  const people = req.body.people;
  const product = req.body.product;
  const username = req.body.username;
  const surgar = req.body.surgar;
  const table = req.body.table;

  const booking = new Booking({
    service: service,
    name: name,
    phone: phone,
    amount: amount,
    payment: payment,
    total: total,
    localtime: localtime,
    location: location,
    people: people,
    product: product,
    username: username,
    time: time,
    choice: choice,
    variation: variation,
    surgar: surgar,
    table: table,
  });
  booking
    .save()
    .then((result) => {
      console.log("order is created");
      // res.redirect('/recipt');
      res.render("BookingReceipt", {
        service: service,
        name: name,
        phone: phone,
        amount: amount,
        table: table,
        payment: payment,
        localtime: localtime,
        location: location,
        people: people,
        product: product,
        id: id,
        price: price,
        total: total,
        username: username,
        time: time,
        choice: choice,
        variation: variation,
        surgar: surgar,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postchat = (req, res, next) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const message = req.body.message;
  const postAt = new Date().toLocaleString();
  const chat = new Chat({
    name: name,
    phone: phone,
    email: email,
    message: message,
    postAt: postAt,
  });
  chat
    .save()
    .then((result) => {
      // res.redirect('/recipt');
      const username = req.cookies['username'];
      if(username === 'admin2021' ){
      res.render("messageBox", {
        username: req.cookies['username'],
        name: name,
        phone: phone,
        email: email,
        message: message,
        postAt: postAt,
      });
      }
      else{
        res.redirect('/')
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.purchase = (req, res, next) => {
  Order.find()
    .then((order) => {
      res.render("purchaseHistory", {
        order: order,
        username: req.cookies["username"],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
