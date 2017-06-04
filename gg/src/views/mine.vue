<template>
	<div>
		<div class="part1">
			<img src="src/images/grzx-bg.png"/>
			<div class="center">
				<img src="src/images/jxd-img.png">
			</div>
			<p>18310024875</p>
			<a class="sz"></a>
			<a class="mes"><i v-if="message!=0">{{message}}</i></a>
		</div>
		<ul class="part2">
			<li>
				<img src="src/images/public_img/grzx-nav1.png">
				<p>我的预约</p>
			</li>
			<li>
				<img src="src/images/public_img/grzx-nav2.png">
				<p>我的订单</p>
			</li>
			<li>
				<img src="src/images/public_img/grzx-nav3.png">
				<p>我的卡卷</p>
			</li>
		</ul>
		<h5></h5>
		<ul class="part3">
			<li>
				<em></em>
				<i></i>我的礼包
			</li>
			<li>
				<em></em>
				<i></i>我的收藏
			</li>
			<li>	
				<em></em>
				<i></i>邀请好友 <span class="sp">推荐好品，赢得好礼</span>
			</li>
			<li>
				<em></em>
				<i></i>丰田足记
			</li>
		</ul>
		<h5 style="border-top:none"></h5>
		<div class="tuijian">
			<p>为您推荐</p>
		</div>
	<!-- active -->

    	<ul class="aul">
    		<li v-for="x in tuijian" >
    			<img v-bind:src="add(x.pc_pic)" />
    			<p class="ap1">{{x.title}}</p>
    			<div class="ap2">
    				<img src="src/images/public_img/icon_left.png">
    				{{x.start_time+'至'+x.end_time}}
    			</div>
    		</li>
    	</ul>








	</div>
</template>
<script>
	export default {
		name:'mine',
		data:function () {
			return {
				message:1,
				tuijian:[]
			}
		},
		mounted:function(){

			var that = this;
			var ip = returnCitySN['cip']
			$a.post(_+'login',{username:18310024875,pwd:123456,ip:ip},{emulateJSON:true})
			.then(function(res){console.log(res.body)})
		// 热门活动
			$a.post(_+'gethotactive',{},{emulateJSON:true})
			.then(function(res){ 
				// console.log(res.body.data)
				that.tuijian = res.body.data ;
			}) ;
		// 总消息
			$a.post(_+'getmsg',{static:undefined,page:1,num:8},{emulateJSON:true})
			.then(function(res){
				console.log(res.body)
			})
		},
		methods:{
			//拼接方法
			add:function(x){
				return img_+x ;
			},
		}
	}
</script>
<style type="text/css" scoped>
	.part1 {
		width: 100%;height: 4.7rem;position: relative;
	}
	.part1 img{
		width: 100%;height: 100%;
		position: absolute;left: 0;top: 0;
	}
	.part1>p{
    /*display: inline-block;*/
    font-size: 0.26rem;
    color: #fff;
	position: absolute;
    width: 100%;
    height: 0.32rem;
    top: 3rem;
    left: 0;
    text-align: center;
    line-height: 0.32rem;
	}
	.center{
    position: absolute;
    top: 0.8rem;
    left: 50%;
    margin-left: -0.9rem;
    width: 1.8rem;
    height: 1.8rem;
    display: block;
    overflow: hidden;
    border-radius: 50%;
    border: 3px solid rgba(255,255,255,0.8);
    box-shadow: 0 0 10px 4px rgba(255,255,255,0.6);
	}
	.sz{
	position: absolute;
    top: 0.3rem;
    right: 1.2rem;
    width: 0.34rem;
    height: 0.34rem;
    background: url(../images/public_img/grzx-sz-icon.png) no-repeat center;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
	}
	.mes{
	position: absolute;
    top: 0.3rem;
    right: 0.5rem;
    width: 0.34rem;
    height: 0.34rem;
    background: url(../images/public_img/grzx-xx-icon.png) no-repeat center;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
	}
	.mes i{
	display: block;
    border-radius: 50%;
    height: 0.3rem;
    line-height: 0.3rem;
    width: 0.3rem;
    background: #fff;
    position: absolute;
    top: -0.11rem;
    left: 0.2rem;
    font-size: 10px;
    font-style: normal;
    text-align: center;
	}
	.part2{
    display: flex;
    height: 2.33rem;
    padding: 0 0.3rem;
	}
	.part2 li{
		flex: 1;
	    padding-top: 0.45rem;		
	}
	.part2 li>img{
	margin: 0 auto;
    display: block;
    width: 0.88rem;
    height: 0.88rem;
	}
	.part2 li>p{
		margin-top: 0.15rem;
	    width: 100%;
	    text-align: center;
	    font-size: 0.22rem;
	    color: #666;
	}
	.part3>li{
	display: block;
    position: relative;
    padding: 0 0.3rem;
    height: 0.9rem;
    line-height: 0.9rem;
    color: #333333;
    font-size: 0.28rem;
    border-bottom: 1px solid #ccc;
	}
	.part3 i{
	position: absolute;
    content: " ";
    background: none;
    width: 0.17rem;
    height: 0.17rem;
    border: 0.02rem solid #dcdcdc;
    border-bottom-color: transparent;
    border-left-color: transparent;
    top: 50%;
    margin-top: -0.1rem;
    right: 0.33rem;
    -webkit-transform: rotateZ(7deg);
    transform: rotateZ(45deg);
	}
	.part3 em{margin-right: 0.15rem}
	.part3 li:nth-of-type(1) em{display: inline-block;
    width: 0.30rem;
    height: 0.30rem;
    background: url(../images/public_img/grzx-list-lw.png) no-repeat center;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
	} 
	.part3 li:nth-of-type(2) em{display: inline-block;
    width: 0.33rem;
    height: 0.33rem;
    background: url(../images/public_img/grzx-liet-sc.png) no-repeat center;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;		
	} 
	.part3 li:nth-of-type(3) em{display: inline-block;
	width: 0.36rem;
    height: 0.26rem;
    background: url(../images/public_img/grzx-list-yq.png) no-repeat center;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;	
	} 
	.part3 li:nth-of-type(4) em{display: inline-block;margin-right: 0.24rem;position: relative;left: 0.07rem;
	width: 0.24rem;
    height: 0.36rem;
    background: url(../images/public_img/grzx-list-zj.png) no-repeat center;
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;	
	} 
	.sp{
	    color: #999999;
    float: right;
    font-size: 0.24rem;
    font-style: normal;
    overflow: hidden;
    padding-right: 0.3rem;
    text-align: right;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 3rem;
	}
	.tuijian>p{
		height: 1.1rem;line-height: 1.1rem;
		text-align: center;
		font-size: 0.3rem;
		letter-spacing: 0.05rem;
		font-weight: bold;
	}
	.aul img{ width: 100%;}
	.ap1{
	padding: 0.1rem 0.5rem;
    font-size: .3rem;
	}
	.ap2{
	font-size: .24rem;
    color: gray;
    padding: 0.2rem 0.5rem;
    padding-top: .1rem;
	}
	.ap2 img{
	width: 0.35rem;
    vertical-align: middle;
    position: relative;
    top: -0.05rem;
    margin-right: 0.05rem;
	}







</style>