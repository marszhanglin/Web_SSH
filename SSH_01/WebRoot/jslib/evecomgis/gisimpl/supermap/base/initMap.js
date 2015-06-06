//注册命名空间
Namespace.register("evecomgis.gisimpl.supermap.base");

/**
 *@Title evecomgis.gisimpl.supermap.base.InitSupermap
 *@Author Link
 *@Date 2014-1-7
 *@Param config 地图渲染配置对象
 *@Description supermap地图渲染类
 */
evecomgis.gisimpl.supermap.base.InitSupermap = function (config) {
	//当前对象
    var initSupermapObject = this;
    //请求路径与渲染方式数组
    this.urlArray = config.urlArray;
    //地图渲染到页面上某个控件的ID
    this.componentId = config.id;
    //构建地图时可选配置对象（详细请查询ARCGIS API）
    this.mapOption = config.mapOption;
    //地图对象
    this.map;
	//图层对象
	this.layer;
	//当前图层索引
	this.layerCount = 1;
	//执行完成后需要调用的回调函数
	this.callback;
	this.layerArray = new Array();
	this.controlObject = {
	    "1":"new SuperMap.Control.OverviewMap()",
	    "2":"new SuperMap.Control.LayerSwitcher()"
	};

	//图层加载完成后执行回调函数
	this.addLayer = function () {
		
        initSupermapObject.layerArray.push(initSupermapObject.layer);
		if(initSupermapObject.urlArray.length != null && initSupermapObject.layerCount < initSupermapObject.urlArray.length) {//如果存在大于1个的图层配置并且还存在没被渲染的图层时，创建图层并渲染给map对象
			//创建还未渲染的图层对象
			initSupermapObject.layer = new SuperMap.Layer.TiledDynamicRESTLayer(initSupermapObject.urlArray[initSupermapObject.layerCount].name == null ? "layer" + initSupermapObject.layerCount : initSupermapObject.urlArray[initSupermapObject.layerCount].name, initSupermapObject.urlArray[initSupermapObject.layerCount].url, {transparent: true});
			//全局图层索引值+1
			initSupermapObject.layerCount++;
			//图层加载完成后递归调用
			initSupermapObject.layer.events.on({"layerInitialized": initSupermapObject.addLayer});
		} else {//如果图层全部渲染完成
		    //将Layer图层加载到Map对象上
		    initSupermapObject.map.addLayers(initSupermapObject.layerArray);
			//缩放到最大区域并设置为地图中心点
			initSupermapObject.map.zoomToMaxExtent();
			//如果有传入执行完成后需要回调的函数则执行回调函数
			if(initSupermapObject.callback != null) {
				initSupermapObject.callback(initSupermapObject.map);
			}
		}
	}

	//初始化地图函数
	this.initMap = function () {
		if(document.getElementById(initSupermapObject.componentId) == null) {
            alert("错误: 页面不存在该控件ID，地图无法加载!");
            return;
        }
        
        if(initSupermapObject.urlArray == null || initSupermapObject.urlArray.length == 0) {
            alert("错误: 路径地址不为数组或数组为空!");
            return;
        }
		
		//创建地图对象
		initSupermapObject.map = new SuperMap.Map (initSupermapObject.componentId, initSupermapObject.mapOption);
		//设置所有图层为叠加方式
		initSupermapObject.map.allOverlays = true;
		//设置比例尺控件
		initSupermapObject.map.addControl(new SuperMap.Control.ScaleLine());
		if(initSupermapObject.mapOption!=null&&initSupermapObject.mapOption.plugin!=null) {
		    if(initSupermapObject.mapOption.plugin.length == null) {
		        initSupermapObject.map.addControl(eval(initSupermapObject.controlObject[initSupermapObject.mapOption.plugin]));
		    } else {
		        for(var i=0; i<initSupermapObject.mapOption.plugin.length; i++) {
		            var c = initSupermapObject.mapOption.plugin[i];
		            initSupermapObject.map.addControl(eval(initSupermapObject.controlObject[c]));
		        }
		    }
		}
		var name = initSupermapObject.urlArray.length == null ? initSupermapObject.urlArray.name : initSupermapObject.urlArray[0].name;
		var url = initSupermapObject.urlArray.length == null ? initSupermapObject.urlArray.url : initSupermapObject.urlArray[0].url;
		//创建图层对象
		initSupermapObject.layer = new SuperMap.Layer.TiledDynamicRESTLayer(name, url);
		//当图层渲染完成后调用回调函数加入到地图中
		initSupermapObject.layer.events.on({"layerInitialized": initSupermapObject.addLayer});
		
	}

	//页面加载完成后调用初始化地图函数
	this.loadMap = function (callback) {
		initSupermapObject.callback = callback;
		//页面加载完成执行初始化地图操作
		initSupermapObject.initMap();
		return initSupermapObject.map;
	}
}