var express = require('express');
var router = express.Router();
const apiProduct = require('../controllers/api.product.controller');

router.get('/getall',apiProduct.getApiProduct);
router.get('/getone/:id',apiProduct.GetOne);
router.get('/gettop10',apiProduct.GetProductTop10);


module.exports = router;
