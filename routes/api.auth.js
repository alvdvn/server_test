var express = require('express');
var router = express.Router();
const apiAuth = require('../controllers/api.auth.controller');

router.post('/login', apiAuth.postLogin);
router.post('/register', apiAuth.postReg);


module.exports = router;