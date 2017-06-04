import React,{Component} from 'react';

class Write extends Component {
	componentDidMount(){
		// ul.scrollHeight-ul.offsetHeight 是最大 滚动高度!!!!!!!
		let ul = this.refs.ul;
		let maxtop = ul.scrollHeight-ul.offsetHeight

		let stop = function(e){
			e.stopPropagation()
		}

		ul.onscroll = ()=>{
			console.log(ul.scrollTop)
			// 判断何时阻止默认事件!!!!
			if(ul.scrollTop<=0||ul.scrollTop>=maxtop-5){
				this.refs.ul.removeEventListener('touchstart',stop,false)
				this.refs.ul.removeEventListener('touchmove',stop,false)
				this.refs.ul.removeEventListener('touchend',stop,false)
			}else{
				this.refs.ul.addEventListener('touchstart',stop,false)
				this.refs.ul.addEventListener('touchmove',stop,false)
				this.refs.ul.addEventListener('touchend',stop,false)
			}
		}

	}
	render(){
		return (<div style={s.div} id='h3'>
					<span id='move_span' ref="m"> NEWS </span>
					<ul ref='ul'>
						<li>
							<span>新款TOYOTA86中国上市，掀新一轮跑车热潮</span>
							<span>2016.11.16</span>
						</li>
						<li>
							<span>将者，青出于蓝” 全新CROWN皇冠2.0T+运动版10月12日限量上市</span>
							<span>2016.10.12</span>
						</li>
						<li>
							<span>双星同辉惊喜连连 一汽丰田新VIOS威驰、新COROLLA卡罗拉耀世登场</span>
							<span>2016.09.28</span>
						</li>
						<li>
							<span>感恩用户，2016年度一汽丰田卡罗拉俱乐部-会员主题日启动</span>
							<span>2016.07.23</span>
						</li>
						<li>
							<span>新款TOYOTA86中国上市，掀新一轮跑车热潮</span>
							<span>2016.11.16</span>
						</li>
						<li>
							<span>将者，青出于蓝” 全新CROWN皇冠2.0T+运动版10月12日限量上市</span>
							<span>2016.10.12</span>
						</li>
					</ul>
					
				</div>)
	}
}
let s = {
	div:{
		background:'url(./app/images/bgImg.jpg) no-repeat',
		width:'100%',height:'100%',
		backgroundSize:'cover'
	},
}
export default Write


// <meta name="x5-fullscreen" content="true">
// <meta name="full-screen" content="yes">