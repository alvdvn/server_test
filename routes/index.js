var express = require('express');
const Userr = require("../controllers/user.controller");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login',Userr.getFormLogin);
// router.post('/login',Userr.postLogin);

module.exports = router;
