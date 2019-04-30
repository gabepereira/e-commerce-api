'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/product');
const auth = require('../services/auth');

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/tags/:tag', controller.getByTag);
router.post('/', auth.isAdmin, controller.post);
router.put('/:id', auth.isAdmin, controller.put);
router.delete('/:id', auth.isAdmin, controller.delete);

module.exports = router;