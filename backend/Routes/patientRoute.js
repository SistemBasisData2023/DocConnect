const express = require('express');
const router = express.Router();

const patientControl = require('../Controllers/patientControl');

router.post('/register', patientControl.patientSignUp);
router.post('/login', patientControl.patientSignIn);
router.post('/book', patientControl.bookAppointment);
router.get('/:patient_id', patientControl.lookAppointment);

module.exports = router;