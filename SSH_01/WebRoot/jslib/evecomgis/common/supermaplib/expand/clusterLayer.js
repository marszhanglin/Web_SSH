(function() {
    var map, layer,clusterLayer,infowin;
    var styleLine = {
        strokeColor: "black",
        strokeWidth: 1,
        fill: false
    };
    function openInfoWin(feature){
        var geo = feature.geometry;
        var bounds = geo.getBounds();
        var center = bounds.getCenterLonLat();
        var contentHTML = "<div style='font-size:.8em; opacity: 0.8; overflow-y:hidden;'>";
        contentHTML += "<div>"+feature.info.name+"</div></div>";

        var popup = new SuperMap.Popup.FramedCloud("popwin",
            new SuperMap.LonLat(center.lon,center.lat),
            null,
            contentHTML,
            null,
            true);

        feature.popup = popup;
        infowin = popup;
        map.addPopup(popup);
    }
    function closeInfoWin(){
        if(infowin){
            try{
                infowin.hide();
                infowin.destroy();
            }
            catch(e){}
        }
    }
    function dowork() {
        map = new SuperMap.Map("map", { controls: [
            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.Navigation({
                dragPanOptions: {
                                    enableKinetic: true
                                }
            })], units: "m"
        });
        layer = new SuperMap.Layer.TiledDynamicRESTLayer("changchun", DemoURL.changChun_Map, {transparent: true, cacheEnabled: true, redirect: true}, {maxResolution:"auto"});
        layer.events.on({"layerInitialized": addLayer});
    }

    function addLayer(){
        clusterLayer = new SuperMap.Layer.ClusterLayer("Cluster");
        map.addLayers([layer,clusterLayer]);
        var select = new SuperMap.Control.SelectCluster(clusterLayer);
        map.addControl(select);
        map.setCenter(new SuperMap.LonLat(4803, -3726), 1);

        clusterLayer.events.on({"clickFeature": function(f){
            closeInfoWin();
            openInfoWin(f);
        }});
        clusterLayer.events.on({"clickout": function(f){
            closeInfoWin();
        }});
        clusterLayer.events.on({"moveend": function(e){
            if(e&& e.zoomChanged)closeInfoWin();
        }});
        clusterLayer.events.on({"clickCluster": function(f){
            closeInfoWin();
        }});

        select.activate();
        var fs1 = getFeatures();
        clusterLayer.addFeatures(fs1);
    }

    function getFeatures(){
        var b = map.getExtent();
        var ps = [];
        var fs = changchundata;
        for(var i=0;i<fs.length;i++){
            var fi = fs[i];
            var c = fi.geometry.center;

            var f = new SuperMap.Feature.Vector();
            f.geometry = new SuperMap.Geometry.Point(c.x, c.y);
            f.style = {
                pointRadius: 4,
                graphic:true,
                externalGraphic:"../theme/images/cluster4.png",
                graphicWidth:12,
                graphicHeight:12
            };
            f.info = {
                "name":fi.fieldValues[4]
            };
            ps.push(f);
        }
        return ps;

    }

    dowork();
})();
