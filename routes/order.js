var express = require('express');
var router = express.Router();
var orderC = require('../controllers/oder.controller');


router.get('/listorder',orderC.getFormlistOrder);



module.exports = router;
