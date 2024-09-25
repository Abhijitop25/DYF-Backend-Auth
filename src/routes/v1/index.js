const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user-controller');
const userMiddleware = require('../../middlewares/auth-request-middleware.js');

router.post('/user', userMiddleware.validateUserAuth, userController.create);

router.post('/signin', userMiddleware.validateUserAuth, userController.signIn)

router.get('/isAuthenticated', userController.isAuthenticated);

router.get('/isAdmin', userMiddleware.validateIsAdminRequest, userController.isAdmin)
module.exports = router;