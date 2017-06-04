import React,{Component} from 'react' ;

import {browserHistory} from 'react-router' ;
// redux
import {connect} from 'react-redux';
import {mapStateToProps,mapDispatchToProps} from '../../store.jsx' ;

class Citys extends Component {
	constructor(props){
		super(props)
		this.imp=['北京','上海','广州','深圳'] ;
		this.arr=['A','B','C','D','E','F','G','H','J','K','L','M','N','P',
				  'Q','R','S','T','W','X','Y','Z'] ;
		this.citys=[] ;
		this.arr.map((v,k)=>{
			this.citys.push([])
		});
		this.lis = [] ;
	}

	componentWillMount(){
		$get('./src/json/citys.json',(res)=>{
			// 构造新数组
			res.data.cities.map((v,k)=>{
				var p = v.pinyin[0] ;
				var ind = this.arr.indexOf(p) ;
				this.citys[ind].push(v) ;
			})
			this.setState({}) ;
		})
	}

	scrollTo(name){
		let lis = this.lis ;
		let top = undefined ;
		lis.forEach((v,k)=>{
			if(v.innerHTML==name){
				top = v.offsetTop ;
			}
		})

		var stop ;
		var dom = document.querySelector('#main');
		var i=0 ;
		var speet = top/30 ;
		function run() {
			i+=1 ;
		    dom.scrollTop += speet;
			if (i==30) {
			   cancelAnimationFrame(stop);
			   run = null ;
			   dom.scrollTop = top ;
			   return ;
			}
			stop = requestAnimationFrame(run);
		}
		run()			
	}

	changeCity(x){
		this.props.setCity(x) ;
		browserHistory.push('/home') ;
	}

	componentDidUpdate(){
		this.lis = document.querySelectorAll('.citys_p') ;
	}

	render(){
		let citys = this.citys.map((v,k)=>{
			let cs = this.citys[k].map((v2,k2)=>{
				return <li onClick={this.changeCity.bind(this,v2.name)} key={v2.name}>{v2.name}</li>
			})

		  return (
			<div key={k}>
				<p className="citys_p">{this.arr[k]}</p>
				<ul> { cs } </ul>
			</div>)
		})
		return (
			<section id="citys">
				<p>GPS定位你所在城市</p>
				<p>{this.props.getCity}</p>
				<p>热门城市</p>
				<ul>
					{this.imp.map((v,k)=>{
						return <li key={v} onClick={this.changeCity.bind(this,v)}>{v}</li>
					})}
				</ul>
				<p>按字母排序</p>
				<ul>
					{this.arr.map((v,k)=>{
						return  <li key={v} onClick={this.scrollTo.bind(this,v)}>{v}</li>
					})}
				</ul>
				<div>
					{ citys }
				</div>
			</section>)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Citys)

