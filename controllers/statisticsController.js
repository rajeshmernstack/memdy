const Meme = require('../Models/memeModel')
const User = require('../Models/userModel');

const PaymentGateway = require('../Models/PayGatewayModel');

const totalLikes = async (req, res) => {
    await Meme.find({}, (err, likes) => {
        if (err) {
            res.json({ status: 0, message: "Error Occured in API" });
        } else {
            let total_likes = 0;
            likes.forEach(like => total_likes += like.likes.length);
            res.json({status: 1, total: total_likes});
        }
    }).select("likes").clone();
}


const totalComments = async (req, res) => {
    await Meme.find({}, (err, comments) => {
        if (err) {
            res.json({ status: 0, message: "Error Occured in API" });
        } else {
            let total_comments = 0;
            comments.forEach(comment => total_comments += comment.comments.length);
            res.json({status: 1, total: total_comments});
        }
    }).select("comments").clone();
}

const totalShares = async (req, res) => {
    await Meme.find({}, (err, shares) => {
        if (err) {
            res.json({ status: 0, message: "Error Occured in API" });
        } else {
            let total_shares = 0;
            shares.forEach(share => total_shares += share.shares.length);
            res.json({status: 1, total: total_shares});
        }
    }).select("shares").clone();
}

const totalUsers = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) {
            res.json({ status: 0, message: "Error Occured in API" });
        } else {
            
            res.json({status: 1, total: users.length});
        }
    }).clone();
}

const totalPaymentGateways = async (req, res) => {
    await PaymentGateway.find({}, (err, paygateways) => {
        if (err) {
            res.json({ status: 0, message: "Error Occured in API" });
        } else {
            
            res.json({status: 1, total: paygateways.length});
        }
    }).clone();
}
const totalMemes = async (req, res) => {
    await Meme.find({}, (err, memes) => {
        if (err) {
            res.json({ status: 0, message: "Error Occured in API" });
        } else {
            
            res.json({status: 1, total: memes.length});
        }
    }).clone();
}
const totalRevenue = async (req, res) => {
    await Meme.find({}, (err, likes) => {
        if (err) {
            res.json({ status: 0, message: "Error Occured in API" });
        } else {
            let total_likes = 0;
            likes.forEach(like => total_likes += like.likes.length);
            res.json({status: 1, total: total_likes*process.env.PROFIT_RATE});
        }
    }).select("likes").clone();
}

module.exports = {
    totalLikes,
    totalComments,
    totalShares,
    totalUsers,
    totalPaymentGateways,
    totalMemes,
    totalRevenue
}