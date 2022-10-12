const express = require('express');
const payGatewayRouter = express.Router();
const paymentGatewayController = require('../controllers/paymentGatewayController');

payGatewayRouter.post('/add', paymentGatewayController.addPaymentGateway);
payGatewayRouter.get('/all', paymentGatewayController.allPaymentGateways)

module.exports = payGatewayRouter;
