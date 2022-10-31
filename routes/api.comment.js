var express = require('express');
var router = express.Router();
const CommentController = require('../controllers/api.comment.controller');
const auth =require('../middleware/api.auth.middleware');

router.post('/add/:id',auth, CommentController.postAddComment)

module.exports = router;
