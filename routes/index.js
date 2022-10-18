var express = require('express');
const auth = require("../controllers/auth.controller");
var router = express.Router();

/* GET home page. */

router.get('/',auth.getFormLogin);
router.post('/',auth.postLogin);

module.exports = router;
