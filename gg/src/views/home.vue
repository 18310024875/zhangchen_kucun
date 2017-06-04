<template>
	<div id="home">
	<!-- swiper -->
	    <div class="swiper-container">
	        <div class="swiper-wrapper">
	           <div class="swiper-slide"><img src="src/images/banner01.jpg"/></div>
	           <div class="swiper-slide"><img src="src/images/grzx-tj-img.png"/></div>
	           <div class="swiper-slide"><img src="src/images/map_haoyou.jpg"/></div>
	        </div>
	        <div class="swiper-pagination"></div>
	    </div>  
	<!-- nav -->
	    <ul class="nav">
	    	<li>
	    		<img src="src/images/public_img/buy.png" />
	    		<p>官方渠道，正品保障</p>
	    	</li>
	    	<li>
	    		<img src="src/images/public_img/play.png" />
	    		<p>优惠活动，一键参与</p>
	    	</li>
	    	<li>
	    		<img src="src/images/public_img/raise.png" />
	    		<p>实力保障，放心养车</p>
	    	</li>
	    </ul>
	    <h5></h5>
	<!-- hot -->
	    <div class="part1">
	    	<div class="hot hot1">
	    		<b >猜你喜欢</b>	    	
	    		<a ><i></i><i></i><i></i></a>
	    	</div>
	    	<ul class="ul">
	    		<li v-for="x in hot" >
	    			<img v-bind:src="add(x.thumb)" />
	    			<p class="p1 long">{{x.name}}</p>
	    			<p class="p2">
	    				官方指导价：￥<span class="t">{{wan(x.price)}}</span>
	    			</p>
	    			<p class="p3 long">
	    				商城价：<span class="red">{{wan(x.shop_price)}}</span>
	    			</p>
	    		</li>
	    	</ul>
	    </div>
	    <h5 style="border-top:none"></h5>
	<!-- cpt -->
	    <div class="part2">
	    	<div class="hot hot2">
	    		<b>热门零件</b>
	    		<a ><i></i><i></i><i></i></a>	    		
	    	</div>
	    	<ul class="ul">
	    		<li v-for="x in cpt" >
	    			<img v-bind:src="add(x.thumb)" />
	    			<p class="p1 long">{{x.name}}</p>
	    			<p class="p2">
	    				官方指导价：￥<span class="t">{{wan(x.price)}}</span>
	    			</p>
	    			<p class="p3 long">
	    				商城价：<span class="red">{{wan(x.shop_price)}}</span>
	    			</p>
	    		</li>
	    	</ul>
	    </div>
	<!-- active -->
	    <div class="part3">
	    	<div class="hot hot3">
	    		<b>热门活动</b>
	    		<a ><i></i><i></i><i></i></a>	    		
	    	</div>
	    	<ul class="aul">
	    		<li v-for="x in active" >
	    			<img v-bind:src="add(x.pc_pic)" />
	    			<p class="ap1">{{x.title}}</p>
	    			<div class="ap2">
	    				<img src="src/images/public_img/icon_left.png">
	    				{{x.start_time+'至'+x.end_time}}
	    			</div>
	    		</li>
	    	</ul>
	    	<div class="more">查看更多 > </div>
	    </div>
	<!-- guess -->
	    <div class="part4">
	    	<div class="hot hot4">
	    		<b>猜你喜欢</b>
	    		<a class="change" @click="change">换一批</a>	    		
	    	</div>
	    	<ul class="ul">
	    		<li v-for="x in guess" >
	    			<img v-bind:src="add(x.thumb)" />
	    			<p class="p1 long">{{x.name}}</p>
	    			<p class="p3 long">
	    				商城价：<span class="red">{{wan(x.shop_price)}}</span>
	    			</p>
	    		</li>
	    	</ul>
	    </div>

	</div>
</template>
<script type="text/javascript">
	export default {
		name:'home',
		data:function(){
			return {
				swiper:'',
				hot:[],
				cpt:[],
				active:[],
				guess:[]
			}
		},
		mounted:function(){ //alert('mmmm')
		// swiper
		      this.swiper = new Swiper('.swiper-container', {
		        // onSlideChangeEnd: function(swiper){
		        //     s_index = swiper.activeIndex ;
		        // },
		        loop: true, 
		        // autoplay:3000,
		        autoplayDisableOnInteraction : false, 
		        // 如果需要分页器
		        pagination: '.swiper-pagination',
		        paginationClickable:true,
		      })  ;

	// 数据
		var that = this;
		// 热门车型
		    $a.post(_+'gethotcar',{},{emulateJSON:true})
			.then(function(res){
			  // console.log(res.body)
			  that.hot = res.body.data ;
			})
		// 热门零件
			$a.post(_+'gethotbout',{},{emulateJSON:true})
			.then(function(res){
				// console.log(res.body.data)
				that.cpt = res.body.data ;
			})
		// 热门活动
			$a.post(_+'gethotactive',{},{emulateJSON:true})
			.then(function(res){
				// console.log(res.body.data)
				that.active = res.body.data ;
			})
		// 猜你喜欢
			$a.post(_+'guessyoulike',{},{emulateJSON:true})
			.then(function(res){
				// console.log(res.body.data)
				that.guess = res.body.data ;
			})

		},
		methods:{
			//拼接方法
			add:function(x){
				return img_+x ;
			},
			wan:function(x){ 
				var g = Number(x);
				if(g>=10000){return (g/10000).toFixed(2) + '万起';
				}else{return (g).toFixed(2) + '万起' ;}
			},
			change:function(){
				var that = this ;
				$a.post(_+'guessyoulike',{},{emulateJSON:true})
				.then(function(res){
					// console.log(res.body.data)
					that.guess = res.body.data ;
				})				
			}
		},
		
		destroyed:function(){
		    this.swiper.destroy(false) 
	    }
	}
