var express = require('express');
var router = express.Router();
var multer = require('multer');
const upload = multer({dest:'./tmp/'});
var orderC = require('../controllers/oder.controller');


router.get('/',orderC.getFormlistOrder);



module.exports = router;
