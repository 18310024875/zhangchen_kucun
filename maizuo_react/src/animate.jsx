import React,{Component} from 'react' ;
import {render} from 'react-dom' ;
import {Router,Route,Link,hashHistory,browserHistory,Redirect,IndexRoute,IndexRedirect} from 'react-router'


import './app.css'
import './app.less'


import ReactCSSTransitionGroup from 'react-addons-css-transition-group' ;

class Son1 extends Component {
	render(){
		return (
			<div className="go" >

				<h1>1111</h1>

				<Students/>
			</div>)
	}
}
class Son2 extends Component {
	render(){
		return <div className='go' ><h1>2222</h1></div>
	}
}
class Son3 extends Component {
	render(){
		return <div className='go' ><h1>3333</h1></div>
	}
}

  //var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
  class Students extends Component {
  	constructor(props){
  		super(props)
  		this.state = {
  			students:['amy', 'bob', 'tom', 'lucy']
  		}
  	}

    componentDidMount(){
      var update = ()=>{
        this.setState({
          students: this.state.students.concat(["jjj-"+parseInt(Math.random()*10000000)])
        });
      }
      //setInterval(update, 4000);
    }

    handleRemove(x){
    	console.log(x)
        var state = this.state.students.splice(x, 1);
      this.setState({
        state: state
      });
    }

    render() {
      var s = this.state.students;
      return (
        <div>

	        <ReactCSSTransitionGroup 
	        	transitionName="student" 
          	  	transitionEnterTimeout={300}
           		transitionLeaveTimeout={300}
	        >
	        {
	          s.map((v,k)=>{
	            return (
	            	<div className='student' key={v}>{v} 
	            		<a onClick={this.handleRemove.bind(this,k)} >删除</a>
	           		</div>)
	          })
	        }
	        </ReactCSSTransitionGroup>

        </div>
        );
    }
  };


class App extends Component {
	componentDidMount(){
		console.log(this)
	}

	render(){
		return (
			<div id='app'>
				<h1>
					<span><Link to="/son1">111</Link></span>
					<span><Link to="/son2">222</Link></span>
					<span><Link to="/son3">333</Link></span>
				</h1>
				<div>
					<ReactCSSTransitionGroup 
			        	transitionName="go" 
		          	  	transitionEnterTimeout={3300}
		           		transitionLeaveTimeout={3300}					
					>
			            {React.cloneElement(this.props.children, {
			                key: location.pathname
			            })}
					</ReactCSSTransitionGroup>
				</div>
			</div>)
	}
}

render(

<Router history={browserHistory}>
	<Route path="/" component={App}>
		<IndexRedirect to="/son1"/>
		<Route path="/son1" component={Son1}/>
		<Route path="/son2" component={Son2}/>
		<Route path="/son3" component={Son3}/>
		<Redirect from="*" to="/son1"/>
	</Route>
</Router>




,document.querySelector("#appWrapper"))



























