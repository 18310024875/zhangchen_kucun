import React,{Component} from 'react' ;

class JJ extends Component {
	render(){
		return (
			<div  style={{width:'100%',height:"100%",overflow:'auto',background:'white'}}>
				<p style={s.p}>紧急救援</p>
				<img src='../../app/images/jjjy.png' style={{width:'100%',marginBottom:'0.28rem'}}/>			
				<div style={s.div1} ref="div1">

					<p style={s.p2}>
						
					    客户遇到车辆不能正常行驶的情况，可以拨打网点救援电话或者一汽丰田客服电话400-810-1210。
				
					</p>
					<p style={s.p2}>

	                    客户在电话中应该尽可能向网点救援人员描述故障现象并按照网点救援人员的引导查看车辆，以便网点救援人员判断故障。详细告知车辆型号及姓名和移动联系方式，和具体位 置保持手机通讯正常并注意查看，记录网点救援人员电话。

					</p>
					<p style={s.p2}>
						
            		在等待救援小组到达过程中的一些必要注意事项，例如:<br/>

					1)车辆抛锚在路面，打开故障警示灯，在车后方安全距离处设置故障警示牌（后备箱内）<br/>

					2)保持手机畅通，便于随时联络<br/>

					3)寻找安全场所等待，确保人身安全。如果车辆在高速公路上出现故障，应立即打开双闪警示灯并将车辆移至紧急停车带。同时人员应离开车辆转移至高速公路道路外安全地带<br/>

					4)当车辆抛锚在路面，客户需要离车时，注意锁好车辆，以确保财产安全<br/>
                 
					</p>

					<img src='../../app/images/telphone.png' style={s.img}/>
				</div>
			</div>)
	}
}

export default JJ ;

let s={
	p:{height:'1.05rem',lineHeight:"1.05rem",textAlign:'center',fontSize:'0.45rem',letterSpacing:'2px',color:'#343434'},
	ul:{width:'100%',height:'0.7rem',fontSize:'0.28rem',paddingTop:'0.08rem',textAlign:'center',borderBottom:'1px solid #ccc'},
	li1:{float:'left',width:'100%',boxSizing:'border-box'},
	div1:{width:'100%',fontSize:'0.28rem',padding:'0 0.23rem 0.5rem 0.23rem',position:'relative'},
	span1:{color:'#343434'},
	p2:{lineHeight:'0.5rem',marginBottom:'0.5rem',color:'#343434',fontSize:'0.27rem',color:'black'},
	img:{width:'0.8rem',position:'absolute',bottom:'0.5rem',right:'0.26rem'}
}