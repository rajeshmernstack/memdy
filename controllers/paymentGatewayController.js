const PaymentGateway = require('../Models/PayGatewayModel');


const addPaymentGateway = async (req, res) => {
    const newPaymentGateway = new PaymentGateway(req.body);
    await newPaymentGateway.save((err, result) => {
        if (err) {
            res.json({ status: 0, message: "error while adding payment gateway" })
        } else {
            res.json({ status: 1, message: "Successfully added payment Gateway", data: result })
        }
    });
}

const allPaymentGateways = async (req, res) => {
    await PaymentGateway.find({}, (err, payGateways) => {
        if (err) {
            res.json({ status: 0, message: "Error in API request" })
        } else {
            res.json({ status: 1, total: payGateways.length, data: payGateways });
        }
    }).clone()
}

module.exports = { addPaymentGateway, allPaymentGateways }