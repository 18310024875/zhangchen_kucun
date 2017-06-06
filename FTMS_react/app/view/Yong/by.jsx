import React,{Component} from 'react' ;
import Time from '../public/time' ;
import Success from '../public/success' ;

import {connect} from 'react-redux' ;
import {mapStateToProps,mapDispatchToProps} from '../../store.js';

class BY extends Component {
	constructor(props){
		super(props)
		this.state={
			ssxm:'请输入您的姓名',
			sjh:'请输入11位手机号码',
			province:[],
			city:[]
		} 
		this.sel5_disabled = true;
		this.sel6_disabled = true;

		this.types={
			fuwu:false,
			name:false,
			tel:false,
			car:false,
			province:false,
			city:false,
			jxs:false,
			time:false
		}

		this.success={
			display:'none',
			arr:['0000','00','00']
		}
	}
	componentWillMount(){
		console.log(this.props)
		$ajax({
			url:'../../app/json/province.json',
			success:(res)=>{
				let obj = JSON.parse(res) ;
				let arr=[] ;
				for(let each in obj){
					let o={ ind:each , p:obj[each] }
					arr.push(o)
				}
				this.setState({province:arr})
			}
		})
		$ajax({
			url:'../../app/json/city.json',
			success:(res)=>{
				this.obj = JSON.parse(res) ;

			}
		})
	}
	componentDidMount(){
	  // 其他的select事件在这里绑定
	    let that = this ;
		// 需要的服务
		this.refs.sel2.onchange=function(){ //this指向自己了
			this.style.color='black' ;
			that.types.fuwu = true ;
		}
		// 选择车型
		this.refs.sel3.onchange=function(){ //this指向自己了
			this.style.color='black' ;
			that.types.car = true ;
		}
		// 选择经销商
		this.refs.sel6.onchange=function(){ //this指向自己了
			this.style.color='black' ;
			that.types.jxs = true ;
		}
		// 点击出现图片
		let lis = this.refs.ul.children ;
		lis[0].onclick=function(){
			lis[1].children[0].children[0].style.display='none'
			this.children[0].children[0].style.display='block' ;
		}
		lis[1].onclick=function(){
			lis[0].children[0].children[0].style.display='none'
			this.children[0].children[0].style.display='block' ;
		} 
	}

	// 选择省份
	choose_province(e){
		let v = e.target.value ;
		let obj = this.obj[v] ;
		let arr = []
		for(let each in obj){
			arr.push(obj[each])
		}
		e.target.style.color = 'black' ;
		this.types.province = true ;  // types 

		this.sel5_disabled = false ;
		this.refs.sel5.value = '1';
		this.refs.sel5.style.color = 'gray';
		this.types.city = false ;     // types

		this.sel6_disabled = true ;
		this.refs.sel6.value = '1';
		this.refs.sel6.style.color = 'gray';
		this.types.jxs = false ;      // types

		this.setState({city:arr}) ;
	}
	// 选择城市
	choose_city(e){
		this.sel6_disabled = false ;
		e.target.style.color = 'black'
		this.types.city = true ;     // types

		this.setState({})
	}

