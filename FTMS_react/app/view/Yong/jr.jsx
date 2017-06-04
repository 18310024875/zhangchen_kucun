import React,{Component} from 'react' ;

class JR extends Component {
	render(){
		return (
			<div  style={{width:'100%',height:"100%",overflow:'auto',background:'white'}}>
				<p style={s.p}>保险服务</p>
				<img src='../../app/images/bxjr.png' style={{width:'100%'}}/>			
				<ul style={s.ul}>
					<li style={s.li1}>
						<span style={s.span1} ref='span1'>服务介绍</span>
					</li>
				</ul>
				<div style={s.div1} ref="div1">
					<h3 style={s.h3}>【AAA品牌保险】</h3>
					<p style={s.p2}>
						
					2007年，一汽丰田以“安心感、优惠的价格、标准化流程、信息透明”为开发理念，在国内率先推出AAA品牌保险服务，旨在为消费者提供轻松购买、便捷理赔的全方位专享保险服务。较之于市场上其他车险，“AAA品牌保险”是一汽丰田通过与国内一线保险企业——平安、人保财险等合作，强强联手缔造的，具有以下四大优势。
				
					</p>
					<p style={s.p2}>
	                    
            	首先，一汽丰田“AAA品牌保险”为客户提供了一站式服务。客户无论买车、维修还是保险理赔，均可在经销店内完成。车辆发生事故，客户只需在经销店内等候，维修、保险方面的专业团队就会处理好各项事务，设计出最合理、最高效的解决方案。如果说，一般的汽车保险是客户跟着流程走，那么“AAA品牌保险”则是服务围着客户走。
                %或以上时，保险公司将不论事故责任比例，不扣折旧和残值，免费换一辆同型号的新车，或按新车购置价全额赔付。此外，专用保险还包含了针对顾客需求的其他更多保障的条款。具体请向当地经销店咨询。
					</p>
					<p style={s.p2}>
						
            	第二，一汽丰田“AAA品牌保险”实现了费用标准化。投保车辆在维修更换零部件时，一律使用丰田纯正零部件；保险公司认可并执行一汽丰田纯正零部件全国推荐价格；同时，合同明确了修理费用的计算方法，明确了工时费和喷漆耗材费的单价和计算方案；另外，减少了中间环节，彻底杜绝了定损不统一、理赔金额不足等现象。
                 
					</p>
					<p style={s.p2}>
						
            	第三，一汽丰田“AAA品牌保险”效率高。一站式服务有效地提升了险后处理速度；除此以外，“AAA品牌保险”还对勘察、定损、理赔各个环节的时限均做出明确规定，到场速度、定损速度都受到严格监管。节约车主宝贵时间，“AAA品牌保险”无疑更加贴心。
                 
					</p>
					<p style={s.p2}>
	                    
            	第四，一汽丰田“AAA品牌保险”可以确保维修的高品质。在“AAA品牌保险”中，所有的维修业务均由经销店完成，经销店严格遵照丰田标准作业方法，维修人员必须全部经过专业培训并通过一汽丰田的认证，100%使用丰田纯牌零件，不但能够高效、高品质地完成维修，而且可以按相关零部件的质保期限，保障维修后的品质。
                %或以上时，保险公司将不论事故责任比例，不扣折旧和残值，免费换一辆同型号的新车，或按新车购置价全额赔付。此外，专用保险还包含了针对顾客需求的其他更多保障的条款。具体请向当地经销店咨询。
					</p>
					<p style={s.p2}>
	                    
            	从2007年到2016年,整整9年的时间中，一汽丰田AAA品牌保险为无数车主演绎了一汽丰田“安心、安全、爱用”的客户服务理念，为了惠及更多车主，让他们可以享受到安心、便捷、专业化、标准化的汽车保险服务，。
                %或以上时，保险公司将不论事故责任比例，不扣折旧和残值，免费换一辆同型号的新车，或按新车购置价全额赔付。此外，专用保险还包含了针对顾客需求的其他更多保障的条款。具体请向当地经销店咨询。
					</p>
				</div>
			</div>)
	}
}

export default JR ;

let s={
	p:{height:'1.5rem',lineHeight:"1.5rem",textAlign:'center',fontSize:'0.45rem',letterSpacing:'2px',color:'#343434'},
	ul:{width:'100%',height:'0.7rem',fontSize:'0.28rem',paddingTop:'0.08rem',textAlign:'center',borderBottom:'1px solid #ccc'},
	li1:{float:'left',width:'100%',boxSizing:'border-box'},
	div1:{width:'100%',textAlign:'center',fontSize:'0.28rem',padding:'0 0.17rem 0.5rem 0.17rem'},
	h3:{padding:'0.35rem 0',color:'#343434',marginTop:'0.1rem'},
	span1:{color:'#343434'},
	p2:{lineHeight:'0.45rem',marginBottom:'0.25rem',color:'#343434',fontSize:'0.25rem',color:'black',textIndent:'0.4rem'},
}