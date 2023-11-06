// server.js

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const sequelize = require('./db');
const cors = require('cors');

const app = express();
const port = 3000;

// Configuração do middleware cors
app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);


// Sincronizar modelos com o banco de dados
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor ouvindo na porta ${port}`);
  });
});
