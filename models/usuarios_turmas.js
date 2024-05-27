// models/usuarios_turmas.js

// Importanto dependências
const Sequelize = require('sequelize');
const sequelize = require ('../config/sequelize')
const UsuariosTurmas = sequelize.define('usuarios_turmas', {
    // Define as informações da tabela colunas

    Turmas_idTurmas: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        // Não define essa coluna como a chave primária
    },
    Usuarios_idUsuarios: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        // Não define essa coluna como a chave primária    
    },
    
},
    {
        // Precisa disso porque não tem as colunas creatdAt e updatedAt no bd
        timestamps: false
        // Adiciona colunas creatdAt e updatedAt automaticamente
    });
UsuariosTurmas.removeAttribute("id")

module.exports = UsuariosTurmas;