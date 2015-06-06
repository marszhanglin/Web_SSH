﻿(function() {
    var map, local, baseLayer, layersID, themeLayer;

    function dowork() {
        var create = '创建专题图', remove = '移除专题图';
        addBtn(create,addThemeGridRange);
        addBtn(remove,removeTheme);
        map = new SuperMap.Map("map",{controls: [
            new SuperMap.Control.LayerSwitcher(),
            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.Navigation({
                dragPanOptions: {
                    enableKinetic: true
                }
            })]
        });
        baseLayer = new SuperMap.Layer.TiledDynamicRESTLayer("Jingjin", DemoURL.jingjin_map, {transparent: true, cacheEnabled: true}, {maxResolution:"auto"});
        baseLayer.events.on({"layerInitialized":addLayer});
    }

    function addLayer() {
        map.addLayer(baseLayer);
        map.setCenter(new SuperMap.LonLat(118, 40), 0);
        map.allOverlays = true;
    }
    function addThemeGridRange() {
        removeTheme();
        var themeService = new SuperMap.REST.ThemeService(DemoURL.jingjin_map, {eventListeners:{"processCompleted": themeCompleted, "processFailed": themeFailed}}),
            color1 = new SuperMap.REST.ServerColor(198,244,240),
            color2 = new SuperMap.REST.ServerColor(176,244,188),
            color3 = new SuperMap.REST.ServerColor(218,251,178),
            color4 = new SuperMap.REST.ServerColor(220,236,145),
            color5 = new SuperMap.REST.ServerColor(96,198,66),
            color6 = new SuperMap.REST.ServerColor(20,142,53),
            color7 = new SuperMap.REST.ServerColor(85,144,55),
            color8 = new SuperMap.REST.ServerColor(171,168,38),
            color9 = new SuperMap.REST.ServerColor(235,165,9),
            color10 = new SuperMap.REST.ServerColor(203,89,2),
            color11= new SuperMap.REST.ServerColor(157,25,1),
            color12= new SuperMap.REST.ServerColor(118,15,3),
            color13= new SuperMap.REST.ServerColor(112,32,7),
            color14= new SuperMap.REST.ServerColor(106,45,12),
            color15= new SuperMap.REST.ServerColor(129,80,50),
            color16= new SuperMap.REST.ServerColor(160,154,146),
            themeGridRangeIteme1 = new SuperMap.REST.ThemeGridRangeItem({
                start: -4,
                end: 120,
                color: color1
            }),

            themeGridRangeIteme2 = new SuperMap.REST.ThemeGridRangeItem({
                start: 120,
                end: 240,
                color: color2
            }),
            themeGridRangeIteme3 = new SuperMap.REST.ThemeGridRangeItem({
                start: 240,
                end:  360,
                color: color3
            }),
            themeGridRangeIteme4 = new SuperMap.REST.ThemeGridRangeItem({
                start: 360,
                end:  480,
                color: color4
            }),
            themeGridRangeIteme5 = new SuperMap.REST.ThemeGridRangeItem({
                start: 480,
                end:  600,
                color: color5
            }),
            themeGridRangeIteme6 = new SuperMap.REST.ThemeGridRangeItem({
                start: 600,
                end:  720,
                color: color6
            }),
            themeGridRangeIteme7 = new SuperMap.REST.ThemeGridRangeItem({
                start: 720,
                end: 840,
                color: color7
            }),

            themeGridRangeIteme8 = new SuperMap.REST.ThemeGridRangeItem({
                start: 840,
                end: 960,
                color: color8
            }),
            themeGridRangeIteme9 = new SuperMap.REST.ThemeGridRangeItem({
                start: 960,
                end:  1100,
                color: color9
            }),
            themeGridRangeIteme10 = new SuperMap.REST.ThemeGridRangeItem({
                start: 1100,
                end:  1220,
                color: color10
            }),
            themeGridRangeIteme11 = new SuperMap.REST.ThemeGridRangeItem({
                start: 1220,
                end:  1340,
                color: color11
            }),
            themeGridRangeIteme12 = new SuperMap.REST.ThemeGridRangeItem({
                start: 1340,
                end:  1460,
                color: color12
            }),
            themeGridRangeIteme13 = new SuperMap.REST.ThemeGridRangeItem({
                start: 1460,
                end: 1600,
                color: color13
            }),

            themeGridRangeIteme14 = new SuperMap.REST.ThemeGridRangeItem({
                start: 1600,
                end: 1800,
                color: color14
            }),
            themeGridRangeIteme15 = new SuperMap.REST.ThemeGridRangeItem({
                start: 1800,
                end:  2000,
                color: color15
            }),
            themeGridRangeIteme16 = new SuperMap.REST.ThemeGridRangeItem({
                start: 2000,
                end:  2167,
                color: color16
            }),
            themeGridRange = new SuperMap.REST.ThemeGridRange({
                reverseColor:false,
                rangeMode: SuperMap.REST.RangeMode.EQUALINTERVAL,
                items: [themeGridRangeIteme1,
                    themeGridRangeIteme2,
                    themeGridRangeIteme3,
                    themeGridRangeIteme4,
                    themeGridRangeIteme5,
                    themeGridRangeIteme6,
                    themeGridRangeIteme7,
                    themeGridRangeIteme8,
                    themeGridRangeIteme9,
                    themeGridRangeIteme10,
                    themeGridRangeIteme11,
                    themeGridRangeIteme12,
                    themeGridRangeIteme13,
                    themeGridRangeIteme14,
                    themeGridRangeIteme15,
                    themeGridRangeIteme16
                ]
            }),
            themeParameters = new SuperMap.REST.ThemeParameters({
                datasetNames: ["JingjinTerrain"],
                dataSourceNames: ["Jingjin"],
                joinItems: null,
                themes: [themeGridRange]
            });

        themeService.processAsync(themeParameters);
    }

    function themeCompleted(themeEventArgs) {
        if(themeEventArgs.result.resourceInfo.id) {
            themeLayer = new SuperMap.Layer.TiledDynamicRESTLayer("京津地形高程分段专题图", DemoURL.jingjin_map, {cacheEnabled:true,transparent: true,layersID: themeEventArgs.result.resourceInfo.id}, {"maxResolution":"auto"});
            themeLayer.events.on({"layerInitialized":addThemelayer});

        }
    }
    function addThemelayer() {
        map.addLayer(themeLayer);
    }
    function themeFailed(serviceFailedEventArgs) {
        doMapAlert("",serviceFailedEventArgs.error.errorMsg,true);
    }

    function removeTheme() {
        if (map.layers.length > 1) {
            map.removeLayer(themeLayer, true);
        }
    }
    dowork();
})();