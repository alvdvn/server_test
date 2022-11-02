var express = require('express');
const  CommentController = require("../controllers/comment.controller");
var router = express.Router();

router.get('/list',CommentController.getFormComment);
router.get('/delete/:id',CommentController.postDel);

module.exports = router;
