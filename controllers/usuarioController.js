var mongoose = require('mongoose');
var model = mongoose.model('Usuario');

module.exports = function(app) {
	app.get("/usuario/listarUsuarios", function(req, res) {
		

		model
			.find({})
			.then(function(usuarios) {
				res.json(usuarios)
			}, function(error) {
				console.log(error);
				res.status(500).json(error);
			});
	})

	app.post("/usuario/cadastrar", function(req, res) {
		var cadastro = req.body;
		model
		.create(cadastro)
		.then(function(usuario) {
			res.json(usuario);
		}, function(error) {
			console.log(error);
			res.status(500).json(error);
		})
	} )
};


