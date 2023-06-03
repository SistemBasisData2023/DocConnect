const express = require('express');
const router = express.Router();

const patientControl = require('../Controllers/patientControl');

router.post('/register', patientControl.patientSignUp);
router.post('/login', patientControl.patientSignIn);


module.exports = router;