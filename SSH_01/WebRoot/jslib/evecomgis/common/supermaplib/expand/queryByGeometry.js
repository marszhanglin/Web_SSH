(function() {
    var map, local, layer, vectorLayer, vectorLayer1, drawPolygon, markerLayer,drawPoint, drawLine,
    style = {
        strokeColor: "#304DBE",
        strokeWidth: 1,
        pointerEvents: "visiblePainted",
        fillColor: "#304DBE",
        fillOpacity: 0.8
    };
    function dowork() {
             var create1 = '圆',
             create2 = '多边形', 
             create3 = '点', 
             create4 = '线', 
             create5 = '矩形', 
             remove = '清除';
        addBtn(create3,drawGeometry3);     
        addBtn(create4,drawGeometry4);     
        addBtn(create5,drawRectangleCompleted);     
        addBtn(create1,drawGeometry1);
        addBtn(create2,drawGeometry2);
        
        addBtn(remove,clearFeatures);

        layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", DemoURL.world, {transparent: true, cacheEnabled: true}, {maxResolution:"auto"}); 
        layer.events.on({"layerInitialized":addLayer});     
        vectorLayer = new SuperMap.Layer.Vector("Vector Layer");
        vectorLayer1 = new SuperMap.Layer.Vector("Vector Layer1");
        markerLayer = new SuperMap.Layer.Markers("Markers");
        
        
        //几何圆查询
        drawPolygon1 = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.RegularPolygon,{handlerOptions:{sides:50}});  
        drawPolygon1.events.on({"featureadded": drawCompleted});
        
        //多边形查询
        drawPolygon2 = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Polygon);     
        drawPolygon2.events.on({"featureadded": drawCompleted});
        
        //点查询
        drawPoint = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Point);     
        drawPoint.events.on({"featureadded": drawPointCompleted});
        
        //线查询
        drawLine = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Path);     
        drawLine.events.on({"featureadded": drawPointCompleted});
        
        //矩形
        
        drawRectangle = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Box);     
        drawRectangle.events.on({"featureadded": drawRectangleCompleted});
        
        map = new SuperMap.Map("map",{controls: [
            new SuperMap.Control.LayerSwitcher(),
            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.Navigation({
                dragPanOptions: {
                                    enableKinetic: true
                                }}),
            drawPolygon1,drawPolygon2,drawPoint,drawLine,drawRectangle]
        });
    }

    function addLayer() {
        map.addLayers([layer, vectorLayer, vectorLayer1, markerLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
    } 
    function clearStatus(){
        vectorLayer.removeAllFeatures();
        vectorLayer1.removeAllFeatures();
        markerLayer.clearMarkers();
    }    
    //画圆
    function drawGeometry1() {
        //先清除上次的显示结果
        clearStatus();
        drawPolygon1.activate();
    }
    //画多边形
    function drawGeometry2() {
        //先清除上次的显示结果
        clearStatus();
        drawPolygon2.activate();
    }
    //画点
    function drawGeometry3() {
        //先清除上次的显示结果
        clearStatus();
        drawPoint.activate();
    }    
    //画线
    function drawGeometry4() {
        //先清除上次的显示结果
        clearStatus();
        drawLine.activate();
    }
    //画矩形
    function drawGeometry5() {
        //先清除上次的显示结果
        clearStatus();
        drawRectangle.activate();
    }    
    
    function drawCompleted(drawGeometryArgs) {
        var feature = new SuperMap.Feature.Vector();
        feature.geometry = drawGeometryArgs.feature.geometry,
            feature.style = style;
        vectorLayer.addFeatures(feature);

        var queryParam, queryByGeometryParameters, queryService;
        queryParam = new SuperMap.REST.FilterParameter({name: "Capitals@World.1"});
        queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters({
                queryParams: [queryParam], 
                geometry: drawGeometryArgs.feature.geometry,
                spatialQueryMode: SuperMap.REST.SpatialQueryMode.INTERSECT
        });
        queryService = new SuperMap.REST.QueryByGeometryService(DemoURL.world, {
            eventListeners: {
                "processCompleted": processCompleted,
                "processFailed": processFailed
                            }
        });
        queryService.processAsync(queryByGeometryParameters);
    }
    function drawPointCompleted(drawGeometryArgs) {
        var feature = new SuperMap.Feature.Vector();
        feature.geometry = drawGeometryArgs.feature.geometry,
            feature.style = style;
        vectorLayer.addFeatures(feature);

        var queryParam, queryByGeometryParameters, queryService;
        queryParam = new SuperMap.REST.FilterParameter({name: "Countries@World"});
        queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters({
                queryParams: [queryParam], 
                geometry: drawGeometryArgs.feature.geometry,
                spatialQueryMode: SuperMap.REST.SpatialQueryMode.INTERSECT
        });
        queryService = new SuperMap.REST.QueryByGeometryService(DemoURL.world, {
            eventListeners: {
                "processCompleted": processCompleted,
                "processFailed": processFailed
                            }
        });
        queryService.processAsync(queryByGeometryParameters);
    }
    //矩形
     function drawRectangleCompleted() {
        //先清除上次的显示结果
        clearStatus();

        control = new SuperMap.Control();
        SuperMap.Util.extend(control, {//Util工具类   extend指的是将复制所有的属性的源对象到目标对象
            draw: function () {
                this.box = new SuperMap.Handler.Box(control,{"done": this.notice});//此句是创建一个句柄，Box是一个处理地图拖放一个矩形的事件，这个矩形显示是开始于在按下鼠标，然后移动鼠标，最后完成在松开鼠标。
                this.box.boxDivClassName = "qByBoundsBoxDiv";//boxDivClassName用于绘制这个矩形状的图形
                this.box.activate();//激活句柄
            },
            //将拖动的矩形显示在地图上
            notice: function (bounds) {
                this.box.deactivate();//处理关闭激活句柄

                var ll = map.getLonLatFromPixel(new SuperMap.Pixel(bounds.left, bounds.bottom)),//getLonLatFromPixel从视口坐标获得地理坐标
                ur = map.getLonLatFromPixel(new SuperMap.Pixel(bounds.right, bounds.top));
                queryBounds = new SuperMap.Bounds(ll.lon, ll.lat, ur.lon, ur.lat);

                var feature = new SuperMap.Feature.Vector();
                feature.geometry = queryBounds.toGeometry(),
                    feature.style = style;
                vectorLayer.addFeatures(feature);

                var queryParam, queryByBoundsParams, queryService;
                queryParam = new SuperMap.REST.FilterParameter({name: "Capitals@World.1"});//FilterParameter设置查询条件，name是必设的参数，（图层名称格式：数据集名称@数据源别名）
                queryByBoundsParams = new SuperMap.REST.QueryByBoundsParameters({queryParams: [queryParam], bounds: queryBounds});//queryParams查询过滤条件参数数组。bounds查询范围
                queryService = new SuperMap.REST.QueryByBoundsService(DemoURL.world, {
                    eventListeners: {
                        "processCompleted": processCompleted,
                        "processFailed": processFailed
                        }
                });
                queryService.processAsync(queryByBoundsParams);//向服务端传递参数，然后服务端返回对象
            }
        });
        map.addControl(control);
    }
    
    function processCompleted(queryEventArgs) {
        drawPolygon1.deactivate();
        drawPolygon2.deactivate();
        drawPoint.deactivate();
        drawLine.deactivate();
        drawRectangle.deactivate();
        var i, j, result = queryEventArgs.result;
        if (result && result.recordsets) {
            for (i=0, recordsets=result.recordsets, len=recordsets.length; i<len; i++) {
                if (recordsets[i].features) {
                    for (j=0; j<recordsets[i].features.length; j++) {
                        var feature = recordsets[i].features[j];
                        var point = feature.geometry;
                        if(point.CLASS_NAME == SuperMap.Geometry.Point.prototype.CLASS_NAME){
                            var size = new SuperMap.Size(44, 33),
                                 offset = new SuperMap.Pixel(-(size.w/2), -size.h),
                                 icon = new SuperMap.Icon("../theme/images/marker.png", size, offset);
                        markerLayer.addMarker(new SuperMap.Marker(new SuperMap.LonLat(point.x, point.y), icon));
                        }else{
                            feature.style = style;
                            vectorLayer1.addFeatures(feature);
                        }
                        
                    }
                }
            }
        }
    }
    function processFailed(e) {
        doMapAlert("",e.error.errorMsg,true);
    }
    function clearFeatures() {
        vectorLayer.removeAllFeatures();
        vectorLayer1.removeAllFeatures();
        markerLayer.clearMarkers();
    }
    dowork();
})();
