import React,{Component} from 'react' ;

export default class Card extends Component {
	constructor(props){
		super(props)
		this.act=['active',''] // tab切换
	}
	tab(x){
		let arr=['','']
		arr[x]='active';
		this.act = arr ;
		this.setState({}) ;
	}
	render(){
		let card ;
		if(this.act[0]=='active'){
			card = (
				<div className="box">
					<div>
						<div>
							<p>卡号:</p>
							<input placeholder="请输入卡号"/>
						</div>
						<h5></h5>
					</div>
					<div>
						<div>
							<p>密码:</p>
							<input placeholder="请输入密码"/>
						</div>
						<h5></h5>
					</div>
					<div className="bth">查询</div>					
				</div>)
		}else{
			card = (
				<div className="box">
					<div>
						<div>
							<p>卡号:</p>
							<input placeholder="请输入15位电子卡号"/>
						</div>
						<h5></h5>
					</div>
					<div className="bth">查询</div>					
				</div>)
		}

		return (
		  <section id="card">
		  	<div className="card_wrapper">
				<ul className="tit">
					<li className={this.act[0]} onClick={this.tab.bind(this,0)}>卖座卡</li>
					<li className={this.act[1]} onClick={this.tab.bind(this,1)}>电子卖座卡</li>
				</ul>
				{card}
			</div>
		  </section>)
	}
}