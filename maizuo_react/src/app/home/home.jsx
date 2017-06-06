import React,{Component} from 'react' ;

import {browserHistory} from 'react-router' ;

// redux
import {connect} from 'react-redux';
import {mapStateToProps,mapDispatchToProps} from '../../store.jsx' ;

class Home extends Component {
	constructor(props){
		super(props)
		this.swiper = undefined ;
		this.swiper_arr=[] ;
		this.now = [] ;
		this.will = [] ;
	}
	componentWillMount(){console.log(this)
		$get('./src/json/banner.json',(res)=>{
			this.swiper_arr = res.data.billboards ;
			this.setState({})
		})
		$get('./src/json/now_movie.json',(res)=>{
			this.now = res.data.films ;
			this.setState({})
		})
		$get('./src/json/will_movie.json',(res)=>{
			this.will = res.data.films ;
			this.setState({})
		})
	}
	addSwiper(){
        this.swiper = new Swiper('.swiper-container', {
            loop: true, 
            autoplay:3000,
            autoplayDisableOnInteraction : false,
            pagination: '.swiper-pagination',// 如果需要分页器
            paginationClickable:true,
        }) ;
	}
	componentDidUpdate(){
		!this.swiper?this.addSwiper():null ;
	}
	componentWillUnmount(){
		this.swiper.destroy(false)
	}

	toDetails(url,name){
		this.props.setHeaderName(name) ;
		browserHistory.push({
			pathname:'/details',
			state:{
				imgUrl:url
			}
		});
	}
	toMovie(x){
		x=='now'?browserHistory.push({pathname:'/movie',state:{arr:['active','']}}):
				 browserHistory.push({pathname:'/movie',state:{arr:['','active']}});
	}
	render(){
		let s_imgs = this.swiper_arr.map((v,k)=>{
			return <div className="swiper-slide" key={k}><img src={v.imageUrl}/></div>
		})
		let now = this.now.map((v,k)=>{
			return (
			<li key={v.name} onClick={this.toDetails.bind(this,v.cover.origin,v.name)}>
				<img src={v.cover.origin}/>
				<div>
					<p className="p1">{v.name}</p>
					<p className="p2">{v.watchCount}家影院上映 {v.cinemaCount}人购票</p>
					<span className="fen">{v.grade}</span>					
				</div>
			</li>)
		})
		let will = this.will.map((v,k)=>{
			return (
			<li key={v.name} onClick={this.toDetails.bind(this,v.cover.origin)}>
				<img src={v.cover.origin}/>
				<div>
					<p className="p1">{v.name}</p>
					<p className="p2">{v.watchCount}家影院上映 {v.cinemaCount}人购票</p>
					<span className="fen">{v.grade}</span>					
				</div>
			</li>)
		})
		return (
		<div id="home" >
			{/* swiper */}
		    <div className="swiper-container">
		        <div className="swiper-wrapper">
		        	{s_imgs}
		        </div>
		        <div className="swiper-pagination"></div>
		    </div>
		    <ul className="m_box">
		    	{now}
		    	<button className="more" onClick={this.toMovie.bind(this,'now')}>更多热映电影</button>
		    </ul>

		    <div className="cut">即将上映</div>
		    <div className="cut_after"></div>

		    <ul className="m_box">
		    	{will}
		    	<button className="more" onClick={this.toMovie.bind(this,'will')}>更多即将上映电影</button>
		    </ul>

		    <div className="up">
		    	<img src="./src/images/up.png"/>
		    </div>
		</div>)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)