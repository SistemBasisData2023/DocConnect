const express = require('express');
const router = express.Router();

const adminControl = require('../Controllers/adminControl');

router.post('/add', adminControl.addDepartment);
router.get('/show', adminControl.showDepartment);
router.delete('/delete', adminControl.deleteDepartment);

module.exports = router;

