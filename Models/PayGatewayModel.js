const mongoose = require('mongoose');

async function main() {
    await mongoose.connect("mongodb+srv://memdy:memdymemdy@memdy.8dgvrzg.mongodb.net/memdy");
}


main().catch(err => console.log(err));


const PayGatewaySchema = new mongoose.Schema({
    payGatewayName: { type: String, required: [true, "Payment Gateway is Required"], trim: true },
    payGatewayLogo: { type: String, required: [true, "Payment Gateway Logo is Required"]}
    
});



const PaymentGateway = mongoose.model("PaymentGateways", PayGatewaySchema);

module.exports = PaymentGateway;