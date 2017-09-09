// 引入 redux
import {createStore} from 'redux' ;
let add=0 ;
// 初始化state状态
const defaultState = {
	list:'close',
	time:{
		style:'none',
		title:'请选择预约日期',
		color:'gray'	
	},
	
	p_index:{
		num:0,
		add:0
	}
}

const Object_assign=function(obj,t,v){
	var new_obj = {} ;
	for(var each in obj){
		if(each==t){
			new_obj[t]=v ;
		}else{
			new_obj[each]=obj[each]
		}
	}
	return new_obj ;
}

// 无变量提升 必须先定义reducer
const reducer = (state=defaultState,action={})=>{
	switch(action.type){
		case 'changeList':
		// return Object.assign({} , state , {list:action.list}) ;
			return Object_assign(state,'list',action.list) ;
		case 'changeTime':
			return Object_assign(state,'time',action.time) ;
		case 'p_index' :
			return Object_assign(state,'p_index',action.p_index) ;
		default :
			return state ;
	}
}

// 建立 store 
const store = createStore(reducer)

const mapStateToProps = (state)=>{
	return {
		list:state.list,
		time:state.time,
		p_index:state.p_index
	}
}
const mapDispatchToProps = (dispatch)=>{
	return {
		changeList:(x)=>{dispatch({type:'changeList',list:x})},
		changeTime:(x='none',y='请选择预约日期',z='gray')=>{
			dispatch({
				type:'changeTime',
				time:{
					style:x,
					title:y,
					color:z
				}
			})// 发送结束
		},
		set_p_index:(x)=>{dispatch(
			{
				type:'p_index',
				p_index:{
					num:x,
					add:add+=1 
				}
			}
		)}
	}
}

export {store}
export {mapStateToProps}
export {mapDispatchToProps}


