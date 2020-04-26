/*
 * 模块化路由全局配置
 */
import Vue from "vue"
import Router from "vue-router"

// 子模块路由
import CommonRouter from "./modules/commonRouter" // 公共模块

Vue.use(Router)

let router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [...CommonRouter]
})

//设置页面标题
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

export default router