'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const authService = require('../services/auth.service');

router.post('/', controller.create);
router.post('/password-recovery', controller.passwordRecovery);
router.post('/reset-password', controller.resetPassword);

module.exports = router;