'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/order');
const auth = require('../services/auth');

router.get('/', auth.authorize, controller.get);
router.post('/', auth.authorize, controller.post);

module.exports = router;