</script>
<style type="text/css" scoped>
	#home .swiper-container{
		height: 3.4rem;width: 100%;
	}
	#home .swiper-container img{
		width: 100%;height: 3.4rem;
	}
	.nav{
		overflow: hidden;
	    padding-top: .35rem;
	    padding-bottom: .35rem;
	    /*border-bottom: 1px solid #dcdcdc;*/
	    background: #fff;
	}
	.nav li{
	    float: left;
	    width: 33.3%;
	    text-align: center;
	    box-sizing: border-box;
	    border-right: 1px solid #ccc;
	    position: relative;
	    height: 1.76rem;
	}
	.nav li:nth-of-type(3){
		border: none;
	}
	.nav li img{
		width: 1.3rem;

		position: relative;
		left: 0.1rem;
	}
	.nav li p{
		position: absolute;
		bottom: 0;
		text-align: center;
		font-size: 0.2rem;
		line-height: 0.3rem;
		padding: 0 0.2rem;
		color: black;
	}

.hot{
    height: .9rem;
    line-height: .9rem;
    font-size: .32rem;
    color: #333;
    border-bottom: 1px solid #dcdcdc;	
    padding: 0 0.25rem 0 0.3rem;
}
.hot a {
    display: block;
    float: right;
}
.hot a i {
    width: 0.1rem;
    height: 0.1rem;
    display: inline-block;
    background: #d0d0d0;
    border-radius: 50%;
    margin-left: 0.1rem
}
.hot1 b {
    background: url(../images/public_img/icon_car.png) left center no-repeat;
    background-size: .37rem .37rem;
       padding-left: 0.5rem
}
.hot2 b {
    background: url(../images/public_img/icon_part.png) left center no-repeat;
    background-size: .37rem .37rem;
       padding-left: 0.5rem
}
.hot3 b {
    background: url(../images/public_img/icon_gift.png) left center no-repeat;
    background-size: .37rem .37rem;
       padding-left: 0.5rem
}
.hot4 b {
    background: url(../images/public_img/icon_like.png) left center no-repeat;
    background-size: .37rem .37rem;
       padding-left: 0.5rem
}
.ul {
	overflow: hidden;
}
.ul li:nth-of-type(even){
	border-right: 1px solid white;
}
.ul li{
	float: left;
    border-bottom: 1px solid #dcdcdc;
    border-right: 1px solid #dcdcdc;
    padding-left: .25rem;
    padding-right: .25rem;
    width: 2.68rem;
    padding-bottom: .3rem;
    position: relative;
}
.ul li img{
	width: 100%;
	margin-top: .45rem;
}
.p1{
	font-weight: bold;
	font-size: .28rem;
	margin-top: 0.1rem;
}
.p2,.p3{
	line-height: 0.33rem;
	color: gray;
	margin-top: 0.1rem;
	font-size: .2rem;
}
.p3{margin-top: .07rem}

.part2 ul li img{
	width: 100%;height: 1.5rem
}
.aul{
	overflow: hidden;
}
.aul li{
	width: 100%;
}
.aul img{width: 100%}
.ap1{
	padding: 0.1rem 0.5rem;font-size: .3rem;
}
.ap2{
	font-size: .24rem;color: gray;
	padding: 0.2rem 0.5rem;
	padding-top: .1rem
}
.ap2 img{
	width: 0.35rem;
	vertical-align: middle;
	position: relative;top: -0.05rem;margin-right: 0.05rem;
}
.more{
    width: 100%;
    text-align: center;
    height: .8rem;
    line-height: .8rem;
    border-bottom: 1px solid #dcdcdc;
    border-top: 1px solid #dcdcdc;
    color: #999;
    font-size: .26rem;
}
.change{
    font-size: .24rem;
    color: #999;
    background: url(../images/public_img/icon_sx.png) left center no-repeat;
    background-size: .26rem .26rem;
    padding-left: .35rem;
}
.part4  img{height: 1.4rem;}
.part4 li{
	height: 3rem;
}

</style>




















   