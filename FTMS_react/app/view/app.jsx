import React,{Component} from 'react';
// 引入 头部
import Header from './public/header';
// 引入 list
import List from './public/list';

export default class app extends Component {

	render(){
		return(
		<div id='app' style={s.app}>

			<Header/>
			<List/>

			<main id='main' style={s.main} ref='main'>

				{this.props.children}
			</main>

		</div>)
	}
}

let s={
	app:{width:'100%',height:'100%'},
	main:{
		position:'absolute',bottom:'0',left:'0',width:'100%',height:'calc(100% - 1.02rem)',
		background: 'white'
	}
}



