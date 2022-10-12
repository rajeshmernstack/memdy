const express = require('express')
const userRouter = express.Router();
const userController = require('../controllers/userController');
const { checkUserAuth } = require('../middlewares/auth_middleware');


//Routes which require authentication
// userRouter.use("/all", checkUserAuth);
userRouter.use('/authorized', checkUserAuth);


//Public Routes
userRouter.post('/register', userController.addUser);
userRouter.get('/all', userController.allUsers);
userRouter.get('/delete/:userid', userController.deleteUser)
userRouter.post('/login', userController.loginUser)
userRouter.get('/authorized', userController.loggedInUser)
userRouter.post('/sendResetLink', userController.sendPsswordResetEmail);
userRouter.post("/resetPassword", userController.resetPassword);
userRouter.post("/follower/all", userController.allFollowers)
userRouter.post("/follower/add", userController.addFollower)
userRouter.post("/follower/remove", userController.removeFollower)
userRouter.post("/following/all", userController.allFollowings);
userRouter.post("/following/add", userController.addFollowing);
userRouter.post("/following/remove", userController.removeFollowing);
module.exports = userRouter;