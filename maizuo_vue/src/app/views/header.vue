<template>
	<header>
		<div id="nav_bth" @click="pdMenu">
			<img src="src/images/icon/我的订单.png">
		</div>
		<span class="title">{{$store.state.headerName}}</span>
		<div id="mine_bth" @click="toMine">
			<img src="src/images/icon/我的聚划算.png">
		</div><div class="city">
		<span @click="toCitys">{{$store.state.city}}</span>
			<img src="src/images/icon/向下箭头.png">
		</div>
	</header>
</template>
<script type="text/javascript">
	export default {
		name:'header',
		data(){
			return {

			}
		},
		methods:{
			pdMenu(){
				this.$store.dispatch('changeMenu');
			},
			toMine(){
				window.router.push('/mine');
			},
			toCitys(){
				window.router.push('/citys');
			}
		}
	}


</script>