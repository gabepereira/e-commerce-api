'use strict';

const jwt = require('jsonwebtoken');
const response = require('../services/response');

exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
}

exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

exports.authorize = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        response.send(401, res, "Acesso negado.");
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                response.send(401, res, "Token inválido.");
            } else {
                next();
            }
        });
    }
};

exports.isAdmin = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        response.send(401, res, "Token inválido.");
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                response.send(401, res, "Token inválido.");
            } else {
                if (decoded.roles.includes('admin')) {
                    next();
                } else {
                    response.send(403, res, "Funcionalidade restrita ao admnistrador.");
                }
            }
        });
    }
};