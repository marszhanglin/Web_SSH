﻿(function () {
    var map, layer, routeObj, vectorLayer, drawPoint, pointLayer,
        lineStyle = {
            strokeColor:"red",
            strokeWidth:2,
            pointRadius:3,
            pointerEvents:"visiblePainted",
            fill:false
        },
        pointStyle = {
            fillColor:'#669933',
            fillOpacity:0.8,
            pointRadius:5,
            strokeColor:'#aaee77',
            strokeWidth:3
        };

    function dowork() {
        var createRouteObj = "查询路由对象", calculateMeasure = '指定查询点', remove = '清除';
        addBtn(createRouteObj, CreateRouteObj);
        addBtn(calculateMeasure, RouteCalculateMeasure);
        addBtn(remove, Remove);

        layer = new SuperMap.Layer.TiledDynamicRESTLayer("changchun", DemoURL.changChun_Map, { transparent:true, cacheEnabled:true }, { maxResolution:"auto" });
        vectorLayer = new SuperMap.Layer.Vector("RouteLayer");
        pointLayer = new SuperMap.Layer.Vector("pointLayer");

        drawPoint = new SuperMap.Control.DrawFeature(pointLayer, SuperMap.Handler.Point);
        drawPoint.events.on({"featureadded":drawPointCompleted});

        layer.events.on({"layerInitialized":addLayer});

        map = new SuperMap.Map("map", {allOverlays:true, controls:[
            new SuperMap.Control.LayerSwitcher(),
            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.Navigation({
                dragPanOptions:{
                    enableKinetic:true
                }}), drawPoint]
        });
    }

    function addLayer() {
        map.addLayers([layer, vectorLayer, pointLayer]);
        map.setCenter(new SuperMap.LonLat(4503.6240321526, -3861.911472192499), 1);
    }

    //通过SQL查询路由对象
    function CreateRouteObj() {
        var queryParam, queryBySQLParams, queryBySQLService;
        queryParam = new SuperMap.REST.FilterParameter({
            name:"RouteDT_road@Changchun",
            attributeFilter:"RouteID=1690"
        });
        queryBySQLParams = new SuperMap.REST.QueryBySQLParameters({
            queryParams:[queryParam]
        });
        queryBySQLService = new SuperMap.REST.QueryBySQLService(DemoURL.changChun_Map, {
            eventListeners:{
                "processCompleted":processCompleted,
                "processFailed":processFailed
            }
        });
        queryBySQLService.processAsync(queryBySQLParams);
    }

    //路由对象查询成功，初始化routeObj的值，同时将查询结果绘制在地图上
    function processCompleted(queryEventArgs) {
        routeObj = geo = queryEventArgs.result.recordsets[0].features[0].geometry;
        var feature = new SuperMap.Feature();
        feature.geometry = geo;
        feature.style = lineStyle;
        vectorLayer.addFeatures(feature);
        AlertTip("查询成功");
    }

    //路由对象查询失败，显示提示信息
    function processFailed() {
        AlertTip("查询失败");
    }

    //激活画点控件，判断routeObj是否为空，如果为空则禁止下一步操作
    function RouteCalculateMeasure() {
        if (!routeObj) {
            alert("请通过查询获取路由对象！");
            return;
        }
        drawPoint.activate();
    }

    //绘制点完成触发事件，先将点绘制在地图上，然后以点的geometry和查询结果
    // routeObj为参数初始化"点定里程"的参数类。
    function drawPointCompleted(drawGeometryArgs) {
        var feature = new SuperMap.Feature.Vector();
        var geometry = drawGeometryArgs.feature.geometry
        feature.geometry = geometry;
        feature.style = pointStyle;
        pointLayer.addFeatures(feature);

        //创建“点定里程”参数类。
        var parameters = new SuperMap.REST.RouteCalculateMeasureParameters({
            "sourceRoute":routeObj,
            "tolerance":10,
            "point":geometry,
            "isIgnoreGap":false
        });

        //创建“点定里程”服务类。
        var routeCalculateMeasureService = new SuperMap.REST.RouteCalculateMeasureService(DemoURL.changchun_spatialanalyst, {
                eventListeners:{
                    "processCompleted":routeCalculateMeasureCompleted,
                    'processFailed':routeCalculateMeasureFailed
                }
            }
        );

        //执行相关操作
        routeCalculateMeasureService.processAsync(parameters);
    }

    //“点定里程”查询完成，提示返回信息
    function routeCalculateMeasureCompleted(e) {
        AlertTip("查询获取的M值为：" + e.result.measure);
    }

    //“点定里程”查询失败，提示服务端返回的信息
    function routeCalculateMeasureFailed(e) {
        AlertTip(e.error.errorMsg);
    }

    //移除图面要素，并使画点控件失效，同时将路由对象置空，去掉提示信息
    function Remove() {
        vectorLayer.removeAllFeatures();
        pointLayer.removeAllFeatures();
        drawPoint.deactivate();
        routeObj = null;
        if ($('#mapAlert').size()) {
            $('div').remove('#mapAlert');
        }
    }

    //弹窗提示框
    function AlertTip(tip) {
        if ($('#mapAlert').size()) {
            $('div').remove('#mapAlert');
        }
        var htmlString = '<div id="mapAlert" class="alert alert-success fade in" style="position:absolute; top: 10px; left: 25%; width:50%; z-index: 2000; text-align: center;">'
            + '<button class="close" data-dismiss="alert">&times;</button>'
            + '<strong>' + tip + '</strong>'
            + '</div>';
        $('#map').append($(htmlString));
    }

    dowork();
})();