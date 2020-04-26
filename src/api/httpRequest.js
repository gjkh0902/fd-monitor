/**
 * @desc   http请求配置
 * @param  {String} type                请求方式，选填，默认值get
 * @param  {String} url                 这里传入的是接口路径, 必填
 * @param  {Object} data                请求主体被发送的数据，选填-POST/PUT/PATCH
 * @param  {Object} params              url请求参数，选填-GET
 * @param  {String} isOutsideLink       第三方api外链路径，绝对路径，选填
 * @return {Object} Promise
 */
import Axios from './configAxios'

const httpRequest = (
    type,
    url,
    data,
    params,
    isOutsideLink
) => {
    //拼接完整api url
    url = isOutsideLink ? isOutsideLink : Axios.defaults.baseURL + url
        //GET请求时，参数赋值
    if (type === "get" && data) {
        params = data;
    }
    return new Promise((resolve, reject) => {
        Axios({
                method: type,
                url: url,
                data: data,
                params: params,
                withCredentials: false, //是否携带cookie信息,默认false
            })
            .then(res => {
                if (res.data.code === 200) {
                    resolve(res.data)
                }
            }, err => {
                reject(err)
            })
            .catch(error => {
                reject(error)
            })
    });
}

export default httpRequest