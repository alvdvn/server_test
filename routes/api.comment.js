var express = require('express');
var router = express.Router();
const CommentController = require('../controllers/api.comment.controller');
const multer =require("multer");
const auth =require('../middleware/api.auth.middleware');
const upload = multer({dest:'./tmp/'})

router.post('/add/:id',auth,upload.array('CmtImg',5), CommentController.postAddComment)
router.get('/getall/:id',CommentController.getAllComment)
//1

module.exports = router;
