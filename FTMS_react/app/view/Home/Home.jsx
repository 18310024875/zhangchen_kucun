import React,{Component} from 'react';
import Banner from '../public/banner';
import Slider from '../public/slider';
import Write  from './write';
import Footer from './footer';

// 引入高阶组件
import Swipe from '../public/swipe.jsx' ;

class Home extends Component {
	constructor(props){
		super(props)
		this.arr = ['./app/images/banner1.jpg','./app/images/baner1.jpg','./app/images/banner2.jpg','./app/images/baner2.jpg','./app/images/banner3.jpg','./app/images/banner4.jpg',]
	}
	componentWillReceiveProps(next){
		let p1 = this.refs.p1 ;
		let p3 = this.refs.p3 ;
		let w = this.refs.write.refs.m ;
		let index = next.move_index ;

		if(index == 1){ //当下表等于1 控制两个p动画
			setTimeout(()=>{
				p1.className = 'show1';
				p3.className = 'show2';
			},100)
		}else{
			p1.className = ''
			p3.className = ''
		}
		if(index==2){
			w.className='move_span'
		}else{
			w.className=''
		}
		if(index==4){
			index=3 ;
			this.refs.box.className='up_box' ;  //移动到尽头动画
			setTimeout(()=>{
				this.refs.box.className="" 
			},650)
		}
	}

	render(){
		return(
			<div style={{width:'100%',height:'100%'}}>
				<div ref='h1' style={s.h1} id="j1"> 
					<Banner arr={this.arr} ref='ban'/>
				</div>
				<div style={s.h2} id="j2"> 
					<div className="upslider">
						<p ref='p1'>STAR MODELS</p>
						<p>明 星 车 型</p>
						<p ref='p3'>预 约 试 驾</p>
				 	</div>
				 	<Slider/>
				</div>
				<div style={s.h3}  id="j3"> 
					<Write ref='write'/>
				 </div>
				<div style={s.h4}  id="j4"> 
					<Footer/>
				</div>
			</div>)
	}
}
let s={
	h1:{width:'100%',height:'25%',background:'white',position:'relative',zIndex:'10'},
	h2:{width:'100%',height:'25%',background:'white',position:'relative'},
	h3:{width:'100%',height:'25%',background:'green',position:'relative',overflow:'hidden'},
	h4:{width:'100%',height:'25%',background:'blue',position:'relative'}
}


export default Swipe(Home,4) ;



