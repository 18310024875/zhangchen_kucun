// 公用部分
  var $get='ajax' ;

// slideDown
  var $slideDown = function(x){
  var h = x.children[0].offsetHeight ;
    x.style.height = h+'px';
      x.style.opacity = '1' ;
  }
// slideUp
  var $slideUp = function(x){
    x.style.height = '0px';
    x.style.opacity = '0' ;
  }

// 下拉刷新 
  var $load = function(dom,callback){ 
      var obj = {once:false} ;
      callback() ;
      
      // 卸载方法
      obj.destroy = function(){ dom.onscroll=null ;obj=null ;return ;}
      // 滚动方法
      dom.onscroll=function(){
        if(obj.once){
          if(dom.scrollTop+dom.offsetHeight+20>=dom.scrollHeight){
            console.log('_____loadReady____')
            callback() ;
            obj.once = false ;
          }           
        }
      } // onscroll end 
      return obj ;
  };


(function(doc, win) {

	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
		};
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	// DOMContentLoaded 仅当dom加载完毕执行
	doc.addEventListener('DOMContentLoaded', recalc, false);

	// 动态 script
	var s = document.createElement('script') ;
	s.src = '/dist/main.js' ;
	document.body.appendChild(s) ; 

})(document, window);

