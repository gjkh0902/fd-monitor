/*
 * 公共数据管理store
 */
import Test from '@/service/testModule'

// 初始化
const state = {
    name: '',
    info: ''
}

// 获取数据
const getters = {
    test: state => state.name,
    info: state => state.info
}

// 同步处理
const mutations = {
    updateTest(state, payload) {
        const { name, info } = payload
        state.name = name
        state.info = info
    }
}

// 异步处理
const actions = {
    fetchTest({ commit }) {
        return Test.testGet()
            .then(res => {
                commit('updateTest', res.data)
            })
            .catch(error => {
                this.$Toast(error.data.msg)
            })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}