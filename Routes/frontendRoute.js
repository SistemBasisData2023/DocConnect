const express = require('express');
const router = express.Router();

const frontendControl = require('../Controllers/frontendControl');

router.get("/login", frontendControl.loginSignup);
router.get("/doctorOrUser", frontendControl.doctorOrUser);
router.get("/doctorRegister", frontendControl.docRegist);
router.get("/patientRegister", frontendControl.userRegist);

router.get("/docReviewAppointment", frontendControl.docReviewAppointment);
router.get("/docMakeSchedule", frontendControl.docMakeSchedule);
router.get("/docSchedule", frontendControl.docSchedule);
router.get("/doc", frontendControl.docHome);
router.get("/docDetails/:doctorId", frontendControl.docDetails)

router.get("/userMakeAppointment", frontendControl.userMakeAppointment);
router.get("/userReviewAppointment", frontendControl.userReviewAppointment);
router.get("/user", frontendControl.userHome);
router.get("/userDetails/:patientId", frontendControl.userDetails);
router.get("/userMyAppointment/:patientId", frontendControl.userMyAppointment);

router.post("/doLogin", frontendControl.login);


module.exports = router;