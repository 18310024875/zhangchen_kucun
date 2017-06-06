import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class H4 extends Component {
	componentDidMount(){

	}
	render(){
	return(<div style={pcx3.div}>
			   <img style={pcx3.img1} src='../../../app/images/czyp_bg.jpg'/>
			   <img style={pcx3.img2} src='../../../app/images/chunzyp_title.png'/>
			   <img style={pcx3.img3} ref='img3' src='../../../app/images/hand_move.png'/>
		  </div>)
	}
}
export default H4;


let pcx3 = {
	div:{width:'100%',height:'100%',position:'relative',paddingTop:'0.9rem'},
	img1:{width:'100%',height:"100%"},
	img2:{width:'60%',position:'absolute',left:"50%",top:'18%',transform:'translate(-50%,0)'},
	img3:{width:'1rem',position:'absolute',top:'0',right:'0',display:'none'}
} 
