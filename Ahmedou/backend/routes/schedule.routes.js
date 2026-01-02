const express = require('express');
const router = express.Router();
const { getAllSchedules } = require('../controllers/schedule.controller');

// API Schedule
router.get('/schedule', getAllSchedules);

module.exports = router;
