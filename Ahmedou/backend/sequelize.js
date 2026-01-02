const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'bus_app_db',     // nom de la base de données
  'root',           // utilisateur
  '',               // mot de passe (vide si XAMPP)
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

module.exports = sequelize;
