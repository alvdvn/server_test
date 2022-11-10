var express = require('express');
var router = express.Router();
var orderC = require('../controllers/oder.controller');


router.get('/listorder',orderC.getFormlistOrder);
router.get('/detail/:id',orderC.getFormDetaiOrder);
router.post('/detail/:id',orderC.PostDetailOrder);



module.exports = router;
