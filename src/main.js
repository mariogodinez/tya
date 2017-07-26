// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import App from './App.vue'
import Login from './components/Login.vue'
import Problem from './components/Problem.vue'
import ProblemVote from './components/ProblemVote.vue'
import Result from './components/ResultsMetrics.vue'
import Users from './components/Users.vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import jQuery from 'jquery'
let jquery = jQuery
window.$ = window.jQuery = jquery

// window.myHeaders = Headers 

Vue.use(VueRouter)


window.axios = require('axios')

let routes = [
	{path: '/login', component: Login},
	{path: '/', component: Problem},

	{path: '/problem-vote', component: ProblemVote},
	{path: '/results', component: Result},
	{path: '/users', component: Users},


]

let router = new VueRouter({
	mode: 'history',
	routes
})

let VueApp = new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  render: (h) => h(App)
})
