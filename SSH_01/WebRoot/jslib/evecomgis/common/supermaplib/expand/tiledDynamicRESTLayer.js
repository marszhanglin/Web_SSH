(function() {
    var map, layer, positionLayer, lat, lon, geolocate;
    function dowork() {
        addBtn("定位", geoLocation);
        map = new SuperMap.Map("map",{controls: [                      
            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.Navigation({
                dragPanOptions: {
                                    enableKinetic: true
                                }
            })],
            projection: "EPSG:3857"
        });
        //添加geo定位控件
        geolocate = new SuperMap.Control.Geolocate({
            bind: false,
            geolocationOptions: {
                enableHighAccuracy: false,
                maximumAge: 0
            },
            eventListeners: {
                "locationupdated": getGeolocationCompleted,
                "locationfailed": getGeolocationFailed
            }
        });
        //激活控件
        map.addControl(geolocate);
        //初始化图层
        positionLayer = new SuperMap.Layer.Markers("Markers");
        layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", DemoURL.china, {transparent: true, cacheEnabled: true, redirect: true}, {maxResolution:"auto"}); 
        layer.events.on({"layerInitialized": addLayer});
    }

    function addLayer() {
        var center = new SuperMap.LonLat(11733502.481499,4614406.969325);
        map.addLayers([layer,positionLayer]);
        map.setCenter(center, 3);
    }
    
    function geoLocation(){
        if(!geolocate.active){
            geolocate.activate();
        }
        geolocate.getCurrentLocation();
    }
    
    //更新定位
    function getGeolocationCompleted(event) {
        var lonLat = new SuperMap.LonLat(event.point.x,event.point.y);
        positionLayer.clearMarkers()
        size = new SuperMap.Size(44, 33),
        offset = new SuperMap.Pixel(-(size.w/2), -size.h),
        icon = new SuperMap.Icon("../theme/images/marker.png", size, offset);
        positionLayer.addMarker(new SuperMap.Marker(lonLat, icon));
        map.setCenter(lonLat);
    }
    function getGeolocationFailed(event){
        alert("您当前使用的浏览器不支持地图地位服务");
    }
    dowork();
})();
