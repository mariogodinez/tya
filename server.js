const pug = require('pug')
const mongoose = require('mongoose')
const config = require('./config')
const Problem = require('./models/problem')
const app = require('./app')

app.set('view-engine', 'pug')

mongoose.connect(config.db, err => {
	if(err){
		return console.log('Error al conectar BD: ' + err)
	}
	console.log('Conexion a la base de datos establecida')
})

app.get('/', function(req,res){
	res.render('index.pug')
})

app.get('/login', function(req,res){
	res.render('index.pug')
})

app.listen(config.port, () => console.log(`...Server listening at ${config.port}`) )






