import React,{Component} from 'react';

let s = {
	banner:{width:'100%',height:'100%',height:'3.4rem'},
	imgbox:{width:'100%',height:'100%',transition:'0.5s all',left:'0'},
	img:{width:"25%",height:"100%"},
	spanbox:{overflow:'hidden',position:"absolute",bottom:'8%',left:'50%',transform:'translate(-50%,0)'},
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
	}
	componentDidMount(){
		// 获取屏幕的宽度
		var width = this.refs.imgbox.offsetWidth ;
		this.width = width ;

		// 获取span
		let sps=this.refs.spanbox.children ;
		sps[0].style.background='transparent' ;

		this.refs.div.style.width = width+'px'
		this.refs.div.style.position = 'relative'
		this.refs.div.style.overflow= 'hidden'
		
		var imgs = this.refs.imgbox.children

		for(let i=0;i<imgs.length;i++){
			imgs[i].style.width=width+'px';
			imgs[i].style.float='left'
		}
		this.refs.imgbox.style.position = 'absolute'
		this.refs.imgbox.style.width = width*imgs.length+'px'		

		this.timer = setInterval(()=>{
			this.i+=1;
			if(this.i==imgs.length){this.i=0}
			this.refs.imgbox.style.left= -1*this.width*this.i+'px' ;
			color_span()
		},3000)


		// 左右滑动
		var pd = true;
		var x,x_
		let b = this.refs.div

		// 判断左右滑动
		b.addEventListener('touchstart',(e)=>{
			// e.preventDefault()
			clearInterval(this.timer)

			 var evt = e||window.event
			 x_ = evt.targetTouches[0].pageX;
			 x = evt.targetTouches[0].pageX;
			b.addEventListener("touchmove",(e)=>{
				var evt = e||window.event
				evt.preventDefault()
				 x = evt.targetTouches[0].pageX
				if(pd){
					if(x-x_<=-40){
						this.i+=1 ;
						move();pd=false
					}
					if(x-x_>=40){
						this.i-=1 ;
						move();pd=false
					}
				}
			})
		},false)	
		b.addEventListener('touchend',()=>{
			pd=true;
			clearInterval(this.timer)
			this.timer=setInterval(()=>{
				this.i+=1;
				if(this.i==imgs.length){this.i=0}
				this.refs.imgbox.style.left= -1*this.width*this.i+'px'
				color_span()
			},3000)
		})// 判断滑动结束
		
	    //控制移动的函数
		let move =()=>{
			if(this.i==imgs.length){this.i=0}
			if(this.i==-1){this.i=imgs.length-1}
			this.refs.imgbox.style.left= -1*this.width*this.i+'px';
			color_span()
		}

		let color_span=()=>{
			for(let i=0;i<sps.length;i++){
				sps[i].style.background='white' ;
				sps[this.i].style.background="transparent"
			}
		}

	}

	componentWillUnmount(){
		clearInterval(this.timer)
	}
	render(){
		return (
			<div ref='div' style={s.banner} >
				<div  style={s.imgbox} ref='imgbox'>
					<div style={{background:' #1BBC9B',height:'100%'}}>
						<p className="text">
							<span className='text_sp'>企业使命</span>
							让更多客户体验拥有汽车的喜悦<br/>
							为推动汽车社会的发展<br/>
							贡献力量。
						</p>
					</div>
					<div style={{background: '#3598DB',height:'100%'}}>
						<p className="text" style={{paddingTop:'0.6rem'}}>
							<span className='text_sp'>企业精神</span>
								尊重、挑战、速度、诚信
						</p>
					</div>
					<div style={{background: '#F1C40F',height:'100%'}}>
						<p className="text" style={{color: "#fff"}}>
							<span className='text_sp'>企业行动指南</span>
							See The Dealers&nbsp;&nbsp;&nbsp;&nbsp;(倾听)<br/>
							Plan Ahead&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(预案)<br/>
							Keep Learning&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(学习)
						</p>
					</div>					
				</div>
				<div style={s.spanbox} ref='spanbox'>
					<span style={s.span}/> <span style={s.span}/> <span style={s.span}/>			
				</div>
			</div>)
	}
}

export default Banner