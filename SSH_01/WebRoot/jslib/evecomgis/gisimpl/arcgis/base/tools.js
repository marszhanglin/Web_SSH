//注册命名空间
Namespace.register("evecomgis.gisimpl.arcgis.base");

evecomgis.gisimpl.arcgis.base.Tools = function() {

    var $tools = this;

    /**
     * @Title despatch
     * @Param config.map 地图对象
     * @Param config.sourcePoint 地图上的坐标点集合
     * @Param config.targetPoint 事件发生点
     * @Param config.pointNum 获取多少个离事发点最近点的个数
     * @Param config.pointIcon 最近调度点图标
     * @Return 返回排序后的数组对象
     * @Description 数组对象排序
     * @Author Link
     * @Date 2013-12-23
     */
    this.despatch = function(config) {
        //地图上的坐标点集合
        this.sourcePonit = config.sourcePoint;
        //事件发生点
        this.targetPoint = config.targetPoint;
        //数组
        this.despatchArray = new Array();

		//计算目标点和源点距离
		for (var i=0; i<this.sourcePonit.length; i++) {
			var object = {};
			var sourceX = this.sourcePonit[i].x;
			var sourceY = this.sourcePonit[i].y;
			var distance = $tools.getDistance(this.targetPoint.x,this.targetPoint.y,sourceX,sourceY).toFixed(1);
			object.point = this.sourcePonit[i];
			object.distance = distance;
			this.despatchArray.push(object);
		}


		//排序
		if(this.despatchArray != null && this.despatchArray.length > 0) {
			this.despatchArray = $tools.sortArrayObject(this.despatchArray, "distance", false);
		}

		return this.despatchArray;

    }
    /**
     * @Title sortArrayObject
     * @Param arr 数组
     * @Param prop 通过哪个属性排序
     * @Param desc true为降序，false为升序
     * @Return 返回排序后的数组对象
     * @Description 数组对象排序
     * @Author Link
     * @Date 2013-12-23
     */
    this.sortArrayObject = function(arr, prop, desc) {
        var props = [], ret = [], i = 0, len = arr.length;
        if ( typeof prop == 'string') {
            for (; i < len; i++) {
                var oI = arr[i];
                (props[i] = new String(oI && oI[prop] || ''))._obj = oI;
            }
        } else if ( typeof prop == 'function') {
            for (; i < len; i++) {
                var oI = arr[i];
                (props[i] = new String(oI && prop(oI) || ''))._obj = oI;
            }
        } else {
            throw '参数类型错误';
        }
		if(desc) {
			props.sort(function(a,b){return b-a;});
		} else {
			props.sort(function(a,b){return a-b;});
		}
        
        for ( i = 0; i < len; i++) {
            ret[i] = props[i]._obj;
        }
        return ret;
    };

    /**
     * @Title getDistance
     * @Param point1X:第一坐标点经度(数字型)
     * @Param point1Y:第一坐标点纬度(数字型)
     * @Param point2X:第二坐标点经度(数字型)
     * @Param point2Y:第二坐标点纬度(数字型)
     * @Return 返回两点间距离
     * @Description 获取两点坐标之间的距离单位：米
     * @Author Link
     * @Date 2013-12-23
     */
    this.getDistance = function(point1X, point1Y, point2X, point2Y) {
        var JL_JD = 102834.74258026089786013677476285;
        var JL_WD = 111712.69150641055729984301412873;
        var tDistance = 0;
        try {
            var xabs = Math.abs((point1X - point2X) * JL_JD);
            var yabs = Math.abs((point1Y - point2Y) * JL_WD);
            tDistance = Math.round(Math.sqrt(xabs * xabs + yabs * yabs));
        } catch(error) {
            return -1;
        }
        return tDistance;
    }
    /**
     * @Title actsAsAspect
     * @param 
     */
    this.actsAsAspect = function (object) {
        object.yield = null;
        object.rv = { };
        object.before = function(method, f) {
            var original = eval("this." + method);
            this[method] = function() {
                f.apply(this, arguments);
                return original.apply(this, arguments);
            };
        };
        object.after = function(method, f) {
            var original = eval("this." + method);
            this[method] = function() {
                this.rv[method] = original.apply(this, arguments);
                return f.apply(this, arguments);
            }
        };
        object.around = function(method, f) {
            var original = eval("this." + method);
            this[method] = function() {
                this.yield = original;
                return f.apply(this, arguments);
            }
        };
    }

}
