// less
import './app/app.less' ;

import Vue from 'vue' ;

import store from './store.js';

// 组件
import App from './app/app.vue' ;
import App_header from './app/views/header.vue' ;
import App_main from './app/views/main.vue' ;
import Home from './app/views/home.vue' ;
import Movie from './app/views/movie.vue' ;
import Cinema from './app/views/cinema.vue' ;
import Shop from './app/views/shop.vue' ;
import Mine from './app/views/mine.vue' ;
import Card from './app/views/card.vue' ;
import Citys from './app/views/citys.vue' ;
import Details_ from './app/views/details.vue' ;


// 通讯
$com = new Vue() ;

// 数据
import VueResource from 'vue-resource' ;
Vue.use(VueResource) ;

$get = function(url,callback){
    Vue.http.get('./src/json/'+url)
	.then(function(res){
	  callback(res.body)
	})	
}

// 路由
import VueRouter from 'vue-router' ;
Vue.use(VueRouter) ;

const routes = [
	{path:'/',redirect:'/home'}, // 重定向 默认页
	{path:'/home',component:Home},
	{path:'/movie',component:Movie},
	{path:'/cinema',component:Cinema},
	{path:'/shop',component:Shop},
	{path:'/mine',component:Mine},
	{path:'/card',component:Card},
	{path:'/citys',component:Citys},
	{path:'/details',component:Details_}
]

window.router = new VueRouter({
	routes:routes
})

let dom ;
window.router.beforeEach((to, from, next) => {
	if(!dom){ dom=document.querySelector('#main')};
	try{
		dom.scrollTop=0 ;
	}catch(e){}
    next()
})

var vue = new Vue({
	el:'#appWrapper',
	store:store,
	router:window.router,
	data:{
		num:100
	},
	components:{
		App:App,
		App_header:App_header,
		App_main:App_main
	}
})