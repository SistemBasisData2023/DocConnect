const express = require('express');
const router = express.Router();

const adminControl = require('../Controllers/adminControl');

router.post('/add', adminControl.addDepartment);
router.get('/showDept', adminControl.showDepartment);
router.get('/showDoc', adminControl.showAllDoctors);
router.get('/showPatient', adminControl.showAllPatients);
router.put('/:department_id', adminControl.updateDepartment);
router.delete('/:department_id', adminControl.deleteDepartment);

module.exports = router;