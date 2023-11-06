// routes.js

const express = require('express');
const router = express.Router();
const sequelize = require('./db');
const Cliente = require('./models/cliente');
const Agendamento = require('./models/agendamento');
const { Op } = require('sequelize');

// Rota para cadastro de cliente
router.post('/clientes', async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao cadastrar cliente');
  }
});

// Rota para recuperar todos os clientes
router.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar clientes');
  }
});

// Rota para cadastro de agendamento
router.post('/agendamentos', async (req, res) => {
  try {
    console.log(req.body)
    const agendamento = await Agendamento.create(req.body);
    res.status(201).json(agendamento);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao cadastrar agendamento');
  }
});

// Rota para recuperar todos os agendamentos
router.get('/agendamentos', async (req, res) => {
  try {

    const { dataFiltro } = req.query;
    let whereClause = {};

    if (dataFiltro) {
      // Se uma data de filtro foi fornecida, filtre pelos agendamentos nessa data
      whereClause = {
        data_agendamento: {
          [Op.eq]: new Date(dataFiltro)
        },
      };
    }

    const agendamentos = await Agendamento.findAll({
      include: {
        model: Cliente,
        attributes: [
          "id",
          "nome"
        ]
      },
      where: whereClause,
    });
    console.log(agendamentos);
    res.json(agendamentos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar agendamentos');
  }
});

module.exports = router;
