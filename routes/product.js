var express = require('express');

var ProC = require('../controllers/product.controller');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/list',ProC.getListProduct);
router.get('/add',ProC.getFormAddPro);
router.post('/add',ProC.postAddPro)







module.exports = router;