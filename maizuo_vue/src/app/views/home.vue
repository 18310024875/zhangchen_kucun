<template>
	<section id="home">

	    <div class="swiper-container">
	        <div class="swiper-wrapper">
	        	<div class="swiper-slide" v-for="x in banner">
	        		<img :src="x.imageUrl">
	        	</div>
	        </div>
	        <div class="swiper-pagination"></div>
	    </div>

		    <ul class="m_box">
				<li v-for="(v,k) in now" @click="toDetails(v.cover.origin)">
					<img :src="v.cover.origin"/>
					<div>
						<p class="p1">{{v.name}}</p>
						<p class="p2">{{v.watchCount}}家影院上映 {{v.cinemaCount}}人购票</p>
						<span class="fen">{{v.grade}}</span>					
					</div>
				</li>
		    	<button class="more" @click="toMovie(['active',''])">
		    		更多热映电影
		    	</button>
		    </ul>

		    <div class="cut">即将上映</div>
		    <div class="cut_after"></div>

		     <ul class="m_box">
				<li v-for="(v,k) in will">
					<img :src="v.cover.origin"/>
					<div>
						<p class="p1">{{v.name}}</p>
						<p class="p2">{{v.watchCount}}家影院上映 {{v.cinemaCount}}人购票</p>
						<span class="fen">{{v.grade}}</span>					
					</div>
				</li>		    	
		    	<button class="more" @click="toMovie(['','active'])">
		    		更多即将上映电影
		    	</button>
		    </ul>
	</section>
</template>
<script type="text/javascript">
	export default {
		name:'home',
		data(){
			return {
				banner:[],
				swiper:undefined ,
				will:[],
				now:[]
			}
		},
		mounted(){
			$get('banner.json',(res)=>{
				this.banner = res.data.billboards ;
				this.$nextTick(()=>{
					this.addSiwper()
				})
			})
			$get('now_movie.json',(res)=>{
				this.now = res.data.films ;
			})
			$get('will_movie.json',(res)=>{
				this.will = res.data.films ;
			})
		},
		destroyed(){
			this.swiper.destroy(false)
		},
		methods:{
			toMovie(arr){
				window.router.push({path:'/movie',query:{arr:arr}})
			},
			addSiwper(){
		        this.swiper = new Swiper('.swiper-container', {
		            loop: true, 
		            autoplay:3000,
		            autoplayDisableOnInteraction : false,
		            pagination: '.swiper-pagination',// 如果需要分页器
		            paginationClickable:true,
		        }) ;				
			},
			toDetails(url){
				window.router.push({
					path:'/details',
					query:{
						imgUrl:url
					}
				})
			}
		}
	}
</script>