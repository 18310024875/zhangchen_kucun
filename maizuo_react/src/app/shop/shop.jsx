import React,{Component} from 'react' ;

export default class Shop extends Component {
	constructor(props){
		super(props)
		this.types = [] ;
		this.lis = [] ;

		this.load = undefined ;
		this.ind = 0 ;
	}
	componentWillMount(){
		$get('./src/json/shop_type.json',(res)=>{
			this.types = res.data ;
			this.setState({})
		})
	}
	componentDidMount(){
		var dom = document.querySelector('#main') ;
		this.load = $load(dom,()=>{
			this.ajax()
		})
	}
	ajax(){
		this.ind+=1;
		$get('./src/json/shop'+this.ind+'.json',(res)=>{
			if(res.data.list.length==0){alert('没有更多了');return};
			this.lis = this.lis.concat(res.data.list) ;
			this.setState({})
		})		
	}
	componentDidUpdate(){
		this.load.once = true ;
	}
	componentWillUnmount(){
		this.load.destroy() ;
	}
	render(){
		let types = this.types.map((v,k)=>{
			return <li key={k}><img src={v.image}/><p>{v.name}</p></li>
		})
		let lis = this.lis.map((v,k)=>{
			return (
				<li key={k}>
					<div className="fl"><img src={v.skuList[0].image}/></div>
					<div className="fr">
						<p className="p1">{v.masterName}</p>
						<p className="p2">{v.slaveName}</p>
						<p className="p3">
							<span>￥{(v.skuList[0].price/100).toFixed(2)}</span>
							<span>已售{v.displaySalesCount}</span>
						</p>
					</div>
				</li>)
		})
		return (
		<div id="shop">
			<ul className="tit">
				{types}
			</ul>
			<p><span>精彩推荐</span></p>
			<ul className="box">
				{lis}
			</ul>
		</div>)
	}
}





