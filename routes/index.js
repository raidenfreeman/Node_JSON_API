const express = require('express');
const router = express.Router();
const debug = require('debug')('ln');
const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');
const {
  catchErrors
} = require('../handlers/errorHandlers');

// Do work here
router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));

router.get('/add', storeController.addStore);

router.get('/tags', catchErrors(storeController.getStoresByTag));
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));

router.post('/add', catchErrors(storeController.createStore));
router.post('/add/:id', catchErrors(storeController.updateStore));

router.get('/stores/:id/edit', catchErrors(storeController.editStore));

router.get('/login', userController.loginForm);

router.get('/register', userController.registerForm);
router.post('/register',  userController.validateRegister);

module.exports = router;