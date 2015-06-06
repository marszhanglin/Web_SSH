﻿(function () {
    var map, layer, routeObj, vectorLayer
    lineStyle = {
        strokeColor:"red",
        strokeWidth:5,
        pointRadius:3
    },
    lineStyle2 = {
        strokeColor:"#669933",
        strokeWidth:3,
        pointRadius:3
    };

    var feature;

    function dowork() {
        $("#func").append($("<div style='margin-top:21px;'><span style='font-size: 1.2em;'>起始里程点：</span><input type='number' style='width:50px' id='startMeasure' value='10'><span style='font-size: 1.2em;'>终止里程点：</span><input type='number' style='width:50px' id='endMeasure' value='240'></div>"));
        var createRouteObj = '查询路由对象', routeLocator = "定位线", remove = '清除';
        addBtn(createRouteObj, CreateRouteObj);
        addBtn(routeLocator, RouteLocator);
        addBtn(remove, Remove);

        //初始化图层
        layer = new SuperMap.Layer.TiledDynamicRESTLayer("changchun", DemoURL.changChun_Map, { transparent:true, cacheEnabled:true }, { maxResolution:"auto" });
        vectorLayer = new SuperMap.Layer.Vector("RouteLayer");

        //图层初始化完毕调用添加图层函数
        layer.events.on({"layerInitialized":addLayer});
        map = new SuperMap.Map("map", {allOverlays:true, controls:[
            new SuperMap.Control.LayerSwitcher(),
            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.Navigation({
                dragPanOptions:{
                    enableKinetic:true
                }})]
        });
    }

    //添加必要图层
    function addLayer() {
        map.addLayers([layer, vectorLayer]);
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
        AlertTip("查询路由对象成功");
    }

    //路由对象查询失败，显示提示信息
    function processFailed() {
        AlertTip("查询路由对象失败");
    }

    //"路由定线"操作，其中将routeObj和里程值作为参数传递到参数对象中
    function RouteLocator() {
        if(feature != null)
        {
            vectorLayer.removeFeatures(feature);
            feature = null;
        }

        if (!routeObj) {
            alert("请通过查询获取路由对象！");
            return;
        }
        var routeLocatorParameters_point = new SuperMap.REST.RouteLocatorParameters({
            "sourceRoute":routeObj,
            "type":"LINE",
            "startMeasure": parseFloat($('#startMeasure').val()),
            "endMeasure": parseFloat($('#endMeasure').val()),
            "isIgnoreGap":true
        });
        var routeLocatorService = new SuperMap.REST.RouteLocatorService(DemoURL.changchun_spatialanalyst,
            {
                eventListeners:{
                    "processCompleted":routeLocatorCompleted,
                    'processFailed':routeLocatorFailed
                }
            }
        )
        routeLocatorService.processAsync(routeLocatorParameters_point);
    }

    //"里程定线"操作成功触发该函数，并显示提示信息
    function routeLocatorCompleted(e) {
        feature = new SuperMap.Feature.Vector();
        var geometry = e.result.resultGeometry;
        feature.geometry = geometry;
        feature.style = lineStyle2;
        vectorLayer.addFeatures(feature);
        AlertTip("里程定位线成功");
    }

    //"里程定线"操作失败触发该函数，并显示提示信息
    function routeLocatorFailed(e) {
        AlertTip("里程定位线失败");
    }

    //移除要素，并重置里程值
    function Remove() {
        vectorLayer.removeAllFeatures();
        $('#startMeasure').val('10');
        $('#endMeasure').val('240');
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
