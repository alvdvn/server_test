const express = require('express');
const router = express.Router();
const auth =require('../middleware/api.auth.middleware');
const apiOrder = require('../controllers/api.order.controller');


router.post('/createCashOrder/:cartId',auth,apiOrder.PostCashOrder);


module.exports = router;
