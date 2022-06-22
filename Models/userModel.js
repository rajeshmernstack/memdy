const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://localhost:27017/memdy');
}


main().catch(err => console.log(err));


const UserSchema = new mongoose.Schema({
    username: { type: String, required: [true, "Username is Required"], unique: true, trim: true },
    email: { type: String, required: [true, "Email is Required"], unique: true, trim: true },
    password: { type: String, required: [true, "Password is Required"], trim: true },
    avatar: { type: String, default: null }
});



const User = mongoose.model("User", UserSchema);

module.exports = User;