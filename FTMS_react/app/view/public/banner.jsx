import React,{Component} from 'react';

let s = {
	banner:{width:'100%',height:'100%'},
	imgbox:{width:'100%',height:'100%',transition:'0.5s all',left:'0'},
	img:{width:"25%",height:"100%"},
	spanbox:{overflow:'hidden',position:"absolute",bottom:'6%',left:'50%',transform:'translate(-50%,0)'},
	span:{
		display:'block',float:'left',borderRadius:'50%',width:'0.18rem',height:'0.18rem',
		background:'white',margin:'0 0.07rem',border:'1px solid white'
	}
}

class Banner extends Component {
	constructor(props){
		super(props)
		this.timer = null ;
		this.width = '' ;
		this.i = 0 ;

		this.destroy=undefined ; //用来移除的函数
	}
	componentDidMount(){

		// 获取屏幕的宽度
		var width = document.body.offsetWidth ;
		this.width = width ;

		// 滑动参照
		let pd = true ;			// 每次滑动只触发一次
		let x,x_ ;				// 滑动距离
		let speet = undefined ; // 滑动粘稠距离
		let go_now = 0; 		// 应该滑动距离 

		// 获取span
		let sps=this.refs.spanbox.children ;
		sps[0].style.background='transparent' ;

		// 触发体
		let b = this.refs.div ;
		// 移动体
		let imgbox = this.refs.imgbox ;
		// 移动体中的图片
		let imgs = this.refs.imgbox.children ;

		// 触发体样式
		b.style.width = width+'px'
		b.style.position = 'relative'
		b.style.overflow= 'hidden'
		// 移动体样式(内部图片)
		for(let i=0;i<imgs.length;i++){
			imgs[i].style.width=width+'px'
		}
		// 移动体样式(本身)
		imgbox.style.position = 'absolute'
		imgbox.style.width = width*imgs.length+'px'		

		// 默认开启自动轮播
		this.timer = setInterval(()=>{
			this.i+=1;
			if(this.i==imgs.length){this.i=0}
			go_now = -1*this.width*this.i ;
			imgbox.style.transform = 'translate3d('+go_now+'px,0,0)' ;
			color_span()
		},3000)

	// 判断左右滑动

	  // start
		let tStart = (e)=>{

			e.preventDefault()

			clearInterval(this.timer)
			imgbox.style.transition="" ;

			x_ = e.targetTouches[0].pageX ;
			x  = e.targetTouches[0].pageX ;
		}
		b.addEventListener('touchstart',tStart,false)

	  // move
	  	let tMove = (e)=>{

			// e.stopPropagation()
			x = e.targetTouches[0].pageX

			speet = x-x_ ;
			let go = go_now+speet ;

			imgbox.style.transform = 'translate3d('+go+'px,0,0)' ;	  		
	  	}
		b.addEventListener("touchmove",tMove,false)

	  // end
	  	let tEnd = ()=>{
			if(pd){
				if(x-x_<=-120){
					this.i+=1 ;
					imgbox.style.transition="all .5s ease";
					move();
					pd=false
				}else if(x-x_>=120){
					this.i-=1 ;
					imgbox.style.transition="all .5s ease";
					move();
					pd=false
				}else{
					imgbox.style.transition="all .4s ease";
					imgbox.style.transform = 'translate3d('+go_now+'px,0,0)' ;
				}
			}

			clearInterval(this.timer)
			this.timer=setInterval(()=>{
				this.i+=1;
				if(this.i==imgs.length){this.i=0}
				go_now = -1*this.width*this.i ;
				imgbox.style.transform = 'translate3d('+go_now+'px,0,0)' ;
				color_span()
			},3000)
	  	}
		b.addEventListener('touchend',tEnd,false)// 判断滑动结束


		
	    //控制移动的函数
		let move =()=>{
			if(this.i==imgs.length){this.i=0}
			if(this.i==-1){this.i=imgs.length-1}
			go_now = -1*this.width*this.i ;
			imgbox.style.transform = 'translate3d('+go_now+'px,0,0)' ;
			setTimeout(()=>{
				pd = true ;
			},500)
			color_span()
		}

		// 变色按钮
		let color_span=()=>{
			for(let i=0;i<sps.length;i++){
				sps[i].style.background='white' ;
				sps[this.i].style.background="transparent"
			}
		}

		// 移除函数
		this.destroy = ()=>{
			b.removeEventListener('touchstart',tStart,false)
			b.removeEventListener('touchmove',tMove,false)
			b.removeEventListener('touchend',tEnd,false)
		}
	}



	// // 暴露接口 停止计时器
	// stop_ban(){
	// 	// alert('stop')
	// 	clearInterval(this.timer) ;
	// }
	// // 暴露接口 重新开始计时器
	// begin_ban(){
	// 	// alert('begin')
	// 	clearInterval(this.timer) ;
		
	// 	this.timer = setInterval(()=>{
	// 		this.i+=1;
	// 		if(this.i==this.refs.imgbox.children.length){this.i=0}
	// 		this.refs.imgbox.style.left= -1*this.width*this.i+'px'
	// 	console.log(666)
	// 	},3000)
		
	// }

	componentWillUnmount(){
		clearInterval(this.timer)
		this.destroy()
	}
	render(){
		return (
			<div ref='div' style={s.banner} >
				<div  style={s.imgbox} ref='imgbox'>
					{this.props.arr.map((v,k)=>{
						return <img className={this.props.class_} style={s.img} key={k} src={v}/>
					})}
				</div>
				<div style={s.spanbox} ref='spanbox'>
					{this.props.arr.map((v,k)=>{
						return <span style={s.span} key={k}/>
					})}					
				</div>
			</div>)
	}
}

export default Banner ;