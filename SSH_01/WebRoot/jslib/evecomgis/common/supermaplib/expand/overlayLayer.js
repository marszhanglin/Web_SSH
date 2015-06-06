(function() {
    var map, layerWorld, layerJingjing;
    function dowork() {
        $("#func").append($("<div style='margin-top:25px;'><span>透明度：</span><input style='width:50px' id='layerOpacity' value='0.6'></input></div>"));
        addBtn("设置透明度",setLayerOpacity);
        map = new SuperMap.Map("map",{controls: [
            new SuperMap.Control.LayerSwitcher(),
            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.OverviewMap(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.Navigation({
                dragPanOptions: {
                                    enableKinetic: true
                                }
            })], allOverlays: true
        });
        layerWorld = new SuperMap.Layer.TiledDynamicRESTLayer("World", DemoURL.world, {transparent: true, cacheEnabled: true});
        layerWorld.events.on({"layerInitialized": addLayer1});
    }
    
    function setLayerOpacity(){
        var numStr = $('#layerOpacity').val();
        if(numStr && !isNaN(numStr)){
            if(Number(numStr) >= 0 && Number(numStr) <= 1){
                layerJingjing.setOpacity(Number(numStr));
            }
        }
    }

    function addLayer1(){
        layerJingjing = new SuperMap.Layer.TiledDynamicRESTLayer("京津地区地图", DemoURL.jingjin_map, {transparent: true, cacheEnabled: true}, {useCanvas: false});
        layerJingjing.events.on({"layerInitialized": addLayer2});
        layerJingjing.setOpacity(0.6);
    }
    function addLayer2(){
        map.addLayers([layerWorld,layerJingjing]);
        map.setCenter(new SuperMap.LonLat(118, 40), 6);
    }
    dowork();
})();
