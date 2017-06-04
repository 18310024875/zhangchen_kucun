<template>
	<div id="head">
		<!--左侧选择城市-->
		<div class="select_city" @click="chooseCity">
			<span>{{city}}</span>
		</div>
		<router-link to="/mine" class="man"><img src="src/images/public_img/man.png" /></router-link>
		<!--logo-->
		<img src="src/images/public_img/logo_03.png" class="logo">

		<!--搜索-->
		<div class="search">
			<router-link to="/search">
				<img src="src/images/public_img/search.png" alt="" />
			</router-link>
		</div>
		<!--菜单按钮-->
		<span class="nav_menu" @click="openList" >
	        <div class="hr_box hr_click_Off">
	            <i class="hr_border hr_border1"></i><br/>
	            <i class="hr_border hr_border2"></i><br/>
	            <i class="hr_border hr_border3"></i>
	        </div>
		</span>

	
	</div>
</template>
<script type="text/javascript">
	export default {
		name:'header',
		data:function(){
			return {
				open:false,
				city:'北京市'
			}
		},
		methods:{
			openList:function(){
				this.open = !this.open ;
				this.open?window.tx.$emit('openList','0'):
				window.tx.$emit('openList','100%') ;
			},
			chooseCity:function(){
				window.router.push({path:'chooseCity'})
			}
		},
		mounted:function(){
			window.tx.$on('send_city',(x)=>{
				this.city = x ;
			})
		}
	}
</script>
<style type="text/css" scoped>
	a{display: inline-block;}
	img{width: 100%}
	#head {
		height: 1rem;
		background: #fff;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		z-index: 300;
		text-align: center;
		border-bottom: 1px solid #D0D0D0;
	}

	.select_city {
		font-size: 0.24rem;
		display: inline-block;
		height: 1rem;
		line-height: 1rem;
		float: left;
		overflow: hidden;
		padding-right: 0.07rem;
		margin-left: 3.5%;
	}

	.logo{
		width: 1.92rem;
		position: absolute;
		left: 50%;top: 50%;
		transform: translate(-45%,-50%);
	}

	.search{
	    width: .38rem;
	    height: .38rem;
	    position: absolute;
	    top: .3rem;
	    right: 0.8rem;
	    cursor: pointer;
	}
	.man{
		display: inline-block;
	    width: .66rem;
	    height: .37rem;
	    padding: 0;
	    margin-top: .3rem;
	    float: left;		
	}
	.man img{width:.33rem;}

	.select_city span{float: left;}
	.select_city::after{
		content: "";display: inline-block;
		width: 0.15rem;height: 0.15rem;
		border: 1px solid gray; 
		border-top-color: transparent;
		border-left-color: transparent;
		float: left;
		transform: rotate(45deg);
		margin-top: 0.35rem;
		margin-left: 0.1rem
	}

</style>