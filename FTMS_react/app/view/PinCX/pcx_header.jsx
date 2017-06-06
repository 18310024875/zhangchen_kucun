import React,{Component} from 'react';

// redux
import {Provider,connect} from 'react-redux';
import {mapStateToProps,mapDispatchToProps} from '../../store.js';

let s = {
	li1:{float:'left',width:'25%',height:'100%',textAlign:'center',lineHeight:'0.9rem',
		fontSize:'0.25rem',color:'#EB4C3D'},
	li:{float:'left',width:'25%',height:'100%',textAlign:'center',lineHeight:'0.9rem',fontSize:'0.25rem'}
}

class PCX_header extends Component {
	constructor(props){
		super(props)
		this.arr = ['车型展示','参数配置','纯正用品','车型活动'];
	}

	click(ind){
		this.props.set_p_index(ind+1)
	}
// !一切都是数据!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

	render(){
		let it = this.props.p_index.num ;
		let top ;
			it==0?top='-1.02rem':top='0';
		return(
			<ul style={{
				height:'0.9rem',width:'100%',background:'white',
				borderBottom:'1px solid #cccccc',position:'absolute',
				zIndex:'9',top:top 
			}} ref='ul'>
			   {this.arr.map((v,k)=>{
			   	var style ;
			   	k==it-1?style=s.li1:style=s.li;
				  return (
				  	<li key={k} style={style}
				  		onClick={this.click.bind(this,k)}>
				  		{v}
				  	</li>)
			   })}
			</ul>)

	}
}
export default connect(mapStateToProps,mapDispatchToProps)(PCX_header)