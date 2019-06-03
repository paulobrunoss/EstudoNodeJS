var mongoose = require('mongoose');
var model = mongoose.model('Usuario');
var jwt = require('jsonwebtoken');

module.exports = function(app) {
    
    app.post('/autentica', function(req, res) {

        model.findOne({login: req.body.login, senha: req.body.senha})
        .then(function(usuario) {
            if(!usuario) {
                console.log('Login ou senha invalidos');
                res.sendStatus(401);     
            } else {
                var token = jwt.sign({login: usuario.login}, 'secretKey', { expiresIn: 84600})
                res.set('x-access-token', token);
                res.end();
            }
    }, function(error) {
        console.log('Login ou senha Inválidos');
        res.sendStatus(401);
    });
})

     app.use('/*', function(req, res, next) {
         var token = req.headers['x-access-token'];
         jwt.verify(token, 'secretKey', function(err, decoded) {
             if(err) {
                 console.log('Token rejeitado');
                 res.sendStatus(401);
             }
             req.usuario = decoded;
             console.log('token decoded: ' + decoded);
             next();
         });
     })

}