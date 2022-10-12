const express = require('express');
const memeRouter = express.Router();
const memeController = require('../controllers/memeController')
memeRouter.post('/publish', memeController.publishMeme)
memeRouter.get('/delete/:memeid', memeController.deleteMeme)
memeRouter.post('/likes/add', memeController.addLike)
memeRouter.post('/likes/remove', memeController.removeLike)
memeRouter.post('/comments/add', memeController.addComment)
memeRouter.post('/comments/remove', memeController.removeComment)
memeRouter.post('/shares/add', memeController.addShare)
memeRouter.post('/shares/remove', memeController.removeShare)



module.exports = memeRouter;