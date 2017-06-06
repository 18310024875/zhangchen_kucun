import React,{Component} from 'react';

class H5 extends Component {
	render(){
		return(
			<div style={{paddingTop:'0.9rem'}}>
				<img src="app/images/70026300.jpg" style={s.img}/>
				<div style={s.each}>
					<p style={s.p1}>一汽丰田 冰雪巅峰驾享汇</p>
					<p style={s.p2}>一汽丰田 冰雪巅峰驾享汇</p>
					<div style={s.indiv}>了解详情</div>
				</div>
			</div>)
	}
}
let s = {
	img:{width:'100%'},
	each:{width:'80%',margin:'0 auto',marginBottom:'0.3rem',fontSize:'0.3rem',borderTop:'1px solid transparent'},
	p1:{width:'80%',margin:"0 auto",textAlign:'center',height:"0.92rem",lineHeight:'0.92rem',
		fontSize:'0.35rem',borderBottom:'1px solid gray',color:'gray'},
	p2:{textAlign:'center',height:"0.82rem",lineHeight:'0.82rem'},
	indiv:{
		width:"55%",height:"0.82rem",fontSize:'0.35rem',color:'white',background:'#EABD07',
		margin:'0.3rem auto',textAlign:'center',lineHeight:'0.82rem',letterSpace:'2px'
	},
}
export default H5;