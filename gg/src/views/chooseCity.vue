<template>
	<div>
		<p class="tit">选择城市</p>
		<div v-for="(v,k) in arr" class="each">
			<p class="btop">{{k}}</p>
			<div v-for="province in v">
				<p class="pro" :province="province.id" @click="c(province,$event)" >
					{{province.province}}
					<span class="rot right"></span>
					<span class="rot down"></span>
				</p>
				<div v-if="city(province)" class="sel">
					<ul class="ul">
						<h1></h1>
						<li class="long" v-for="x in city(province)" :city='x.id' 
							@click="send_city(x,$event,province)"> {{x.city}} 
						</li>
						<h1></h1>
					</ul>					
				</div>

			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:'chooseCity',
		data:function(){
			return{
				arr:[],
				old:undefined
			}
		},
		mounted:function(){
			var that = this ;
			$a.post(_+'getcity',{},{emulateJSON:true})
			.then(function(res){
				that.arr = res.body.data ;
			})
		},
		methods:{
			city:function(x){
				if(x.child.length==0){
					return false
				}else{
					return x.child
				}
			},
			c:function(s,e){
				var t = e.target.nextElementSibling ;

				s.open==undefined?s.open=true:s.open=!s.open ;//标准限定
				if(this.old==t){
					s.open?$slideDown(t):$slideUp(t) ;					
				}else{
					this.old?$slideUp(this.old):null ;
					$slideDown(t) ;
				}
				this.old = t ;
			},
			send_city:function(x,e,province){
				window.tx.$emit('send_city',x.city) ;
				$slideUp(e.target.parentNode.parentNode)
				province.open = !province.open ;
				// console.log(province)
			}
		}
	}
</script>
<style type="text/css" scoped>
	.tit{
		height: 1.2rem;
	    line-height: 1.2rem;
	    text-align: center;
	    font-size: 0.35rem;
	    font-weight: bold;
	    letter-spacing: 2px;
	}
	.btop{
		height: 0.4rem;
	    padding-left: 0.3rem;
	    background: #F5F5F3;
	    color: gray;
	    font-size: 12px;
	    line-height: 0.4rem;
	    position: relative;
	    top: -1px;
	    z-index: 1;
	}
	.pro{
		height: 0.97rem;
	    line-height: 0.97rem;
	    width: 90%;
	    margin-left: 5%;
	    border-bottom: 1px solid #ccc;
	    font-size: 0.29rem;
	    font-weight: bold;
	    letter-spacing: 2px;
	    position: relative;
	}
	.down{
		display: none;
	}
	.ul{
		overflow: hidden;
	}
	.ul h1{
	    width: 100%;
	    height: 0.15rem;
	    float: left;
	}
	.ul li{
		float: left;
	    font-size: 0.26rem;
	    color: #333;
	    height: 0.74rem;
	    width: 25%;
	    line-height: 0.74rem;
	    text-align: center;
	    text-indent: 0.25rem;
	}




</style>