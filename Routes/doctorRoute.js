const express = require('express');
const router = express.Router();

const doctorControl = require('../Controllers/doctorControl');

router.get("/getDoctor/byDeptId/:dept_id", doctorControl.doctorByDepartmentId);
router.get("/showSchedule/:doctor_id", doctorControl.scheduleByDoctorId);
router.post('/register', doctorControl.doctorSignUp);
router.post('/login', doctorControl.doctorSignIn);
router.post('/schedule', doctorControl.makeSchedule);
router.get('/:doctor_id', doctorControl.showAppointment);
router.put('/update', doctorControl.statusAppointment);

module.exports = router;