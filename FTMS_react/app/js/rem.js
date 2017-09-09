//rem自动计算
(function(doc, win) {
	
	// console.log(window.innerHeight,document.body.offsetHeight,document.documentElement.clientHeight)
	var docEl = document.documentElement ;
	var clientWidth = docEl.clientWidth ;
	var rem_ = parseInt(100 * (clientWidth / 640)+1) ;
	docEl.style.fontSize = rem_ + 'px';
		// var $height = window.innerWidth ;
		// var $width = window.innerHeight ;
		// var $main_height = window.innerHeight - rem_ ;

	// 先计算rem字体大小 在加载script
	var script = document.createElement('script')
	script.src = 'bundle.js'
	document.body.appendChild(script);

})(document, window);

// 封装slideDown 和 slideUp
// 需要配合public.css
var $slideDown = function(x){
	var ul_h = x.children[0].offsetHeight ;
	x.style.height = ul_h+'px';
	x.style.opacity = '1';
}

var $slideUp = function(x){
	x.style.height = 0+'px';
	x.style.opacity = '0';
}

// 封装ajax
var $ajax = function( obj ){ 
	// 1 创建XML对象
	if (window.XMLHttpRequest) {	
		//IE7+、Firefox、Opera、Chrome 和Safari
		 var x = new XMLHttpRequest();
	} else if (window.ActiveXObject) {   
		//IE6 及以下
		var versions = ['MSXML2.XMLHttp','Microsoft.XMLHTTP'];
		for (var i = 0,len = versions.length; i<len; i++) {
			try {
				var x = new ActiveXObject(version[i]);
				break;
			} catch (e) {}	
		}
	} else {
		throw new Error('浏览器不支持XHR对象！');
	} // 创建XML对象结束

	// 2 监听 x.onreadystatechange 并且处理
	x.onreadystatechange=function(){
		if (x.readyState == 4) {   //判断对象的状态是否交互完成
			if (x.status == 200) {  //200表示成功
				obj.success(x.responseText);
			} else {
				alert('请求错误');
			}
		}
	}
	// 3 使用XHR对象必须用open方法!  1 请求类型(get、post) 2请求的URL 3 表示是否异步
	x.open('get',obj.url,true)
	// 4 get的方法send(null)
	x.send(null)
}

