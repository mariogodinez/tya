import store from './vuex/store';
import VueFilters from 'vue2-filters'

import VueRouter from "vue-router";
import Login from './components/Login.vue'
import Problem from './components/Problem.vue'
import ProblemVote from './components/ProblemVote.vue'

import Results from './components/ResultsMetrics.vue'


// 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter and then call Vue.use(VueRouter).
Vue.use(VueRouter, VueFilters)

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/login', component: Login },
  {path: '/problem', component: Problem},
  {path: '/problem-vote', component: ProblemVote},
  {path: '/results', component: Results}
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  mode: "history",
  routes // short for routes: routes
})


const app = new Vue({
	el: '#app-wrapper',
	store: store,
	router,
	search: "",
  computed:{
    logged: function(){
      return this.$store.getters.logged
    }
  },
  methods:{
    closeSesion: function(){
      this.$store.dispatch('toggleLogged')
    }
  }
});


  $(document.body).on('click', '#burger-menu', function(){
      $('#my-nav').toggleClass('right0')

  })


 $(document.body).on('click', '#my-nav a', function(){
      $('#my-nav').removeClass('right0')
  })
