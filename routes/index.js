var express = require('express');
const auth = require("../controllers/auth.controller");
const apiAuth = require("../controllers/api.auth.controller");
var router = express.Router();

/* GET home page. */

router.get('/',auth.getFormLogin);
router.post('/',auth.postLogin);
router.get("/reset-password/:token",auth.postResetPassword)
module.exports = router;
