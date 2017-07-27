'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./routes')
const hbs = require('express-handlebars')



app.use(express.static('dist'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.engine('.hbs', hbs({
	defaultLayout: 'default',
	extname: '.hbs'
}))

app.use('/api', api)


module.exports = app