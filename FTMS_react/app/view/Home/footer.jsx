import React,{Component} from 'react';

class Footer extends Component {
	render(){
		return (
			<footer>
				<ul>
					<li>顾客服务中心 :</li>
					<li>
						<span>800-810-1210</span>
						<span>400-810-1210</span>
					</li>
					<li>更多优惠在这里</li>
					<li>
						<span className="hover_img"><img src='./app/images/tianmao.png'/>微信</span>
						<span className="hover_img"><img src='./app/images/weixin.png'/>天猫</span>
					</li>
					<li>招标公告</li>
					<li>
						<span>网站地图</span>
						<span>网站策略</span>
					</li>
					<li id='last_f'>
						<span>
							Copyright © 2016 FAW TOYOTA Motor Sales Co., LTD
						</span>
						<span> 京ICP备07503373号-1</span>
					</li>
				</ul>
			</footer>)
	}
}

export default Footer