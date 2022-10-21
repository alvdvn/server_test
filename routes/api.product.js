var express = require('express');
var router = express.Router();
const apiProduct = require('../controllers/api.product.controller');

router.get('/getall',apiProduct.getApiProduct);
router.get('/getone',apiProduct.GetOne);


module.exports = router;
