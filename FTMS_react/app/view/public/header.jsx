import React,{Component} from 'react';
import {Provider,connect} from 'react-redux';
import {mapStateToProps,mapDispatchToProps} from '../../store.js';

class Header extends Component {
	list(){
		if(this.props.list=='open'){
			// 现在是打开得 需要关闭
			this.props.changeList('close')

		}else{ //现在式关闭的
			this.props.changeList('open')
		}
	}
	// componentWillReceiveProps(x){
	// 	console.log(x)
	// }
	shouldComponentUpdate(){
		return false //性能优化 没必要刷新
	}
	render(){
		return (
		<header>
			<div>
				<img src='./app/images/left_logo.png'/>
				<div id='span' onTouchStart={this.list.bind(this)}>
					<i/>
					<i/>
					<i/>
				</div>						
				<img src='./app/images/right_logo.png'/>
			</div>
		</header>)
	}
}

let C_Header = connect(mapStateToProps,mapDispatchToProps)(Header)
export default C_Header