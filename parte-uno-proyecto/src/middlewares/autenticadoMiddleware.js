function autenticadoMiddleware(req, res, next) {
	if (req.session.userLogged==undefined || req.session.userLogged.state!=9) {
		return res.redirect('/login');
	}
	next();
}

module.exports = autenticadoMiddleware;
