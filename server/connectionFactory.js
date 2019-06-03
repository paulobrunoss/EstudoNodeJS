var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');

mongoose.connection.on('connected', function() {
    console.log('conectado ao banco de dados!');
});

mongoose.connection.on('error', function(error) {
    console.log('erro conexao mongo: ' + error);
})

mongoose.connection.on('disconnected', function(){
    console.log('Desconectado Mongo');
})

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Conexão fechada pelo término da aplicação');
        process.exit(0);
    });
});