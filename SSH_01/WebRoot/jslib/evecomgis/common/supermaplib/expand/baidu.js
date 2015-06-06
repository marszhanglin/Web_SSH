(function() {
    var map, layer;
    function dowork() {
        map = new SuperMap.Map("map", { controls: [
            new SuperMap.Control.Attribution(),
            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.Navigation({
                dragPanOptions: {
                    enableKinetic: true
                }
            })], units: "m"
        });

        //基于SuperMap对百度地图进行了支持与扩展，需要额外引入Baidu.js脚本;
        //脚本位于js/layer/Baidu.js;
        layer = new SuperMap.Layer.Baidu();
        map.addLayers([layer]);
        map.setCenter(new SuperMap.LonLat(69021482.54940,29315922.28250), 2);
    }
    dowork();
})();
