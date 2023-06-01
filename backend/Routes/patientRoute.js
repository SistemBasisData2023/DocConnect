const express = require('express');
const router = express.Router();

const patientControl = require('../Controllers/patientControl');

router.post('/register', patientControl.patientSignUp);
router.post('/login', patientControl.patientSignIn);
router.delete('/:patient_id', patientControl.patientDelete);

module.exports = router;