﻿(function() {
    var spatialAnalystURL, local, map, layer, vectorLayer, resultLayer, markerLayer, gpsLine, bufferResultGeometry, 
    myPointsList = [new SuperMap.Geometry.Point(2823.940, -4690.000),
        new SuperMap.Geometry.Point(3448.940, -4690.301),
        new SuperMap.Geometry.Point(3816.561, -3810.125), 
        new SuperMap.Geometry.Point(3917.383, -3609.158), 
        new SuperMap.Geometry.Point(3976.983, -3490.291),  
        new SuperMap.Geometry.Point(4020.004, -4377.027), 
        new SuperMap.Geometry.Point(4076.265, -4382.939), 
        new SuperMap.Geometry.Point(4215.049, -4382.333), 
        new SuperMap.Geometry.Point(4428.156, -4382.285), 
        new SuperMap.Geometry.Point(4647.579, -4383.017), 
        new SuperMap.Geometry.Point(4679.707, -4382.898), 
        new SuperMap.Geometry.Point(4917.462, -4382.635), 
        new SuperMap.Geometry.Point(5074.019, -4381.833), 
        new SuperMap.Geometry.Point(5257.042, -4381.031), 
        new SuperMap.Geometry.Point(5363.785, -4380.717), 
        new SuperMap.Geometry.Point(5671.717, -4378.794), 
        new SuperMap.Geometry.Point(5847.521, -4377.970), 
        new SuperMap.Geometry.Point(5990.637, -4303.528), 
        new SuperMap.Geometry.Point(6055.343, -4270.072), 
        new SuperMap.Geometry.Point(6168.913, -4382.389), 
        new SuperMap.Geometry.Point(6214.183, -4209.927), 
        new SuperMap.Geometry.Point(6377.789, -4209.142), 
        new SuperMap.Geometry.Point(6393.692, -4210.142), 
        new SuperMap.Geometry.Point(6693.989, -4207.450), 
        new SuperMap.Geometry.Point(6788.392, -4208.450), 
        new SuperMap.Geometry.Point(6984.304, -4207.210), 
        new SuperMap.Geometry.Point(7189.183, -4208.296), 
        new SuperMap.Geometry.Point(7300.505, -4208.296), 
        new SuperMap.Geometry.Point(7573.056, -4208.803), 
        new SuperMap.Geometry.Point(7680.977, -4208.804), 
        new SuperMap.Geometry.Point(7850.593, -4208.393),
        new SuperMap.Geometry.Point(8182.656, -4210.533), 
        new SuperMap.Geometry.Point(8554.893, -4261.485)],
    myFeatures = [],
    stylePoint = {
        strokeColor: "black",
        strokeOpacity: 1,
        strokeDashstyle: "solid",
        fillColor: "black",
        pointRadius: 2
    },
    styleLine = {
        strokeColor: "red",
        strokeWidth: 2,
        pointRadius: 3,
        pointerEvents: "visiblePainted",
        fill: false
    },
    styleRegion = {
        strokeColor: "#304DBE",
        strokeWidth: 2,
        pointerEvents: "visiblePainted",
        fillColor: "#304DBE",
        fillOpacity: 0.4
    };
    function dowork() {
        var create = '生成路径', create1 = '缓冲区分析', 
            create2 = '查询', remove = '移除专题图';
        addBtn(create,addPath);
        addBtn(create1,bufferAnalystProcess);
        addBtn(create2,queryByGeometry);
        addBtn(remove,clearElements);

        vectorLayer = new SuperMap.Layer.Vector("Vector Layer");
        resultLayer = new SuperMap.Layer.Vector("Result Layer");
        markerLayer = new SuperMap.Layer.Markers("Markers Layer");
        map = new SuperMap.Map("map",{controls: [
            new SuperMap.Control.LayerSwitcher(),
            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.Navigation({
                dragPanOptions: {
                                    enableKinetic: true
                                }
            })], units: "m"
        });
        layer = new SuperMap.Layer.TiledDynamicRESTLayer("Changchun", DemoURL.changChun_Map, {transparent: true, cacheEnabled: true}, {maxResolution: "auto"});
        layer.events.on({"layerInitialized":addLayer});
        for (var i = 0; i < myPointsList.length; i++){
            myFeature = new SuperMap.Feature.Vector();
            myFeature.geometry = myPointsList[i];
            myFeature.style = stylePoint;
            myFeatures.push(myFeature);
        }
        vectorLayer.addFeatures(myFeatures);
    }

    function addLayer() {
        map.addLayers([layer, vectorLayer, resultLayer, markerLayer]);
        map.setCenter(new SuperMap.LonLat(4503.6240321526, -3861.911472192499), 0);
    }
    //将离散gps信号点生成线路
    function addPath(){
        var pathFeature=  new SuperMap.Feature.Vector();
        gpsLine = new SuperMap.Geometry.LineString(myPointsList);
        pathFeature.geometry = gpsLine;
        pathFeature.style = styleLine;
        resultLayer.addFeatures(pathFeature);
    }
    //对生成的线路进行缓冲区分析
    function  bufferAnalystProcess() {
        var bufferServiceByGeometry = new SuperMap.REST.BufferAnalystService(DemoURL.changchun_spatialanalyst),
            bufferDistance = new SuperMap.REST.BufferDistance({
                value: 250
            }),
            bufferSetting = new SuperMap.REST.BufferSetting({
                endType: SuperMap.REST.BufferEndType.ROUND,
            leftDistance: bufferDistance,
            rightDistance: bufferDistance,
            semicircleLineSegment: 10
            }),
            geoBufferAnalystParam = new SuperMap.REST.GeometryBufferAnalystParameters({
                sourceGeometry: gpsLine,
            bufferSetting: bufferSetting
            });        

        bufferServiceByGeometry.events.on(
		{
			"processCompleted": bufferAnalystCompleted
		});
        bufferServiceByGeometry.processAsync(geoBufferAnalystParam);
    }
    function bufferAnalystCompleted(BufferAnalystEventArgs) {
        var feature = new SuperMap.Feature.Vector();
        bufferResultGeometry = BufferAnalystEventArgs.result.resultGeometry;
        feature.geometry = bufferResultGeometry;
        feature.style = styleRegion;
        resultLayer.addFeatures(feature);
    }
    //查询出信号影响范围内的工厂
    function queryByGeometry(){
        var queryParam, queryByGeometryParameters, queryService;
        queryParam = new SuperMap.REST.FilterParameter({name: "Company@Changchun.2"});
        queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters({
            queryParams: [queryParam], 
		    geometry: bufferResultGeometry,
		    spatialQueryMode: SuperMap.REST.SpatialQueryMode.INTERSECT
        });
        queryService = new SuperMap.REST.QueryByGeometryService(DemoURL.changChun_Map);
        queryService.events.on(
		{
			"processCompleted": queryCompleted
		});
        queryService.processAsync(queryByGeometryParameters);
    }
    function queryCompleted(queryEventArgs) {
        var i, j, result = queryEventArgs.result;
        if (result && result.recordsets) {
            for (i=0, recordsets=result.recordsets, len=recordsets.length; i<len; i++) {
                if (recordsets[i].features) {
                    for (j=0; j<recordsets[i].features.length; j++) {
                        var point = recordsets[i].features[j].geometry,
                            size = new SuperMap.Size(44,40),
                                 offset = new SuperMap.Pixel(-(size.w/2), -size.h),
                                 icon = new SuperMap.Icon("../theme/images/marker-gold.png", size, offset);
                        markerLayer.addMarker(new SuperMap.Marker(new SuperMap.LonLat(point.x, point.y), icon));
                    }
                }
            }
        }
    }
    function clearElements() {
        resultLayer.removeAllFeatures();
        markerLayer.clearMarkers();
    }
    dowork();
})();
