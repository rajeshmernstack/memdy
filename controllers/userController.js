const User = require('../Models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const axios = require('axios');


require('mongoose-query-random');

const allUsers = async (req, res, next) => {
    await User.find({}, (err, users) => {
        if (err) {
            res.json({ status: 0, message: "Error in API request" })
        } else {
            res.json({ status: 1, total: users.length, data: users });
        }
    }).populate('followers.userId').populate('followings.userId').clone()
}

const addUser = async (req, res, next) => {
    if (Object.keys(req.body).length != 0) {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.new_password, salt);
        const newUser = new User({
            fullname: req.body.new_fullname,
            username: req.body.new_username,
            email: req.body.new_email,
            password: hashPassword
        });
        await newUser.save((err, result) => {
            if (err) {
                res.json({ status: 0, message: `${Object.keys(err.keyValue)[0]} already exists` })
            } else {

                res.status(201).json({ status: 1, message: "user registered successfully", data: result })
            }
        })
    }
}


const deleteUser = async (req, res, next) => {
    await User.deleteOne({ _id: req.params.userid }, (err, result) => {
        if (err) {
            res.json(err);
        } else if (result) {
            if (result.deletedCount === 1) {
                res.json({ status: 1, message: "user is deleted successfully" });
            } else {
                res.json({ status: 0, message: "user does not exists" })
            }
        }
    }).clone()
}


const loginUser = async (req, res, next) => {
    if (Object.keys(req.body).length != 0) {
        const foundUser = await User.findOne({ username: req.body.my_username });
        if (foundUser != null) {
            const isPassMatch = await bcrypt.compare(req.body.my_password, foundUser.password);
            if (isPassMatch && (req.body.my_username === foundUser.username)) {
                const jwtToken = jwt.sign({ userID: foundUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
                res.json({ status: 1, message: "User Authendicated Successfully", token: jwtToken })
            }
        } else {
            res.json({ status: 0, message: "Username or Password is Incorrect" })
        }
    }
}


const resetPassword = async (req, res, next) => {
    if (req.body.new_pass != req.body.new_confirm_pass) {
        res.json({ status: 0, message: 'Password Does not match' })
    } else {
        await jwt.verify(req.body.user_token, process.env.JWT_SECRET_KEY, async (err, decorded) => {
            if (err) {
                res.json({ status: 0, message: err.message });
            } else {
                if (decorded.userID === req.body.user_id) {
                    if (req.body.new_pass === req.body.new_confirm_pass) {
                        const salt = await bcrypt.genSalt(10)
                        const hashPassword = await bcrypt.hash(req.body.new_pass, salt);
                        await User.findByIdAndUpdate({ _id: decorded.userID }, { password: hashPassword });
                        res.json({ status: 1, message: 'Password Channged Successfully' });
                    }
                } else {
                    res.json({ status: 0, message: 'User does not match' })
                }
            }
        });
    }
}

const sendPsswordResetEmail = async (req, res, next) => {
    if (req.body.forgot_email != null) {
        const userFound = await User.findOne({ email: req.body.forgot_email });
        if (userFound) {
            const passwordResetToken = jwt.sign({ userID: userFound._id }, process.env.JWT_SECRET_KEY, { expiresIn: "60m" });
            const passwordResetURL = process.env.APP_URL + "/reset/" + userFound._id + "/" + passwordResetToken;
            res.json({ status: 1, message: "Password Reset Email Sent to Email Successfully", link: passwordResetURL })
        } else {
            res.json({ status: 0, message: "Email Not Found" })
        }
    } else {
        res.json({ status: 0, message: "Please Enter Email First" });
    }
}


const loggedInUser = (req, res, next) => {
    res.send({ status: 1, message: "User is Logged In", data: req.user })
}


const allFollowers = async (req, res) => {
    await User.find({ _id: req.body.userId }, (err, user) => {
        if (err) {
            res.json({ status: 0, message: "Error in API request", err: err.message })
        } else {
            res.json({ status: 1, message: "Follwing Done Successfully", data: user })
        }
    }).clone()
}

const addFollower = async (req, res, next) => {
    await User.findByIdAndUpdate(req.body.userId, { $push: { followers: req.body.follower } }).exec(function (err, result) {
        if (err) {
            res.json({ status: 0, message: "Error in add Follwer", err: err })
        } else {
            res.json({ status: 1, message: "Follower Added Successfully", data: result })
        }
    })
}

const removeFollower = async (req, res) => {
    await User.findByIdAndUpdate(req.body.userId, { $pull: { followers: { _id: req.body.followId } } }).exec(function (err, result) {
        if (err) {
            res.json({ status: 0, message: "Error in Removing Follower", err: err })
        } else {
            res.json({ status: 1, message: "Follower removed Successfully", data: result })
        }
    })
}


const allFollowings = async (req, res) => {
    await User.find({ _id: req.body.userId }, (err, user) => {
        if (err) {
            res.json({ status: 0, message: "Error in API request" })
        } else {
            res.json({ status: 1, total: (user.followings?.length || 0), followings: user.followings });
        }
    }).populate('followings.userId').clone()
}
const addFollowing = async (req, res, next) => {
    await User.findByIdAndUpdate(req.body.userId, { $push: { followings: req.body.following } }).exec(function (err, result) {
        if (err) {
            res.json({ status: 0, message: "Error in add Follwer", err: err })
        } else {
            console.log(result)
            axios.post(process.env.APP_URL + "/api/users/follower/add", {
                userId: req.body.following.userId,
                follower: {
                    userId: req.body.userId
                }
            }).then(function (response) {
                res.json({ status: 1, message: "Successfully Followed", data: response })
            }).catch(function (error) {
                if (error) {
                    res.json({ status: 0, message: "Error Occured in API", err: error });
                }
            });
        }
    })
}

const removeFollowing = async (req, res) => {
    await User.findByIdAndUpdate(req.body.userId, { $pull: { followings: { _id: req.body.followingId } } }).exec(function (err, result) {
        if (err) {
            res.json({ status: 0, message: "Error in Removing Follower", err: err })
        } else {
            res.json({ status: 1, message: "Following removed Successfully", data: result })
        }
    })
}

const randomUsers = async (req, res) => {
    await User.find().random(req.params.total, true, function (err, users) {
        if (err) {
            res.json({ status: 0, message: "Error in API" })
        }
        res.json({ status: 1, data: users })
    }).clone();
}





module.exports = {
    addUser,
    allUsers,
    deleteUser,
    loginUser,
    resetPassword,
    loggedInUser,
    sendPsswordResetEmail,
    allFollowers,
    addFollower,
    removeFollower,
    allFollowings,
    addFollowing,
    removeFollowing,
    randomUsers
}