// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import store from './vuex/store'
import VueCheckbox from 'vue-checkbox-radio'
import App from './App.vue'
import Login from './components/Login.vue'
import Problem from './components/Problem.vue'
import ProblemVote from './components/ProblemVote.vue'
import Result from './components/ResultsMetrics.vue'
import Users from './components/Users.vue'
import ForgotPassword from './components/forgotPassword.vue'
import ResetPassword from './components/ResetPassword.vue'
import CorreoEnviado from './components/correo-enviado.vue'
import ContraseñaExito from './components/ContraseñaExito.vue'
import sAlert from 'sweetalert'

import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import jQuery from 'jquery'
import VueDisabled from 'vue-disabled'
import Is from 'is_js'

let jquery = jQuery
window.$ = window.jQuery = jquery
window.is = Is
window.sAlert = sAlert
// window.myHeaders = Headers 

Vue.use(VueRouter, VueCheckbox, VueDisabled)

window.axios = require('axios')

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token;


let routes = [
	{path: '/login', component: Login},
	{path: '/', component: Problem},
	{path: '/contraseña-olvidada', component: ForgotPassword},
	{path: '/contraseña-exito', component: ContraseñaExito},

	{path: '/problem-vote', component: ProblemVote},
	{path: '/results', component: Result},
	{path: '/nueva-contrasena', component: ResetPassword},
	{path: '/users', component: Users},
	{path: '/correo-enviado', component: CorreoEnviado},
]

let router = new VueRouter({
	mode: 'history',
	routes
})




let VueApp = new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  store,
  render: (h) => h(App),
  created(){
  }
})

$(document).ready(function(){
	$('.my-nav-list-item a').on('click', function(e){
		e.preventDefault()
		$('#my-nav').removeClass('right0')
	})
})
$(document).ready(function(){
	$('.logout').on('click', function(e){
		setTimeout(function(){
        	window.location.reload()
        },300)
	})
})
