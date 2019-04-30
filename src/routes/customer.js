'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/customer');
const auth = require('../services/auth');

router.get('/', auth.isAdmin, controller.get);
router.post('/', controller.post);
router.post('/auth', controller.authenticate);
router.post('/refresh', auth.authorize, controller.refreshToken);

module.exports = router;