import React,{Component} from 'react';

export default class JSQ extends Component {
	constructor(props){
		super(props)
		this.t = ' 标准型产品'
	}
	componentDidMount(){
		// 选择贷款!
		let that = this;
		let lis = this.refs.ul.children;
		let old_li = lis[0];
		for(let i=0;i<lis.length;i++){
			lis[i].onclick=function(){
				if(this!=old_li){ // 当点的不是自己的时候 变色
					old_li.children[0].children[0].style.display='none';
					old_li=this;
				}
				// 在非全选中情况下
				if(!(obj.cars&&obj.types&&obj.mounts&&obj.first)){
					if(i==1){ //如果点击尾款产品
						that.refs.sel3.value=2;
						that.refs.sel3.disabled=true;
						that.refs.sel3.style.color='black';
						// !!!!!! 被动的改变select的value 不会触发onchange !!!!!!!!!
						obj.mounts=true;
					}else{
						that.refs.sel3.value=1;
						that.refs.sel3.disabled=false;
						that.refs.sel3.style.color='gray';
						obj.mounts=false;				
					}
				}

				this.children[0].children[0].style.display='block';	
				that.t = this.innerText;
				pd_money(that.t)	
			}
		}
		// 第一个select改变 重写第二个内容
		this.refs.sel1.addEventListener('change',()=>{
			this.refs.sel2.disabled=false;				
			this.refs.sel2.innerHTML=`
						<option value="1" style="display:none">请选择具体型号</option>
						<option data-price='274800'>3.0V 尊锐导航版</option>
						<option data-price='259800'>2.5V 尊锐导航版</option>
						<option data-price='251800'>2.5V 尊锐版</option>
						<option data-price='242800'>2.5V 尚锐导航版</option>
						<option data-price='229800'>2.5V 尚锐版</option>
						<option data-price='209800'>2.5V 菁锐版</option>`;
			this.refs.sel2.style.color='gray';
			obj.types=false;
		})
		// 用于判断是否全选中
		let obj={
			cars:false,
			types:false,
			mounts:false,
			first:false
		}
		// 改变的时候出颜色
		let sels = document.querySelectorAll('.sel')
		for(let i=0;i<sels.length;i++){
			sels[i].addEventListener('change',function(){
				this.style.color='black';
				if(i==0){ obj.cars=true } ;
				if(i==1){ obj.types=true } ;
				if(i==2){ obj.mounts=true } ;
				if(i==3){ obj.first=true } ;
				pd_money(that.t)
			})
		}

		let pd_money=(x)=>{
			if(!(obj.cars&&obj.types&&obj.mounts&&obj.first)){
				this.refs.price.innerText = '';
				this.refs.each_mounth_money.innerText = '';
			}
			// 总价
			let price=0;

			if(obj.cars&&obj.types){
				let index = this.refs.sel2.selectedIndex ;
				let opts = this.refs.sel2.children ;
				let p=opts[index].getAttribute('data-price') ;
				this.refs.price.innerText = Number(p/10000)+'万元' ;
				price = Number(p) ;
			}
			// 每月还贷
			if(obj.cars&&obj.types&&obj.mounts&&obj.first){
				let index = this.refs.sel3.selectedIndex ;
				let opts = this.refs.sel3.children ;
				let mounts=parseInt(opts[index].innerText) ;

				let index2 = this.refs.sel4.selectedIndex ;
				let opts2 = this.refs.sel4.children ;
				let first=parseInt(opts2[index2].innerText)/100
				// 贷款类型
				let lx = '' //利息
				if(x.indexOf('标准型产品')>-1){lx=1.07};
				if(x.indexOf('尾款型产品')>-1){lx=1.00};
				if(x.indexOf('定款贷产品')>-1){lx=1.03};
				if(x.indexOf('附加贷产品')>-1){lx=1.06};
				// 最终结果
				let e = price*(1-first)/mounts*lx;
				console.log(price,mounts,first,lx,e)
				this.refs.each_mounth_money.innerText = '月付金额￥ '+parseInt(e)+' 元'
			}

		}
			
	}

	show(e){
		let v = e.target.innerText;
		if(v=='服务介绍'){
			this.refs.div1.style.display='block';
			this.refs.div2.style.display="none";
			this.refs.span1.style.color='#297FB8';
			this.refs.span2.style.color='#343434';
		}else{
			this.refs.div2.style.display='block';
			this.refs.div1.style.display="none";
			this.refs.span2.style.color='#297FB8';
			this.refs.span1.style.color='#343434';
		}
	}