	c1(e){
		if(e.target.value==''){ 
			this.setState({ssxm:'请输入您的姓名'}) ;
			this.types.name = false ;
		}else{ 
			this.setState({ssxm:''}) ; 
			this.types.name = true ;
		}
	}
	c2(e){
		// 先不赋值 this.types.tel 最后验证正则在赋值
		if(e.target.value==''){ 
			this.setState({sjh:'请输入11位手机号码'}) ;
		}else{ 
			this.setState({sjh:''}) ;
		}
	}
	// 点击出现时间插件
	pdTime(){
		this.props.changeTime('block')
	}
	// 点击预约
	yy(){
		// 验证 是否有日期
		if(this.refs.time_div.innerText!='请选择预约日期'){
			this.types.time = true ;
		}else{
			this.types.time = false ;
		}
		// 验证 是否正确手机号码
		let tel = this.refs.tel.value ;
        let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
        if( !myreg.test(tel) ) { 
            alert('请输入有效的手机号码！') ; 
            this.types.tel=false ;
            this.refs.tel.value='' ;
            this.setState({sjh:'请输入11位手机号码'}) ;
            return 
        }else{
        	this.types.tel=true ;
        }

        // 最后验证
        if(this.types.fuwu&&this.types.name&&this.types.tel&&this.types.car&&this.types.province&&this.types.city&&this.types.jxs&&this.types.time){
        	let str = this.refs.time_div.innerText ;
        	let arr = str.split('-') ;
        	if(arr[1].length==1){ arr[1]='0'+arr[1] }
        	if(arr[2].length==1){ arr[2]='0'+arr[2] }
			this.success={
				display:'block',
				arr:arr
			}
			this.setState({})
        }else{
        	alert('您有未完成的信息 请您填写完整')
        }
		console.log(this.types)
	}
	// 关闭预约成功
	closeSuccess(){
		this.success={
			display:'none',
			arr:['0000','00','00']
		}
		this.setState({})
	}
	render(){
		return (
			<div style={{width:'100%',height:'100%',overflow:'auto',background:'white'}} id='by'>

				<p style={s.p}>保养维修</p>
				<img src='../../app/images/czfw.png' style={{width:'100%'}}/>

				<div className="select_box">
					<img src='../../app/images/jiantou.png'/>
					<select ref="sel2"  className="sel" >
						<option value="1" style={{display:'none'}}>选择您需要的服务</option>
						<option>维修</option>
						<option>保养</option>				
					</select>					
				</div>

				<div style={s.d2}>
					{ this.state.ssxm }
					<input type='text' style={s.p2} onChange={ this.c1.bind(this)}/>					
				</div>

				<ul className='jsq_check2' ref='ul'>
					<li >
						<span><img src='../../app/images/right.png'/></span>
						&nbsp;先生
					</li>
					<li >
						<span><img src='../../app/images/right.png'/></span>
						&nbsp;女士
					</li>
				</ul>

				<div style={s.d3} >
					{ this.state.sjh }
					<input type='number' style={s.p2} onChange={ this.c2.bind(this)} ref='tel'/>					
				</div>

				<div className="select_box">
					<img src='../../app/images/jiantou.png'/>
					<select ref="sel3"  className="sel" >
						<option value="1" style={{display:'none'}}>选择车型</option>
						<option>CROWN 皇冠</option>
						<option>REIZ 锐志</option>
						<option>新COROLLA 卡罗拉</option>
						<option>COROLLA EX 花冠</option>
						<option>全新VIOS 威驰</option>
						<option>全新RAV4荣放</option>
						<option>PRADO 普拉多</option>					
					</select>					
				</div>

				<div  className="select_box">
					<img src='../../app/images/jiantou.png'/>
					<select ref="sel4"  className="sel" onChange={this.choose_province.bind(this)}>
						<option value="1"  style={{display:'none'}}>
							选择省份
						</option>	
						{this.state.province.map((v,k)=>{
							return <option key={k} value={v.ind}> {v.p} </option>
						})}		
					</select>					
				</div>

				<div  className="select_box">
					<img src='../../app/images/jiantou.png'/>
					<select ref="sel5"  className="sel" onChange={this.choose_city.bind(this)} disabled={this.sel5_disabled}>
						<option value="1"  style={{display:'none'}}>
							选择城市
						</option>	
						{this.state.city.map((v,k)=>{
							return <option key={k} value={v}> {v} </option>
						})}				
					</select>					
				</div>

				<div  className="select_box">
					<img src='../../app/images/jiantou.png'/>
					<select ref="sel6"  className="sel" disabled={this.sel6_disabled}>
						<option value="1"  style={{display:'none'}}>
							请选择经销商
						</option>	
						<option>方庄丰田</option>
						<option>三元桥丰田</option>		
						<option>奥德行丰田</option>
						<option>花园桥丰田</option>
						<option>首汽丰田</option>
						<option>中业丰田</option>
						<option>花乡桥丰田</option>
					</select>					
				</div>

			    <div style={{display:'block',width:'91%',margin:'0.45rem auto 0 auto',border:'1px solid #ccc',
			    	textIndent:'0.2rem',fontSize:'0.28rem',color:'gray',position:'relative',height:'45px',
			    	lineHeight:'45px',color:this.props.time.color}} 
			    	onClick={this.pdTime.bind(this)} ref='time_div'>
			    	{this.props.time.title}		
			    </div>
					
				<div className="wyyd">
					<div className="choose" data-pd='close'>
						<div>
							<img src="../../app/images/yy_yes.png"/>&nbsp;
						</div>
						我已阅读并同意<span style={{color:'red'}}>&nbsp;《隐私政策》</span>
					</div>
					<div className="yz" onClick={this.yy.bind(this)}>马上预约</div>
				</div>

				{/* 时间插件 */}
				<Time />

				{/* 预约成功 */}
				<Success success={this.success} closeSuccess={this.closeSuccess.bind(this)}/>

			</div>)
	}
}
// ,color:'#343434'
let s={
	p:{height:'1.55rem',lineHeight:"1.6rem",textAlign:'center',fontSize:'0.45rem',letterSpacing:'2px'},
	d2:{display:'block',width:'91%',margin:'0.45rem auto 0 auto',border:'1px solid #ccc',textIndent:'0.2rem',
		fontSize:'0.28rem',color:'gray',position:'relative',height:'45px',lineHeight:'45px'},
	d3:{display:'block',width:'91%',margin:'0 auto',border:'1px solid #ccc',textIndent:'0.2rem',
		fontSize:'0.28rem',color:'gray',position:'relative',height:'45px',lineHeight:'45px'},
	p2:{width:'100%',fontSize:'0.28rem',textIndent:'0.2rem',height:'45px',lineHeight:'45px',
		position:'absolute',top:'0',left:'0',background:'transparent',color:'black'}
}

let C_BY = connect(mapStateToProps,mapDispatchToProps)(BY)

export default C_BY ;
