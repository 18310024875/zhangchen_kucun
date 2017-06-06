import React,{Component} from 'react' ;
import Canvas from '../public/canvas' ;

export default class BJ extends Component {
	constructor(props){
		super(props)
		this.state={
			obj:''
		}
		this.arr=[]
	}
	eachs(obj){
		let arr = []
		for(let each in obj){
			let div = (
				<div key={each} style={s.inDiv}>
					<img src={obj[each].imgurl} style={s.inImg}/>
					<div style={s.inP} className='sp'>
						<span style={s.span}><i style={s.i}></i></span>
						{each}
					</div>
				</div>)
			arr.push(div)
		}
		return arr
	}
	componentWillMount(){
		$ajax({
			url:"app/json/bj.json",
			success:(res)=>{
				let obj = JSON.parse(res);
				this.setState({obj:obj})
				this.ready()
				setTimeout(()=>{
					this.pdCanvas()
				},200)
			}
		})
	}
	// 在请求数据结束后调用
	ready(){
		let sps = document.querySelectorAll(".sp");
		for (var i=0;i<sps.length;i++) {
			var that = this;
			(function(x){
				sps[x].onclick=function(e){
					// 查找class 清空class
					if(document.querySelector('.span')||document.querySelector('.i')){
						document.querySelector('.span').style.border = '1px solid gray';
						document.querySelector('.i').style.display='none';
						document.querySelector('.span').className = '';
						document.querySelector('.i').className='';
					}
					let span = sps[x].children[0];
					let i = sps[x].children[0].children[0]
					span.style.border = '1px solid #F1C40F';
					i.style.display = 'block';
					// 赋值class
				 	  span.className = 'span';
					  i.className = 'i';
					// 建立数组 发送
					let obj = that.state.obj[this.innerText] ;
					that.obj = obj;
					let arr = [] ;
					for(let each in obj){
						arr.push(each)
					}
					arr.splice(0,1)
					that.arr = arr ;
					that.setState({})
					// 滑动
					setTimeout(()=>{
						let begin = this.offsetTop;
						let timer = setInterval(()=>{
							that.refs.div.scrollTop=begin;
							this.offsetTop>1500?begin+=10:begin+=20;
							begin>=that.refs.jtxh.offsetTop-80?clearInterval(timer):null
						},1)	
						// that.refs.div.scrollTop = 	that.refs.jtxh.offsetTop-80;				
					},200)
				}
			})(i)
		}
	}

	pdCanvas(){
		this.refs.div.scrollTop = 2 ;
		let that = this ;
		let b = this.refs.div ;
		let y ; let y_ ;
		let pd = true ;
		let direction = undefined ;
		function moveDown(e){
			if(pd){
				pd=false ;
				y = y_ = e.targetTouches[0].pageY
			}	
			y = e.targetTouches[0].pageY
			if(y-y_>0){
				that.refs.can.move(y-y_,'go','down')				
			}

		}
		function moveUp(e){
			if(pd){
				pd=false ;
				y = y_ = e.targetTouches[0].pageY
			}	
			y = e.targetTouches[0].pageY
			if(y-y_<0){
				that.refs.can.move(y-y_,'go','up')					
			}
		}

		console.log('ready')
		setTimeout(()=>{
			b.onscroll = function(){
				// console.log(this.scrollTop,this.scrollHeight-this.offsetHeight)
				if(this.scrollTop==0){
					direction = 'down' ;
					b.addEventListener('touchmove',moveDown)
				}else if(this.scrollTop>=this.scrollHeight-this.offsetHeight-1){
					direction = 'up' ;
					b.addEventListener('touchmove',moveUp)
				}else{
					direction = ''  // 必须设置 !  不然会回到顶部或者底部
				}
			}
			b.addEventListener('touchend',function(){
				if(direction=='down'){
					b.removeEventListener('touchmove',moveDown) ;
					b.removeEventListener('touchmove',moveUp) ;
					b.scrollTop = 2;					
				}
				if(direction=='up'){
					b.removeEventListener('touchmove',moveDown) ;
					b.removeEventListener('touchmove',moveUp) ;
					b.scrollTop = b.scrollHeight-b.offsetHeight-2;						
				}
				that.refs.can.move(undefined,'back',undefined) ;
				pd = true ;
			})

		},200)

	}

	render(){
	return(
		<div style={s.div} ref='div'>

			<Canvas ref='can'/>

			<p style={s.p}>报价资讯</p>
			<p style={s.p2}>请选择您要咨询的车型</p>
			{this.state.obj==''?null:this.eachs(this.state.obj)}
			<div style={s.div2}>
				<p style={s.p3} ref='jtxh'> 具体型号 </p>
				{this.arr.map((v,k)=>{
					if(k%2==0){ return (
						<div style={s.evenDiv} key={k}>
							<p style={s.p4}>{v}</p>
							<p style={s.p4}>{this.obj[v].name}</p>
							<p style={s.p4}>厂家建议零售价</p>
							<p style={s.p5}>{this.obj[v].price}</p>
						</div>)
					}else{ return (
						<div style={s.oddDiv} key={k}>
							<p style={s.p4}>{v}</p>
							<p style={s.p4}>{this.obj[v].name}</p>
							<p style={s.p4}>厂家建议零售价</p>
							<p style={s.p5}>{this.obj[v].price}</p>
						</div>)
					}
				})}
			</div>
		</div>)
	}
}
let s = {
	div:{width:'100%',height:'100%',overflow:'auto'},
	p:{height:'2.1rem',background:'white',lineHeight:'2.1rem',fontSize:'0.43rem',
	textAlign:'center',letterSpacing:'4px'},
	p2:{width:"85%",margin:'0rem auto',background:'#F1C40F',color:'white',textAlign:'center',
	fontSize:'0.28rem',height:'0.7rem',lineHeight:'0.7rem',letterSpacing:'1px'},
	inDiv:{width:'70%',margin:'0 auto',marginTop:'0.2rem',overflow:'hidden'},
	inImg:{width:"100%",float:'left'},
	inP:{width:'100%',fontSize:'0.29rem',textAlign:'center',float:'left'},
	span:{display:'inline-block',width:'0.28rem',height:'0.29rem',borderRadius:'50%',
		border:'1px solid gray',position:'relative',top:'0.06rem',left:'-0.06rem'},
	i:{display:'inline-block',width:'0.16rem',height:'0.16rem',background:'#F1C40F',borderRadius:'50%',
		position:'absolute',left:'0.04rem',top:'0.05rem',display:'none'},
	p3:{width:"100%",margin:'0rem auto',background:'#F1C40F',color:'white',textAlign:'center',
	fontSize:'0.28rem',height:'0.7rem',lineHeight:'0.7rem',letterSpacing:'1px',marginTop:'0.5rem'},
	div2:{width:'85%',margin:'0 auto',marginBottom:'0.7rem',overflow:'hidden'},
	evenDiv:{width:'2.6rem',float:'left',fontSize:'0.26rem',padding:'0.2rem 0.1rem 0.08rem 0.1rem',
		border:'1px solid #ccc',textAlign:'center',marginTop:'0.3rem'},
	oddDiv:{width:'2.6rem',float:'right',fontSize:'0.26rem',padding:'0.2rem 0.1rem 0.08rem 0.1rem',
		border:'1px solid #ccc',textAlign:'center',marginTop:'0.3rem'},
	p4:{height:'0.4rem',lineHeight:'0.4rem',color:'black'},
	p5:{height:'0.45rem',lineHeight:'0.45rem',color:'red'}
}
