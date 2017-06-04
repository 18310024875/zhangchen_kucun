import Vue from 'vue' ;
import Vuex from 'vuex' ;
Vue.use(Vuex) ;

const state = {
	menu:false ,
	city:'北京',
	headerName:'卖座电影'
}
const mutations = {
	changeMenu(state){
		state.menu = !state.menu ;
	},
	changeCity(state,city){
		state.city = city ;
	},
	changeHeaderName(state,name){
		state.headerName = name ;
	}
}
const actions = {
    changeMenu({commit}) {
        commit('changeMenu');
    },
    changeCity({commit},city){
    	commit('changeCity',city)
    },
    changeHeaderName({commit},name){
    	commit('changeHeaderName',name)
    }
}
const getters = {}

export default new Vuex.Store({  
    state,  
    mutations,  
    actions,  
    getters,  
})