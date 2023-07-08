const express = require('express');
const userController = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.post('/', userController.createUser);
userRouter.post('/login', userController.loginUser);
userRouter.get('/logout', userController.logoutUser);

module.exports = userRouter;
