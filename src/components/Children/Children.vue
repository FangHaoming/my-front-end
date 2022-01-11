<template>
  <div>
    <div v-if="$store.state.children.show">子组件</div>
    <div v-if="$store.getters.not_show">子组件不显示，我就出来啦</div>
    <div v-if="show">子组件(using mapState)</div>
    <div v-if="not_show">子组件不显示，我就出来啦(using mapGetters)</div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex';
export default {
    computed:{
        ...mapState({
            show:state=>state.children.show
        }),
        ...mapGetters([
            'not_show'
        ]),
        
    }
};
</script>