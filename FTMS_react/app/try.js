import React,{Component} from 'react' ;
import ReactDOM,{render} from 'react-dom' ;

import {hashHistory,Router,Route,Redirect,IndexRoute,IndexRedirect,Link} from 'react-router';

class Son1 extends Component {
	render(){
		return (
			<div>
				<h1>son1</h1>
				<div style={{background:'#f0f0f0'}}>
					<Link to="/son1/in1">in1</Link>
					<Link to="/son1/in2">in2</Link>
					{this.props.children}
				</div>



			</div>)
	}
}
class Son2 extends Component {
	render(){
		return (<h1>son2</h1>)
	}
}

class In1 extends Component{
	render(){
		return(<h5 style={{color:'pink'}}>in1111</h5>)
	}
}
class In2 extends Component{
	render(){
		return(<h5 style={{color:'pink'}}>in22222222</h5>)
	}
}
	class F extends Component {
		constructor(props){
			super(props)
			this.state={
				ok3:this.props.ok3,
				arr:['11','22','33','44']
			}
			this.ok2 = this.props.ok2 ;
		}
		arr(){
			var arr=[];
			this.state.arr.map((v,k)=>{
				var name=1;var obj={name:1}

				arr.push(<li key={k} onClick={this.c.bind(this,name,obj.name)}>{v}</li>) ;
				window.fun=function(){
					console.log(name,obj)
				}					

			})
			return arr ;
		}
		c(name,obj){
			name+=1;
			obj+=1;
			window.fun()
		}
		render(){
			let what = this.props.ok3 ;
			return (
				<div>
					<h1>{this.props.ok1}</h1>
					<h1>{this.ok2}</h1>
					<h1>{this.state.ok3}</h1>
					<h1>{what}</h1>
					{this.arr()}
				</div>)
		}

		componentWillReceiveProps(next){
			console.log(next)
			this.ok2=next.ok2;
			this.setState({ok3:next.ok3})
		}
	}
class App extends Component {
	constructor(props){
		super(props) ;
		this.ok1 = 'lplplp'
		this.ok2 = 'lplplp'
		this.ok3 = 'lplplp'
	}
	c(){
		this.ok1 = this.ok1+'j' ;
		this.ok2 = this.ok2+'j' ;
		this.ok3 = this.ok3+'j' ;
		this.setState({})
	}
	render(){
		return (
			<div>
				<F ok1={this.ok1} ok2={this.ok2} ok3={this.ok3}/>
				<h1 onClick={this.c.bind(this)}> App </h1>
				<Link to="/son1">son1</Link>
				<Link to="/son2">son2</Link>
				<Link to="/son3">son3</Link>
				<div>
					{this.props.children}
				</div>
			</div>)
	}
}

render(
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			{/* !!!!这个在嵌套路由有局限性!!!!! */}
			{/* <IndexRoute component={Son1}/> */}
			<IndexRedirect to="/son1/in1"/>
			<Route path="/son1" component={Son1}>

				<Route path="/son1/in1" component={In1}></Route>
				<Route path="/son1/in2" component={In2}></Route>
			</Route>
			<Route path="/son2" component={Son2}></Route>

			<Redirect from="*" to='/son2'/>

		</Route>
	</Router>
,document.querySelector('#appBox'))


















