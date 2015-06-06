Namespace.register("evecomgis.igis");

evecomgis.igis.Base = function (config) {
    if(config == null) {
        alert("配置对象为空无法初始化");
        return null;
    }
    
    if(config.mapConfig.gisEngine == null || config.mapConfig.gisEngine.length == 0) {
        alert("GIS引擎类型为空无法初始化");
        return null;
    }
    
    if(config.mapConfig.id == null || config.mapConfig.id.length == 0) {
        alert("控件ID为空无法初始化");
        return null;
    }
    
    if(config.mapConfig.urlArray == null || config.mapConfig.urlArray.length == 0) {
        alert("图层路径为空无法初始化");
        return null;
    }
    
    var $baseGis = this;
    
    this.config = config;
    
    this.map;
    this.monitorObject = new evecomgis.common.Monitor();
    this.initMapFun;
    this.roamFun;
    this.measureFun;
    this.printMapFun;
    this.locationFun;
    this.queryMapFun;
    
    this.initMapObject;//初始化地图
    this.roamObject;//地图漫游
    this.measureObject;//地图测绘
    this.printMapObject;//地图打印
    this.locationObject;//地图定位
    this.graphicsObject;//画图
    this.queryMapObject;//地图查询
    
    if(config.mapConfig.gisEngine == "01") {
    	//初始化地图
        this.initMapFun = function () {
            $baseGis.initMapObject = new evecomgis.gisimpl.arcgis.base.InitArcGisMap(config.mapConfig, $baseGis.monitorObject);
        }
        
        //地图漫游
        this.roamFun = function () {
            $baseGis.roamObject = new evecomgis.gisimpl.arcgis.base.Roam($baseGis.monitorObject);
        }
        
        //地图测绘
        this.measureFun = function () {
            $baseGis.measureObject = new evecomgis.gisimpl.arcgis.base.MeasureLength($baseGis.monitorObject);
        }
        
        //地图打印
        this.printMapFun = function () {
            $baseGis.printMapObject = new evecomgis.gisimpl.arcgis.base.PrintMap($baseGis.monitorObject);
        }
        //画图对象初始化
        this.drawGraphics=function(){
    		this.graphicsObject = new evecomgis.gisimpl.arcgis.base.Graphic($baseGis.monitorObject);	
    	}

        //定位
        this.locationFun = function () {
        	$baseGis.locationObject = new evecomgis.gisimpl.arcgis.base.Location();
        	
        }
        //地图查询
        this.queryMapFun = function () {
        	$baseGis.queryMapObject = new evecomgis.gisimpl.arcgis.base.QueryMap();
        }
        
        
    } else if(config.mapConfig.gisEngine == "02") {
        //初始化地图
        this.initMapFun = function () {
            $baseGis.initMapObject = new evecomgis.gisimpl.supermap.base.InitSupermap(config.mapConfig, $baseGis.monitorObject);
        }
        
        this.roamFun = function () {
            $baseGis.roamObject = new evecomgis.gisimpl.supermap.base.Roam();
        }
        
        this.measureFun = function () {
            $baseGis.measureObject = new evecomgis.gisimpl.supermap.base.MeasureLength();
        }
        
        this.printMapFun = function () {
            
        }
        
        this.drawGraphics=function(){
            $baseGis.graphicsObject = new evecomgis.gisimpl.supermap.base.Graphic();
        }
        
        this.locationFun = function () {
            $baseGis.locationObject = new evecomgis.gisimpl.supermap.base.Location();
        }
        
        this.queryMapFun = function () {
            $baseGis.queryMapObject = new evecomgis.gisimpl.supermap.base.Query();
        }
    }
    
    this.initComponet = function (map) {
        $baseGis.map = map;
        
        if($baseGis.config.graphicConfig != null) {
            $baseGis.config.graphicConfig.map = $baseGis.map;
            $baseGis.graphicsObject.init($baseGis.config.graphicConfig);
        }

		if($baseGis.config.measureConfig != null) {
            $baseGis.config.measureConfig.map = $baseGis.map;
            $baseGis.measureObject.init($baseGis.config.measureConfig);
        }

        if($baseGis.config.locationConfig != null) {
            $baseGis.config.locationConfig.map = $baseGis.map;
            $baseGis.locationObject.init($baseGis.config.locationConfig);
        }
        
		if($baseGis.roamObject != null) {
            $baseGis.roamObject.init($baseGis.map);
        }

		if($baseGis.config.queryMapConfig != null) {
            $baseGis.config.queryMapConfig.map = $baseGis.map;
            $baseGis.queryMapObject.init($baseGis.config.queryMapConfig);
        }
    }
    
    $(function () {
        $baseGis.initMapFun();
        $baseGis.roamFun();
        $baseGis.measureFun();
        //$baseGis.printMapFun();
        $baseGis.locationFun();
        $baseGis.drawGraphics();
        $baseGis.queryMapFun();
        $baseGis.initMapObject.loadMap($baseGis.initComponet);
        /*$baseGis.map.on("load", function(){
        	alert(1);
        });*/
    });
}
