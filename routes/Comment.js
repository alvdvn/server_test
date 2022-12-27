var express = require('express');
const  CommentController = require("../controllers/comment.controller");
const auth = require("../middleware/auth.middleware");
var router = express.Router();

router.get('/list',auth.YeuCauDangNhap,CommentController.getFormComment);
router.get('/delete/:id',auth.YeuCauDangNhap,CommentController.postDel);

module.exports = router;
