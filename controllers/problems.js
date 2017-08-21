'use strict'
const Problem = require('../models/problem')
const nodemailer = require('nodemailer')
const config = require('../config.js')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')

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
});

transporter.use('compile', hbs({
	viewPath: 'views/email',
	extName: '.hbs'
}))


function addProblem(req, res){
	console.log(req.body)
	let problem = new Problem()

	problem.name = req.body.name
	problem.usersProblem = req.body.usersProblem
	problem.activity = req.body.activity
	problem.description = req.body.description
	problem.canVote = req.body.canVote
	problem.createdBy = req.body.createdBy
	problem.peopleWithProblem = req.body.peopleWithProblem
	problem.peopleWithoutProblem = req.body.peopleWithoutProblem


	problem.save((err, problemSaved)=>{
		if(err) return res.status(500).send({ message: `Error al guardar en la base de datos: ${err}` })
		

		transporter.sendMail({
			from: 'Carlos cerda',
			to: 'mariogodinezmedina@gmail.com',
			subject: 'Nuevo correo de problema!',
			text: `Problema - ${problemSaved.name}`,
			template: 'templateProblem',
			context:{
				problemName: problemSaved.name,
				usersProblem: problemSaved.usersProblem,
				activity: problemSaved.activity,
				description: problemSaved.description,
				peopleWithProblem: problemSaved.peopleWithProblem,
				peopleWithoutProblem: problemSaved.peopleWithoutProblem,

			}
			}, (err, info) => {
			if(err) {
				return console.log(err)
			}
			console.log(info)
			res.status(200).send({message : 'Correo enviado'})
		})
		res.status(200).send({problem: problemSaved})

	})
}

function getProblem(id){
	let problemId = req.params.problemId
	Problem.findById(problemId, (err, problem) => {
		if(err) return res.status(500).send({message: `Error al realizar la petición`})
		if(!problem) return res.status(404).send({ message: 'el problema que bsucas no existe' })
		
		res.status(200).send({ problem })
	})
}

function getProblems(req,res){
	console.log('datus user loged')
	console.log(req.user)
	console.log(req.email)
	console.log(req.area)
	let area = req.area.toString()
	Problem.find({canVote : {$in: [area]}}, (err, problems) => {
		if(err) return res.status(500).send({message: `Error al realizar la petición de los problemas`})
		if(!problems) return res.status(404).send({ message: 'NO sen encontraron problemas guardados' })
		let filter = problems.filter(problem => {
			return problem.createdBy != req.email
		})
		// console.log(filter)
		res.status(200).send({ problems: filter })

	})
}

function getProblemsByArea(req,res){
	Problem.find({area: req.body.area}, (err, problems) => {
		if(err) return res.status(500).send({message: `Error al realizar la petición de los problemas filtrados por área`})
		if(!problems) return res.status(404).send({ message: 'NO sen encontraron problemas guardados' })
		
		res.status(200).send({ problems })

	})
}


function deleteProblem(req,res){
	let problemId = req.params.problemId
	Problem.findById(problemId, (err, problem) => {
		if(err) return res.status(500).send({message: `Error al buscar el problema borrar`})
		if(!problem) return res.status(404).send({ message: 'el problema que quieres borrar no existe' })
		
		problem.remove(err => {
			if(err) return res.status(500).send({message: `Error al borrar el problema : ${err}`})
			res.status(200).send({
				message: 'El producto ha sido eliminado correctamente'
			})
		})

	})
}

function voteUp(req,res){
	let problemId = req.params.problemId
	let userToVote = req.body.user
	//falta validar si un usuario ya votoo hacer un error

	Problem.findById(problemId, (err, problem) => {
		if(err) return res.status(500).send({message: `Error al realizar la petición`})
		if(!problem) return res.status(404).send({ message: 'el problema que bsucas no existe' })
		
		let users = problem.aproved
		let votedBy = problem.votedBy

		votedBy.push(userToVote)
		users.push(userToVote)

		let update = {
			aproved : users,
			votedBy: votedBy,
		}
		  Problem.findByIdAndUpdate(problemId, update, (err, problemUp) => {
		    if (err) res.status(500).send({message: `Problem updating error: ${err}`})
		    res.status(200).send({message: `Problem updated sucessfully`, modified: problemUp})
		  })
	})

}


function voteDown(req,res){
	let problemId = req.params.problemId
	let userToVote = req.body.user
	//falta validar si un usuario ya votoo hacer un error
	Problem.findById(problemId, (err, problem) => {
		if(err) return res.status(500).send({message: `Error al realizar la petición`})
		if(!problem) return res.status(404).send({ message: 'el problema que bsucas no existe' })
		
		let users = problem.rejected
		let votedBy = problem.votedBy

		votedBy.push(userToVote)
		users.push(userToVote)

		let update = {
			rejected : users,
			votedBy: votedBy
		}
		  Problem.findByIdAndUpdate(problemId, update, (err, problemUp) => {
		    if (err) res.status(500).send({message: `Problem updating error: ${err}`})
		    res.status(200).send({message: `Problem updated sucessfully`, modified: problemUp})
		  })
	})

}





module.exports = {
	addProblem,
	getProblem,
	getProblems,
	deleteProblem,
	voteDown,
	voteUp,
	deleteProblem
}