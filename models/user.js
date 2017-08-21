'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const User = new Schema({
	fullName: String,
	email: { type: String, unique: true, lowercase: true, required: true},
	password : { 
		type: String,
	    select: true
	},
	signupDate: { type: Date, default: Date.now()},
	lastLogin: Date,
	rol: String,
	area: String,
	resetPasswordToken: String,
	resetPasswordExpires: Date
})

User.pre('save',function(next){
	let user = this
	if(!user.isModified('password')) return next()

	bcrypt.genSalt(10, (err, salt)=>{
		if(err) return next(err)
			
		bcrypt.hash(user.password, salt, null, (err,hash)=>{
			if(err) return next(err)
			user.password = hash
			next()
		})

	})	
})

// User.methods.gravatar = function(){
	
// }


module.exports  = mongoose.model('User', User)


