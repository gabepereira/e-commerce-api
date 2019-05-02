'use strict'

exports.get = (req, res, next) => {
    res.status(200).send({
        title: "e-commerce-api",
        version: "1.1.0",
        github: 'https://github.com/gabepereira/e-commerce-api'
    });
};