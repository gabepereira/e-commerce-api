'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./src/config');
const app = express();

mongoose.connect(config.connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

//Models

const Product = require('./src/models/product');
const Customer = require('./src/models/customer');
const Order = require('./src/models/order');

//Routes

const index = require('./src/routes/index');
const product = require('./src/routes/product');
const customer = require('./src/routes/customer');
const order = require('./src/routes/order');

const i = '/';

app.use(bodyParser.json({
    limit: '1mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use(i, index);
app.use(i + 'product', product);
app.use(i + 'customer', customer);
app.use(i + 'order', order);

module.exports = app;