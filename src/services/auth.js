'use strict';

const jwt = require('jsonwebtoken');
const e = require('../services/error');

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
        e.error(401, res, "Acesso negado.");
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                e.error(401, res, "Token Inválido.");
            } else {
                next();
            }
        });
    }
};

exports.isAdmin = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        e.error(401, res, "Token Inválido.");
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                e.error(401, res, "Token Inválido.");
            } else {
                if (decoded.roles.includes('admin')) {
                    next();
                } else {
                    e.error(403, res, "Funcionalidade restrita ao admnistrador.");
                }
            }
        });
    }
};