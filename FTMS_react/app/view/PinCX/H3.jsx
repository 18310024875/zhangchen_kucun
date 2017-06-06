import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class H3 extends Component {
	constructor(props){
		super(props)
		this.state={
			obj:""
		}
		this.old_target = undefined ;
	}
	componentWillMount(){
		let name = this.props.obj.name;
		$ajax({
			url:"app/json/other.json",
			success:(res)=>{
				this.json = JSON.parse(res)
				this.setState({obj:this.json[name]})
			}
		})
	}
	componentWillReceiveProps(next){
		let name = this.props.obj.name;
		this.setState({obj:this.json[name]}) 
	}
	// 1.8T+ 运动版 FBS
	pd_li(e){
		let pd = e.target.getAttribute('data-pd');
		let lis = e.target.nextElementSibling.children
		if(pd=='open'){
			e.target.setAttribute('data-pd','close')
			for(let i=0;i<lis.length;i++){
				lis[i].style.height='0.75rem';
				lis[i].style.lineHeight='0.75rem';
				lis[i].style.color='black';
			}
		}else{
			e.target.setAttribute('data-pd','open')
			for(let i=0;i<lis.length;i++){
				lis[i].style.height='0';
				lis[i].style.lineHeight='0';
				lis[i].style.color='white';
			}			
		}
	}
	back1(e){
		let div = e.target.parentNode.previousElementSibling;
		let lis = e.target.parentNode.children;
		div.setAttribute("data-pd",'open')
		div.innerText = e.target.innerText;
		for(let i=0;i<lis.length;i++){
			lis[i].style.height='0';
			lis[i].style.lineHeight='0';
			lis[i].style.color='white';
		}	
	}  // 1.8T+ 运动版 FBS结束

	// 第二块
	indiv(e){
		// 点的不是自己
		if( this.old_target!=e.target ){
			// 防止报错!验证是不时第一次点开
			if( this.old_target!=undefined ){
				let pd = this.old_target.getAttribute('data-pd') ;
				let t = this.old_target.nextElementSibling ;
					$slideUp(t)
			}
			// 最后赋值!!!
			this.old_target = e.target ;
		}
		// 点的不是自己最后执行 ; 点的是自己直接执行 !!!
		let divs = document.querySelectorAll('.indiv') ;
		let pd = e.target.getAttribute('data-pd');
		let t = e.target.nextElementSibling ;		
		if(pd=='open'){
			e.target.setAttribute('data-pd','close');
			for(let i=0;i<divs.length;i++){
				divs[i].style.display='none';
				e.target.style.display = 'block'
			}
				$slideDown(t)
		}else{
			e.target.setAttribute('data-pd','open');
			for(let i=0;i<divs.length;i++){
				divs[i].style.display='block';
			}
				$slideUp(t)
		}
	}
	back2(e){
		if( this.old_target!=undefined ){
			let p = e.target.parentNode.parentNode.previousElementSibling ;
			let t = e.target.parentNode.parentNode ;
			p.setAttribute('data-pd','open') ;
			
			let divs = document.querySelectorAll('.indiv') ;
			for(let i=0;i<divs.length;i++){
				divs[i].style.display='block';
			}
				$slideUp(t)
		}
	}  // 第二块结束

  // 遍历每一个小ul
	eachUL(x){
		let arr = [];
		let obj = this.state.obj.other[x]
		for(let each in obj){
			arr.push(<li style={s.inli} key={each} onClick={this.back2.bind(this)}>{each}</li>)
		}
		return arr
	}

	render(){
		// 可以根据条件判断 !!! 
		if(this.state.obj!=""){
			let arr = []
			for( let each in this.state.obj.other){
				arr.push(each)
			}
			return (
				<box style={s.box}>
					<div style={s.div1} data-pd="open" onClick={this.pd_li.bind(this)}>
						{this.state.obj.types[0]}
						<img src='../../app/images/jiantou.png' style={s.img}/>
					</div>
					<ul>	
						{this.state.obj.types.map((v,k)=>{
							return <li style={s.li} key={k} onClick={this.back1.bind(this)}> {v} </li>
						})}
					</ul>
					{
						arr.map((v,k)=>{
						  return (
							<div key={k}>
								<div style={s.indiv} className="indiv" onClick={this.indiv.bind(this)}
									data-pd='open'> 
									{v} 
									<span style={s.inspan}>
										<img style={s.inimg} src='../../app/images/jiah_icon.png'/>									
									</span>
								</div>
								{/* slideDown */}
								<div className='slideBox'>
									<ul >
										{this.eachUL(v)}
									</ul>
								</div>
							</div>)
						})
					}
				</box>)						
		}else{
			return <div></div>
		}
	}
}

let s ={
	box:{
		display:"block",width:'100%',height:'100%',paddingTop:'0.9rem'
	},
	div1:{
		width:'100%',height:'0.75rem',lineHeight:'0.75rem',background:'#f0f0f0',
		fontSize:'0.25rem',textIndent:"0.3rem",color:'black'
	},
	li:{
		width:'100%',height:'0',lineHeight:'0',background:'white',textIndent:"0.35rem",
		color:'gray',transition:'all 0.5s',overflow:'hidden'
	},
	img:{width:'0.6rem',vertivalAlign:'middle',float:'right',marginRight:'0.2rem',
		marginTop:'0.3rem'},

	indiv:{
		width:'100%',height:'0.75rem',lineHeight:'0.75rem',textIndent:"0.3rem",color:'black',
		fontSize:'0.25rem',background:'white',borderBottom:'1px solid rgb(204, 204, 204)',
		position:'relative'
	},
	inimg:{
		width:'0.22rem',height:'0.22rem',float:'left',marginLeft:'0.05rem',marginTop:'0.05rem'
	},
	inspan:{
		display:'black',width:'0.37rem',height:'0.37rem',border:'1px solid rgb(204, 204, 204)',
		borderRadius:'50%',position:'absolute',top:'0.18rem',right:'0.32rem'
	},
	inli:{
		width:'100%',height:'0.7rem',lineHeight:'0.75rem',textIndent:"0.35rem",
		fontSize:'0.25rem',background:'white',
		color:"gray",overflow:"hidden",borderBottom:'1px solid rgb(204, 204, 204)'
	}

}
export default H3;