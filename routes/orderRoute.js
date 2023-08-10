const express = require('express');
const { create_order_controler } = require('../controler/orderControler');
const router = express.Router();
const auth = require('../middleware/auth')

// create order route
router.post('/create',auth,create_order_controler)


module.exports = router