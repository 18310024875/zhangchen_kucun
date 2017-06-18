// less
import './app/app.less' ;

import Vue from 'vue' ;

import store from './store.js';

// 数据
import VueResource from 'vue-resource' ;
Vue.use(VueResource) ;
// 封装方法
$get = function(url,callback){
    Vue.http.get('./src/json/'+url)
	.then(function(res){
	  callback(res.body)
	})	
} ;

// Vue组件访问 this.$state 得到 this.$store.state ;
Object.defineProperty(Vue.prototype,'$state',{
	get:function(){
		return this.$store.state ;
	}
});
// Vue组件 this.$commit 调用 this.$store.commit / this.$store.dispatch ;
Vue.prototype.$commit=function(type,x){
	this.$store.commit(type,x)
};

// 组件
import App from './app/app.vue' ;
// 懒加载组件
let  App_header = resolve => require(['./app/views/header.vue'] ,resolve);
let  App_main   = resolve => require(['./app/views/main.vue']   ,resolve);
let  Home 		= resolve => require(['./app/views/home.vue' ]  ,resolve);
let  Movie 		= resolve => require(['./app/views/movie.vue']  ,resolve);
let  Cinema 	= resolve => require(['./app/views/cinema.vue'] ,resolve);
let  Shop 		= resolve => require(['./app/views/shop.vue' ]  ,resolve);
let  Mine 		= resolve => require(['./app/views/mine.vue']   ,resolve);
let  Card 		= resolve => require(['./app/views/card.vue']   ,resolve);
let  Citys 		= resolve => require(['./app/views/citys.vue']  ,resolve);
let  Details_	= resolve => require(['./app/views/details.vue'],resolve);

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