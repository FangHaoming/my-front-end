export default{
    state:{
        show:false
    },
    getters:{
        not_show(state){
            return !state.show;
        }
    },
    mutations:{
        switch(state,payload){
            state.show=state.show?false:true;
            console.dir(payload); //state.commit({}) 对象风格的提交方式
        },
        change(state){
            state.show=state.show?false:true;
        }
    },
    actions:{
        switch(ctx){
            ctx.commit('switch');
        },
        change2(ctx){
            ctx.commit('switch');
        }
    }
}
