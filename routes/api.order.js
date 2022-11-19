const express = require('express');
const router = express.Router();
const auth =require('../middleware/api.auth.middleware');
const apiOrder = require('../controllers/api.order.controller');


router.post('/createCashOrder/:cartId',auth,apiOrder.PostCashOrder);
router.post('/createCardOrder/:cartId',auth,apiOrder.PostCardOrder);
router.get('/getallOrderByuser',auth,apiOrder.GetAllOrderByUser);
router.get('/getDetailOrder/:orderId',apiOrder.GetDetailOrder);


module.exports = router;
