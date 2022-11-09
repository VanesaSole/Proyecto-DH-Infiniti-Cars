
const db = require('../database/models');

function DeleteEditMiddleware(req, res, next) {
	if (req.session.userLogged==undefined) {
		return res.redirect('/login');
	}
	db.Productos.findByPk(req.params.id)
	.then(function(vehiculo){
		if(req.session.userLogged.email==vehiculo.name || req.session.userLogged.state==9){
			next();
		}else {
			
			return res.redirect('/login');
		}
	})
	
}

module.exports = DeleteEditMiddleware;
