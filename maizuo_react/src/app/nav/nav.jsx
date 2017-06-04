import React,{Component} from 'react' ; 
import {Link} from 'react-router' ;

// redux ;
import {connect} from 'react-redux';
import {mapStateToProps,mapDispatchToProps} from '../../store.jsx' ;

class Nav extends Component {
	constructor(props){
		super(props)
		this.arr = ['首页','影片','影院','商城','我的','卖座卡'] ;
		this.link = ['/home','/movie','/cinema','/shop','/mine','/card'];
		this.headerName = ['卖座电影','卖座电影','全部影院','卖座商城','我的','查询/绑定/激活卖座卡']

		// 控制菜单动画
		this.state={
			display:'none',
			trans:'-101%',
			opacity:'0.2'
		}
	}
	componentWillReceiveProps(next){
		if(next.getMenu){
			this.setState({display:'block',trans:'0%',opacity:'1'})
		}else{
			this.setState({trans:'-101%',display:'none',opacity:'0.2'})
		}
	}
	closeMenu(x){
		this.props.setMenu(false)
		this.props.setHeaderName(x)
	}
	componentDidMount(){

	}
	render () {
		let lis = this.arr.map((v,k)=>{
			return (
				<li key={v}> 
					<Link to={this.link[k]} onClick={this.closeMenu.bind(this,this.headerName[k])}>
						{v}
						<div className="rt"><span/></div>
					</Link>
				</li>)
		})

		return (
			<div>
				<div id="mask" style={{display:this.state.display}}></div>	

				<ul id="menu" style={{transform:'translate3d('+this.state.trans+',0,0)',opacity:this.state.opacity}}> 
					<h1></h1>
					{ lis } 
				</ul>					

			</div>)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Nav) ;