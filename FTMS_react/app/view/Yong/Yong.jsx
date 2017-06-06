import React,{Component} from 'react';
import BY from './by' ;
import JR from './jr' ;
import JJ from './jj'

class Yong extends Component {
	componentDidMount(){
		console.log(this.props.location.state)
	}
	render(){
		if(this.props.location.state=='保养维修'){
			return  <BY/>
		}else if(this.props.location.state=='金融保养'){
			return <JR/>
		}else{
			return <JJ/>
		}
	}
}
export default Yong ;