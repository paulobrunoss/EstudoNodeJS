var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');

module.exports = function () {

    var app = express();
    
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    consign()
         .include('models')
         .then('controllers/auth')
         .then('controllers')
         .then('server')
        .into(app);

    return app;
}
