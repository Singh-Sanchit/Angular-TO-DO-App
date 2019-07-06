const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

/* @POST(/api/rest/v1/todo/user/signup) */
router.post('/signup', userController.user_signup);

/* @POST(/api/rest/v1/todo/user/login) */
router.post('/login', userController.user_login);

//TODO: to be done in future implementation
/* @GET(/api/rest/v1/todo/user/forgetpassword) */
router.get('/forgetpassword/:user_id', userController.user_forgetpassword);

module.exports = router;