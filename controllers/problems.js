'use strict'
const Problem = require('../models/problem')
const nodemailer = require('nodemailer')
const config = require('../config.js')
const hb = require('nodemailer-express-handlebars')

let options = {
     viewEngine: {
         extname: '.hbs',
         layoutsDir: 'views/email/',
         defaultLayout : 'template',
         partialsDir : 'views/partials/'
     },
     viewPath: 'views/email/',
     extName: '.hbs'
 };

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
transporter.use('compile', hb(options));


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
			template: 'email_body',
		     context: {
		          variable1 : 'value1',
		          variable2 : 'value2'
		     },
			html: `<div>
						<div>
							<img style="width:300px; margin-left:auto; margin-right:auto; style="display: inline-block;"" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxBTJyPXN6JTym-g-7mMiaXGgRQPSC2KJ3jWhIAdQ4GV7D7i1K">
						</div>
						<div>
							<h3 style="display: inline-block;">Problema: <h3>
							<p style="display: inline-block;">${problemSaved.name}</p>
						</div>

						<div>
							<h3 style="display:inline-block;">Descripccion del problema: <h3>
							<p style="display:inline-block;">${problemSaved.description}</p>
						</div>
					</div>`

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