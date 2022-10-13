const mongoose = require('mongoose');

async function main() {
    await mongoose.connect("mongodb+srv://memdy:memdymemdy@memdy.8dgvrzg.mongodb.net/memdy");
}

main().catch(err => console.log(err));


const MemeSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    path: String,
    likes: [{
        userId: String,
        time:{type: Date, default: Date.now}
    }],
    comments: [{
        userId: String,
        comment: String,
        time:{type: Date, default: Date.now}
    }],
    shares: [{
        userId: String,
        time:{type: Date, default: Date.now}
    }],
});



const Meme = mongoose.model("Meme", MemeSchema);

module.exports = Meme;