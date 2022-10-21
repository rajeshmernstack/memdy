const mongoose = require('mongoose');

async function main() {
    await mongoose.connect("mongodb://localhost:27017/memdy");
}

main().catch(err => console.log(err));


const MemeSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    path: String,
    likes: [{
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        time:{type: Date, default: Date.now}
    }],
    comments: [{
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        comment: String,
        time:{type: Date, default: Date.now}
    }],
    shares: [{
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        time:{type: Date, default: Date.now}
    }],
});



const Meme = mongoose.model("Meme", MemeSchema);

module.exports = Meme;