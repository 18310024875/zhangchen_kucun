<template>
	<div>
		<h2 @click="add">add</h2>
		<h2 @click="del">del</h2>
	</div>

</template>
<script type="text/javascript">
	import {mapetters,mapActions} from 'vuex'
	var obj = mapActions([
				'addxx',
				'del'
			]) ;


	export default{
		name:'list',

		methods:{
			add(){
				this.$store.dispatch('addxx')
			},
			del(){

			}
		}
		
	}
</script>
