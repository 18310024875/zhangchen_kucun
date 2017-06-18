import React,{Component} from 'react' ;
import {render} from 'react-dom' ;
import {Router,Route,Link,hashHistory,browserHistory,Redirect,IndexRoute,
IndexRedirect} from 'react-router';

// 引入 redux-redux
import {Provider,connect} from 'react-redux';
import {store,mapStateToProps,mapDispatchToProps} from './store.jsx' ;

// 引入 fetch 
import 'es6-promise' ;
import 'whatwg-fetch' ;

// 请求数据方法
$get = function( url ,callback){
    fetch(url, {method:"GET",mode:"cors",credentials:'credentials'})
    .then((res) =>{return res.json()}).then((data) => {callback(data)})
    .catch(function(e){console.log("fetch fail",e)});
}

// 重置scrollTop
let dom=undefined ;
function change_(old,next){
    if(!dom){ dom = document.querySelector('#main');}
    try{
        dom.scrollTop=0
    }catch(e){}
}

// 路由
let routes =  {
    path: '/',
    onChange: change_,
    getComponent: (nextState, callback) => {
        require.ensure([], (require) => {
            callback(null, require('./app/app.jsx').default)
        })
    },
    indexRoute:{
    getComponent(nextState,callback){
            require.ensure([],require=>{
                callback(null,require('./app/home/home.jsx').default);
            });
        }
    },
    childRoutes: [
        { 
            path: '/home',
            getComponent: (nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('./app/home/home.jsx').default)
                })
            }
        },
        { 
            path: '/movie',
            getComponent: (nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('./app/movie/movie.jsx').default)
                })
            }
        },
        { 
            path: '/details',
            getComponent: (nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('./app/details/details.jsx').default)
                })
            }
        },
        { 
            path: '/cinema',
            getComponent: (nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('./app/cinema/cinema.jsx').default)
                })
            }
        },
        { 
            path: '/shop',
            getComponent: (nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('./app/shop/shop.jsx').default)
                })
            }
        },
        { 
            path: '/mine',
            getComponent: (nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('./app/mine/mine.jsx').default)
                })
            }
        },
        { 
            path: '/card',
            getComponent: (nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('./app/card/card.jsx').default)
                })
            }
        },
        { 
            path: '/citys',
            getComponent: (nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('./app/citys/citys.jsx').default)
                })
            }
        },
    ]
}

// 渲染
render(
<Provider store={ store }>
    <Router history={browserHistory} routes={routes} /> 
</Provider>
,document.querySelector("#appWrapper")) ;
