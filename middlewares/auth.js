'use strict'
const services = require('../services')


function isAuth(req, res, next){
	if(!req.headers.authorization){
		return res.status(403).send({
			message: 'No tienes autorización'
		})
	}

	const token = req.headers.authorization.split(' ')[1]
	services.decodeToken(token)
		.then(res =>{
			req.user = res
			next()
		})
		.catch(res =>{
			res.status(res.status)
		})
	


}

module.exports = isAuth







