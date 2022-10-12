const express = require('express');
const statisticsRouter = express.Router();
const statisticsController = require('../controllers/statisticsController');

statisticsRouter.get('/likes/total', statisticsController.totalLikes);

module.exports = statisticsRouter;
