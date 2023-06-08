const express = require('express');
const router = express.Router();

const frontendControl = require('../Controllers/frontendControl');

router.get("/login", frontendControl.loginSignup);
router.get("/doctorOrUser", frontendControl.doctorOrUser);
router.get("/doctorRegister", frontendControl.docRegist);
router.get("/patientRegister", frontendControl.userRegist);

module.exports = router;