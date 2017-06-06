import React,{Component} from 'react' ;
import {hashHistory} from 'react-router'

class Active extends Component {
	constructor(props){
		super(props) 
		this.arr = []
	}
	componentDidMount(){
		$ajax({
			url:"../app/json/active.json",
			success:(res)=>{
				let obj = JSON.parse(res) ;
				let arr = []
				for(let each in obj){
					arr.push(obj[each])
				}
				this.arr = arr ;
				this.setState({})
			}
		})
	}

	go(){
		hashHistory.push('/active_click')
	}

	render(){
		return (
			<div style={{width:'100%',height:'100%',overflow:'auto',background:'white'}} >
				<p style={s.p}> 促销活动 </p> 

				{
					this.arr.map((v,k)=>{
						return (
							<div key={k} onClick={this.go.bind(this)}>
								<img style={s.img}  src={v.img}/>
								<p style={s.p2}>{ v.title}</p>
								<div  style={s.div2}>
									<img style={s.img2} src='../../app/images/now_time.jpg'/>
									{v.time}
								</div>
								<div style={s.bot}></div>
							</div>)
					})
				}
			</div>)
	}
}

export default Active ;

let s = {
	p:{fontSize:'0.48rem',height:'1.55rem',lineHeight:'1.55rem',color:'#333',textAlign:'center',borderBottom:'1px solid #ccc'},
	img:{display:'block',width:'90%',margin:'0.4rem auto 0 auto'},
	p2:{width:'90%',margin:"0.2rem auto 0.17rem auto",fontSize:'0.28rem',color:'#333',paddingLeft:'0.08rem'},
	div2:{width:'90%',margin:"0 auto 0.3rem auto",fontSize:'0.28rem',color:'#333'},
	img2:{width:'0.3rem',verticalAlign: "top",margin:'0 0.1rem 0 0.05rem'},
	bot:{width:'100%',height:'0.25rem',background:'#f0f0f0',borderTop:'1px solid #ccc',borderBottom:'1px solid #ccc'}
}