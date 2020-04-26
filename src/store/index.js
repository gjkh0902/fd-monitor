/*
 * 状态管理入口配置
 */
import Vue from 'vue'
import Vuex from 'vuex'
import TestStore from './modules/testStore'

Vue.use(Vuex)

//初始化数据
const state = {}

//获取数据
const getters = {}

//同步处理数据
const mutations = {}

export default new Vuex.Store({
    //模块
    modules: {
        TestStore,
    },
    state,
    getters,
    mutations
})