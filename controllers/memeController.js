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

const deleteMeme = async (req, res) => {
    await Meme.deleteOne({ _id: req.params.memeid }, (err, result) => {
        if (err) {
            res.json(err);
        } else if (result) {
            if (result.deletedCount === 1) {
                res.json({ status: 1, message: "Meme is deleted successfully" });
            } else {
                res.json({ status: 0, message: "Meme does not exists" })
            }
        }
    }).clone();
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
const removeLike = async (req, res) => {
    await Meme.findByIdAndUpdate(req.body.memeId, { $pull: { likes: {_id: req.body.likeId} } }).exec(function (err, result) {
        if (err) {
            res.json({ status: 0, message: "Error in Removing Like", err: err })
        } else {
            res.json({ status: 1, message: "Like removed Successfully", data: result })
        }
    })
}
const addComment = async (req, res) => {
    await Meme.findByIdAndUpdate(req.body.memeId, { $push: { comments: req.body.comment } }).exec(function (err, result) {
        if (err) {
            res.json({ status: 0, message: "Error in Like", err: err })
        } else {
            res.json({ status: 1, message: "Comment Added Successfully", data: result })
        }
    })
}
const removeComment = async (req, res) => {
    await Meme.findByIdAndUpdate(req.body.memeId, { $pull: { comments: {_id: req.body.commentId} } }).exec(function (err, result) {
        if (err) {
            res.json({ status: 0, message: "Error in Removing Comment", err: err })
        } else {
            res.json({ status: 1, message: "Comment removed Successfully", data: result })
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

const removeShare = async (req, res) => {
    await Meme.findByIdAndUpdate(req.body.memeId, { $pull: { shares: {_id: req.body.shareId} } }).exec(function (err, result) {
        if (err) {
            res.json({ status: 0, message: "Error in Removing Comment", err: err })
        } else {
            res.json({ status: 1, message: "Comment removed Successfully", data: result })
        }
    })
}

module.exports = { publishMeme, deleteMeme, addLike, removeLike, addComment, removeComment, addShare, removeShare }