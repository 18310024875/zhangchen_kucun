<template>
	<div class="div" ref='div'>
		<img src="src/images/miaoshalogo.png" class="ban">
		<ul class="nav">
			<li v-for="(x,k) in nav" @click="find(x.x,k)" :class="pdClass(k,1)"> 
				<span :class="pdClass(k,2)">{{x.y}}</span> 
			</li>
		</ul>
		<div class="box" ref='box'>
			<div class="hold1"></div>
			<div class="tom">

				 <div v-for="(x,index) in arr" :key="index" class="each">
				 	<div class="imgBox">
				 		<img :src="'http://union.ftms.bjscfl.com/'+x.pic_url" >
				 	</div>
				 	<p class="p1">{{''+x.name}}</p >
				 	<div class="wrap">
				 		<p>{{'¥'+wan(x.seckill_price)}}</p >
				 		<span class="miaosha">立即秒杀</span>
				 	</div>
				 	<p class="p3">
				 		指导价<span>{{wan(x.market_price)}}</span>
				 	</p >
				 	<div class="daojishi">
				 		<div class="speet" :style="{width:speet((x.end_time-x.current_time/1))}"></div>
				 		<span> {{day_arr[index]}} </span>
				 	</div>
				 </div>		

			</div>

			<div class="hold2"></div>
			<div class="footer" >
				<p class="first_line">一汽丰田汽车销售有限公司版权所有</p>
				<p>Copyright ? 2016 FAW TOYOTA Motor Sales Co., LTD</p>
				<p>京ICP备07503373号-1</p>
			</div>
		</div>

	</div>

</template>
<script type="text/javascript">

	export default {
		data:function(){
			return {
				nav:[{x:'',y:'全部'},{x:'4',y:'汽车购买'},{x:'2',y:'维修保养'},{x:'1',y:'精品零件'}],
				act:0,
				arr:[],
				load:'我是下拉实例',
				timer_arr:[], //装时间戳的数组
				day_arr:[], //装时间字符串的数组
				timer:'我是计时器' 
			}
		},
		name:'kill',
		mounted:function(){
			var d = document.querySelector('#fff');
				d.style.display='none' ;
			  this.ajax()
		},
		destroyed:function(){
			var d = document.querySelector('#fff');
				d.style.display='block' ;
		},
		beforeUpdate:function(){

		},
		updated:function(){

		},
		methods:{
			// 拼接方法
			wan:function(x){ 
				var g = Number(x);
				if(g>=10000){return (g/10000).toFixed(2) + '万起';
				}else{return (g).toFixed(2) ;}
			},
			pdClass:function(x,y){
				if(y==1){
					if(x!=3){ return 'li' }
				}else{
					if(x==this.act){ return 'active'}
				}	
			},
			find:function(x,index){
				console.log(x,index)
				this.act = index ;

				this.ajax(x)
			},
			ajax:function(type){

				clearInterval(this.timer)
				this.timer = setInterval(()=>{
					var arr1 = [] ;
					var arr2 = [] ;
					this.timer_arr.map((v,k)=>{
						v-=1;
						arr1.push(v);
						// 过滤时间戳
						var v_ = this.filterTime(v)
						arr2.push(v_);
					})
					this.timer_arr = arr1 ;
					this.day_arr = arr2 ;
				},1000)

				var page = 1 ;

				$a.post(_+'getseckill',{page:page,num:6,type:type},{emulateJSON:true})
				.then((res)=>{ console.log(res)

					var arr = res.body.data.seckill_info ;
					this.arr = arr ;
					this.timer_arr = this.makeArr(arr) ; //构造用来计时的数组;

					// 下一次更新DOM自动触发!!!
					this.$nextTick(()=>{

						this.load = $load(this.$refs.box,()=>{ // 传递进去的函数会被反复调用
							page+=1 ;

							$a.post(_+'getseckill',{page:page,num:6,type:type},{emulateJSON:true})
							.then((res)=>{ console.log(res)

								var a = res.body.data.seckill_info ;
								if( a.length==0 ){ alert('没有更过了') ; return }
								else{
									var arr=this.arr.concat(a) ;
									this.arr = arr ;

									// 下一次更新DOM自动触发!!!
									this.$nextTick(()=>{
										this.load.once=true ;//重加载!										
									})// nextTick2 over
								}
							})//then2
						})
					})// nextTick1 over
				}) //then1
			},
		// 秒杀显示条 
			speet:function(s){
				var def_time = 86400*15 ;
				var w = '100%';
				s<def_time?w = Number(s/def_time)*100+'%':null;
				return w ;
			},
		// 倒计时函数
			countDown:function(s){

			},
		// 构造新数组
			makeArr:function(x){
				var arr = []
				x.map((v,k)=>{
					arr.push(Number(v.end_time-v.current_time))
				})
				return arr ;
			},
			filterTime:function(s){
				var minute = 0 //分
				var hour   = 0 //时
				var day    = 0 //天

			// 判断分钟
				if(parseInt(s/60)==0){
					// 初始值不变
				}else{
					minute=parseInt(s/60) ; s=s%60 ;
				}
			// 判断小时
				if(parseInt(minute/60)==0){
					// 不变
				}else{
					hour=parseInt(minute/60) ; minute=minute%60 ;
				}
			// 判断天数
				if(parseInt(hour/24)==0){
					// 不变
				}else{
					day=parseInt(hour/24) ; hour=hour%24
				}
				return day+'天'+hour+'小时'+minute+'分'+s+'秒'

			}			
		},

	}








 
