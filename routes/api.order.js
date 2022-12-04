const express = require('express');
const router = express.Router();
const auth =require('../middleware/api.auth.middleware');
const apiOrder = require('../controllers/api.order.controller');
const apiPay = require('../controllers/api.payment.controller');

router.post('/createCashOrder/:cartId',auth,apiOrder.PostCashOrder);
router.post('/createCardOrder/:cartId',auth,apiOrder.PostCardOrder);
router.get('/getallOrderByuser',auth,apiOrder.GetAllOrderByUser);
router.get('/getDetailOrder/:orderId',apiOrder.GetDetailOrder);
router.post('/changeStatusToCancel/:orderId',apiOrder.PostChangeToCancel);
router.post('/create-payment-intent',apiPay.postPay);



module.exports = router;
