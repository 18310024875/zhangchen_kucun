import React,{Component} from 'react' ;
import {browserHistory} from 'react-router' ;

// redux
import {connect} from 'react-redux';
import {mapStateToProps,mapDispatchToProps} from '../../store.jsx' ;


class Header extends Component {
	pdMenu(){
		this.props.getMenu?
		this.props.setMenu(false):
		this.props.setMenu(true) ;
	}
	toCitys(){
		browserHistory.push('/citys')
	}
	toMine(){
		browserHistory.push('/mine')
	}
	componentDidMount(){
		console.log(this)
	}
	render(){
		return (
			<header>
				<div id="nav_bth" onClick={this.pdMenu.bind(this)}>
					<img src="src/images/icon/我的订单.png"/>
				</div>

				<span className="title">
					{this.props.getHeaderName}
				</span>
				<div id="mine_bth" onClick={this.toMine.bind(this)}>
					<img src="src/images/icon/我的聚划算.png"/>
				</div>
				<div className="city" onClick={this.toCitys.bind(this)}>
					<span>{this.props.getCity}</span>
					<img src="src/images/icon/向下箭头.png"/>
				</div>
			</header>)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Header)