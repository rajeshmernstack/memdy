const express = require('express');
const adminRouter = express.Router();

const checkUserAuth = require('../middlewares/auth_middleware');



module.exports = adminRouter;