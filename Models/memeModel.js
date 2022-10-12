const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://localhost:27017/memdy');
}


main().catch(err => console.log(err));


const MemeSchema = new mongoose.Schema({
    path: String,
    Likes: Number,
    Comments: [{
        userId: String,
        comment: String,
        time:{type: Date, default: Date.now}
    }],
    Shares: [{
        userId: String,
        time:{type: Date, default: Date.now}
    }],
});



const Meme = mongoose.model("Meme", MemeSchema);

module.exports = Meme;