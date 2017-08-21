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
	rejected: Array,
	aproved: Array,
	canVote: Array,
	createdBy: String,
	votedBy: Array
})

module.exports = mongoose.model('Problem', ProblemSchema)