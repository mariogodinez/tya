
module.exports = {
	email: 'futureweb2000@gmail.com',
	pass: 'dweb2000frontend',
	port: process.env.PORT || 2000,
	SECRET_TOKEN: process.env.TOKEN_SECRET || "tokenultrasecreto",
	db: process.env.MONGODB_URI || 'mongodb://localhost:27017/tya'
}