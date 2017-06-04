import React,{Component} from 'react' ;
import BDmap from '../public/bdmap' ;

class Sreach extends Component {
	constructor(props){
		super(props)
		this.state={
			province:[],
			city:[]
		} 
		this.sel5_disabled = true ;
		this.city='' ;
	}

	componentDidMount(){

	}

	componentWillMount(){
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
	// 选择省份
	choose_province(e){
		let v = e.target.value ;
		let obj = this.obj[v] ;
		let arr = [] ;
		for(let each in obj){
			arr.push(obj[each])
		}
		e.target.style.color = 'black' ;

		this.sel5_disabled = false ;
		this.refs.sel5.value = '1';
		this.refs.sel5.style.color = 'gray';

		this.city = '' ;

		this.setState({city:arr}) ;
	}
	// 选择城市
	choose_city(e){
		e.target.style.color = 'black' ;
		this.city = this.refs.sel5.value ;
		
		this.setState({})
	}

	render(){
		return(
			<div style={{width:'100%',height:"100%",overflow:'auto',background:'white'}}>
				<p style={s.p}> 经销商查询 </p>

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

				<BDmap city={this.city} />

			</div>)

	}
}

export default Sreach ;

let s={
	p:{height:'1rem',lineHeight:"1.5rem",textAlign:'center',fontSize:'0.45rem',letterSpacing:'2px',color:'#343434'},

}