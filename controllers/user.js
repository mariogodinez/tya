'use strict'

const mongoose = require('mongoose')
const UserSchema = require('../models/user')
const service = require('../services')

function signUp(req, res){
	const user = new UserSchema({
		email: req.body.email,
		displayName: req.body.name,
		password: req.body.password
	})

	user.save((err) => {
		if(err) return res.status(500).send({
			message: `Error al crear usuario: ${err}`
		})

		res.status(200).send({
			token: service.createToken(user)
		})
	})
}

function logIn(req, res){
	User.find({email: req.body.email}, (err, user)=>{
		if(err) return res.status(500).send({ message: 'Ha ocurrido un error al iniciar sesión'})
		if(!user) return res.status(404).send({ message: 'No existe el usuario'})
		req.user = user
		res.status(200).send({
			message:'Te has logeado corréctamente',
			token: services.createToken(user) 
		})
	})
}

module.exports = {
	signUp,
	logIn
}

