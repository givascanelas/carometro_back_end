// models/tipos_usuarios.js

// Importanto dependências
const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Tipos_usuarios = sequelize.define('tipos_usuarios', { 
    // Define as informações da tabela colunas

    idTipos_Ususarios: {
        type: Sequelize.INTEGER,
        primaryKey: true, // Define essa coluna como a chave primária
        autoIncrement: true // Indica que é uma chave primária autoincrementável
    },
    descricao: Sequelize.STRING,
},
{
    // Precisa disso porque não tem as colunas createdAt e updatedAt no bd
    timestamps: false // Adiciona colunas createdAt e updatedAt automaticamente
});

module.exports = Tipos_usuarios;