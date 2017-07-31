'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const services = require('../services')

function signUp(req, res){

	const user = new User({
		email: req.body.email,
		fullName: req.body.name,
		password: req.body.password,
		rol: req.body.rol,
		area: req.body.area
	})
	User.findOne({email: req.body.email}, (err, user)=>{
		if(err) return res.status(500).send({ message: 'Ha ocurrido un error al iniciar sesión'})
		if(user){
			console.log(user)
			return res.status(422).send({
				message: `El usuario ${user.email} ya existe, ingresa otro`
			})
		}
	})
	user.save((err) => {

		if(err) return res.status(500).send({
			message: `Error al crear usuario: ${err}`
		})

		res.status(200).send({
			token: services.createToken(user)
		})
	})

}

function logIn(req, res){
	User.findOne({email: req.body.email}, (err, user)=>{
		if(err) return res.status(500).send({ message: 'Ha ocurrido un error al iniciar sesión'})
		if(!user) return res.status(404).send({ message: 'No existe el usuario'})
		req.user = user
		console.log(user)
		res
			.status(200).send({
				rol: 'Admin',
				message:'Te has logeado corréctamente',
				token: services.createToken(user) 
			})
	})
}

module.exports = {
	signUp,
	logIn
}