// var run = function( s ){
// 	var r_time = undefined ;

//   //时钟
// 	// 1 初始值----------
// 	var minute = 0 //分
// 	var hour   = 0 //时
// 	var day    = 0 //天

// 	// 2 根据s判断----------
// 	if(s<=0){
// 	  //不符合 倒计时已经过期
// 	  return '秒杀结束' ;
	
// 	}else{
// 	  //这里的秒肯定大于0 ;

// 		// 判断分钟
// 		if(parseInt(s/60)==0){
// 			// 初始值不变
// 		}else{
// 			minute=parseInt(s/60) ; s=s%60 ;
// 		}

// 		// 判断小时
// 		if(parseInt(minute/60)==0){
// 			// 不变
// 		}else{
// 			hour=parseInt(minute/60) ; minute=minute%60 ;
// 		}

// 		// 判断天数
// 		if(parseInt(hour/24)==0){
// 			// 不变
// 		}else{
// 			day=parseInt(hour/24) ; hour=hour%24
// 		}
// 	}

// 	// 初始化结束开始倒计时
// 	this.timer = setInterval(function(){
// 		s-=1;
// 		// 计算秒
// 		if(s==-1){
// 			minute-=1;
// 			s=59;
// 			// 计算分
// 			if(minute==-1){
// 				hour-=1;
// 				minute=59;
// 				// 计算小时
// 				if(hour==-1){
// 					day-=1;
// 					hour=23;
// 					// 计算天
// 					if(day==-1){
// 						day=0;
// 					}
// 				}			
// 			}		
// 		}
// 		if(s==0&&minute==0&&hour==0&&day==0){
// 			span.html('秒杀结束')
// 			clearInterval(timer) ;return ;
// 		}

// 		// 过滤显示时间
// 		var s_ ; var minute_ ; var hour_
// 		if(s<10){
// 			s_="0"+s.toString()
// 		}else{s_=s}
// 		if(minute<10){
// 			minute_="0"+minute.toString()
// 		}else{minute_=minute}
// 		if(hour<10){
// 			hour_="0"+hour.toString()
// 		}else{hour_=hour}
// 		if(day==0){
// 			if(hour==0){
// 				if(minute==0){
// 					span.html( s+'秒') ;return;
// 				}
// 				span.html( minute+'分'+s_+'秒') ;return;
// 			}
// 			span.html( hour+'小时'+minute_+'分'+s_+'秒') ;return;	
// 		}
// 		span.html( day+'天'+hour_+'小时'+minute_+'分'+s_+'秒')
// 		// 剩余时间 : 
// 	},1000)
// }



	






