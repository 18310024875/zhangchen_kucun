import React,{Component} from 'react' ;

class Canvas extends Component {
	constructor(props){
		super(props) ;
		this.pd = true ; // pd 的目的让函数执行的时候不被打扰 
		this.speet =undefined ;

		this.R = undefined ;
	}

	componentDidMount(){
		// 获取屏幕的大小
		let width = document.body.offsetWidth ;
		let height = document.body.offsetHeight ;
		// 声明canvas
		let c=document.getElementById("canvas") ;
		// 控制canvas的大小
		c.setAttribute('width',width + 'px') ;
		c.setAttribute('height',height+ 'px' ) ;		
	}

	move(x_,types,direction){
		// this.pd让函数执行的时候不被打扰
		if(this.pd){
			// 获取屏幕的大小
			let width = document.body.offsetWidth ;
			let height = document.body.offsetHeight ;
			// 声明canvas
			let c=document.getElementById("canvas") ;
			let ctx=c.getContext("2d");  // 初始化 canvas
			// that = this 
			let that = this ;

	   // 先判断是拖动还是返回
		  // 移动中 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			if(types=='go'){
				// 在判断方向是上还是下
				// down ;
				if(direction=='down'){  
				  // 定义鼠标移动大小
					this.speet = x_ ;  
					// 在此范围内显示
					if( this.speet>=width*0.23 ){ this.speet=width*0.23 }
					this.R= ((width*0.5*width*0.5)+ this.speet*this.speet )/(2*this.speet)
					// 清空
					ctx.clearRect(0,0,c.offsetWidth,c.offsetHeight)
					// 画圆
					ctx.beginPath();
					try{
						ctx.arc(width*0.5,this.speet-this.R,this.R,0,2*Math.PI);
					}catch(e){}
					ctx.fillStyle='rgba(74,74,74,0.3)'
					ctx.fill()  				
					
				}
				// up ;
				let ok ;
				if(direction=='up'){ 
				  // 定义鼠标移动大小
					this.speet = x_ ; 
					// 在此范围内显示
					if(this.speet <= -1*width*0.23){ this.speet = -1*width*0.23 }
				// this.speet用来判断方向 故用ok替换控制图像
					  ok = -1*this.speet ;  
					// 计算半径
					this.R= ((width*0.5*width*0.5)+ ok*ok )/(2*ok)
					// 清空
					ctx.clearRect(0,0,c.offsetWidth,c.offsetHeight)
					// 画圆
					ctx.beginPath();
					try{
						ctx.arc(width*0.5,height+(this.R-ok),this.R,0,2*Math.PI);
					}catch(e){}
					ctx.fillStyle='rgba(74,74,74,0.3)'
					ctx.fill() 
					
				}
			}
		  // 返回中 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			if(types=='back'){
				// down的返回
				if(this.speet>0){	
					function run_(){
						console.log('run')
						that.pd = false ;
						// 清空
						ctx.clearRect(0,0,c.offsetWidth,c.offsetHeight)	
						that.speet -=2 ;
					   	 if(that.speet<=0){ that.pd=true }
						 // 计算半径
						that.R= ((width*0.5*width*0.5)+ that.speet*that.speet )/(2*that.speet)
						 // 画圆
						try{
							ctx.beginPath();
							ctx.arc(width*0.5,that.speet-that.R,that.R,0,2*Math.PI);
							ctx.fillStyle='rgba(74,74,74,0.3)'
							ctx.fill()
							window.requestAnimationFrame(run_)	
						}catch(e){}

					}
					run_()		
				}
				// up的返回
				let ok ;
				if(this.speet<0){
					// 关键帧动画
					function run_(){
						console.log('run')
						that.pd = false ;
						// 清空
						ctx.clearRect(0,0,c.offsetWidth,c.offsetHeight)	
						that.speet +=2 ;
						if(that.speet>=0){ that.pd=true }
					// this.speet用来判断方向 故用ok替换控制图像
						ok = -1*that.speet ;
						// 计算半径
						that.R= ((width*0.5*width*0.5)+ ok*ok )/(2*ok)
						// 画圆
						try{
							ctx.beginPath();
							ctx.arc(width*0.5,height+(that.R-ok),that.R,0,2*Math.PI);
							ctx.fillStyle='rgba(74,74,74,0.3)'
							ctx.fill()
							window.requestAnimationFrame(run_)	
						}catch(e){}

					}
					run_()	
				}
			}

		}  // this.pd 判断结束

	} // move 函数结束

	render(){
		return (
				<canvas id='canvas' style={s.canvas} ref='box' >
					111
				</canvas>
			)
	}
}

export default Canvas ;

let s={
	canvas:{
		position:'fixed',left:'0',top:'0',
		zIndex:'999',
		background:'transparent',
		display:'block',
		margin:'0 auto',
		pointerEvents:'none' }
}
