const express = require('express');
const memeRouter = express.Router();
const memeController = require('../controllers/memeController')
memeRouter.post('/publish', memeController.publishMeme)
memeRouter.post('/likes/add', memeController.addLike)
memeRouter.post('/comments/add', memeController.addComment)
memeRouter.post('/shares/add', memeController.addShare)



module.exports = memeRouter;