// react 高阶组件 上下滑动的处理;
// 和 redux 相关联

import React,{Component} from 'react' ;

let fun = (Com,max) => class Swipe extends Component{
	constructor(props){
		super(props)

		this.swipe_moveTo=undefined ; // 外部控制移动函数
		this.destroy = undefined ;    // 移除函数
	}
	componentDidMount(){

		let box = this.refs.box ; //触发者
		let moveBox = this.refs.moveBox ; //移动者

		let speet = undefined ; //touchmove 拉伸
		let go_now = 0 ; // 应该拉伸距离

		let index = 0 ;
		var pd = true;
		var y,y_

		let height = box.offsetHeight;

	// start
		let TS = (e)=>{
			moveBox.style.transition = '';	
			y_ = e.targetTouches[0].pageY;
			y  = e.targetTouches[0].pageY;				
		}
		box.addEventListener('touchstart',TS,false)	

	// move
		let TM = (e)=>{
			// evt.preventDefault()
			y = e.targetTouches[0].pageY ;
			// 图片阻止滑动 ;
			if(e.target.className.indexOf('stp')==-1){
				speet = y-y_ ;
				let go = go_now+speet ;
				//移动的动画
				moveBox.style.transform = 'translate3d(0,'+go+'px,0)' ; 
			}else{

			}
		}
		box.addEventListener("touchmove",TM,false)

	// end
		let TE = (e)=>{
			moveBox.style.transition = 'all .5s';
			if(pd){
				if(y-y_<=-150){
					index+=1;
					if(index==max){index=max-1}
					// 向 redux 发送数据
					this.props.set_p_index(index)
					pd=false
				}else if(y-y_>=150){
					index-=1;
					if(index==-1){index=0}
					// 向 redux 发送数据
					this.props.set_p_index(index)
					pd=false
				}else{
					//反弹的动画
					moveBox.style.transform = 'translate3d(0,'+go_now+'px,0)' ;
				}

			}
		}
		box.addEventListener('touchend',TE,false)

		// 外部控制移动函数
		this.swipe_moveTo=(i)=>{
			
			index = i ;
			go_now = -1*height*index ;
			moveBox.style.transform = 'translate3d(0,'+go_now+'px,0)' ; //移动的动画
			setTimeout(()=>{
				pd = true ;
			},500)			
		}
		// 移除
		this.destroy = ()=>{
			box.removeEventListener('touchstart',TS,false)	
			box.removeEventListener('touchstart',TS,false)
			box.removeEventListener("touchmove",TM,false)
		}
	}

	componentWillUnmount(){
		this.destroy() ;
	}

	componentWillReceiveProps(next){
		console.log('______________',next)
		let ind = next.p_index.num ;
		console.log(ind)
		this.swipe_moveTo(ind)
	}

	render(){
		return (
			<div ref='box' style={{width:'100%',height:'100%',overflow:'hidden'}}>
				<div ref="moveBox" id="moveBox" style={{width:'100%',height:100*max+'%'}}>

					<Com {...this.props} swipe_moveTo={this.swipe_moveTo}></Com>

				</div>
			</div>)
	}
}

export default fun ;


