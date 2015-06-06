//注册命名空间
Namespace.register("evecomgis.common");

/**
 * @Title evecomgis.common.Monitor
 * @Description 全局监听类
 * @Date 2013-9-26
 * @Author Link
 */
evecomgis.common.Monitor = function () {

    var $MonitorObject = this;

    this.handler = {};

    /**
     * @param callbackName 监听对象名称
     * @param 监听事件
     * @param 监听对象
     * @param 监听绑定回调函数
     * @return 返回监听事件对象
     * @Description 添加一个监听
     */
    this.addMonitor = function (callbackName, eventName, object, callback) {
        $MonitorObject.handler[callbackName] = dojo.connect(object, eventName, callback);
        return $MonitorObject.handler[callbackName];
    }


    /**
     * @param callbackName 监听对象名称
     * @Description 移除一个监听
     */
    this.removeMonitor = function (callbackName) {
        if($MonitorObject.handler[callbackName] != null) {
            dojo.disconnect($MonitorObject.handler[callbackName]);
            $MonitorObject.handler[callbackName] = null;
        }
    }

    /**
     * @Description 移除所有监听 
     */
    this.removeAllMonitor = function () {
        for(var property in $MonitorObject.handler) {
            dojo.disconnect($MonitorObject.handler[property]);
        }
        handler = {};
    }

}