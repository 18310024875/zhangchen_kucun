import React,{Component} from 'react' ;
import Message from './message' ;

class Yyshijia extends Component {
	constructor(props){
		super(props)
		this.state={
			obj:'',
			message:false
		}
		this.arr=[]
	}
	eachs(obj){
		let arr = []
		let i = 0;
		for(let each in obj){
			let div = (
				<div key={each} style={s.inDiv} onClick={this.c.bind(this,i)}>
					<img src={obj[each].imgurl} style={s.inImg}/>
					<div style={s.inP} >
						<span style={s.span} className='sp'><i style={s.i}></i></span>
						{each}
					</div>
				</div>)
			arr.push(div)
			i+=1;
		}
		return arr
	}
	// 点击变色
	c(x){
		console.log(x)
		let sps = document.querySelectorAll(".sp");
		for ( let i=0;i<sps.length;i++ ) {
			sps[i].children[0].style.display='none' ;
			sps[i].style.border='1px solid gray' ;
		} ;
		sps[x].children[0].style.display='block' ;
		sps[x].style.border='1px solid #F1C40F' ;
		setTimeout(()=>{
			this.refs.sp2.style.background='#F1C40F' ;
			this.setState({
				obj:'',
				message:true
			})
		},200)
	}
	componentWillMount(){
		$ajax({
			url:"app/json/bj.json",
			success:(res)=>{
				let obj = JSON.parse(res);
				this.setState({obj:obj})
			}
		})
	}

	render(){
	return(
		<div style={s.div} ref='div'>
			<p style={s.p}> 预约试驾 </p>
			<p style={s.p2}>
				<span style={s.sp1}>试驾车型</span>
				<span style={s.sp2} ref="sp2">填写信息</span>
				<span style={s.sp3} ref="sp3">预约成功</span>
			</p>
			<div style={s.div2}>
				{this.state.obj!=''?this.eachs(this.state.obj):null}	
				{this.state.message ? <Message father={this}/> :null}		
			</div>


		</div>)
	}
}

export default Yyshijia ;

let s = {
	div:{width:'100%',height:'100%',overflow:'auto',background:'white'},
	p:{height:'1.6rem',background:'white',lineHeight:'1.7rem',fontSize:'0.43rem',
	textAlign:'center',letterSpacing:'4px'},
	p2:{width:"92%",margin:'0rem auto',color:'white',textAlign:'center',
	fontSize:'0.26rem',height:'0.52rem',lineHeight:'0.53rem'},
	sp1:{display:'inline-block',height:'100%',width:'31%',color:'white',marginRight:'3%',background:'#F1C40F'},
	sp2:{display:'inline-block',height:'100%',width:'31%',color:'white',marginRight:'3%',background:"#BEC3C7"},
	sp3:{display:'inline-block',height:'100%',width:'31%',color:'white',background:"#BEC3C7"},
	inDiv:{width:'70%',margin:'0 auto',marginTop:'0.2rem',overflow:'hidden'},
	inImg:{width:"100%",float:'left'},
	inP:{width:'100%',fontSize:'0.29rem',textAlign:'center',float:'left'},
	span:{display:'inline-block',width:'0.28rem',height:'0.29rem',borderRadius:'50%',
		border:'1px solid gray',position:'relative',top:'0.06rem',left:'-0.06rem'},
	i:{display:'inline-block',width:'0.16rem',height:'0.16rem',background:'#F1C40F',borderRadius:'50%',
		position:'absolute',left:'0.04rem',top:'0.05rem',display:'none'},
	div2:{width:'100%',paddingTop:'0.2rem',}

}
