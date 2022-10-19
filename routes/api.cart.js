var express = require('express');
var router = express.Router();
const apiCartController = require('../controllers/api.giohang.controller');
var auth = require('../middleware/api.auth.middleware');

// router.post('/add',auth, apiCartController.postCart);
// router.get('/list',auth, apiCartController.getCart);
// router.delete('/delete', auth, apiCartController.postDel);



module.exports = router;