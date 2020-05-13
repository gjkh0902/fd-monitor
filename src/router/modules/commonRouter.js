/*
 * 公共路由配置
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//路由入口
const Index = r => require.ensure([], () => r(require('@/pages/index.vue')), 'Index')

//Mod30999
const Mod30999 = r => require.ensure([], () => r(require('@/pages/mod30999/index.vue')), 'Mod30999')

//404错误页面
const Error404 = r => require.ensure([], () => r(require('@/components/404.vue')), 'Error404')

export default [
    //入口
    {
        path: '/',
        name: 'index',
        component: Index,
        meta: {
            title: 'hello'
        }
    },
    {
        path: '/mod30999',
        name: 'mod30999',
        component: Mod30999,
        meta: {
            title: 'mod30999'
        }
    },
    {
        path: '*',
        name: '',
        component: Error404,
        meta: {
            title: '抱歉--访问出错了'
        }
    }
]