import React,{Component} from 'react' ;
import {browserHistory} from 'react-router';

export default class Mine extends Component {
	render(){
	  return (
		<section id="mine">
			<div className="part1">
				<div>
					<img src="https://pic.maizuo.com/usr/default/maizuomoren66.jpg"/>
				</div>
				<ul>
					<li>手机用户4875</li>
					<li>ID:216447183</li>
					<li>退出</li>
				</ul>
			</div>
			<div className="part2">
				<h5></h5>
				<div>影票订单<i/><span className="span"><span>0</span>张</span></div>
				<h5></h5>
				<div>影票待付订单<i/><span className="span"><span>0</span>张</span></div>
				<h5></h5>
				<div>商城订单<i/></div>
				<h5></h5>
				<ul>
					<li><span>我的现金券<i/><span className="span"><span>0</span>张</span></span></li>
					<li><span>账户余额<i/><span className="span"><span>0</span>张</span></span></li>
					<li><span>我的卖座卡<i/><span className="span"><span>0</span>张</span></span></li>
				</ul>
				<h5></h5>
				<div>设置<i/></div>
				<h5></h5>
			</div>
		</section>)
	}
}


