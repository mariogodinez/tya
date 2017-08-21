'use strict'

const express = require('express')
const api = express.Router()
const ProblemCtrl = require('../controllers/problems')
const UserCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')

api.get('/problems', auth, ProblemCtrl.getProblems)
api.get('/problem/:problemId', ProblemCtrl.getProblem)
api.delete('/problem/:problemId', auth, ProblemCtrl.deleteProblem)
api.post('/problem/voteUp/:problemId', auth, ProblemCtrl.voteUp)
api.post('/problem/voteDown/:problemId', auth, ProblemCtrl.voteDown)
api.post('/problem', auth, ProblemCtrl.addProblem)

api.post('/signup', UserCtrl.signUp)
api.post('/login', UserCtrl.logIn)
api.get('/allUsers', auth, UserCtrl.allUsers)
api.post('/getUser', UserCtrl.getUser)
api.put('/editUser', auth, UserCtrl.editUser)
api.post('/deleteUser', auth, UserCtrl.deleteUser)
api.post('/mail-reset', UserCtrl.mailReset)

// api.delete('/deleteUser', UserCtrl.deleteUser)
api.get('/private', auth, (req,res)=>{
	res.status(200).send({
		message: 'tienes aceso'
	})
})
module.exports = api