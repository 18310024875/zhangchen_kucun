import React,{Component} from 'react';

import BJ from './bj';
import JSQ from './jsq';
import DS from './ds';

class Gou extends Component {

	render(){
		if(this.props.location.state=='报价咨询'){
			return <BJ/>
		}else if(this.props.location.state=='购车计算器'){
			return <JSQ/>
		}else{
			return <DS/>
		} 
	}
}

export default Gou;


