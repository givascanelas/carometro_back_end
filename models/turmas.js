// models/turmas.js

// Importanto dependências
const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Turmas = sequelize.define('Turmas', {
    // Define as informações da tabela colunas

        idTurmas: {
                type: Sequelize.INTEGER,
                primaryKey: true, // Define essa coluna como a chave primária
                autoIncrement: true // Indica que é uma chave primária autoincrementável
            },

    codigo: Sequelize.STRING,
    descricao: Sequelize.STRING,
    inicio: Sequelize.DATE,
    fim: Sequelize.DATE,
    fotos: Sequelize.STRING,
},
    {
        // Precisa disso porque não tem as colunas creatAt e uptadeAt no bd
        timestamps: false
        // Adiciona colunas creatAt e uptadeAt automaticamente
    });

module.exports = Turmas;