(function() {
     var map, local, layer,control;
  
    function dowork() {
         map = new SuperMap.Map("map", {controls:[
             new SuperMap.Control.LayerSwitcher(),
             new SuperMap.Control.ScaleLine(),
             new SuperMap.Control.Zoom(),
             new SuperMap.Control.Navigation({
                dragPanOptions: {
                    enableKinetic: true
                }
             })],projection:"EPSG:3857"
         });
         control = new SuperMap.Control.MousePosition();
        
         map.events.on({"mousemove":getMousePositionPx});
        
         layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", DemoURL.china_Map, {
             transparent: true, cacheEnabled: true}, {maxResolution:"auto"}); 
         layer.events.on({"layerInitialized": addLayer}); 
    }
    
    function addLayer() {
        map.addLayer(layer);
        map.setCenter(new SuperMap.LonLat(11733502.481499,4614406.969325), 3);
    }
    
    function getMousePositionPx(evt){
        //获取鼠标坐标位置
        var lonLat = map.getLonLatFromPixel(evt.xy);
        if (!lonLat) { 
            return;
        } 
        //坐标转换
        lonLat.transform("EPSG:3857", "EPSG:4326" );

        var newHtml = "客户端地图坐标投影转换：<br> 地图投影：EPSG:3857 <br> 鼠标位置坐标投影：EPSG:4326 <br> 鼠标位置坐标:  " +
            lonLat.lon.toFixed(5) + " " +
            lonLat.lat.toFixed(5);
        $("#mousePositionDiv").html(newHtml);
    }
    dowork();
})();
