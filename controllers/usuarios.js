// Importando dependências
const Turmas = require('../models/turmas');
const Usuario = require('../models/usuarios');
const UsuariosTurmas = require('../models/usuarios_turmas');

// --------------------------
exports.getAll = async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios)
};

// --------------------------
exports.getById = async (req, res) => {
    // No router id é o que vem depois do usuario
    const idDoParam = req.params.id;
    const usuarioEncontrado = await Usuario.findOne({ where:{ idUsuarios:idDoParam }}); // --------------------------
    res.json(usuarioEncontrado)
};

// Esta seção está criando um usuário
exports.createUsuario = async (req, res) => {
    console.log("req.body.cpf", req.body.cpf)

    const usuarioCadastrado = await Usuario.findOne({ where:{ cpf: req.body.cpf }}); // Verifica se algum usuário já possui o mesmo cpf
    
    // Verificação duplicidade de usuario cadastrado
    if (usuarioCadastrado) { // Só é enviado se houver alguém com o mesmo cpf
        return res.send('Já existe um usuario cadastrado neste CPF.')
    }

    const usuarioCriado = await Usuario.create(req.body) // Linha cria o usuário no banco de dados

    // Relaciona turma e aluno caso a informação de turma seja informada no Front.
    // Importante validar regra de exibição e obrigatoriedade no front da seleção de turma no caso de tipo de usuário : alunos.

    if (usuarioCriado.idUsuarios && req.body.Turmas_idTurmas) { // --------------------------

        await UsuariosTurmas.create ({

            Turmas_idTurmas: req.body.Turmas_idTurmas, // idTurma vem do front como informação de seleção de turma
            Usuarios_idUsuarios: usuarioCriado.idUsuarios,
        })
    }

    console.log("usuarioCriado", usuarioCriado) // --------------------------
    return res.send("POST realizado com sucesso.")
    // res.json(usuarios)
};

// Esta seção está atualizando um usuário
exports.updateUsuario = async (req, res) => {  // Cria uma função chamada updateTurma
    const cpfUsuario = req.params.cpf; // Cria uma varíavel onde se adquire informações do banco de dados

    try { // "Tente"
        const usuarioCadastrado = await Usuario.findOne({ where:{ cpf: cpfUsuario }}); // --------------------------

        if (usuarioCadastrado) {

            delete req.body.cpf // Delete como medida de segurança, pois nem toda informação pode ser atualizada ao mesmo tempo

            const [numRowsUpdated] = await Usuario.update(req.body, { // Array que faz uma contagem de nº de linha de atualização
                where: { cpf: cpfUsuario }
            });

            if (numRowsUpdated > 0) { // Verifica a array
                const usuarioAtualizado = await Usuario.findOne({ where: { cpf: cpfUsuario }}); 
                return res.send({ message: 'Usuario Atualizado com sucesso', usuariocomdadosnovos: usuarioAtualizado}); // --------------------------
            }
            else {
                return res.send('Usuario encontrado, porém sem novos dados para atualizar')
            }
        }
        else {
            return res.status(404).send('Não existe um usuário cadastrado com este cpf.'); // --------------------------
        }
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return red.status(500).send('Ocorreu um erro ao atualizar o usuário.'); // --------------------------
    }
};

// Esta seção esta deletando um usuário
exports.deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params; // --------------------------
        const usuario = await Usuario.findByPk(id); // --------------------------
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }

        const desvincular = await UsuariosTurmas.findOne({ where: {Usuarios_idUsuarios: usuario.idUsuarios }}); // --------------------------
        if (desvincular) {
            await desvincular.destroy(); // --------------------------
        }
        await usuario.destroy(); // --------------------------

        return res.send('Usuário deletado com sucesso'); // --------------------------
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        return res.status(500).send('Erro ao deletar usuário'); // --------------------------
    }
}
