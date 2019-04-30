'use strict'

exports.get = (req, res, next) => {
    res.status(200).send({
        title: "Node Store API",
        version: "1.0.1"
    });
};