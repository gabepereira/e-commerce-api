'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repo = require('../repos/order');
const guid = require('guid');
const auth = require('../services/auth');
const e = require('../services/error');

exports.get = async(req, res, next) => {
    try {
        let data = await repo.get();
        res.status(200).send(data);
    } catch (e) {
        e.error(500, res, "Falha ao processar requisição.");
    }
}

exports.post = async(req, res, next) => {
    const contract = new ValidationContract();
    contract.hasMinLen(req.body.items, 1);

    if (!contract.isValid()) {
        e.error(400, res, "Nenhum item selecionado.");
        return;
    }

    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await auth.decodeToken(token);
        await repo.create({
            customer: data.id,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });
        res.status(201).send({
            message: "Ordem criada."
        });
    } catch (e) {
        e.error(500, res, "Falha ao processar requisição.");
    }
};