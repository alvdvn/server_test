var express = require('express');
var router = express.Router();
const bannerC = require('../controllers/thongke.controller');

router.get('/',bannerC.getFormAdd);


module.exports = router;
