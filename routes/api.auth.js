var express = require('express');
var router = express.Router();
const apiAuth = require('../controllers/api.auth.controller');
const auth =require('../middleware/api.auth.middleware');
router.post('/login', apiAuth.postLogin);
router.post('/register', apiAuth.postReg);
router.get('/profile',auth, apiAuth.getProfile);

module.exports = router;