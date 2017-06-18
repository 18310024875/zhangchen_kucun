import React,{Component} from 'react' ;
import {Link} from 'react-router' ;

// 动画全靠它 
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' ;

import './app.less' ;

import Header from './header/header.jsx' ;
import Nav from './nav/nav.jsx' ;

export default class App extends Component {
	render(){
		return (
			<div id='app'>
				<Header/>
				<div id='main'>
					<Nav/>

					<ReactCSSTransitionGroup
						component="div"
			            transitionName="router"
			            transitionEnterTimeout={550}
			            transitionLeaveTimeout={550}>

						{React.cloneElement(this.props.children,{
							key:location.pathname
						})}
					</ReactCSSTransitionGroup>

				</div>
			</div>)
	}
}

