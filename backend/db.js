// db.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nailsdb', 'postgres', 'postgres', {
  host: 'db',
  dialect: 'postgres',
});

module.exports = sequelize;
