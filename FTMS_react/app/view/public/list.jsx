import React,{Component} from 'react';
import {Link,hashHistory} from 'react-router';
import {Provider,connect} from 'react-redux';
import {mapStateToProps,mapDispatchToProps} from '../../store.js';

class List extends Component {
	constructor(props){
		super(props)
		this.state={
			list:{
				' 首页':{
					link:'/home',
					arr:[]
				},
				' 品牌车型':{
					link:'/pcx',
					arr:['CROWN 皇冠','全新VIOS 威驰','COROLLA EX 花冠','新COROLLA 卡罗拉','PRADO 普拉多','86']
				},
				' 购车支持':{
					link:'/gou',
					arr:['报价咨询','购车计算器','电商中心']
				},
				' 用车服务':{
					link:'/yong',
					arr:['保养维修','金融保养','紧急救援']
				},
				' 新闻中心':{
					link:'/news',
					arr:['皇冠','威驰','花冠','卡罗拉','普拉多']
				},
				' 品牌中心':{
					link:'/ppzx',
					arr:['企业概况','企业风采','组织构架']
				},
				' 促销活动':{
					link:'/active',
					arr:[]
				},
				' 预约试驾':{
					link:'/yyshijia',
					arr:[]
				},
				' 经销商查询':{
					link:'/search',
					arr:[]
				}
			},		
		}
		// 用来初始化 父菜单
		this.top_ul1 = '-95%';
		// 声明一个变量 用于只显示一个li1
		this.old_target=undefined;
	}
	componentDidMount(){//console.log(this.props)
		// !!!!!!!!!!!!!!!! react自己绑定的对 冒泡有问题!!!!
		let sps = document.querySelectorAll('.ul2 li')
		for(let i=0;i<sps.length;i++){
			sps[i].onclick=()=>{
				this.back();
				let x = sps[i].innerText;
				let path = sps[i].getAttribute('data-to');
				
				this.props.set_p_index(0)

				hashHistory.push({
					pathname:path,
					state:x
				})
			}
		}
	}
	componentWillReceiveProps(next){
		// 控制 父菜单显示隐藏
		if(next.list=='open'){
			this.refs.cover.className='cover open_cover'
			this.refs.ul1.className='ul1 open_ul'
		}else{
			this.refs.cover.className='cover close_cover'
			this.refs.ul1.className='ul1 close_ul'
			this.back()
		}
	}
	// 22222 控制子菜单
	show(e){
		// 先判断点的是不是自己
			// 进入说明点的不是自己
		if(this.old_target!=e.target){
			//判断是不是第一次进入			
			if(this.old_target!=undefined){ 
				this.old_target.setAttribute('data-pd','open');			
				let img = this.old_target.nextElementSibling;
				img.style.transform = 'rotate(0deg)';
				let s = this.old_target.nextElementSibling.nextElementSibling
					$slideUp(s)				
			}
			// 最后赋值 改变this.old_target;
			this.old_target=e.target;
		}
		// 不管点击的是不是自己都要 执行的函数
		let s = e.target.nextElementSibling.nextElementSibling ;
		let t = e.target;
		let img = t.nextElementSibling;
		if(t.getAttribute('data-pd')=='open'){ //此时打开的
			t.setAttribute('data-pd','close');
			img.style.transform = 'rotate(45deg)';
				$slideDown(s)	
			
		}else{ //此时关闭的
			t.setAttribute('data-pd','open');
			img.style.transform = 'rotate(0deg)';
				$slideUp(s)
		}
	}
	// 点击子菜单的时候 所有回退
	back(){
		// redux的控制 父菜单隐藏回去
		this.props.changeList('close');

		if(this.old_target!=undefined){ // 说明 子菜单被点开了
			this.old_target.setAttribute('data-pd','open');	
			let img = this.old_target.nextElementSibling;
			img.style.transform = 'rotate(0deg)';
			let s = this.old_target.nextElementSibling.nextElementSibling ;
				$slideUp(s)
		}		
	}
	render(){
		let arr1 = [],arr2=[]
		for(let each in this.state.list){
			arr1.push(each);
			arr2.push(this.state.list[each]);
		}

		return (
	<div id='list'>
		{/*this.top_ul1 是redux提供的 控制显隐 自动刷新*/}
		<ul className='ul1' ref='ul1' >
			<div style={{width:'100%',height:'0.3rem',background:'white',opacity:'0'}}></div>
			{
				arr1.map((v,k)=>{
				if(arr2[k].arr.length>0){
					return (
						<li key={k} className='li1'>
							{/*点击span触发show函数 ul2的显示隐藏*/}
							<span className="li_img_rot" data-pd='open' 
								onClick={this.show.bind(this)}>
								&nbsp;&nbsp;{v}
							</span>

							<img src='../../app/images/2.png' className='img_rot'/>
							{/*模仿的slideDown*/}
							<div className='slideBox' style={{top:'-2px'}}>
								<ul className='ul2'>
									{arr2[k].arr.map((v2,k2)=>{
										{/*componentDidMount绑定的跳转 回退*/}	
									return (
										<li key={ k2} data-to={arr2[k].link}>
											{v2}
										</li>)
									})}
								</ul>									
							</div>
						</li>)
				}else{
					return (
						<li key={k} className='li1'>
							{/*回退函数*/}
							<Link to={arr2[k].link} onClick={this.back.bind(this)}>
								&nbsp;&nbsp;{v}
							</Link>
							<img src='../../app/images/1.png' style={{
								height:'0.26rem',right:'0.46rem'
							}}/>
						</li>)
				}
			})}
		</ul>

		<div className='cover'
		 ref='cover'></div>

	</div>)

	}
}

let C_List = connect(mapStateToProps,mapDispatchToProps)(List)
export default C_List
