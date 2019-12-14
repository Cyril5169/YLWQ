import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex);


// //路由守卫
router.beforeEach((to,from,next)=>{
    if(to.matched.some(m => m.meta.auth)){
        if(localStorage.user){
            next();
        }else{
            console.log("请先登陆");
            next({path:'/'});
        }
    }else{
        next();
    }
})

try{
    var localSto = localStorage || null;
    if(localSto.user){
        var defaultuser = JSON.parse(localSto.user);
    }
}catch(e){
    console.log("error",e);
}

try{
    var localName = localStorage || null;
    if(localName.realName){
        var defaultName = JSON.parse(localName);
    }
}catch(e){
    // console.log("error",e);
}
var time = new Date();
var year = time.getFullYear();

export default new Vuex.Store({
   
    state : {
        // agree : false,
        user:defaultuser||null, //存登录的信息
        token:"",//存token
        choose: 'client', //用来在呼出资料卡界面是，作为不同情况展示的根据,业务员审核时将值变为'server'
        year:year,
        faPiao:"",//把第一页的不开发票写在这里,默认不给值
        realName:defaultName||null
    },
    action:{
        
    },
    mutations : {
        // becomeAgree(state,ae){
        //     state.agree = ae;
        // },
        // 根据user的json字符串获取user对象
        getStorage(state){
            if(!state.user){
                state.user = JSON.parse(localStorage.getItem('user'))
            }
            return state.user
        },
        //设置本地缓存登陆者
        setStorage(state,value){
            state.user = value;
            localStorage.setItem('user',JSON.stringify(value));

            state.realName = state.user.data.realName;
            localStorage.setItem('realName',JSON.stringify(state.realName))
        },
        //移除登陆者
        removeStorage(state){
            state.user = null
            localStorage.removeItem('user')
        },
        //改变不开发票的状态
        setFaPiao(state,value){
            state.faPiao = value;
            // console.log("发票状态",state.faPiao);
        },
        setPosition(state,value){
            
            // console.log("原本第1个"+state.user.pos[0].position);
            let temp = state.user.pos[0];
            state.user.pos[0] = state.user.pos[value];
            state.user.pos[value] = temp;
            // console.log("变成第1个"+state.user.pos[0].position);
        
            let user = JSON.parse(localStorage.getItem('user'));
            Object.assign(user,{pos:state.user.pos});
            localStorage.setItem('user',JSON.stringify(user));

            
            
     }
    },
})