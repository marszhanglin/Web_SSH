(function() {
    var map, layer;

    function dowork(){
        map = new SuperMap.Map("map", {controls: [
            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.LayerSwitcher(),
            new SuperMap.Control.Navigation({
                dragPanOptions: {
                    enableKinetic: true
                }
            })], units: "degrees", allOverlays: true
        });

        layerWorld = new SuperMap.Layer.TiledDynamicRESTLayer("World", DemoURL.world,  {transparent: true, cacheEnabled: true});
        layerWorld.events.on({"layerInitialized": addLayer1});
    }

    function addLayer1(){
        //基于SuperMap对WCS地图图层进行了支持与扩展，需要额外引入WCSLayer.js脚本;
        //脚本位于js/layer/WCSLayer.js;
        //初始化WCS图层
        layer = new SuperMap.Layer.WCSLayer("wcsLayer", "http://localhost:8090/iserver/services/data-world/wcs111");
        map.addLayers([layerWorld, layer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 2);
    }
    
    dowork();
})();