	render(){
	return(
		<div ref="div" style={{width:'100%',height:'100%',overflow:'auto'}}>
			<p style={s.p}>金融服务</p>
			<img src='../../app/images/bxjr.png' style={{width:'100%'}}/>
			<ul style={s.ul}>
				<li style={s.li1}>
					<span style={s.span1} ref='span1' onClick={this.show.bind(this)}>服务介绍</span>
				</li>
				<li style={s.li2}>
					<span style={s.span2} ref='span2' onClick={this.show.bind(this)}>购车计算器</span>
				</li>
			</ul>
			<div style={s.div1} ref="div1">
				<h3 style={s.h3}>一汽丰田金融业务</h3>
				<p style={s.p2}>
					一汽丰田的经销店与两家金融公司以及多家银行合作、融资租赁机构开展汽车个人贷款业务。客户需要贷款购车时，可以根据自身条件选择不同的金融机构。经销店会为客户提供便捷、安心的一站式服务。
				</p>
				<p style={s.p2}>
                    根据条款，购买皇冠或锐志专用汽车保险相关条款的车主，如因保险事故造成汽车损失达到新车购置价的50%或以上时，保险公司将不论事故责任比例，不扣折旧和残值，免费换一辆同型号的新车，或按新车购置价全额赔付。此外，专用保险还包含了针对顾客需求的其他更多保障的条款。具体请向当地经销店咨询。
				</p>
				<p style={s.p2}>
					多：金融合作平台多既有金融公司、还有银行和融资租赁公司；金融产品多既有标准的金融产品，也有六大金融新产品，更有融资租赁产品，让客户自由选择。 
				</p>
				<p style={s.p2}>
					一汽丰田为客户提供多样丰富的金融产品以供选择，除了等额本息0利息、低利息的普通金融产品之外，还提供多种一汽丰田专属的金融新产品，每种产品都为不同客户人群量身打造，以满足客户各类金融贷款需求。为客户打造更加高品质的金融消费体验。 
				</p>
				<p style={s.p2}>
                    根据条款，购买皇冠或锐志专用汽车保险相关条款的车主，如因保险事故造成汽车损失达到新车购置价的50%或以上时，保险公司将不论事故责任比例，不扣折旧和残值，免费换一辆同型号的新车，或按新车购置价全额赔付。此外，专用保险还包含了针对顾客需求的其他更多保障的条款。具体请向当地经销店咨询。
				</p>
				<p style={s.p2}>
                    根据条款，购买皇冠或锐志专用汽车保险相关条款的车主，如因保险事故造成汽车损失达到新车购置价的50%或以上时，保险公司将不论事故责任比例，不扣折旧和残值，免费换一辆同型号的新车，或按新车购置价全额赔付。此外，专用保险还包含了针对顾客需求的其他更多保障的条款。具体请向当地经销店咨询。
				</p>
			</div>
			<div ref="div2" style={s.div2}>
				<div className="select_box">
					<img src='../../app/images/jiantou.png'/>
					<select ref="sel1"  className="sel" >
						<option value="1" style={{display:'none'}}>选择车型</option>
						<option>CROWN 皇冠</option>
						<option>REIZ 锐志</option>
						<option>新COROLLA 卡罗拉</option>
						<option>COROLLA EX 花冠</option>
						<option>全新VIOS 威驰</option>
						<option>全新RAV4荣放</option>
						<option>PRADO 普拉多</option>					
					</select>					
				</div>
				<div  className="select_box">
					<img src='../../app/images/jiantou.png'/>
					<select ref="sel2"  className="sel" disabled='true'>
						<option value="1"  style={{display:'none'}}>
							请选择具体型号
						</option>			
					</select>					
				</div>
				<div className='jsq_under_select'>
					您选择的车型报价为 <span ref='price'></span>
				</div>
				<p className='jsq_under_select_under_p'></p>

				<p className='jsq_under_select_under_p2'>
					常规购车方案
				</p>
				<ul className='jsq_check' ref='ul'>
					<li>
						<span><img src='../../app/images/right.png'/></span>
						&nbsp;标准型产品
					</li>
					<li>
						<span><img src='../../app/images/right.png'/></span>
						&nbsp;尾款型产品
					</li>
					<li>
						<span><img src='../../app/images/right.png'/></span>
						&nbsp;定款贷产品
					</li>
					<li>
						<span><img src='../../app/images/right.png'/></span>
						&nbsp;附加贷产品
					</li>
				</ul>

				<div className="jsq_each" style={{marginTop:'0.3rem'}}>
					贷款期限
					<div  className="select_box2">
						<img src='../../app/images/jiantou.png'/>
						<select ref="sel3"  className="sel" >
							<option value="1"  style={{display:'none'}}>请选择贷款期限</option>
							<option value="2">12个月</option>
							<option value="3">24个月</option>
							<option value="4">36个月</option>				
						</select>					
					</div>					
				</div>
				<div className="jsq_each" style={{letterSpacing:'0.1rem',marginBottom:'0.45rem'}}>
					首付款
					<div  className="select_box2">
						<img src='../../app/images/jiantou.png'/>
						<select ref="sel4" className="sel" >
							<option value="1"  style={{display:'none'}}>请选择首付款</option>
							<option>30%</option>
							<option>40%</option>
							<option>50%</option>
							<option>60%</option>				
						</select>					
					</div>					
				</div>	
				<p className='jsq_under_select_under_p'></p>

				<div className="jsq_last">
					<p><span ref='each_mounth_money'></span></p>
					<p>注: 以上数据仅供参考, 实际支付金额以最终<br/>
						客户贷款合同为准, 详情可咨询当地经销商
       				</p>
				</div>
			</div>
		</div>)
	}
}

let s={
	p:{height:'1.5rem',lineHeight:"1.5rem",textAlign:'center',fontSize:'0.45rem',letterSpacing:'2px',color:'#343434'},
	ul:{width:'100%',height:'0.7rem',fontSize:'0.28rem',paddingTop:'0.08rem',textAlign:'center',borderBottom:'1px solid #ccc'},
	li1:{float:'left',width:'50%',boxSizing:'border-box',borderRight:'2px solid #ccc'},
	li2:{float:'left',width:'50%'},
	div1:{width:'100%',textAlign:'center',fontSize:'0.28rem',padding:'0 0.15rem 0.5rem 0.15rem'},
	h3:{padding:'0.3rem 0',color:'#343434'},
	span1:{color:'#297FB8'},
	span2:{color:'#343434'},
	p2:{lineHeight:'0.45rem',marginBottom:'0.25rem',color:'#343434'},
	div2:{display:'none'}
}