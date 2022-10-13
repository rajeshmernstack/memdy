const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://localhost:27017/memdy');
}


main().catch(err => console.log(err));


const UserSchema = new mongoose.Schema({
    fullname: { type: String, required: [true, "Full Name is Required"], unique: true, trim: true },
    username: { type: String, required: [true, "Username is Required"], unique: true, trim: true },
    email: { type: String, required: [true, "Email is Required"], unique: true, trim: true },
    password: { type: String, required: [true, "Password is Required"], trim: true },
    avatar: { type: String, default: null },
    paymentGatewayId: {type: String, default: null},
    accountNumber: { type: String, default: null},
    totalBalance: { type: Number, default: 0},
    withdrawnBalance: { type: Number, default: 0},
    followers: [{
        userId: String,
        time:{type: Date, default: Date.now}
    }],
    followings: [{
        userId: String,
        time: {type: Date, default: Date.now}
    }]

});



const User = mongoose.model("User", UserSchema);

module.exports = User;