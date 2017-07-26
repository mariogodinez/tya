'use strict'

const express = require('express')
const api = express.Router()
const ProblemCtrl = require('../controllers/problems')
const UserCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')

api.get('/problems', ProblemCtrl.getProblems)
api.get('/problem/:problemId', ProblemCtrl.getProblem)
api.delete('/problem/:problemId', ProblemCtrl.deleteProblem)
api.put('/problem/voteUp/:problemId', ProblemCtrl.voteUp)
api.put('/problem/voteDown/:problemId', ProblemCtrl.voteDown)
api.post('/problem', ProblemCtrl.addProblem)
api.post('/signup', UserCtrl.signUp)
api.post('/login', UserCtrl.logIn)
api.get('/private', auth, (req,res)=>{
	res.status(200).send({
		message: 'tienes aceso'
	})
})
module.exports = api