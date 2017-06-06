import React,{Component} from 'react';

let s = {
	div:{width:'100%',height:'100%',fontSize:'0.3rem',lineHeight:'0.3rem'},
	img:{width:'100%'},
	t1:{fontSize:'0.3rem',lineHeight:'0.9rem',textAlign:'center'},
	t2:{fontSize:'0.25rem',padding:'0 0.3rem',lineHeight:'0.5rem'}
}

class H1 extends Component {
	render(){
		return(
			<div style={s.div}>
				<img style={s.img} src={this.props.obj.h1.url}/>
				<p style={s.t1}>{this.props.obj.h1.t1}</p>
				<p style={s.t2}>{this.props.obj.h1.t2}</p>
			</div>)
	}
}

export default H1;