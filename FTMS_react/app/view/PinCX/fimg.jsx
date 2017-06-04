import React,{Component} from 'react';

class Fimg extends Component {
	render(){
		return (
			<div style={s.div}>
					<img style={s.img} src='../../../app/images/s5.png'/>		
			</div>)		
	}
}
let s = {
	div:{width:'3.5rem',height:'0.6rem',background:'red',
	background:'url(../../../app/images/car_yysj.png) no-repeat',
	position:'fixed',bottom:'0',right:'0',zIndex:'100',
	backgroundSize:'contain'
	},
	img:{width:'1.2rem',position:'absolute',top:'-0.13rem',right:'0.3rem'}
}
export default Fimg;