</script>
<style type="text/css" scoped>
	.div{
		background: #C60000;
	}
	.ban{
		width: 100%;vertical-align: top;
	}
	.nav{
	width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    box-shadow: 0 2px 8px rgba(2,2,2,0.8);
	}
	.nav li{
	float: left;
    width: 25%;
    font-size: 0.28rem;
    color: white;
    background: #E71300;
    position: relative;
    transition: background 0.3s;
    /*overflow: hidden;*/
	}
	.nav li span{
		float: left;
		width: 100%;
		background: transparent;
		position: relative;z-index: 1;
	}
	.nav li:nth-of-type(1){
		overflow: hidden;
	}
	.nav li .active{
		background: rgb(255, 55, 36);
	}
	.nav li .active::before{
		content: '';display: inline-block;
		width: 2px ;height: 0.8rem;
		background: rgb(255, 55, 36);
		position: absolute;left: -2px;
	}
	.nav .li::after{
		content: '';display:inline-block;
		width: 1px;height: 0.38rem;
		border-right: 1px solid #FE3221;
		background:#C00000;
		position: absolute;
		right: 0px;top: 0.2rem;
	}

	.box{
		width: 100%;
	    height: 11rem;
	    position: relative;
	    overflow: auto;
	}
	.tom{
		width: 90%;
		margin-left: 5%;
		overflow: hidden;
	}

	.each{
	width: 2.75rem;
    box-sizing: border-box;
    border: 2px solid #FFFF25;
    background: white;
    margin-bottom: 0.24rem;
    height: 3.98rem;
    position: relative;
    overflow: hidden;
	}
	.each:nth-of-type(odd) {
	    float: left;
	}
	.each:nth-of-type(even) {
	    float: right;
	}
	.imgBox{
	width: 100%;
    height: 1.71rem;
    overflow: hidden;
    background: #f0f0f0;
	}
	.imgBox img{width: 100%}
	.p1{
    height: 0.5rem;
    line-height: 0.5rem;
    background: white;
    margin-top: 0.15rem;
    font-size: 0.25rem;
    font-weight: bold;
    text-indent: 0.15rem;
	}
	.wrap{
	height: 0.4rem;
    line-height: 0.4rem;
    margin-top: 0.05rem;
    background: white;
    position: relative;
	}
	.wrap p {
	float: left;
    font-size: 0.25rem;
    color: #FE0000;
    text-indent: 0.15rem;
	}
	.miaosha{
    width: 1rem;
    height: 0.4rem;
    line-height: 0.4rem;
    box-sizing: border-box;
    border: 1px solid #FE0000;
    color: #FE0000;
    font-size: 0.19rem;
    text-align: center;
    position: absolute;
    right: 0.06rem;
	}
	.p3{
    background: white;
    margin-top: 0.12rem;
    font-size: 0.2rem;
    color: gray;
    text-indent: 0.2rem;
    white-space: nowrap;
	}
	.p3 span{
	text-decoration: line-through;
    font-size: 0.23rem;
	}
	.daojishi{
    width: 92%;
    height: 0.3rem;
    position: absolute;
    bottom: 0.22rem;
    left: 4%;
    background: #BBBBBB;
    border-radius: 11px;
    text-align: center;
    line-height: 0.3rem;
    font-size: 0.18rem;
    color: white;
    overflow: hidden;
	}
	.daojishi span{
    position: absolute;left: 0;top: 1px;
    width: 100%;
    z-index: 1;
    font-size: 0.18rem;
	}
	.speet{
    height: 0.3rem;
    background: #FE0000;
    width: 55%;
    border-radius: 0.1rem;
	}
	.hold1{
		width: 100%;height: .35rem;
	}
	.hold2{
		width: 100%;height: .5rem;
	}
	.footer{
		width: 100%;
	    background: #9D0000;
	    color: white;
	    font-size: 0.24rem;
	    text-align: center;
	    padding-bottom: 0.1rem;
	}
	.footer p {
    	line-height: 0.5rem;
	}
	.first_line {
	    padding-top: 0.3rem;
	}


</style>