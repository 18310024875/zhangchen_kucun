import React,{Component} from 'react';
import {render} from 'react-dom';
import {Router,Route,Link,hashHistory,Redirect,IndexRoute} from 'react-router';
// 引入redux-redux
import {Provider,connect} from 'react-redux';
// 引入储存数据js
import {store} from './store.js';
// 引入public.css
import './css/public.css' ;


// 拿到需要的模块
import App from './view/app' ;
import Home from './view/Home/Home' ;
import PinCX from './view/PinCX/PinCX' ;
import Gou from './view/Gou/Gou' ;
import Yong from './view/Yong/Yong' ;
import News from './view/others/new' ;
import Ppzx from './view/others/ppzx' ;
import Active from './view/others/active' ;
import Active_click from './view/others/active_click' ;
import Search from './view/others/search' ;
import YuyueSJ from './view/YuyueSJ/YuyueSJ' ;

render(
<Provider store={store}>
	<Router history={hashHistory}>
		<Route path='/' component={App}>

			<IndexRoute component={Home}/>
			<Route path='/home' component={Home}/>
			<Route path='/pcx' component={PinCX}/>
			<Route path='/gou' component={Gou}/>
			<Route path='/yong' component={Yong}/>
			<Route path='/news' component={News}/>				
			<Route path='/ppzx' component={Ppzx}/>	
			<Route path='/active' component={Active}/>
			<Route path='/active_click' component={Active_click}/>
			<Route path='/search' component={Search}/>
			<Route path='/yyshijia' component={YuyueSJ}/>
			
		</Route>
	</Router>
</Provider>
,document.querySelector('#appBox'))

let s = Symbol();
console.log(typeof s)

// import React,{Component} from 'react' ;
// import {render} from 'react-dom' ;

// class App extends Component {
// 	componentDidMount(){
// 		console.log(this)
// 	}
// 	m(){
// 		React.Children.map(this.props.children,(x)=>{
// 			console.log(x)
// 			return(
// 				<li>
// 					{x}				
// 				</li>)
// 		})
// 	}
// 	render(){
// 		return (
// 			<div>
// 				<h1>小明</h1>
// 				<ul>
// 					{React.Children.map(this.props.children,(x)=>{
// 						return <li> {x} </li>
// 					})}				
// 				</ul>

// 			</div>)
// 	}
// }

// import React,{Component} from 'react' ;
// import ReactDOM,{render} from 'react-dom' ;
	
// 	class F extends Component {
// 		render(){
// 			return (<h1>66 {this.props.ok}</h1>)
// 		}
// 	}

// 	class App extends Component{
// 		constructor(props){
// 			super(props)
// 			this.tx_receive='111'
// 		}
// 		getChildContext(){
// 			return {
// 				tx:(x)=>{
// 					this.tx_receive=x ;
// 					this.setState({}) ;
// 				},
// 				tx_receive:this.tx_receive
// 			}
// 		}
// 		render(){
// 			return (
// 				<div>
// 					<F/>
// 					<TX_Father>
// 						<TX/>
// 						<TX/>
// 						<TX/>
						
// 						<Son3> <Son1/> </Son3>						
// 					</TX_Father>

// 					<Son1/>
// 					<Son2/>

// 				</div>)
					
// 		}
// 	}
// 	App.childContextTypes = {
// 		tx:React.PropTypes.func,
// 		tx_receive:React.PropTypes.string
// 	}

// // NB 嵌套	
// 	class TX_Father extends Component {
// 		constructor(props){
// 			super(props) ;
// 			this.state = {
// 				num:0
// 			}
// 		}
// 		tx(){
// 			this.setState({
// 				num:this.state.num+100
// 			})
// 		}
// 		render(){
// 			return (
// 				<div>
// 					<p>this.state.num : {this.state.num}</p>
// 					{React.Children.map(this.props.children,(v,k)=>{
// 						console.log(v)
// 						// typeof v.type=='function'?console.log(1):null
// 						if(typeof v.type=='function') {
// 							return React.cloneElement(v,{tx:this.tx.bind(this)})
// 						}else{
// 							return v
// 						}
						
// 					})}
// 				</div>)
// 		}
// 	}
// 	class TX extends Component {
// 		constructor(props){
// 			super(props)
// 			this.state = {
// 				num:0
// 			}
// 		}
// 		c(){
// 			this.setState({
// 				num:this.state.num+1 
// 			})
// 			this.props.tx()
// 		}
// 		render(){
// 			return <button onClick={this.c.bind(this)}>{this.state.num}</button>
// 		}
// 	}
// // 通讯
// 	class Son1 extends Component{
// 		componentDidMount(){
// 			// console.log(this)
// 		}
// 		render(){
// 			return (<div>son1 {this.context.tx_receive}</div>)
// 		}
// 	}
// 	Son1.contextTypes={
// 		tx_receive:React.PropTypes.string
// 	}

// 	class Son2 extends Component{
// 		render(){
// 			return (<h1 onClick={this.c.bind(this)}>son2</h1>)
// 		}
// 		c(){
// 			this.context.tx('123456')
// 		}
// 	}
// 	Son2.contextTypes={
// 		tx:React.PropTypes.func
// 	}

// 	class Son3 extends Component {
// 		render(){
// 			return(<h2>{this.props.children}666</h2>)
// 		}
// 	}

// render(
// 	<App>
// 		<span>1122334</span>
// 		<span>777777777777777</span>
// 	</App>,
// 	document.querySelector('#appBox')
// )


	









