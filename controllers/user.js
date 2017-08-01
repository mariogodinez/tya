'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const services = require('../services')

function signUp(req, res){
	console.log(req.body)
	const user = new User({
		email: req.body.email,
		fullName: req.body.name,
		password: req.body.password,
		rol: req.body.rol,
		area: req.body.area
	})
	User.findOne({email: req.body.email}, (err, user)=>{
		if(err) return res.status(500).send({ message: 'Ha ocurrido un error al guardar el usuario, intenta de nuevo!'})
		if(user){
			return res.status(422).send({
				message: `El usuario ${user.email} ya existe, por favor ingresa otro`
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


function allUsers(req, res){
	User.find({}, (err, users)=>{
		if(err) return res.status(500).send({ message : `Ha ocurrido un error al buscar los usuarios`})
		if(!users) return res.status(404).send({message : `No se han encontrado usuarios`})

		res.status(200).send({users})	
	})
}

function getUser(req, res){
	User.findOne({email: req.body.email}, (err, user)=>{
		if(err) return res.status(500).send({ message : `Ha ocurrido un error al buscar el usuario`})
		if(!user) return res.status(404).send({message : `No se han encontrado el usuario`})

		res.status(200).send({user : user})	
	})
}

function editUser (req, res){
	console.log(req.body)
	User.findById(req.body._id, (err, user) => {
		if(err) return res.status(500).send({ message: 'Error al buscar el usuario para editar'})
		if(!user) res.status(404).send({ message : 'El Usuario que intenta modificar NO existe'})
		user.fullName = req.body.fullName || user.fullName
		user.area = req.body.area || user.area
		user.email = req.body.email || user.email
		user.rol = req.body.rol || user.rol

		user.save(function (err, editedUser) {
            if (err) {
                res.status(500).send({
                	message: `Ha ocurrido un error al actualizar el usuario`
                })
            }
            res.status(200).send({
            	message: `Se ha actualizado a ${editedUser.email} corréctamente`
            });
        });
	})
}


function deleteUser (req, res){
	User.findByIdAndRemove(req.body.id, (err, user) => {
		if(err) return res.status(500).send({ message: 'Error al buscar el usuario para eliminar'})
		if(!user) res.status(404).send({ message : 'El Usuario que intenta eliminar NO existe'})
		let userData = user

		res.status(200).send({
			message: 'Se ha eliminado corréctamente',
			user: userData
		})
	})
}

module.exports = {
	signUp,
	logIn,
	allUsers,
	getUser,
	editUser,
	deleteUser
}

