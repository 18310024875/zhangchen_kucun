<template>
	<div class="fix">
		<div class="head">
			<div class="back" @click="back"><img src="src/images/public_img/return_icon.png"></div>
			<div class="inpBox">
				<img src="src/images/public_img/seach_icon.png">
				<input type="text" placeholder="搜索你想找的车型或服务" v-model="key" 
					@click="clearInput">
			</div>
			<div class="search" @click="find">
				搜索
			</div>
		</div>
		<div class="main" ref="main">
			<div class="hot" :style="{display:display}" >
				<img src="src/images/public_img/hot_icon.png">
				<h3>热门搜索</h3>
			</div>
			<ul class="ul"  :style="{display:display}" >
				<li v-for="(v,k) in hot_arr" @click="sendFind( v )">
					<b>{{k}}</b>
					<span>{{v}}</span>
				</li>
			</ul>
			<h5  :style="{display:display}" ></h5>
			<div class="hot"  :style="{display:display}" >
				<img src="src/images/public_img/seach_icon2.png">
				<h3>搜索记录</h3>
			</div>
			<ul class="ul" style="border-bottom:1px solid #ccc"  :style="{display:display}" >
				<li v-for="(v,k) in locals" @click="sendFind( v )" >
					<i></i>
					<span>{{v}}</span>
				</li>
			</ul>
			<div class="clear"  :style="{display:display}" 
				@click="remove_localStorage" >清空历史记录</div>

		<!-- 搜索到的商品 -->
	    	<ul class="for_ul">
	    		<li v-for="x in arr" >
	    			<img :src="x.thumb" />
	    			<p class="p1 long">{{x.goods_name}}</p>
	    			<p class="p2">
	    				官方指导价：￥<span class="t">{{wan(x.price)}}</span>
	    			</p>
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
		name:'search',
		data:function(){
			return {
				display:'block', // 可控制后退层级
				key:'',
				arr:[],
				load:undefined, // 用来执行刷新
				hot_arr:['全新VIOS 威驰','车漆保护膜','倒车雷达','新COROLLA 卡罗拉'],
				locals:[],
			}
		},
		mounted:function () { 
			var arr=[];
			if(!localStorage.getItem('all')){
				localStorage.setItem('all',JSON.stringify(arr))
			}else{
				arr = JSON.parse(localStorage.getItem('all'))
			}
			this.locals = arr ;
		},
		destroyed:function(){
			this.load?this.load.destroy():null ;
		},
		methods:{
			// 拼接方法
			wan:function(x){ 
				var g = Number(x);
				if(g>=10000){return (g/10000).toFixed(2) + '万起';
				}else{return (g).toFixed(2) + '万起' ;}
			},
			// 查找方法
			find:function(){ 
				// 首先先清空 load , 重置 arr
				if(this.load){
					this.load.destroy();
					this.arr=[] ;
				} // 重置结束

				var that = this ;
				var page = '1';
				if(Number(this.key)==0){ this.key=""; alert('输入有误'); return; } ;
				// ajax
				$a.post(_+'getsearchdata',{page:page,key:this.key,num:'10'},{emulateJSON:true})
				 .then(function(res){
				 	var arr = res.body.data.search_info ;
				 	console.log(res.body)
				 	if(arr.length==0){ ;that.key=""; alert('没有查询到商品'); return; }
				 	that.display='none';
				 	that.arr=arr ;

				 	that.add_localStorage(that.key);

				   // 调用下拉加载
					let m = that.$refs.main ;
					that.load = $load(m,function(){
						var page_=Number(page)+1;
						page=page_.toString();
						// ajax
						$a.post(_+'getsearchdata',{page:page,key:that.key,num:'10'},{emulateJSON:true})
						.then(function(res){ console.log(res.body)
							var arr = res.body.data.search_info ;
							if(arr.length==0){ alert('没有更过了') ; return }
							else{
								that.arr=that.arr.concat(that.arr,arr) ;
								that.load.once=true ;//重加载!
							}
						})
					})
				   // 调用下拉加载over
				 })	
			},
			// 清空input
			clearInput:function(){
				this.key='' ;
			},
			// 回退按钮
			back:function(){
				this.load?this.load.destroy():null ; //先注销

				if(this.display=='block'){
					window.router.go(-1) ;
					return ;
				} ;

				this.display='block' ;
				this.arr=[] ;
				this.key='';
			},
			// 点击热门搜索
			sendFind:function(x){
				this.display='none' ;
				this.key = x ;
				this.find() ;
			},
			// 处理localStorage
			add_localStorage:function(x){
				var arr = JSON.parse(localStorage.getItem('all')) ;
				if(arr.indexOf(x)!=-1){ return } ;
				arr.length==4?arr.shift():null ;
				arr.push(x) ;	
				localStorage.setItem('all',JSON.stringify(arr)) ;
				this.locals = arr ;								
			},
			remove_localStorage:function(){
				localStorage.removeItem('all') ;
				this.locals = [] ;
			}
		} // methods over

	}


