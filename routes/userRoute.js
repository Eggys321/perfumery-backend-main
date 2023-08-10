const express = require('express');
const { register_controler, login_controler, logout_controler, loggedIn_controler } = require('../controler/userControler');
const router = express.Router();

// register route
router.post('/register',register_controler)
// login route
router.post('/login',login_controler)
// logout route
router.get('/logout',logout_controler)
// loggedIn
router.get('/loggedIn',loggedIn_controler)

module.exports = router