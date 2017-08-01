'use strict'
const Problem = require('../models/problem')
const nodemailer = require('nodemailer')
const EmailTemplate = require('email-templates').EmailTemplate
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

function loadTemplate (templateName, context){
	let template = new EmailTemplate(path.join(__dirname, 'templates', templateName))
	return new Promise ((resolve, reject)=>{
		template.render(context, (err, result)=>{

			if(err) reject(err);
			else resolve(result)

		})
	})
}



function addProblem(req, res){
	console.log(req.body)
	let problem = new Problem()

	problem.name = req.body.name
	problem.usersProblem = req.body.usersProblem
	problem.activity = req.body.activity
	problem.description = req.body.description
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
	Problem.find({}, (err, problems) => {
		if(err) return res.status(500).send({message: `Error al realizar la petición de los problemas`})
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
	Problem.findById(problemId, (err, problem) => {
		if(err) return res.status(500).send({message: `Error al realizar la petición`})
		if(!problem) return res.status(404).send({ message: 'el problema que bsucas no existe' })
		let count = problem.aproved		
		let update = {
			aproved : count + 1
		}
		  Problem.findByIdAndUpdate(problemId, update, (err, problemUp) => {
		    if (err) res.status(500).send({message: `Problem updating error: ${err}`})
		    res.status(200).send({message: `Problem updated sucessfully`, modified: problemUp})
		  })
	})

}


function voteDown(req,res){
	let problemId = req.params.problemId
	Problem.findById(problemId, (err, problem) => {
		if(err) return res.status(500).send({message: `Error al realizar la petición`})
		if(!problem) return res.status(404).send({ message: 'el problema que bsucas no existe' })
		let count = problem.rejected	
		let update = {
			rejected : count + 1
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