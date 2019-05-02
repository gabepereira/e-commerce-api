'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repo = require('../repos/customer');
const md5 = require('md5');
const auth = require('../services/auth');
const response = require('../services/response');

exports.get = async(req, res, next) => {
    try {
        let data = await repo.get();
        res.status(200).send(data);
    } catch (error) {
        response.send(500, res, "Falha ao processar requisição.");
    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 1);
    contract.hasMinLen(req.body.email, 1);
    contract.hasMinLen(req.body.password, 6);
    contract.isEmail(req.body.email);

    if (!contract.isValid()) {
        response.send(400, res, "Falha ao validar contrato.");
        return;
    }

    try {
        await repo.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ["user"]
        });
        response.send(201, res, "Cliente cadastrado.");
    } catch (error) {
        response.send(500, res, "Falha ao processar requisição.");
    }
};


exports.authenticate = async(req, res, next) => {
    try {
        const customer = await repo.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!customer) {
            response.send(404, res, "Usuário ou senha incorretos.");
            return;
        }

        const token = await auth.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (error) {
        response.send(500, res, "Falha ao processar requisição.");
    }
};

exports.refreshToken = async(req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await auth.decodeToken(token);
        const customer = await repo.getById(data.id);

        const _token = await auth.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: _token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (error) {
        response.send(500, res, "Falha ao processar requisição.");
    }
};