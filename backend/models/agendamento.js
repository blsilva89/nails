// models/agendamento.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Cliente = require('./cliente');

const Agendamento = sequelize.define('Agendamento', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Cliente,
        key: 'id',
      },
    },
    data_agendamento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora_agendamento: {
      type: DataTypes.TIME,
      allowNull: false,
    },
});

Agendamento.belongsTo(Cliente, { foreignKey: 'cliente_id' });
Cliente.hasMany(Agendamento, { foreignKey: 'cliente_id' });

module.exports = Agendamento;
