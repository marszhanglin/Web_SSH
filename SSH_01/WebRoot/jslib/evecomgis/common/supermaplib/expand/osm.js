(function() {
    var map, layer;

    function dowork() {
        map = new SuperMap.Map("map",{controls: [
            new SuperMap.Control.Attribution(),
            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.Navigation({
                dragPanOptions: {
                    enableKinetic: true
                }
            })]
        });

        //基于SuperMap对OpenStreetMap地图图层进行了支持与扩展，需要额外引入OSM.js脚本;
        //脚本位于js/layer/OSM.js;
        //初始化图层
        layer=new SuperMap.Layer.OSM("osmLayer");
        //将Layer图层加载到Map对象上
        map.addLayer(layer);
        //出图，map.setCenter函数显示地图
        //OSM图层默认为墨卡托投影，所以定位需要转换
        map.setCenter(
            new SuperMap.LonLat(110,39.5 ).transform(
                new SuperMap.Projection("EPSG:4326"),
                map.getProjectionObject()
            ), 4
        );
    }
    dowork();
})();
