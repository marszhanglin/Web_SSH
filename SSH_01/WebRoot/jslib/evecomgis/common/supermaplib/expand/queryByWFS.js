﻿(function () {
    var map, layer, vectorLayer, vectorLayer, vector_style, vector_style_select, myFilter, drawings = null, draw = null;

    function dowork() {
        var create = "多边形", clear = "清除";
        addBtn(create, drawGeometry);
        addBtn(clear, clearFeatures);
        map = new SuperMap.Map("map", {controls: [
            new SuperMap.Control.LayerSwitcher(),
            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.Navigation({
                dragPanOptions: {
                    enableKinetic: true
                }
            })]
        });

        layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", DemoURL.world, {transparent: true, cacheEnabled: true}, {maxResolution: "auto"});

        vector_style = new SuperMap.Style({
            fillColor: '#669933',
            fillOpacity: 0.8,
            pointRadius: 8,
            strokeColor: '#aaee77',
            strokeWidth: 3
        });

        vector_style_select = new SuperMap.Style({
            fillColor: '#000',
            fillOpacity: 0.9,
            fontColor: '#232323',
            strokeColor: '#ffffff'
        });

        myFilter = new SuperMap.Filter.Comparison({
            type: SuperMap.Filter.Comparison.EQUAL_TO,
            property: "CAPITAL",
            value: ""
        });

        vectorLayer = new SuperMap.Layer.Vector("World Capitals", {
            strategies: [new SuperMap.Strategy.BBOX()],
            protocol: new SuperMap.Protocol.WFS({
                version: "1.0.0",
                url: DemoURL.world_data_wfs,
                featureType: "Capitals",
                featureNS: "http://www.supermap.com/World",
                featurePrefix: "World",
                geometryName: "the_geom"

                //类似的ArcGIS请求参数设置（已验证返回数据）
                //version:"1.0.0",
                //url:"http://localhost:6080/arcgis/services/SampleWorldCities/MapServer/WFSServer",
                //featureType:"cities",
                //featureNS:"http://localhost:6080/arcgis/services/SampleWorldCities/MapServer/WFSServer",
                //featurePrefix:"SampleWorldCities",
                //geometryName:"shape"
            }),

            //filter使用方式一：
            //filter: new SuperMap.Filter.Logical({
            //    type: SuperMap.Filter.Logical.AND,
            //    filters: [
            //        new SuperMap.Filter.Comparison({
            //            type: SuperMap.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO,
            //            property: "SMID",
            //            value: "50"
            //        }),
            //        new SuperMap.Filter.Comparison({
            //            type: SuperMap.Filter.Comparison.LESS_THAN_OR_EQUAL_TO,
            //            property: "SMID",
            //            value: "60"
            //        })
            //    ]
            //}),

            //filter使用方式二：
            filter: myFilter,

            styleMap: new SuperMap.StyleMap({
                'default': vector_style,
                'select': vector_style_select
            })
        });

        var select_feature_control = new SuperMap.Control.SelectFeature(vectorLayer);
        map.addControl(select_feature_control);
        select_feature_control.activate();
        layer.events.on({"layerInitialized": addLayer});

        //空间查询
        drawings = new SuperMap.Layer.Vector("drawings");
        map.addLayer(drawings);
        draw = new SuperMap.Control.DrawFeature(drawings, SuperMap.Handler.Polygon);
        map.addControl(draw);
    }

    function drawGeometry() {
        clearFeatures();
        draw.activate();
        draw.events.on({featureadded: drawCompleted});
    }

    function clearFeatures() {
        vectorLayer.removeAllFeatures();
        drawings.removeAllFeatures();
    }

    function addLayer() {
        map.addLayers([layer, vectorLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
    }

    function drawCompleted(event) {
        vectorLayer.filter = new SuperMap.Filter.Spatial({
            type: SuperMap.Filter.Spatial.INTERSECTS,
            value: event.feature.geometry
        });
        vectorLayer.refresh({force: true});
        vectorLayer.filter = myFilter;
        draw.deactivate();
    }

    dowork();
})();
