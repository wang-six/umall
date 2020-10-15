import { reqSeckList } from "../../utils/request"
const state = {
    // 菜单的list
    list: [],
}
const mutations = {
    //修改list
    changeList(state, arr) {
        state.list = arr;
    },

}
const actions = {
    //页面请求
    reqListAction(context) {
        //发请求
        reqSeckList().then(res => {
            //如果去list的时候，取到null,那么有可能是最后一页没数据了，需要减一页，再次请求list
            let list = res.data.list ? res.data.list : []

            context.commit("changeList", list)
        })
    },
}

const getters = {
    list(state) {
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true

}