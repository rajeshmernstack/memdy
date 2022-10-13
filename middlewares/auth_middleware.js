const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

const checkUserAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if(authorization && authorization.startsWith('Bearer')) {
        const userToken = authorization.split(' ')[1];
        const {userID} = jwt.verify(userToken,process.env.JWT_SECRET_KEY);
        req.user = await User.findById(userID).select('-password');
        next();
    }else{
        res.status(401).json({status: 0, message: "Unauthorized User, No Token Found"})
    }
}

module.exports = {checkUserAuth}