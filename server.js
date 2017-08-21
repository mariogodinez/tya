const pug = require('pug')
const mongoose = require('mongoose')
const config = require('./config')
const Problem = require('./models/problem')
const User = require('./models/user')
const app = require('./app')
const async = require('async')

app.set('view-engine', '.hbs')

mongoose.connect(config.db, err => {
	if(err){
		return console.log('Error al conectar BD: ' + err)
	}
	console.log('Conexion a la base de datos establecida')
})

app.get('/', function(req,res){
	res.render('index.hbs')
})

app.get('/nueva/:token', function(req,res){
	console.log(req.params)
	User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      return res.redirect('/login');
    }
	res.render('reset-password.hbs',{
		token: req.params.token
	})
    
  });
	
})

app.post('/reset/:token', function(req,res){
	// res.status(200).send({message: 'si llego', sent: req.body})
	// return false
	


   async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          res.status(401).send({message : 'El token es inválido o ha expirado.'});
          return false
        }

        user.password = req.body.ssap;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function(err) {
        	if(err) return res.status(500).send({message: 'Error al gurdad nueva contraseña'})
            res.status(200).send({message: 'Ha cambiado su contraseña de forma exitosa'})
        });
      });
    }
  ], function(err) {
    res.redirect('/login');
  });
	
})

app.get('/login', function(req,res){
	res.render('index.hbs')
})


app.get('/problem-vote', function(req,res){
	res.render('index.hbs')
})

app.get('/users', function(req,res){
    if(req.user.rol != 'admin' || req.user.rol != 'Admin' ){
      res.redirect('/')
    }
  res.render('index.hbs')
})

app.listen(config.port, () => console.log(`...Server listening at ${config.port}`) )






