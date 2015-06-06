//注册命名空间
Namespace.register("evecomgis.gisimpl.arcgis.base");

/**
 * @Title evecomgis.gisimpl.arcgis.base.Roam
 * @param map 地图对象
 * @Description 地图漫游
 * @author Link
 * @Date 2013-12-20
 */
evecomgis.gisimpl.arcgis.base.Roam = function (monitor) {
    dojo.require("esri.toolbars.navigation"); 
    var $roamObject = this;
    this.width;
    this.height;
    this.map;
    this.navigation;
    this.defaultShortcuts;
    //初始化必要参数
    this.init = function (map) {
        $roamObject.map = map;
        $roamObject.navigation = new esri.toolbars.Navigation($roamObject.map);
        $roamObject.width = $roamObject.map.width;
        $roamObject.height = $roamObject.map.height;
    }
    
    //放大 
    this.zoomInMap = function () {
        $roamObject.map.setZoom(parseInt($roamObject.map.getLevel()) + 1);
    }
    
    //缩小
    this.zoomOutMap = function () {
        if($roamObject.map.getLevel() == -1) {//动态图层
            $roamObject.map.setZoom(1);
        } else {//静态贴图
            $roamObject.map.setZoom($roamObject.map.getLevel()-1);
        }
    }
    
    //地图导航向上
    this.panUpMap = function () {
        $roamObject.map.panUp();
    }
    
    //地图导航向下
    this.panDownMap = function () {
        $roamObject.map.panDown();
    }
    
    //地图导航向左
    this.panLeftMap = function () {
        $roamObject.map.panLeft();
    }
    
    //地图导航向右
    this.panRightMap = function () {
        $roamObject.map.panRight();
    }
    
    //全屏
    this.fullScreenMap = function () {
        if($roamObject.map) {
            document.getElementById($roamObject.map.id).style.width = "100%";
            document.getElementById($roamObject.map.id).style.height = "100%";
            $roamObject.map.resize();
        }
    }
    
    //还原
    this.revertMap = function () {
        var div = dojo.byId($roamObject.map.id);
        div.style.width = $roamObject.width;
        div.style.height = $roamObject.height;
        $roamObject.map.resize();
    }
    
    //启用预定义快捷键，停用地图快捷键
    this.enableShortcuts = function () {
        $roamObject.map.disableKeyboardNavigation();
        $roamObject.defaultShortcuts = $roamObject.map.on("key-down", function(evt) {
            if(evt.keyCode == 33) 
                $roamObject.zoomInMap();
            
            if(evt.keyCode == 34) 
                $roamObject.zoomOutMap();
            
            if(evt.keyCode == 38) 
                $roamObject.panUpMap();
            
            if(evt.keyCode == 40)
                $roamObject.panDownMap();
                
            if(evt.keyCode == 37)
                $roamObject.panLeftMap();
                
            if(evt.keyCode == 39)
                $roamObject.panRightMap();
                
            if(evt.keyCode == 70)
                 $roamObject.fullScreenMap();
                 
            if(evt.keyCode == 82)
                $roamObject.revertMap();
        });
    }
    
    
    //区域放大
    this.areaZoomInMap = function () {
        $roamObject.navigation.activate(esri.toolbars.Navigation.ZOOM_IN);
    }
    
    
    //区域缩小
    this.areaZoomOutMap = function () {
        $roamObject.navigation.activate(esri.toolbars.Navigation.ZOOM_OUT);
    }
    
    //区域放大缩小失效
    this.areaZoomDeactivate = function () {
        $roamObject.navigation.deactivate();
    }
    
    //停用预定义快捷键启用地图自带快捷键
    this.disableShortcuts = function () {
        if($roamObject.defaultShortcuts != null) {
            dojo.disconnect($roamObject.defaultShortcuts);
        }
        $roamObject.map.enableKeyboardNavigation();
    }
}
