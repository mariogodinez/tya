'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


let ProblemSchema = Schema({
	name: String,
	usersProblem: String,
	activity: String,
	description: String,
	peopleWithProblem: Number,
	peopleWithoutProblem: Number,
	rejected: {type: Number, default: 0},
	aproved: {type: Number, default: 0},
	

})

module.exports = mongoose.model('Problem', ProblemSchema)