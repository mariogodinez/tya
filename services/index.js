'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')


function createToken(user){
	const payload = {
		sub: user._id,
		area: user.area,
		email: user.email,
		rol: user.rol,
		iat: moment().unix(),
		exp: moment().add(14, 'days').unix(),
	}
	return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token){
	const decoded =  new Promise((resolve, reject) => {
		try {
			const payload = jwt.decode(token, config.SECRET_TOKEN)
			if(payload.exp <= moment().unix()){
				reject({
					status: 401,
					message: 'El token ha expirado'
				})
			}
			console.log(payload)
			resolve(payload)
		} catch (err){
			reject({
				status: 401,
				message: 'Token Invalido'
			})
		}
	})
	return decoded
}




module.exports = {
	createToken,
	decodeToken
}



