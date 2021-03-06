'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repo = require('../repos/product');
const response = require('../services/response');

exports.get = async(req, res, next) => {
    try {
        let data = await repo.get();
        res.status(200).send(data);
    } catch (error) {
        response.send(500, res, "Falha ao processar requisição.");
    }
}

exports.getBySlug = async(req, res, next) => {
    try {
        var data = await repo.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (error) {
        response.send(500, res, "Falha ao processar requisição.");
    }
}

exports.getByTag = async(req, res, next) => {
    try {
        const data = await repo.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (error) {
        response.send(500, res, "Falha ao processar requisição.");
    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 1);
    contract.hasMinLen(req.body.slug, 1);
    contract.hasMinLen(req.body.description, 1);

    if (!contract.isValid()) {
        response.send(400, res, "Erro de validação do contrato.");
        return;
    }

    try {
        await repo.create({
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            price: req.body.price,
            active: true
        });
    } catch (error) {
        response.send(500, res, "Falha ao processar requisição.");
    }
};

exports.put = async(req, res, next) => {
    try {
        await repo.update(req.params.id, req.body);
        response.send(200, res, "Produto atualizado com sucesso!");
    } catch (error) {
        response.send(500, res, "Falha ao processar requisição.");
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repo.delete(req.body.id);
        response.send(200, res, "Produto removido com sucesso!");
    } catch (error) {
        response.send(500, res, "Falha ao processar requisição.");
    }
};
