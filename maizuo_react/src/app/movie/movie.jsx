import React,{Component} from 'react' ;
import {browserHistory} from 'react-router' ;

// redux
import {connect} from 'react-redux';
import {mapStateToProps,mapDispatchToProps} from '../../store.jsx' ;


class Movie extends Component {
	constructor(props){
		super(props)
		this.act=['active',''] // tab切换
		this.box=[]     // 电影box
		this.page = 0 ; // 页数
		this.load = undefined ; // 下拉实例
		if(this.props.location.state){
			if(this.props.location.state.arr instanceof Array){
				this.act = this.props.location.state.arr ;
			}			
		}	
	}
	componentDidMount(){
		var dom = document.querySelector('#main') ;

		this.load = $load(dom,()=>{
			this.ajax() ;
		})
	}
	// table 切换
	tab(x){
	  // 过滤 active!!!
		if(this.act[x]=='active'){ 
			return ;
		}

		// 切换class
		let arr = ['',''] ;
		arr[x] = 'active';
		this.act = arr ;

		// 重置数据
		this.box=[] ;
		this.page=0 ;
		this.setState({}) ;
		
		// 重置load实例
		this.load.destroy();
		var dom = document.querySelector('#main') ;
		this.load = $load(dom,()=>{
			this.ajax() ;
		})
	}

	ajax(){
		this.page+=1 ;
		if(this.act[0]=='active'){
			$get('./src/json/now'+this.page+'.json',(res)=>{
				if(res.data.films.length==0){
					alert('没有数据了');return;
				}
				this.box = this.box.concat(res.data.films) ;
				this.setState({})
			})
		}else{
			$get('./src/json/will'+this.page+'.json',(res)=>{
				if(res.data.films.length==0){
					alert('没有数据了');return;
				}
				this.box = this.box.concat(res.data.films) ;
				this.setState({})
			})
		}
	}

	// dom 更新后
	componentDidUpdate(){
		// 刷新
		this.load.once=true ;
	}

	componentWillUnmount(){
		this.load.destroy()
	}

	time(shijianchuo){
		//shijianchuo是整数，否则要parseInt转换
		var time = new Date(shijianchuo);
		var y = time.getFullYear();
		var m = time.getMonth()+1;
		var d = time.getDate();
		var h = time.getHours();
		var mm = time.getMinutes();
		var s = time.getSeconds();
		var week ;
		 switch (time.getDay()) {
		  case 0:week="星期天";break
		  case 1:week="星期一";break
		  case 2:week="星期二";break
		  case 3:week="星期三";break
		  case 4:week="星期四";break
		  case 5:week="星期五";break
		  case 6:week="星期六";break
		 }
		//return y+'-'+m+'-'+d+' '+h+':'+mm+':'+s+week;
		return {
			day:m+'月'+d+'日',
			week:week
		}
	}
	toDetails(url,name){
		this.props.setHeaderName(name) ;
		browserHistory.push({
			pathname:'/details',
			state:{
				imgUrl:url
			}
		})
	}

	render () {
		let lis = this.box.map((v,k)=>{
			if(this.act[0]=='active'){
				return(
					<li key={k} onClick={this.toDetails.bind(this,v.cover.origin,v.name)}>
						<div className="fen">
							<span>{v.grade}</span>
							<i></i>
						</div>
						<div className="fl"> 
							<img src={v.poster.origin}/>
						</div>
						<div className="fr"> 
							<p className="p1">{v.name}</p>
							<p className="p2">{v.intro}</p>
							<div className="div">
								<div>
									<span>{v.cinemaCount}</span>
									家影院上映
								</div>
								<div>
									<span>{v.watchCount}</span>
									人购票								
								</div>
							</div>
						</div>
					</li>)				
			}else{
				return(
					<li key={k} onClick={this.toDetails.bind(this,v.cover.origin,v.name)}>
						<div className="fen">
							<span></span>
							<i></i>
						</div>
						<div className="fl"> 
							<img src={v.poster.origin}/>
						</div>
						<div className="fr"> 
							<p className="p1">{v.name}</p>
							<p className="p2">{v.intro}</p>
							<div className="div2">
								<div>
									<span>{this.time(v.premiereAt).day}</span>
									上映
								</div>
								<div>
									<span>{this.time(v.premiereAt).week}</span>								
								</div>
							</div>
						</div>
					</li>)							
			}

		})

		return (
		  <div id="movie">
			<div className="movie_wrapper">
				<ul className="tit">
					<li className={this.act[0]} onClick={this.tab.bind(this,0)}>正在热映</li>
					<li className={this.act[1]} onClick={this.tab.bind(this,1)}>即将上映</li>
				</ul>
				<ul className="box">
					{lis}
				</ul>
			</div>
		  </div>)
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Movie)