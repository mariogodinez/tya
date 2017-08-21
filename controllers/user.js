'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const config = require('../config.js')
const nodemailer = require('nodemailer')
const path = require('path')
const services = require('../services')
const hbs = require('nodemailer-express-handlebars')
const bcrypt = require('bcrypt-nodejs')
const async = require('async')
const crypto = require('crypto')

let transporter = nodemailer.createTransport({
	service : 'gmail',
	secure: false,
    port: 25,
    auth: {
        user: config.email,
        pass: config.pass
    },
    tls:{
    	rejectUnauthorized: false
    }
})

transporter.use('compile', hbs({
	viewPath: 'views/email',
	extName: '.hbs'
}))

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
		bcrypt.compare(req.body.password, user.password, function(err, isMatch){
			if (err){
				res.status(500).send({
					message:'Ha ocurrido un error al verificar las credenciales',
				})
			}

			if(isMatch){
				res.status(200).send({
						message:'Te has logeado corréctamente',
						token: services.createToken(user),
						userLogged: req.user.email
					})
			} else {
				res.status(401).send({
					message:'No Tienes accesso',
				})
			}
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
		let userObj = {
			area: user.area,
			rol: user.rol,
			email: user.email,
			fullName: user.fullName,
			_id: user._id
		}
		res.status(200).send({user : userObj})	
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
		if(req.body.password){
			user.password = req.body.password
		}
		

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

function mailReset (req, res) {
	async.waterfall([
		function(done) {
	      crypto.randomBytes(25, function(err, buf) {
	        let token = buf.toString('hex');
	        done(err, token);
	      });
	    },
	    function(token, done){
	    	User.findOne({email: req.body.email}, (err, user)=>{
				if(err) return res.status(500).send({ message : `Ha ocurrido un error al buscar el usuario`})
				if(!user) return res.status(404).send({message : `No se han encontrado el usuario`})

				user.resetPasswordToken = token;
		        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

		        user.save(function(err) {
		          done(err, token, user);
		        });

			})

	    },
	    function(token, user, done){
	    	
	    	transporter.sendMail({
				from: 'Carlos cerda',
				to: `${user.email}`,
				subject: 'Solicitud de nueva contraseña!',
				text: `Recupera tu contraseña`,
				template: 'resetPassword',
				context:{
					tok: `http://localhost:5000/nueva/${token}`
				}
			}, (err, info) => {
				if(err) {
					return console.log(err)
				}
				done(err, 'done');
				res.status(200).send({message : 'Correo enviado'})

			})

	    }

	])

	// User.findOne({email: req.body.email}, (err, user)=>{
	// 	if(err) return res.status(500).send({ message : `Ha ocurrido un error al buscar el usuario`})
	// 	if(!user) return res.status(404).send({message : `No se han encontrado el usuario`})
	// 	transporter.sendMail({
	// 		from: 'Carlos cerda',
	// 		to: `${user.email}`,
	// 		subject: 'Solicitud de nueva contraseña!',
	// 		text: `Recupera tu contraseña`,
	// 		template: 'resetPassword',
	// 		context:{
	// 			link: 'http://resetpass.com'
	// 		}
	// 	}, (err, info) => {
	// 		if(err) {
	// 			return console.log(err)
	// 		}
	// 		res.status(200).send({message : 'Correo enviado'})
	// 	})

	// 	res.status(200).send({user : user})	
	// })
}

module.exports = {
	signUp,
	logIn,
	allUsers,
	getUser,
	editUser,
	deleteUser,
	mailReset
}

