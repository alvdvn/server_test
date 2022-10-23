var express = require('express');
var router = express.Router();
const apiCartController = require('../controllers/api.cart.controller');
var auth = require('../middleware/api.auth.middleware');

 router.post('/add',auth, apiCartController.postAddCart);
 router.get('/list',auth, apiCartController.getAllCartByUserID);
 router.delete('/delete', auth, apiCartController.DeleteCartItem);



module.exports = router;