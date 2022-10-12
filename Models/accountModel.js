const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://localhost:27017/memdy');
}


main().catch(err => console.log(err));


const accountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId },
    totalBalance: { type: String, required: true, trim: true },
    withdrawnBalance: { type: String, required: true },
});



const Acccounts = mongoose.model("Accounts", accountSchema);

module.exports = Acccounts;