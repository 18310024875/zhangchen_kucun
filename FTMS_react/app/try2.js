import React,{Component} from 'react' ;
import {render} from 'react-dom';

class App extends Component {
	constructor(props){
		super(props)
		this.state={
			arr:[],
			arr2:[]
		}
	}

	componentDidMount(){
		$.ajax({
			url:'http://union.ftms.bjscfl.com/shop/getseckill',
			type:'post',
			success:(res)=>{
				console.log(res.data.seckill_info)
				var arr = res.data.seckill_info ;
					var arr2 = [] ;
					arr.map(function(v,k){
						arr2.push(v.end_time-v.current_time)
					})
				this.setState({
					arr:arr,
				})
				setTimeout(()=>{
					this.setState({
						arr2:arr2
					})					
				},4000)

			}
		})
	}

// 我操的父亲!!!!!!
// 我操的父亲!!!!!!
// 我操的父亲!!!!!!
// 我操的父亲!!!!!!



// 奥术大师大所大所大所大
// 我操的父亲!!!!!!
// 我操的父亲!!!!!!
// 我操的父亲!!!!!!
// 我操的父亲!!!!!!
	render (){
		return (
			<div>
				{this.state.arr.map((v,k)=>{
					return (
					<div key={k} style={{background:'#f0f0f0'}}>
						<h3>{v.name}</h3>
						<h5>{v.market_price}</h5>
						<h1 style={{background:'red'}}>{this.state.arr2[k]}</h1>
					</div>)
				})}
			</div>)
	}
}
<<<<<<< HEAD
// JAMES
=======
// KOBE
>>>>>>> bcf43a8112ae10af155afcf0058b315125874008


render(<App/>,document.querySelector('#appBox'))