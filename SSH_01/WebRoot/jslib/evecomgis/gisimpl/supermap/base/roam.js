//注册命名空间
Namespace.register("evecomgis.gisimpl.supermap.base");

/**
 * @Title evecomgis.gisimpl.arcgis.base.Roam
 * @param map 地图对象
 * @Description 地图漫游
 * @author Link
 * @Date 2013-12-20
 */
evecomgis.gisimpl.supermap.base.Roam = function () {

    var $roamObject = this;
    var dragPan;
    var zoomBox;
	var map;

    //初始化必要参数
    this.init = function (m) {
        map = m;
        vectorLayer = new SuperMap.Layer.Vector("roamLayer"); 
        
        dragPan = new SuperMap.Control.DragPan(); 
        map.addControl(dragPan);
        zoomBox = new SuperMap.Control.ZoomBox({out:true}); 

        map.addControl(zoomBox);
    }
    
    //平移
    this.setPan = function(){
    	dragPan.activate();
    }
    
    //放大 
    this.zoomInMap = function () {
        map.zoomIn();
    }
    
    //缩小
    this.zoomOutMap = function () {
        map.zoomOut();
    }
    
    //地图导航向上
    this.panUpMap = function () {
    	map.pan(0,30);
    }
    
    //地图导航向下
    this.panDownMap = function () {
    	map.pan(0,-30);
    }
    
    //地图导航向左
    this.panLeftMap = function () {
    	map.pan(-30,0);
    }
    
    //地图导航向右
    this.panRightMap = function () {
    	map.pan(30,0);
    }
    
    //全屏
    this.fullScreenMap = function () {
    	
    }
    
    //还原
    this.revertMap = function () {
    	
    }

	    
    //启用预定义快捷键，停用地图快捷键
    this.enableShortcuts = function () {

    }
    
    
    //区域放大
    this.areaZoomInMap = function () {
		zoomBox.out = false;
		zoomBox.keyMask = null;
		zoomBox.activate();
    }
    
    
    //区域缩小
    this.areaZoomOutMap = function () {
		zoomBox.out = true;
		zoomBox.keyMask = null;
		zoomBox.activate();
    }
    
    //区域放大缩小失效
    this.areaZoomDeactivate = function () {
		zoomBox.deactivate();
    }
    
    //停用预定义快捷键启用地图自带快捷键
    this.disableShortcuts = function () {

    }
}





/****************************************************************************************/
///**
// * @Title evecomgis.gisimpl.arcgis.base.Roam
// * @param map 地图对象
// * @Description 地图漫游
// * @author Link
// * @Date 2013-12-20
// */
//evecomgis.gisimpl.supermap.base.Roam = function () {
//
//    var $roamObject = this;
//    this.width;
//    this.height;
//    this.map;
//    this.navigation;
//    this.defaultShortcuts;
//    //初始化必要参数
//    this.init = function (map) {
//        $roamObject.map = map;
//        
//    }
//    
//    //平移
//    this.setPan = function(){
//    	var panAction = $create(SuperMap.Web.Actions.Pan, {map: $roamObject.map}, null, null, null);
//        $roamObject.map.set_action(panAction);
//    }
//    
//    //放大 
//    this.zoomInMap = function () {
//        var zoomInAction = $create(SuperMap.Web.Actions.ZoomIn, {map: $roamObject.map}, null, null, null);
//        $roamObject.map.set_action(zoomInAction);
//    }
//    
//    //缩小
//    this.zoomOutMap = function () {
//        var zoomOutAction = $create(SuperMap.Web.Actions.ZoomOut, {map: $roamObject.map}, null, null, null);
//        $roamObject.map.set_action(zoomOutAction);
//    }
//    
//    //地图导航向上
//    this.panUpMap = function () {
//        $roamObject.map.panByPixel(0,30);
//    }
//    
//    //地图导航向下
//    this.panDownMap = function () {
//        $roamObject.map.panByPixel(0,-30);
//    }
//    
//    //地图导航向左
//    this.panLeftMap = function () {
//        $roamObject.map.panByPixel(-30,0);
//    }
//    
//    //地图导航向右
//    this.panRightMap = function () {
//        $roamObject.map.panByPixel(30,0);
//    }
//    
//    //全屏
//    this.fullScreenMap = function () {
//        $roamObject.map.viewEntire();
//    }
//    
//    //还原
//    this.revertMap = function () {
//        var div = dojo.byId($roamObject.map.id);
//        div.style.width = $roamObject.width;
//        div.style.height = $roamObject.height;
//        $roamObject.map.resize();
//    }
//    
//}
