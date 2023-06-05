const express = require('express');
const router = express.Router();

const adminControl = require('../Controllers/adminControl');

router.post('/add', adminControl.addDepartment);
router.get('/show', adminControl.showDepartment);
router.put('/:department_id', adminControl.updateDepartment);
router.delete('/:department_id', adminControl.deleteDepartment);

module.exports = router;

