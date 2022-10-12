const Meme = require('../Models/memeModel');


const publishMeme = async (req, res) => {
    const newMeme = new Meme(req.body);
    await newMeme.save((err, result) => {
        if (err) {
            res.json({ status: 0, message: "meme did not published successfully", err: err })
        } else {
            res.json({ status: 1, message: "meme published successfully", data: result })
        }
    });
}
const addLike = async (req, res) => {
    await Meme.findByIdAndUpdate(req.body.memeId, { $push: { likes: req.body.like } }).exec(function (err, result) {
        if (err) {
            res.json({ status: 0, message: "Error in Like", err: err })
        } else {
            res.json({ status: 1, message: "meme Liked Successfully", data: result })
        }
    })
}
const addComment = async (req, res) => {
    await Meme.findByIdAndUpdate(req.body.memeId, { $push: { comments: req.body.comment } }).exec(function (err, result) {
        if (err) {
            res.json({ status: 0, message: "Error in Like", err: err })
        } else {
            res.json({ status: 1, message: "meme Liked Successfully", data: result })
        }
    })
}
const addShare = async (req, res) => {
    await Meme.findByIdAndUpdate(req.body.memeId, { $push: { shares: req.body.share } }).exec(function (err, result) {
        if (err) {
            res.json({ status: 0, message: "Error in Share", err: err })
        } else {
            res.json({ status: 1, message: "Meme Shares Successfully", data: result })
        }
    })
}

module.exports = { publishMeme, addLike, addComment, addShare }