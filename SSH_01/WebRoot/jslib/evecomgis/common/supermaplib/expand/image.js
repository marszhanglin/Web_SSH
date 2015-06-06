(function() {
    var map, layer;
    function dowork() {
        map = new SuperMap.Map("map", { controls: [
            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.LayerSwitcher(),
            new SuperMap.Control.Navigation()]
        });
        var options = {numZoomLevels: 12,useCanvas:false};
        var bounds= new SuperMap.Bounds(-180, -90, 180, 90);
        layer=new SuperMap.Layer.Image(
            'World_Day',
            'images/Day.jpg',
            bounds ,
            options
        );
        map.addLayer(layer);
        map.zoomToMaxExtent();
    }
    dowork();
})();
