import React,{Component} from 'react' ;
import Textban from './textBan'

class Ppzx extends Component {
	render(){
return (
			<div  style={{width:'100%',height:"100%",overflow:'auto',background:'white'}}>
				<p style={s.p}>企业概要</p>
				<img src='../../app/images/qyjs.png' style={{width:'100%',marginBottom:'0.28rem'}}/>			
				<div style={s.div1} ref="div1">
					<div className="outline">
						<p>中文全称：一汽丰田汽车销售有限公司</p>
						<p>英文全称：FAW TOYOTA MOTOR SALES CO., LTD.</p>
						<p>简&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：FTMS</p>
						<p>成立时间：2003年9月25日</p>
						<p>注册资金：2500万美元</p>
						<p>公司性质：中外合资经营企业</p>
						<p>所&nbsp;&nbsp;在&nbsp;&nbsp;地：北京市朝阳区</p>
						<p><span className="span0">主要业务：</span><span className="span1">一汽丰田旗下的国产丰田品牌汽车的销售 售后服务和市场管理</span>
						</p>
					</div>
					<div className="investors">
						<table cellSpacing='0' cellPadding='0'>
						<tbody>
							<tr className="orange">
								<td className="center">出资者</td>
								<td className="center">出资额（$）</td>
								<td className="center">占注册资</td>
							</tr>
							<tr>
								<td>第一汽车股份有限公司(FAW)</td>
								<td className="center"><span>9.5Mil</span></td>
								<td className="center"><span>38%</span></td>
							</tr>
							<tr className="gray">
								<td>丰田汽车公司(TMC) </td>
								<td className="center"><span>8Mil</span></td>
								<td className="center"><span>32%</span></td>
							</tr>
							<tr>
								<td>天津一汽丰田(TFTM)</td>
								<td className="center"><span>6.5Mil</span></td>
								<td className="center"><span>25%</span></td>
							</tr>
							<tr className="gray">
								<td>四川一汽丰田(SFTM)</td>
								<td className="center"><span>1.25Mil</span></td>
								<td className="center"><span>5%</span></td>
							</tr>
							<tr className="dark-gray">
								<td>合计</td>
								<td className="center"><span>25Mil</span></td>
								<td className="center"><span>100%</span></td>
							</tr>
						</tbody>
						</table>
					</div>

					<div className="title2" style={s.black}>企业理念</div>
					<Textban/>

					<div className="manage">
						<div className="title" style={s.black}>经营理念</div>
						<p className="manage0" style={s.black}>客户第一&nbsp;&nbsp;经销店第二&nbsp;&nbsp;厂家第三</p>
						<p className="manage1" style={s.black}>一汽丰田汽车销售有限公司以“客户第一”为经营理念， 在销售及售后服务等方面为客户提供便捷、优质的服务，让更多客户体验拥有汽车的喜悦，是我们执著如一的追求。</p>
						<div className="picture">
							<img src="../../app/images/sanjiao.png"/>
							<div className="sales">
								<b >高品质的销售活动</b>
								<p style={s.black}>诚心诚意、细致入微的服务态度一切为客户着想的销售方式</p>
							</div>
							<div className="sales service">
								<b >高品质的服务活动</b>
								<p style={s.black}>保养、维修上的高超技术及服务能力努力降低客户保有汽车期间的总体费用</p>
							</div>
							<div className="qdr" style={s.black}>
								QDR=品质（Quality）、耐久性（Durability）、可靠性（Reliability）
							</div>
						</div>
						<div className="global">
							<b >全球化、高品质</b>
							<p style={s.black}>高水准的QDR每一细小部位的高质感</p>
						</div>
					</div>


				</div>
			</div>)
	}
}

export default Ppzx ;

let s={
	p:{height:'1.45rem',lineHeight:"1.45rem",textAlign:'center',fontSize:'0.45rem',letterSpacing:'2px',color:'#343434',marginTop:'0.15rem'},
	div1:{width:'100%',fontSize:'0.28rem',position:'relative'},
	black:{color:'black'}
}