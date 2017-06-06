// 引入redux ;
import {createStore} from 'redux' ;

const defaultState = {
	menu:false,
	headerName:'卖座电影',
	city:'北京'
} ;

const reducer = ( state=defaultState , action={} )=>{
	switch(action.type){
		case 'menu':
			return Object.assign( {}, state, {menu:action.menu} ) ;
		case 'headerName':
			return Object.assign( {}, state, {headerName:action.headerName} ) ;
		case 'city':
			return Object.assign( {}, state, {city:action.city} ) ;
		default :
			return state ;
	}
}

const store = createStore(reducer) ;

const mapStateToProps = (state)=>{
	return {
		getMenu:state.menu,
		getHeaderName:state.headerName,
		getCity:state.city,
		getChange:state.change
	}
}
const mapDispatchToProps = (dispatch)=>{
	return {
		setMenu:(x)=>{
			let obj = {
				type:'menu',
				menu:x
			} ;
			dispatch(obj) ;
		},
		setHeaderName:(x)=>{
			let obj = {
				type:'headerName',
				headerName:x
			};
			dispatch(obj) ;
		},
		setCity:(x)=>{
			let obj = {
				type:'city',
				city:x
			}
			dispatch(obj)
		}
	}
}

export {store}
export {mapStateToProps}
export {mapDispatchToProps}