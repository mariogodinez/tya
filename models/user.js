'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
	displayName: String,
	avatar: String,
	email: { type: String, unique: true, lowercase: true},
	password : { type: String, select: false},
	signupDate: {type: Date, default: Date.now()},
	lastLogin: Date

})

UserSchema.pre('save',function(next){
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

// UserSchema.methods.gravatar = function(){
	
// }


module.exports  = mongoose.model('UserSchema', UserSchema)


