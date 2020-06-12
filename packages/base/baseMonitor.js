import { ErrorLevelEnum, ErrorCategoryEnum } from './baseConfig.js'
import DeviceInfo from '../device'
import utils from './utils.js'
import TaskQueue from './taskQueue.js'

/**
 * 监控基类
 */
class BaseMonitor {
    /**
     * 上报错误地址
     * @param {*} params { reportUrl,extendsInfo }
     */
    constructor(params) {
        this.category = ErrorCategoryEnum.UNKNOW_ERROR //错误类型
        this.level = ErrorLevelEnum.INFO //错误等级
        this.msg = '' //错误信息
        this.url = '' //错误信息地址
        this.line = '' //行数
        this.col = '' //列数
        this.errorObj = '' //错误堆栈

        this.reportUrl = params.reportUrl //上报错误地址
        this.extendsInfo = params.extendsInfo //扩展信息
        this.systemId = params.systemId //系统识别ID
    }

    /**
     * 记录错误信息
     */
    recordError() {
        this.handleRecordError()

        //延迟记录日志
        setTimeout(() => {
            TaskQueue.fire()
        }, 1000)
    }

    /**
     * 处理记录日志
     */
    handleRecordError() {
        try {
            if (!this.msg) {
                return
            }

            //过滤掉错误上报地址
            if (this.reportUrl && this.url && this.url.toLowerCase().indexOf(this.reportUrl.toLowerCase()) >= 0) {
                console.log('统计错误接口异常', this.msg)
                return
            }
            let errorInfo = this.handleErrorInfo()

            console.log('\n````````````````````` ' + this.category + ' `````````````````````\n', errorInfo)

            //记录日志
            TaskQueue.add(this.reportUrl, errorInfo)
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * 处理错误信息
     * @param {*} extendsInfo
     */
    handleErrorInfo() {
        let txt = {}
        txt.msg = this.msg //日志信息
        txt.url = this.url //url

        //msg/url信息过长时，截取前100
        if (txt.msg && txt.msg.length >= 100) txt.msg = txt.msg.substr(0, 100)
        if (txt.url && txt.url.length >= 100) txt.url = txt.url.substr(0, 200)

        //清除stack
        if (this.errorObj && this.errorObj.stack) delete this.errorObj.stack

        //errorObj
        if (this.errorObj && !utils.objectIsNull(this.errorObj)) {
            txt.errorObj = JSON.stringify(this.errorObj)
        }

        switch (this.category) {
            case ErrorCategoryEnum.JS_ERROR:
                txt.line = this.line
                txt.col = this.col
                break
            default:
                break
        }
        let deviceInfo = this.getDeviceInfo()
        let extendsInfo = this.getExtendsInfo()
        let recordInfo = {}
        recordInfo.systemId = this.systemId //系统识别ID
        recordInfo.extendsInfo = JSON.stringify(extendsInfo) //扩展信息
        recordInfo.category = this.category //错误分类
        recordInfo.logType = this.level //错误级别
        recordInfo.logInfo = txt //错误信息
        recordInfo.deviceInfo = deviceInfo //设备信息
        return recordInfo
    }

    /**
     * 获取扩展信息
     */
    getExtendsInfo() {
        try {
            let ret = {}
            let extendsInfo = this.extendsInfo || {}
            let dynamicParams
            if (utils.isFunction(extendsInfo.getDynamic)) {
                dynamicParams = extendsInfo.getDynamic() //获取动态参数
            }
            //判断动态方法返回的参数是否是对象
            if (utils.isObject(dynamicParams)) {
                extendsInfo = {...extendsInfo, ...dynamicParams }
            }
            //遍历扩展信息，排除动态方法
            for (var key in extendsInfo) {
                if (!utils.isFunction(extendsInfo[key])) {
                    //排除获取动态方法
                    ret[key] = extendsInfo[key]
                }
            }

            return ret
        } catch (error) {
            console.log('call getExtendsInfo error', error)
            return {}
        }
    }

    /**
     * 获取设备信息
     */
    getDeviceInfo() {
        try {
            let deviceInfo = DeviceInfo.getDeviceInfo()
            return JSON.stringify(deviceInfo)
        } catch (error) {
            console.log(error)
            return ''
        }
    }
}
export default BaseMonitor