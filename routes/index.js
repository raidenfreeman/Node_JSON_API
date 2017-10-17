const express = require('express');
const router = express.Router();
const debug = require('debug')('ln');
const storeController = require('../controllers/storeController');

// Do work here
router.get('/', storeController.myMiddleware, storeController.homePage);

module.exports = router;