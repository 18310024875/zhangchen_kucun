// 首先声明用于通讯的vue ;
import Vue from 'vue' ;

import App from './views/App.vue' ;

import Vuex from 'vuex' ;
Vue.use(Vuex) ;

const state = {
	num:88
}
const mutations = {
	add1(state){
		state.num=state.num+1
	},
	del1(state){
		state.num=state.num-1
	}
}

const actions = {
	addxx:({commit})=>commit('add1'),
	del:({commit})=>commit('del1')
}

const getters = {

}

var store = new Vuex.Store({state, mutations ,actions ,getters})

window.vue = new Vue({
    el: '#appBox',
    data:{
    	change_header:'header1'
    },
    store:store,
    router:window.router,//router 挂载到实例上
	components:{
		App:App
	}
})











