'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async(data) => {
    let res = await Order.find({},
            'customer number status items')
        .populate('customer', 'name')
        .populate('items.product', 'title price');
    return res;
}

exports.create = async(data) => {
    let order = new Order(data);
    await order.save();
}