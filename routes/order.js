var express = require('express');
var router = express.Router();
var orderC = require('../controllers/order.controller');


router.get('/listorder',orderC.getFormlistOrder);
router.get('/detail/:id',orderC.getFormDetaiOrder);
router.post('/detail/:id',orderC.PostDetailOrder);
router.get('/delete/:id',orderC.postDeleteOrder);



module.exports = router;
