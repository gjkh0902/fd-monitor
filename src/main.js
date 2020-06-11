/*eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './util/rem'
import { Indicator, MessageBox, Toast } from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false
    //开启dev调试
Vue.config.devtools = process.env.VUE_APP_ISDEV ? true : false

/*
 * minu-ui      全局注册常用事件
 * @Indicator   loading加载中
 * @MessageBox  弹出框
 * @Toast       提示信息
 */

Vue.prototype.$Toast = Toast
Vue.prototype.$MessageBox = MessageBox
Vue.prototype.$Indicator = Indicator

// Performance init
// Performance({
//     domain: process.env.VUE_APP_APIURL, //上报api接口
//     outtime: 500, //上报延迟时间，保证异步数据的加载 （默认：1000ms）
//     isPage: true, //是否上报页面性能数据 （默认：true）
//     isResource: true, //是否上报页面资源性能数据 （默认：true）
//     isError: true, //是否上报页面错误信息数据 （默认：true）
//     filterUrl: ['http://localhost:35729/livereload.js?snipver=1'] //不需要上报的ajax请求
// })

//vue错误监控
// Vue.config.errorHandler = function(err, vm, info) {
//     let { message, stack } = err

//     // Processing error
//     let resourceUrl, col, line
//     let errs = stack.match(/(.+?)/)
//     if (errs && errs.length) errs = errs[0]
//     errs = errs.replace(/w.+js/g, $1 => {
//         resourceUrl = $1
//         return ''
//     })
//     errs = errs.split(':')
//     if (errs && errs.length > 1) line = parseInt(errs[1] || 0)
//     col = parseInt(errs[2] || 0)

//     // Fixed parameters
//     // Call the Performance.addError method
//     Performance.addError({
//         msg: message,
//         col: col,
//         line: line,
//         resourceUrl: resourceUrl
//     })
// }

import { MonitorJS } from '~/index' //--本地引入方式调试
//import { MonitorJS } from '&/index.umd.min.js' //--本地包引入方式调试

// //MonitorJS -异常监控初始化代码
new MonitorJS().init({
    systemId: 1, //系统唯一识别ID
    url: process.env.VUE_APP_APIURL + '/addError', //错误上报地址
    jsError: true, //配置是否需要监控js错误 （默认true）
    promiseError: true, //配置是否需要监控promise错误 （默认true）
    resourceError: true, //配置是否需要监控资源错误 （默认true）
    consoleError: true, //配置是否需要记录console.error错误信息
    vueError: true, //配置是否需要记录vue错误信息
    vue: Vue, //如需监控vue错误信息，则需要传入vue
    extendsInfo: {
        //自定义扩展信息，一般用于数据持久化区分
        domain: '官网', //自定义信息（名称可自定义）
        module: '领取体验课', //自定义信息（名称可自定义）
        getDynamic: () => {
            //获取动态传参
            // return {
            //     filterOne: getDynamicParams()
            // }
        }
    }
})

//console.log(tttt)

//test
function getDynamicParams() {
    return Math.floor(Math.random() * 1000 + 1)
}

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')