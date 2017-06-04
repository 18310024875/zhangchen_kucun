import React,{Component} from 'react'

let s = {
	slider:{
		width:"100%",height:"2.5rem",background:"white",position:'relative',
		position:'absolute',
		top:'62%'
	},
	sliderbox:{
		height:'2.5rem',
		background:'white',
		display:'flex',
		position:'absolute'
	},
	imgbox:{
		flex:'0 0 4rem',
		height:'2.5rem',
		background:"white",
		float:'left',
		display:'flex',
		justifyContent:'center',
		alignItems:'center'
	},
	img:{
		width:'2.5rem',
		transition:'all 0.5s'
	}
}	

let Slider = class x extends Component {
	constructor(props){
		super(props)
		this.state={
			arr:['s1.png','s0.png','s2.png','s3.png','s4.png','s5.png']
		} ;
		this.destroy = undefined ;
	}


	componentDidMount(){
		
		var pd = true;
		var x,x_
		let b = this.refs.b	
		let width = b.children[0].offsetWidth
		b.style.transition="all 0.5s"
		let index = 1
		let imgs = document.querySelectorAll('.slider_move_img')
		imgs[index].style.transform = 'scale(1.5)'
		b.style.left=-width/3*2-1*index*width+'px'
		let index_max = b.children.length

	// 判断左右滑动
		// start
		let TS = (e)=>{
			x_ = e.targetTouches[0].pageX;
			x = e.targetTouches[0].pageX;
		}
		b.addEventListener('touchstart',TS,false)

		// move
		let TM = (e)=>{
			e.preventDefault()
			x = e.targetTouches[0].pageX
			if(pd){
				if(x-x_<=-40){
					index+=1
					move();
					pd=false
				}
				if(x-x_>=40){
					index-=1
					move();
					pd=false
				}
			}		
		}
		b.addEventListener("touchmove",TM,false)	

		// touchend
		let TN = ()=>{
			pd = true ;
		}
		b.addEventListener('touchend',TN,false)
		
	    //控制移动的函数
		function move (){
			if(index==-1){index=index_max-3}
			if(index==index_max-2){index=0}
			b.style.left =  -width/3*2-1*index*width+'px';
			for(let i=0;i<imgs.length;i++){
				imgs[i].style.transform = 'scale(1)'
			}
			imgs[index].style.transform = 'scale(1.5)'
		}
		this.destroy=()=>{
			b.removeEventListener('touchstart',TS,false)
			b.removeEventListener('touchmove',TM,false)
			b.removeEventListener('touchend',TN,false)
		}
	}

	componentWillUnmount(){
		this.destroy()
	}

	render(){
		return(<div  style={s.slider}>
				<div  style={s.sliderbox} ref='b'>
					<div style={s.imgbox}></div>

					{this.state.arr.map((v,k)=>{
						return (<div key={k} style={s.imgbox} ref='div' id='div'>
									<img style={s.img} src={'./app/images/'+v} className='slider_move_img stp'/>
								</div>)
					})}

					<div style={s.imgbox}></div>
				</div>
			  </div>)
	}
}

export default Slider