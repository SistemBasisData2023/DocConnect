const express = require('express');
const router = express.Router();

const doctorControl = require('../Controllers/doctorControl');

router.post('/register', doctorControl.doctorSignUp);
router.post('/login', doctorControl.doctorSignIn);
router.delete('/:doctor_id', doctorControl.doctorDelete);

module.exports = router;
