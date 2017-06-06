import React,{Component} from 'react' ;

class BDmap extends Component {
	constructor(props){
		super(props) 
		this.map = '' ;
		this.size = 12 ;
	}

	componentDidMount(){
		setTimeout(()=>{
			if(navigator.geolocation){
				try{
					navigator.geolocation.getCurrentPosition((p)=>{
					 	var coords = p.coords;
						var str = p.coords.latitude+'维度<br/>'+p.coords.longitude+'精度<br/>'
						var w = p.coords.latitude;
						var j = p.coords.longitude;	

						this.showMap({},j,w)
					})
				}catch(e){}

			}else{
				alert('获取地理位置失败 默认位置:深圳')
				this.showMap({},114.011,22.333)
			}
			// this.showMap({type:'openCity',city:'北京'},114.011,22.333)	

		},500)

	
	
	}

	showMap(obj,j,w){
		// 地图初始化
		this.map = new BMap.Map('allmap') ;  // 创建Map实例

		this.map.addControl( new BMap.MapTypeControl() )
		this.map.addControl( new BMap.NavigationControl() )
		this.map.enableScrollWheelZoom(true) ;  // 开启鼠标滚轮缩放

		if(obj.type=='openCity'){
			this.map.centerAndZoom(obj.city,this.size) ;
		}else{
			// alert('non')
			this.map.centerAndZoom(new BMap.Point(j,w), this.size) ; 
		}

		// 搜索关键字
		var local = new BMap.LocalSearch(this.map,{
			renderOptions:{map:this.map,panel:"r-result"}
		})
		local.search("丰田");  

		var options = {      
		      onSearchComplete: function(results){      
		          if (local.getStatus() == BMAP_STATUS_SUCCESS){      
		                // 判断状态是否正确      
		              console.log(results)     
		          }      
		      }      
		 };      
		// var local = new BMap.LocalSearch(this.map, options); 
		// local.search("丰田");     

		// var local2 = new BMap.LocalSearch(this.map,{ renderOptions:{map: this.map, autoViewport: true}}); 
		// local2.search("丰田");
			this.map.addEventListener("tilesloaded",function(){
				// alert("地图加载完毕")
			});

	}

	componentWillReceiveProps(next){
		console.log(next.city)
		if(next.city!=''){
			this.showMap({type:'openCity',city:next.city},1,1) 

		}
	}

	render(){
		return (
			<div style={s.mapbox}>
				<div id='allmap' style={s.map}></div>
				<div id="r-result" style={{width:"92%",margin:'0.3rem auto',border:'none'}}></div>
			</div>)
	}
}

let s={
	mapbox:{width:'100%',padding:'0.45rem 0 0.2rem 0'},
	map:{width:'92%',margin:'0 auto',height:'4rem'}
}

      


export default BDmap ;