﻿(function() {

    var map;
    //显示bing图层所需的apiKey
    var apiKey = "AqTGBsziZHIJYYxgivLBf0hVdrAk9mWO5cQcb8Yux8sW5M8c8opEC2lZqKR1ZZXf";
    function dowork() {
        map = new SuperMap.Map("map", { controls: [
            new SuperMap.Control.Attribution(),
            new SuperMap.Control.LayerSwitcher(),
            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.Navigation({
                dragPanOptions: {
                    enableKinetic: true
                }
            })]
        });

        //基于SuperMap对Bing地图图层进行了支持与扩展，需要额外引入Bing.js脚本;
        //脚本位于js/layer/Bing.js;
        //初始化bing的三种图层
        var road = new SuperMap.Layer.Bing({
            name: "Road",
            key: apiKey,
            type: "Road"
        });
        var hybrid = new SuperMap.Layer.Bing({
            name: "Hybrid",
            key: apiKey,
            type: "AerialWithLabels"
        });
        var aerial = new SuperMap.Layer.Bing({
            name: "Aerial",
            key: apiKey,
            type: "Aerial"
        });
        //将这三个图层加载到Map对象上
        map.addLayers([road, hybrid, aerial]);
        //设置地图中心点，显示地图
        //Bing图层默认为墨卡托投影，所以定位需要转换
        map.setCenter(
            new SuperMap.LonLat(103.31, 36.03).transform(
                new SuperMap.Projection("EPSG:4326"),
                map.getProjectionObject()
            ),4
        );
    }
    dowork();
})();
