const Meme = require('../Models/memeModel')
const totalLikes = async (req, res) => {
    await Meme.find({}, (err, likes) => {
        if (err) {
            res.json({ status: 0, message: "Error Occured in API" });
        } else {
            let total_likes = 0;
            likes.forEach(like => total_likes += like.length);
            res.json({status: 1, total: total_likes});
        }
    }).select("likes").clone();
}

module.exports = {
    totalLikes
}