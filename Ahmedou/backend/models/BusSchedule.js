const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // connexion DB

const BusSchedule = sequelize.define('BusSchedule', {
  bus_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  route: {
    type: DataTypes.STRING,
    allowNull: false
  },
  departure_time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  arrival_time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('On Time', 'Delayed', 'Cancelled'),
    allowNull: false
  }
});

module.exports = BusSchedule;
