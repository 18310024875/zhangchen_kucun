import React,{Component} from 'react' ;
import {render} from 'react-dom' ;
import {Router,Route,Link,hashHistory,browserHistory,Redirect,IndexRoute,
IndexRedirect} from 'react-router';

// 引入 redux-redux
import {Provider,connect} from 'react-redux';
import {store,mapStateToProps,mapDispatchToProps} from './store.jsx' ;

// 引入 fetch 
import 'es6-promise' ;
import 'whatwg-fetch' ;
$get = function( url ,callback){
	fetch(url, {method:"GET",mode:"cors",credentials:'credentials'})
    .then((res) =>{return res.json()}).then((data) => {callback(data)})
    .catch(function(e){console.log("fetch fail",e)});
}

// 引入 各个组件
import App from './app/app.jsx' ;
import Home from './app/home/home.jsx' ;
import Movie from './app/movie/movie.jsx' ;
import Details from './app/details/details.jsx' ;
import Cinema from './app/cinema/cinema.jsx' ;
import Shop from './app/shop/shop.jsx' ;
import Mine from './app/mine/mine.jsx' ;
import Card from './app/card/card.jsx' ;
import Citys from './app/citys/citys.jsx';

render(
<Provider store={ store }>
	<Router history={browserHistory}>
		<Route path="/" component={App} onChange={change_}>
			<IndexRedirect to="/home"/>
			<Route path="/home" component={Home}/>
			<Route path="/movie" component={Movie}/>		
			<Route path="/details" component={Details}/>
			<Route path="/cinema" component={Cinema}/>
			<Route path="/shop" component={Shop}/>
			<Route path="/mine" component={Mine}/>
			<Route path="/card" component={Card}/>
			<Route path="/citys" component={Citys}/>

			<Redirect from="*" to="/home"/>
		</Route>
	</Router>	

</Provider>
,document.querySelector("#appWrapper")) ;


// 重置scrollTop
let dom=undefined ;
function change_(old,next){
	// console.log(old,next)
	if(!dom){ dom = document.querySelector('#main');}
	try{
		dom.scrollTop=0
	}catch(e){}
}




























