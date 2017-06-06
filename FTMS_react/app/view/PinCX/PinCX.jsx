import React,{Component} from 'react';
// import ReactDOM from 'react-dom';console.log(ReactDOM.findDOMNode(this.refs.pcx_header))
import PCX_header from './pcx_header';
import Fimg from './fimg';
import H1 from './H1';
import Banner from '../public/banner';
import H3 from './H3';
import H4 from './H4';
import H5 from './H5';

// redux
import {Provider,connect} from 'react-redux';
import {mapStateToProps,mapDispatchToProps} from '../../store.js';

// 高阶组件
import Swipe2 from '../public/swipe2' ;


let s={
	box:{width:'100%',height:'100%'},
	h1:{transition:'0.5s all',marginTop:'0'
		,width:'100%',height:'20%',background:'white',position:'relative'},
	h2:{paddingTop:'0.9rem',
		width:'100%',height:'20%',background:'white',position:'relative'},
	h3:{width:'100%',height:'20%',background:'white',position:'relative',overflow:'hidden'},
	h4:{width:'100%',height:'20%',background:'#000000',position:'relative'},
	h5:{width:'100%',height:'20%',background:'white',position:'relative'}
}

class PCX extends Component {
	constructor(props){
		super(props)

		this.name  = undefined ;
		this.state = {obj:""} ;
	}
	componentWillMount(){
		// 得到传过来的 location;也可以用 this.props.params
		let name = this.props.location.state
		$ajax({
			url:'./app/json/cars.json',
			success:(res)=>{
				this.json = JSON.parse(res)
				let obj = this.json[name]
				this.setState({obj:obj}) ;
				// banner图 spans 的位置
				this.refs.ban.refs.spanbox.style.marginBottom='12%'
			}
		})
	}
	componentDidMount(){

	}

	componentWillReceiveProps(next){
		console.log(next)
		// 通过路由 点击不同车型 展示
		let name = next.location.state;
		let obj = this.json[name]
		this.setState({obj:obj})
	}

	render(){
	  return(
		<div ref='moveBox' style={{width:'100%',height:'100%'}}>

			<div ref='h1' style={s.h1}> 
				{this.state.obj!=""?<H1 {...this.state}/>:null}
			</div>

			<div style={s.h2}> 
				{this.state.obj!=""?<Banner arr={this.state.obj.h2} class_="stp" ref='ban'/>:null}
			</div>

			<div style={s.h3}> 
				{this.state.obj!=""?<H3 {...this.state}/>:null}
			 </div>

			<div style={s.h4}>
				<H4 ref="h4" />
			</div>

			<div style={s.h5}> 
				<H5 {...this.state}/>
			</div>

		</div>)
	}
}

// 品牌车型通过高阶组件件 和 redux包裹(真正导出的是PinPai)
let PinPai = connect(mapStateToProps,mapDispatchToProps)(Swipe2(PCX,5))

class Wrapper extends Component {
	render(){
		return (
			<div style={{width:'100%',height:'100%',overflow:'hidden'}}>
				<PCX_header/>	
				<PinPai {...this.props}/>
				<Fimg/>	
			</div>)
	}
}
export default Wrapper




	// constructor(props){
	// 	super(props)
	// 	this.index = 0;
	// 	this.go_now = 0 ;
	// 	this.pd = true ;
	// 	this.state = {
	// 		obj:""
	// 	}
	// 	this.destroy=undefined ;
	// }
	// componentWillMount(){
	// 	// 得到传过来的 location;也可以用 this.props.params
	// 	let name = this.props.location.state

	// 	$ajax({
	// 		url:'./app/json/cars.json',
	// 		success:(res)=>{
	// 			this.json = JSON.parse(res)
	// 			let obj = this.json[name]
	// 			this.setState({obj:obj}) ;
	// 			// banner图 spans 的位置
	// 			this.refs.ban.refs.spanbox.style.marginBottom='12%'
	// 		}
	// 	})
	// }
	// componentDidMount(){

	// 	let box = this.refs.box ; //触发者
	// 	let moveBox = this.refs.moveBox ; //移动者

	// 	let speet = undefined ; //touchmove 拉伸

	// 	var y,y_

	// // start
	// 	let TS = (e)=>{
	// 		y_ = e.targetTouches[0].pageY;
	// 		y  = e.targetTouches[0].pageY;	
	// 		moveBox.style.transition = '';			
	// 	}
	// 	box.addEventListener('touchstart',TS,false)	

	// // move
	// 	let TM = (e)=>{
	// 		// evt.preventDefault()
	// 		y = e.targetTouches[0].pageY ;
	// 		// 图片阻止滑动 ;
	// 		if(e.target.className.indexOf('stp')==-1){
	// 			speet = y-y_ ;
	// 			let go = this.go_now+speet ;
	// 			//移动的动画
	// 			moveBox.style.transform = 'translate3d(0,'+go+'px,0)' ; 
	// 		}else{

	// 		}

	// 	}
	// 	box.addEventListener("touchmove",TM,false)

	// // end
	// 	let TE = (e)=>{
	// 		if(this.pd){
	// 			if(y-y_<=-150){
	// 				this.index+=1;
	// 				this.slide();
	// 				this.pd=false
	// 			}else if(y-y_>=150){
	// 				this.index-=1;
	// 				this.slide();
	// 				this.pd=false
	// 			}else{
	// 				//反弹的动画
	// 				moveBox.style.transform = 'translate3d(0,'+this.go_now+'px,0)' ; 
	// 			}
	// 		}
	// 	}
	// 	box.addEventListener('touchend',TE,false)

	// 	this.destroy = ()=>{
	// 		box.removeEventListener('touchstart',TS,false)	
	// 		box.removeEventListener('touchstart',TS,false)
	// 		box.removeEventListener("touchmove",TM,false)
	// 	}
	// }
	// componentWillUnmount(){
	// 	this.destroy()
	// }

	// componentWillReceiveProps(next){
	// 	// 通过路由 点击不同车型 展示
	// 	let name = next.location.state;
	// 	let obj = this.json[name]
	// 	this.setState({obj:obj})

		
	// }

	// slide(){
	// 	let moveBox = this.refs.moveBox ; //移动者
	// 	let height  = this.refs.box.offsetHeight;

	// 	moveBox.style.transition = 'all .5s';
	// 	if(this.index==-1){this.index=0}
	// 	if(this.index==5) {this.index=4}

	// 	this.go_now = -1*height*this.index ;// 真正移动距离

	// 	moveBox.style.transform = 'translate3d(0,'+this.go_now+'px,0)' ; //移动的动画
	// 	setTimeout(()=>{
	// 		this.pd = true ;
	// 	},500)


	// 	if(this.index==0){
	// 		this.refs.pcx_header.refs.ul.style.top='-1.02rem';
	// 	}else{
	// 		this.refs.pcx_header.refs.ul.style.top='0';
	// 	}

	// 	// 手指出现动画
	// 	if(this.index==3){
	// 		let img = this.refs.h4.refs.img3;
 //            setTimeout(function(){
 //            	img.style.display='block'
 //                img.className='hand_move'
 //                setTimeout(function(){
 //                   img.className=''
 //                   img.style.display='none'
 //                },1700)                            
                 
 //            },700) 			
	// 	}

	// }
	// move(x){
	// 	this.index = x
	// 	this.slide()
	// }