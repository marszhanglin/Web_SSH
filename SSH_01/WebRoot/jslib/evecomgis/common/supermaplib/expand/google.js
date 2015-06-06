(function() {
    var map;
    function dowork() {
        map = new SuperMap.Map("map", { controls: [
            new SuperMap.Control.LayerSwitcher(),
            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.MousePosition(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.Navigation({
                dragPanOptions: {
                    enableKinetic: true
                }
            })]
        });
        /**
         * 对谷歌地图的支持需要引入第三方脚本库：位于js/layer文件夹下；
         * 依赖的脚本有SphericalMercator.js、EventPane.js、FixedZoomLevels.js、
         * Google.js、Google.v3.js等五个脚本,同时为了加载谷歌地图API，有如下代码：
         *  <script src="http://maps.google.com/maps/api/js?v=3.5&amp;sensor=false" ></script>
         */
        //初始化google的四种图层
        var gphy = new SuperMap.Layer.Google(
            "Google Physical",
            {type: google.maps.MapTypeId.TERRAIN}
        );
        var gmap = new SuperMap.Layer.Google(
            "Google Streets", // the default
            {numZoomLevels: 20}
        );
        var ghyb = new SuperMap.Layer.Google(
            "Google Hybrid",
            {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
        );
        var gsat = new SuperMap.Layer.Google(
            "Google Satellite",
            {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
        );
        //将这四个图层加载到Map对象上
        map.addLayers([gphy, gmap, ghyb, gsat]);
        //设置地图中心点，显示地图
       // map.setCenter(new SuperMap.LonLat(103.31,36.03), 4);

        map.setCenter(new SuperMap.LonLat(11339634.286396,4588716.5813769), 4);
    }
    dowork();
})();
