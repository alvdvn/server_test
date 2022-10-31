var express = require('express');
var router = express.Router();
const CommentController = require('../controllers/api.comment.controller');
const multer =require("multer");
const auth =require('../middleware/api.auth.middleware');
const upload = multer({dest:'./tmp/'})

router.post('/add/:id',auth,upload.array('CmtImg',5), CommentController.postAddComment)
router.post('/add',upload.array('CmtImg',2), CommentController.postTestIMG)

module.exports = router;
