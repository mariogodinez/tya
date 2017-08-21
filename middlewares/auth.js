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
			req.user = res.sub
			req.area = res.area
			req.email = res.email
			req.rol = res.rol
			next()
		})
		.catch(response =>{
			let myRes = response
			res.status(myRes.status).send({message : myRes.message})
		})
	


}

module.exports = isAuth







