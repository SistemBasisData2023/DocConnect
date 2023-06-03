const express = require('express');
const router = express.Router();

const doctorControl = require('../Controllers/doctorControl');

router.post('/register', doctorControl.doctorSignUp);
router.post('/login', doctorControl.doctorSignIn);
router.post('/schedule', doctorControl.makeSchedule);

module.exports = router;
