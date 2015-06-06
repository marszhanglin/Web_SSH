(function () {
    var map, layer;

    function dowork() {
        map = new SuperMap.Map("map", { controls:[
            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.LayerSwitcher(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.Navigation({
                dragPanOptions:{
                    enableKinetic:true
                }
            })]
        });

        layer = new SuperMap.Layer.CloudLayer();

        map.addLayers([layer]);

        map.setCenter(new SuperMap.LonLat(11339634.286396, 4588716.5813769), 4);
    }

    dowork();
})();
