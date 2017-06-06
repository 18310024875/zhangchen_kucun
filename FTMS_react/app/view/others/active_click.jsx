import React,{Component} from 'react' ;

class Active_click extends Component {

	componentDidMount(){
		// 控制位置
		this.refs.father.style.height = (this.refs.father.offsetWidth/640)*2340+'px' ;

		// 	$("img").on('touchstart',function(e){
		// 		e.preventDefault()
		// 	})

		setTimeout(()=>{
			let car = this.refs.car;
			let hs = document.querySelectorAll('.hxd') ;
			let imgs = document.querySelectorAll('.hxd_img') ;
			let show_imgs = document.querySelectorAll('.xstp') ;
			let s0 = show_imgs[0] ; let s1 = show_imgs[1] ; let s2 = show_imgs[2] ;

			// 控制第一屏呼吸灯
			let top = car.offsetTop ;
			let width = car.offsetWidth ;
			let height = car.offsetHeight ;

			// 呼吸灯位置	
			hs[0].style.top = top + height*0.54+'px' ;
			hs[0].style.left = width*0.67+'px' ;

			hs[1].style.top = top + height*0.49+'px' ;
			hs[1].style.left = width*0.54+'px' ;

			hs[2].style.top = top + height*0.6+'px' ;
			hs[2].style.left = width*0.39+'px' ;

			// 呼吸灯下的 img
			imgs[0].style.top = top + height*0.54+'px' ;
			imgs[0].style.left = width*0.67+'px' ;

			imgs[1].style.top = top + height*0.49+'px' ;
			imgs[1].style.left = width*0.54+'px' ;

			imgs[2].style.top = top + height*0.6+'px' ;
			imgs[2].style.left = width*0.39+'px' ;

			// 控制显示图片
			s0.style.width = '67%' ;
			s0.style.top = top + height*0.579+'px' ;
			s0.style.left = width*0.018+'px'

			s1.style.width = '49%';
			s1.style.top = top + height*0.54+'px' ;
			s1.style.left = width*0.07+'px'

			s2.style.width = '37%';
			s2.style.top = top + height*0.64+'px' ;
			s2.style.left = width*0.039+'px'

			let old_this = undefined ;
			for(var i=0;i<hs.length;i++){
				((x)=>{
					hs[x].onclick=function(){
						if(old_this!=this){
							if(old_this!=undefined){
								let index = old_this.getAttribute('data-index') ;
								old_this.setAttribute('data-pd','open')
								show_imgs[index].style.display = 'none' ;
							}
							old_this = this ;
						}
						let pd = this.getAttribute('data-pd') ;
						if(pd=='open'){
							this.setAttribute('data-pd','close') ;
							show_imgs[x].style.display='block' ;
						}else{
							this.setAttribute('data-pd','open') ;
							show_imgs[x].style.display='none' ;
						}
					}
				})(i)
			}
		},500)
	
	}

	render(){
		return (
			<div style={{with:'100%',height:'100%',overflow:'auto'}} id='active_click'>
				<div className='realbox r_box1' style={s.father} ref='father'>
					{/* logo */}
					<img className="logo1" src="../../app/images/active_click/logo1.png"/>
					<img className="logo2" src="../../app/images/active_click/logo2.png"/>
					{/*车 */}
					<img src="../../app/images/active_click/car.png" className='in_sl_car' ref='car' style={{width:'100%',position:'absolute',top:"12%"}}/>
					{/* 细节展示 */}
					<img src="../../app/images/active_click/bac1.png" className='in_sl_bac1'/>
					<img src="../../app/images/active_click/bac2.png" className='in_sl_bac2'/>
					{/*呼吸灯外层 */}
					<div className='hxd' data-index='0' data-pd="open"></div>
					<div className='hxd' data-index='1' data-pd="open"></div>
					<div className='hxd' data-index='2' data-pd="open"></div>
					{/* 呼吸灯 */}
					<img className='hxd_img' src="../../app/images/active_click/hxd.png"/>
					<img className='hxd_img' src="../../app/images/active_click/hxd.png"/>
					<img className='hxd_img' src="../../app/images/active_click/hxd.png"/>
					{/* 亮点 */}
					<img src="../../app/images/active_click/ldl1.png" className='xstp' />
					<img src="../../app/images/active_click/ldl2.png" className='xstp' />
					<img src="../../app/images/active_click/ldl3.png" className='xstp' />
				</div>
			</div>)
	}
}

export default Active_click ;

let s={
	father:{width:'100%',background:'url(../../app/images/active_click/backg.png)',backgroundSize:'100% 100%' }
}
