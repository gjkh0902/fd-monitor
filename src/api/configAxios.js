/*
 * axios相关配置
 * @baseURL 请求api地址
 * @headers 头文件设置
 * @timeout 超时时间
 */
import Vue from 'vue'
import Axios from 'axios'
import { Toast } from 'mint-ui'
import configMsg from './configMsg'
Vue.component(Toast.name, Toast)

Axios.defaults.timeout = 5000
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
Axios.defaults.baseURL = process.env.VUE_APP_APIURL || 'http://localhost:8080' //当前环境地址

//请求拦截器
Axios.interceptors.request.use(
    config => {
        return config
    },
    error => {
        Toast(configMsg.request.errorData)
        return Promise.reject(error)
    }
)

//响应拦截器
Axios.interceptors.response.use(
    res => {
        if (res.data.code && res.data.code !== 200) {
            Toast(res.data.msg)
            return Promise.reject(res)
        }
        return res
    },
    error => {
        // 判断网络超时
        if (error.code == 'ECONNABORTED' && error.message.includes('timeout')) {
            const error = {
                data: {
                    code: 'netTimeOut', //网络超时code标识
                    msg: configMsg.request.errorNet
                }
            }
            return Promise.reject(error)
        }
        return Promise.reject(error)
    }
)

export default Axios