</script>
<style type="text/css" scoped>
	.fix{
		position: fixed;
		top: 0;left: 0;
		right: 0;bottom: 0;
		z-index: 999;
		overflow: hidden;
		color: #333;
	}
	.head{
		padding: .24rem 0 .28rem 0;
 	    border-bottom: 1px solid #cdcdcd;
	    background: white;
	    width: 100%;
	    overflow: hidden;		
	}
	.head>div{
		float: left;
		height: 0.65rem;line-height: 0.65rem;
		position: relative;
	}
	.inpBox {
		height: 0.65rem;
		border: 1px solid #ccc;
		width: 70%;
	}
	.back img{
		width: 0.2rem;
		position: absolute;top: 0.14rem;left: 0.3rem;
	}
	.inpBox img{
		width: 0.32rem;
		position: absolute;
		left: 0.15rem;top: 0.15rem;
	}
	.inpBox input {
		width: 100%;
		float:left;
		height: 0.64rem;
		border:none;
		font-size: 0.28rem;
		text-indent: 0.65rem;
	}
	.back{
		width: 0.78rem;
	}
	.search{
		font-size: .28rem;
	    line-height: .65rem;
	    color: #333;
	    font-weight: bold;
	    margin-left: .2rem;
	}

	.main{
		height: calc(100% - 1.22rem);
		width: 100%;background: white;
		overflow: scroll;
		font-size: .3rem;
	}
	.hot{
		width: 6rem;font-size: .26rem;
	    border-bottom: 1px solid #dcdcdc;
	    height: .9rem;line-height: 0.9rem;
	    margin-right: auto;
	    margin-left: auto;
	    position: relative;
	    top: 0.08rem;
	}
	.hot img{height: 0.35rem;margin-left: 0.1rem;margin-right: 0.1rem;position: relative;top: 0.05rem}
	.hot h3{display: inline-block;color: #444}
	.ul{
		overflow: hidden;
	    padding: 0.45rem 0 0.45rem 0.5rem;
	    font-size: .3rem;
	}
	.ul li{
	float: left;
    width: 50%;
    line-height: .3rem;
    margin-bottom: .3rem;
    color: #666;
    margin-top: 0.08rem;
    display: block;
	}
	.ul span{
	text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    width: 2.3rem;
	}
	.ul b{
	display: inline-block;
	float: left;
	width: .3rem;
    height: .3rem;
    background: #f81818;
    color: #fff;
    line-height: .3rem;
    text-align: center;
    margin-right: .15rem;
    border-radius: 3px;
    font-size: .24rem;
    font-weight: bold;
	}
	.ul li:nth-of-type(3) b{
		background: #f8c703
	}
	.ul li:nth-of-type(4) b{
		background: #cbcbcb
	}
	.ul i{
	width: 0.03rem;
    height: 0.3rem;
    background: #f8c703;
    display: block;
    margin-right: .18rem;
    float: left;
	}
	.clear{
	margin: 0.7rem auto .7rem auto;
    display: block;
    width: 3.12rem;
    height: .67rem;
    background: #f8f8f8;
    border: 1px solid #dcdcdc;
    text-align: center;
    line-height: .67rem;
    border-radius: 3px;
    font-size: .3rem;
    color: #666;
	}





</style>