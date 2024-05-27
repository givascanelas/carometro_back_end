// Arquivo de configuração de BD

module.exports = {
    development: {
        username: process.env.DB_USER || 'root',
        //username: 'root',

        password: 'root',          // Senha do banco de dados
        database: 'carometro',        // Nome do banco de dados
        host: 'localhost',            // Endereço do servidor do banco de dados
        port: 3306,
        dialect: 'mysql',             // Porta do servidor do banco de dados
        logging: false                // Desativa os logs do Sequelize
    },
    // Adicione mais ambientes (production, testing, etc) conforme necessário
};