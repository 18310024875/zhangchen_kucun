import React,{Component} from 'react' ;

import {connect} from 'react-redux' ;
import {mapStateToProps,mapDispatchToProps} from '../../store.js';

class Time extends Component {
	constructor(props){
		super(props)
		this.state={
		}
		this.ns=[]
		this.ys=[]
		this.rs=[]
		// 为了年月日之间的通讯!!!!!!!
		this.n_index=0 ;
		this.y_index=0 ;
		this.r_index=0 ;
		//为了判断点击的是不是今年
		this.thisYear=true ;

		// 为了最后 得到时间 
		this.yyTime={
			nian:'',
			yue:'',
			ri:''
		}
}
	componentDidMount(){
		this.refs.father.addEventListener('touchmove',(e)=>{
			e.preventDefault()
		})


		console.log(this.props)
		// 得到月份对应max_day函数
		let get_max_day=(y)=>{
			let max_day=''
			if(y==1||y==3||y==5||y==7||y==8||y==10||y==12){
				max_day = 31
			}else if(y==4||y==6||y==9||y==11){
				max_day = 30
			}else{
				if(n%4==0&&n%100!=0||n%400==0){
					max_day = 29
				}else{ max_day = 28 }			
			}
			return max_day
		} //函数结束

	// 初始化 日历
		let startTime=new Date();
		let n=startTime.getFullYear();
		let y=startTime.getMonth()+1;
		let r=startTime.getDate()+1;
		// let stratTimeText=startF+"-"+startM+"-"+startD;
		// let endTimeText=(startF+1)+"-"+startM+"-"+startD;
		let max_day=get_max_day(y)

		let ns = [n,n+1]  // 年数组
			console.log(ns) ;this.ns=ns ;
		let ys = []       // 月数组
		for(let i=1;i<=12;i++){
			if(i>=y){ ys.push(i) }
		}
			console.log(ys) ;this.ys=ys ;
		let rs = []       // 日数组
		for(let i=0;i<=max_day;i++){
			if(i>=r){ rs.push(i) }
		}
			console.log(rs) ;this.rs=rs ;

	//  初始化赋值yyTime
		this.yyTime={
			nian:n,
			yue:y,
			ri:r
		}

	// 滑动事件
		// 年年年年年年年年年年年年年年年年年年年年年年年年年年年年年年年年年年年
		let nian=()=>{
			// 触发者 和 移动者
			let box = this.refs.ul_n ;
			let move = this.refs.li_n ;

			var pd = true;
			var yz,yz_

			box.addEventListener('touchstart',(e)=>{
				// alert('touch')
				 var evt = e||window.event
				 yz_ = evt.targetTouches[0].pageY;
				 yz  = evt.targetTouches[0].pageY;		 
				box.addEventListener("touchmove",(e)=>{
					var evt = e||window.event ;
					// evt.preventDefault()
					 yz = evt.targetTouches[0].pageY
					if(pd){
						if(yz-yz_<=-20){
							this.n_index+=1;
							fun();  yz_=evt.targetTouches[0].pageY;
						}
						if(yz-yz_>=20){
							this.n_index-=1;
							fun();  yz_=evt.targetTouches[0].pageY;
						}
					}
				})
			},false)
			box.addEventListener('touchend',()=>{
				pd=true;
			// 选择今年
				if(this.n_index==0){

					// 定义今年 为后面判断做基础
					this.thisYear=true ;

				 // 月份还原 月份等于今月( 不赋值会对后面的计算影响 )
				 // 日期还原 日期等于今天( 不赋值会对后面的计算影响 )
					 y = startTime.getMonth()+1 ; 
					 r = startTime.getDate()+1 ;

				// 月份数组还原	( 点击今年 略去之前的月份 !!!!)				
					this.ys=ys ;    // ys已经在外面定义
					// 月份归位
					this.refs.li_y.style.marginTop = '0' ;
					this.y_index=0 ;

				// 日期数组还原
					this.rs = rs ; 
					// 日期归位
					this.refs.li_r.style.marginTop = '0' ;
					this.r_index=0 ;

				}else{ 
			// 选择 其他年

					// 定义其他年 为后面判断做基础
					this.thisYear=false ;

				// 月份重构 月份等于1 ( 不赋值会对后面的计算影响 )
				// 日期重构 日期等于1 ( 不赋值会对后面的计算影响 )
					 y=1 ;
					 r=1 ;	

				// 月份数组重构
					this.ys=[1,2,3,4,5,6,7,8,9,10,11,12] ;
					// 月份归位
					this.refs.li_y.style.marginTop = '0' ;
					this.y_index=0 ;

				// 日期数组重构
					let rs=[]
					let max_day= get_max_day(y) ;
					for(let i=1;i<=max_day;i++){
						rs.push(i)
					}
					this.rs = rs ;
					// 日期归位
					this.refs.li_r.style.marginTop = '0' ;
					this.r_index=0 ;
				}

				// 赋值yyTime
				this.yyTime={
					nian:n+this.n_index,
					yue:y,
					ri:r
				}

				// 最后setState
				this.setState({})

				console.log(this.n_index+n+'年',this.yyTime)
			})
			let	fun =()=>{
				//index范围在0到this.ns.length-1
				if(this.n_index==-1){this.n_index=0} ;
				if(this.n_index==this.ns.length){this.n_index=this.ns.length-1} ;
				move.style.marginTop = -1*this.n_index+'rem' ;
			}							
		}
		nian()

		// 月月月月月月月月月月月月月月月月月月月月月月月月月月月月月月月月月月月月月月
		let yue = ()=>{
			// 触发者 和 移动者
			let box = this.refs.ul_y ;
			let move = this.refs.li_y ;
			
			var pd = true;
			var yz,yz_

			box.addEventListener('touchstart',(e)=>{
				// alert('touch')
				 var evt = e||window.event
				 yz_ = evt.targetTouches[0].pageY;
				 yz  = evt.targetTouches[0].pageY;		 
				box.addEventListener("touchmove",(e)=>{
					// e.preventDefault()
					 var evt = e||window.event
					 yz = evt.targetTouches[0].pageY
					if(pd){
						if(yz-yz_<=-40){
							this.y_index+=1;
							fun();  yz_=evt.targetTouches[0].pageY;
						}
						if(yz-yz_>=40){
							this.y_index-=1;
							fun();  yz_=evt.targetTouches[0].pageY;
						}
					}
				})
			},false)
			box.addEventListener('touchend',()=>{
				pd=true;			
				
			// 首先判断点的是不是今年
				if(this.thisYear){
				//说明在今年发生

				//判断点的是不是这个月
				    if(this.y_index==0){ 
				    // 说明点击的是这个月 需要略去之前的日期

					// 日期还原 日期等于今天( 不赋值会对后面的计算影响 )
						 r = startTime.getDate()+1 ;

					// 日期数组还原 
				    	this.rs = rs ; 
				    	// 日期归位
						this.refs.li_r.style.marginTop = '0' ; 
						this.r_index=0 ;

				    }else{
				    // 点击的不是这个月

					// 日期重构 日期等于1 ( 不赋值会对后面的计算影响 )
						 r = 1 ;

					// 日期数组重构
						let rs = [] ;
				    	let y = this.y_index+y   //不是一个y
						let max_day = get_max_day(y)
						for(let i=1;i<max_day;i++){
							rs.push(i)
						}
						this.rs = rs;
						// 日期归位
						this.refs.li_r.style.marginTop = '0' ;
						this.r_index=0 ;	
				    }

				}else{
				// 说明在其他年发生

				  // 日期重构 日期等于1 ( 不赋值会对后面的计算影响 )
					 r = 1 ;

				  // 日期数组重构
					let rs = [] ;
					let y = this.y_index+y   //不是一个y
					let max_day = get_max_day(y)
					for(let i=1;i<max_day;i++){
						rs.push(i)
					}
					this.rs = rs;
					// 日期归位
					this.refs.li_r.style.marginTop = '0' ;
					this.r_index=0 ;					
				}

				// 赋值yyTime
				this.yyTime={
					nian:n+this.n_index,
					yue:y+this.y_index,
					ri:r
				}

				// 最后setState
				this.setState({})

				console.log(this.y_index+y +'月',this.yyTime)	
			})
			let	fun =()=>{
				//index范围在0到this.ns.length-1
				if(this.y_index==-1){this.y_index=0} ;
				if(this.y_index==this.ys.length){this.y_index=this.ys.length-1} ;
				move.style.marginTop = -1*this.y_index+'rem' ;
			}							
		}
		yue()

		// 日日日日日日日日日日日日日日日日日日日日日日日日日日日日日日日日日日日日日日日日
		let ri = ()=>{
			// 触发者 和 移动者
			let box = this.refs.ul_r ;
			let move = this.refs.li_r ;
			
			var pd = true;
			var yz,yz_

			box.addEventListener('touchstart',(e)=>{
				// alert('touch')
				 var evt = e||window.event
				 yz_ = evt.targetTouches[0].pageY;
				 yz  = evt.targetTouches[0].pageY;		 
				box.addEventListener("touchmove",(e)=>{
					// e.preventDefault()
					 var evt = e||window.event
					 yz = evt.targetTouches[0].pageY
					if(pd){
						if(yz-yz_<=-40){
							this.r_index+=1;
							fun();  yz_=evt.targetTouches[0].pageY;
						}
						if(yz-yz_>=40){
							this.r_index-=1;
							fun();  yz_=evt.targetTouches[0].pageY;
						}
					}

				})
			},false)
			box.addEventListener('touchend',()=>{
				pd=true;
				// 赋值yyTime
				this.yyTime={
					nian:n+this.n_index,
					yue:y+this.y_index,
					ri:r+this.r_index
				}
				console.log(r+this.r_index+'ri',this.yyTime)
			})
			let	fun =()=>{
				//index范围在0到this.ns.length-1
				if(this.r_index==-1){this.r_index=0}
				if(this.r_index==this.rs.length){this.r_index=this.rs.length-1}
				move.style.marginTop = -1*this.r_index+'rem'
			}							
		}
		ri()
	
	}
	// 确定
	qd(){
		let str = this.yyTime.nian+'-'+this.yyTime.yue+'-'+this.yyTime.ri ;
		this.props.changeTime('none',str,'black')
	}
	// 取消
	qx(){
		this.props.changeTime('none',undefined,'gray')
	}
	render(){

		return(
			<div id='time' style={{width:'100%',height:'100%',position:'absolute',top:'0',left:'0',
				background:'rgba(52,52,52,0.5)',display:this.props.time.style}} ref='father'>
				<div style={s.box}>
					<span style={s.qx} onClick={this.qx.bind(this)}>取消</span>
					<span style={s.qd} onClick={this.qd.bind(this)}>确定</span>

					<div style={s.r_box} className='r_box'>
					{/* 年 */}
						<ul ref='ul_n'>
							<li style={s.tr}  ref='li_n'></li>
							{
								this.ns.map((v,k)=>{
									return <li key={k}> {v} </li>
								})
							}
							<li></li>
						</ul>

						<ul><li/><li>年</li><li/></ul>

					{/* 月 */}
						<ul ref='ul_y'>
							<li style={s.tr}  ref='li_y'></li>
							{
								this.ys.map((v,k)=>{
									return <li key={k}> {v} </li>
								})
							}
							<li></li>
						</ul>

						<ul><li/><li>月</li><li/></ul>
					{/* 日 */}
						<ul ref='ul_r'>
							<li  style={s.tr} ref='li_r'></li>
							{
								this.rs.map((v,k)=>{
									return <li key={k}> {v} </li>
								})
							}
							<li></li>
						</ul>

						<ul><li/><li>日</li><li/></ul>

					</div>

					<div className='time_linear_gradient'>
						<div></div>
						<div></div>
					</div>

				</div>

			</div>)
	}
}

let C_Time = connect(mapStateToProps,mapDispatchToProps)(Time)
export default C_Time ;

let s = {
	box:{
		width:'100%',background:'white',height:'4.2rem',position:'absolute',bottom:'0',fontSize:'0.28rem'
	},
	qx:{position:'absolute',left:'0.1rem',top:'0.1rem',padding:'0.05rem 0.1rem',borderRadius:'5px' ,color:'black'},
	qd:{position:'absolute',right:'0.1rem',top:'0.1rem',padding:'0.05rem 0.1rem',borderRadius:'5px',color:'black'},

	r_box:{width:'80%',marginLeft:'10.6%',height:'3rem',position:'relative',top:'0.7rem'},
	tr:{transition:'all 0.4s'}
}
