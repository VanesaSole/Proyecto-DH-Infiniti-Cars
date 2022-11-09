const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarioApisController');

router.get('/api/users', controller.list);
router.get('/api/users/:id', controller.user);

module.exports = router