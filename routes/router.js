// routes/router.js

// Nesse arquivo estarão todas as rotas
// No caso de um proj com muitas rotas é possível quebrar as rotas em mais arquivos
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarios')
const turmasController = require('../controllers/turmas')

// USUARIO ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Retorna todos os usuários
router.get('/usuario', usuarioController.getAll) // Retorna todos os usuários cadastrados.
router.get('/usuario/:id', usuarioController.getById) // Busca um usuário específico.

// Cria um usuário passando informação no body
router.post('/usuario', usuarioController.createUsuario) // Cria um usuário.

// Atualiza um usuário a partir de um dado específico.
router.put('/usuario/:cpf', usuarioController.updateUsuario)

// Deleta um usuário específico
router.delete('/usuario/:id', usuarioController.deleteUsuario)

// TURMAS /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Retorna todas as turmas.
router.get('/turmas', turmasController.getAll)
router.get('/turmas/:id', turmasController.getById)

// Cria uma turma passando informação no body.
router.post('/turmas', turmasController.createTurma)

// Atualiza uma turma a partir de um dado específico.
router.put('/turmas/:codigo', turmasController.updateTurma)

module.exports = router;