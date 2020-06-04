/*
 * 模块调取后台test模块api
 * @api     后台api地址
 * @link    全局链接地址
 * @share   全局分享默认配置
 */
import HttpRequest from '../api/httpRequest'

const TEST = {
    testGet: function(params) {
        return HttpRequest('get', '/listError', params)
    },
    testPost: function(params) {
        return HttpRequest('post', '/addError', params)
    }
}
export default TEST