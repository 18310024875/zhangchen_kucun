<template>
	<section id="main">
		<Nav_menu></Nav_menu>

		<transition name="fade" mode="in-out">
			<router-view></router-view>
		</transition>

	</section>
</template>
<script type="text/javascript">
	import Nav from './nav.vue' ;

	export default {
		name:'main',
		components:{
			Nav_menu:Nav
		},
		watch: {
		    $route(to, from) {
		    	console.log(to,from)
		    }
		},
		mounted(){
			console.log(this.$state)
		}
	}
</script>