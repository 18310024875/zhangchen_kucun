import React,{Component} from 'react' ;

export default class Cinema extends Component {
	constructor(props){
		super(props)
		this.address=['密云县','朝阳区','西城区','海淀区','大兴区','东城区','昌平区',
		'丰台区','房山区','平谷区','顺义区','石景山区','门头沟区','通州区','黄岛区','怀柔区','下城区','延庆县']
		this.cs = [] ;
		for(let i=0;i<18;i++){
			this.cs.push([])
		}
	}
	componentWillMount(){
		$get('./src/json/cinema.json',(res)=>{
			// 构造新数组 ;
			res.data.cinemas.map((v,k)=>{
				var ind = this.address.indexOf(v.district.name)
				if(ind!=-1){
					this.cs[ind].push(v)
				}
			})
			console.log(this.cs)
			this.setState({})
		})
	}
	pd(x,e){
		console.log(x)
		x.open=!x.open ;
		let n = e.target.nextElementSibling ;
		if(x.open){
			n.style.display="block"
		}else{
			n.style.display="none"
		}
	}


	render(){
		let ads = this.address.map((v,k)=>{
			let cs = this.cs[k].map((v2,k2)=>{
				let active='';
				if(v2.labels[0]){
					if(v2.labels[0].name=="优惠活动"){active=<h5 className="h2">优惠活动</h5>}else
					if(v2.labels.length==2){active=<div><h5 className="h1">可乐爆米花</h5> <h5 className="h2">优惠活动</h5></div>}
				}
				return (
					<li key={k2}>
						<h6></h6>
						<div><p>{v2.name}</p><span>座</span><span>通</span></div>
						{active}
						<p className="p1">{v2.address}</p>
						<p className="p2">位置距离</p>
					</li>)
			})
			return (
				<div key={v}>
					<div className="div" onClick={this.pd.bind(this,{open:false})}>{v}</div>
					<ul>
						{cs}
					</ul>
				</div>)
		})
		return (
			<div id="cinema">
				{ ads }
			</div>)
	}
}
