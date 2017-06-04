import React,{Component} from 'react' ;

class Success extends Component {
	componentDidMount(){
		console.log(this.props.success)
	}
	render(){
		// 预约成功弹窗		
		let obj = this.props.success ;
		return (
			<div className="yycg" style={{display:obj.display}}>
				<div className="hold"></div>
				<img src="../../app/images/cc_logo.png"/>
				<p>&nbsp;预约时间：</p>
				<div className="timebox">
					<div className="n">
						<span><i className="sp_cover"></i>{obj.arr[0][0]}</span>
						<span><i className="sp_cover"></i>{obj.arr[0][1]}</span>
						<span><i className="sp_cover"></i>{obj.arr[0][2]}</span>
						<span><i className="sp_cover"></i>{obj.arr[0][3]}</span>
					</div>
					<div className="y">
						<span><i className="sp_cover"></i>{obj.arr[1][0]}</span>
						<span><i className="sp_cover"></i>{obj.arr[1][1]}</span>
					</div>
					<div className="r">
						<span><i className="sp_cover"></i>{obj.arr[2][0]}</span>
						<span><i className="sp_cover"></i>{obj.arr[2][1]}</span>
					</div>
				</div>
				<p>感谢您的参与，我们将会在24小时内安排</p>
				<p>客服人员与您联系。如有疑问，</p>
				<p>请咨询 400-819-2717</p>
				<img src="../../app/images/cc_cha.png" className="close" onClick={this.props.closeSuccess} />
			</div>)
	}
}

export default Success ;