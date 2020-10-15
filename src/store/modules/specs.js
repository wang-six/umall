import { reqSpecsList, reqSpecsCount } from "../../utils/request"
const state = {
    list: [],
    size: 2,
    total: 0,
    page: 1
}
const mutations = {
    changeList(state, arr) {
        state.list = arr;
    },
    changeTotal(state, num) {
        state.total = num
    },
    changePage(state, page) {
        state.page = page
    }

}
const actions = {
    //页面请求
    reqListAction(context, bool) {
        let params = bool ? {} : { page: context.state.page, size: context.state.size }
        reqSpecsList(params).then(res => {
            let list = res.data.list ? res.data.list : []
            if (context.state.page > 1 && list.length == 0) {
                context.commit("changePage", context.state.page - 1)
                context.dispatch("reqListAction")
                return
            }
            list.forEach(item => {
                item.attrs = JSON.parse(item.attrs)
            });
            context.commit("changeList", list)
        })
    },
    //获取总数的请求
    reqTotalAction(context) {
        reqSpecsCount().then(res => {
            context.commit("changeTotal", res.data.list[0].total)
        })
    },
    //组件修改了页码
    changePageAction(context, page) {
        context.commit("changePage", page)
        context.dispatch('reqListAction')
    }
}
const getters = {
    list(state) {
        return state.list
    },
    size(state) {
        return state.size
    },
    total(state) {
        return state.total
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}