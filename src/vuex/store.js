// Se importa vue
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
	logged: !!localStorage.getItem('token'),
	user: {}
}

const mutations = {
	SET_USER(state, data){
		state.user = data
	},
	LOGIN_USER(state){
		state.logged = true
	},
	LOGOUT_USER(state){
		state.logged = false
	}
}

const getters = {
	userInfo(state){
		return state.user
	}
}

const actions = {
	setUser({commit}, data){
		commit('SET_USER', data)
	},
	loginUser({commit}){
		commit('LOGIN_USER')
	},
	logoutUser({commit}){
		commit('LOGOUT_USER')
	}
}



export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions
});

