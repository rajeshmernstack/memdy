const express = require('express')
const userRouter = express.Router();
const userController = require('../controllers/userController');
const { checkUserAuth } = require('../middlewares/auth_middleware');


//Routes which require authentication
userRouter.use("/all", checkUserAuth);
userRouter.use('/authorized', checkUserAuth);


//Public Routes
userRouter.post('/add', userController.addUser);
userRouter.get('/all', userController.allUsers);
userRouter.get('/delete/:userid', userController.deleteUser)
userRouter.post('/login', userController.loginUser)
userRouter.get('/authorized', userController.loggedInUser)
userRouter.post('/sendResetLink', userController.sendPsswordResetEmail);
userRouter.post("/resetPassword", userController.resetPassword)

module.exports = userRouter;



