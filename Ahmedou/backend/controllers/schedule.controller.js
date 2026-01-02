const BusSchedule = require('../models/BusSchedule');

// Récupérer tous les horaires de bus
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await BusSchedule.findAll();
    res.status(200).json(schedules);
  } catch (error) {
    console.error('DB ERROR:', error);
    res.status(500).json({
      message: error.message
    });
  }
};

