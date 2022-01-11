import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import childern_store from './modules/Children.store.js';
import { actions } from './actions.js';

export default new vuex.Store({
    modules:{
        children:childern_store
    }
})
