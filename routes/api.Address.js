const express = require('express');
const auth = require("../middleware/api.auth.middleware");
const apiAddressController = require("../controllers/api.Address.controller");
const router = express.Router();

router.post('/addShippingAddress',auth,apiAddressController.postAddAddress);
router.get('/getallShippingAddress',auth,apiAddressController.getAllAddress);
router.delete('/deleteShippingAddress/:itemId',auth,apiAddressController.deleteShippingAddress);

module.exports = router;