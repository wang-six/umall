import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)


import { state, getters, mutations } from "./mutations"
import { actions } from "./actions"
import menu from "./modules/menu"
import role from "./modules/role"
import manage from "./modules/manage"
import cate from "./modules/cate"
import specs from "./modules/specs"
import goods from "./modules/goods"
import member from "./modules/member"
import banner from "./modules/banner"
import seckill from "./modules/seckill"
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        menu,
        role,
        manage,
        cate,
        specs,
        goods,
        member,
        banner,
        seckill

    }
})