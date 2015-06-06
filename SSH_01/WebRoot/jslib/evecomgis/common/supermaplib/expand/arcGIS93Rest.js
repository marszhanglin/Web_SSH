(function() {
    var map, layer,
        url="http://www.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/export";

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
        //基于SuperMap对ArcGIS93Rest地图图层进行了支持与扩展，需要额外引入ArcGIS93Rest.js脚本;
        //脚本位于js/layer/ArcGIS93Rest.js;
        //初始化图层
        layer = new SuperMap.Layer.ArcGIS93Rest("World", url, {layers:"show:0,1,2,4"}, {projection:"EPSG:3857",useCanvas:true});
        //将layer图层加载到Map对象上
        map.addLayer(layer);
        //出图
        map.setCenter(new SuperMap.LonLat(110,39.5 ).transform(
            new SuperMap.Projection("EPSG:4326"),
            map.getProjectionObject()
        ), 4);
    }
    dowork();
})();
