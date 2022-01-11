<template>
  <div>
    <a href="javascript:;" @click="$store.state.children.show = true">显示</a>
    <a href="javascript:;" @click="$store.state.children.show = false">隐藏</a>
    <a href="javascript:;" @click="$store.commit({type:'switch',payload:10})">切换(mutaition)</a>
    <a href="javascript:;" @click="$store.dispatch('switch')">切换(action)</a>
    <a href="javascript:;" @click="change()">切换(mapMutations)</a>
    <a href="javascript:;" @click="change2()">切换(mapActions)</a>

    <Children />
  </div>
</template>

<script>
import Children from "../Children/Children.vue";
import {mapActions, mapMutations} from 'vuex';

export default {
  components: {
    Children: Children,
  },
  computed:{
    ...mapMutations([
        'change'
    ])
  },
  methods:{
      ...mapActions([
          'change2'
      ])
  }
};
</script>