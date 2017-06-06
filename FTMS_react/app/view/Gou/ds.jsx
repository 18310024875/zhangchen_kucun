
import React,{Component} from 'react';
import Banner from '../public/banner' ;

export default class DS extends Component {
	constructor(props){
		super(props)
		this.arr=['../../app/images/shop.jpg','../../app/images/shop.jpg','../../app/images/shop.jpg'],
		this.shop=[]
	}
	componentDidMount(){
		let h = document.body.offsetWidth/64*32;
		this.refs.banBox.style.height = h +'px';
	}
	componentWillMount(){
		$ajax({
			url:'../../app/json/shop.json',
			success:(res)=>{
				let obj = JSON.parse(res) ;
				for( let each in obj ){
					this.shop.push(each)
				}
				this.obj = obj ;
				console.log(this.shop,this.obj)
				this.setState({})
			}
		})
	}
	add(){
		$ajax({
			url:'../../app/json/shop2.json',
			success:(res)=>{
				let obj = JSON.parse(res) ;
				for( let each in obj ){
					this.shop.push(each)
				}
				// this.obj = Object.assign({},this.obj,obj)

				let Object_assign=(obj,o)=>{ //解决不支持Object.assign
					for(let e in o){
						obj[e] = o[e] ;
					}
				}				

				Object_assign(this.obj,obj)

				this.setState({})
			}
		})
	}
	render(){
	return(
		<div style={{width:'100%',height:'100%',overflow:'auto'}}>
			<div ref='banBox' style={{width:'100%'}}>
				<Banner arr={this.arr}/>				
			</div>
			<div style={{textAlign:'center',overflow:'hidden'}}>
				<div style={s.div2}>				
					<h3 style={s.div2h3}>ALL MODELS</h3>
					<p>	全部车型</p>
				</div>
				{
					this.shop.map((v,k)=>{
						return(
							<div key={k} style={k%2==0?s.each1:s.each2}>
								<img src={this.obj[v].img} style={k<=7?s.img1:s.img2}/>
								<p style={s.p1}>{this.obj[v].name}</p>
								<p style={s.p2}>{this.obj[v].price}</p>
								<span style={s.span}> 在线预售 </span>
							</div>)
					})
				}
			</div>
			<div style={s.div2} onClick={this.add.bind(this)}>
				<p style={{margin:'0.2rem 0 0.15rem 0'}}>点击加载更多</p>
				<img src='../../app/images/bottom_but_icon.png' style={{width:'0.4rem'}}/>
			</div>
			<div style={s.foot}>
				Copyright © 2016 FAW TOYOTA Motor Sales Co., LTD
			</div>
		</div>)
	}
}

let s = {
	div:{width:'100%',height:'100%',overflow:'auto'},
	div2:{height:'1.3rem',background:'white',textAlign:"center",fontSize:'0.28rem',
		borderTop:'1px solid transparent',borderBottom:'1px solid #ccc'},
	div2h3:{margin:'0.25rem 0 0.03rem 0'},
	img1:{width:'100%'},
	img2:{display:'block',width:'86%',height:'1.8rem',margin:'0.3rem auto 0 auto'},
	each1:{
		padding:'0 0 0.5rem 0',fontSize:'0.28rem',borderBottom:'1px solid #ccc',width:'50%',
		borderRight:'1px solid #ccc',float:'left',height:'4.5rem',position:'relative'
	},
	each2:{
		padding:'0 0 0.5rem 0',fontSize:'0.28rem',borderBottom:'1px solid #ccc',width:'50%',
		float:'left',height:'4.5rem',position:'relative'
	},
	span:{
		display:'block',color:'white',background:'#E84C3D',width:'50%',position:'absolute',
		bottom:'0.47rem',left:'25%',padding:'0.1rem 0',fontSize:'0.29rem'
	},
	p1:{marginTop:'0.1rem',lineHeight:'0.35rem',padding:'0 0.2rem',color:'black'},
	p2:{position:'absolute',width:'100%',bottom:'1.15rem',color:'#E84C3D'},
	foot:{fontSize:'0.2rem',background:'#f0f0f0',padding:'0.2rem',textAlign:'center'}
}