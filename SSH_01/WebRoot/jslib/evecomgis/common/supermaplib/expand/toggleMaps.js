(function () {
    var map, layer, ghyb, bGoogle = false;

    function dowork() {
        addBtn("卫星地图", changeMap);
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

        ghyb = new SuperMap.Layer.Google(
            "Google Hybrid",
            {type:google.maps.MapTypeId.HYBRID, numZoomLevels:20}
        );
        map.addLayers([layer, ghyb]);

        map.setCenter(new SuperMap.LonLat(11339634.286396, 4588716.5813769), 4);
    }

    function changeMap(e) {
        if (bGoogle == false) {
            layer.setVisibility(false);
            ghyb.setVisibility(true);
            map.setBaseLayer(ghyb);

            $(".btn").text("平面地图");
            bGoogle = true;
        } else if (bGoogle == true) {
            layer.setVisibility(true);
            ghyb.setVisibility(false);
            map.setBaseLayer(layer);

            $(".btn").text("卫星地图");
            bGoogle = false;
        }
    }

    dowork();
})();
