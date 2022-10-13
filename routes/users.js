var express = require('express');
var router = express.Router();
var Userr = require('../controllers/user.controller');
const {getFormLogin} = require("../controllers/user.controller");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
