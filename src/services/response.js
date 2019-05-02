'use strict';

exports.send = (status, res, message) => {
    res.status(status).send({
        status: status,
        message: toString(status) + ': ' + message
    })
}