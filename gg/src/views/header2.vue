<template>
	<div id="head2">
		<a class="a"></a>
		<a class="a2" @click="back"></a>
		个人中心
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
		name:'head2',
		data:function(){
			return {
				open:false 
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
			},
			back:function(){
				window.router.go(-1)
			}
		},
	}
</script>
<style type="text/css" scoped>
	#head2{
	    width: 100%;
	    position: relative;
	    font-size: 0.32rem;
	    line-height: 1rem;
	    color: #333333;
	    font-weight: 400;
        text-align: center;
	    height: 1rem;
	    background: #f5f5f5;
	    position: fixed;
	    left: 0;
	    top: 0;
	    width: 100%;
	    z-index: 300;
	    text-align: center;
	    border-bottom: 1px solid #D0D0D0;
	}
	.a{
	    position: absolute;
	    background: none;
	    width: 0.2rem;
	    height: 0.2rem;
	    border: 0.02rem solid #333;
	    border-bottom-color: transparent;
	    border-left-color: transparent;
	    top: 50%;
	    margin-top: -0.1rem;
	    left: 0.33rem;
	    -webkit-transform: rotateZ(-135deg);
	    transform: rotateZ(-135deg);
	}
	.a2{
		display: inline-block;
		background: transparent;
		width: .9rem;height: 100%;
		position: absolute;left: 0;top: 0
	}



</style>