﻿(function() {
    var map, local, baseLayer, layersID, themeLayer;
    function dowork() {
        var create = '创建专题图', remove = '移除专题图';
        addBtn(create,addThemeGridUnique);
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
        baseLayer = new SuperMap.Layer.TiledDynamicRESTLayer("jingjin", DemoURL.jingjin_rest, {transparent: true, cacheEnabled: true}, {maxResolution: "auto"});
        baseLayer.events.on({"layerInitialized": addLayer});
    }

    function addLayer() {
        map.addLayer(baseLayer);
        map.setCenter(new SuperMap.LonLat(117.2, 40.11), 0);
        map.allOverlays = true;
    }
    function addThemeGridUnique() {
        removeTheme();
        var themeService = new SuperMap.REST.ThemeService(DemoURL.jingjin_rest, {eventListeners:{"processCompleted": themeCompleted, "processFailed": themeFailed}});
        //定义单值专题图子项
        function setItems(){
           var items = new Array(),
               color0 = new SuperMap.REST.ServerColor(198,244,240),
               color1 = new SuperMap.REST.ServerColor(176,244,188),
               color2 = new SuperMap.REST.ServerColor(218,251,178),
               color3 = new SuperMap.REST.ServerColor(220,236,145),
               color4 = new SuperMap.REST.ServerColor(96,198,66),
               color5 = new SuperMap.REST.ServerColor(20,142,53),
           	   color6 = new SuperMap.REST.ServerColor(85,144,55),
               color7 = new SuperMap.REST.ServerColor(171,168,38),
               color8 = new SuperMap.REST.ServerColor(235,165,9),
               color9 = new SuperMap.REST.ServerColor(203,89,2),
               color10= new SuperMap.REST.ServerColor(157,25,1),
               color11= new SuperMap.REST.ServerColor(118,15,3),
               color12= new SuperMap.REST.ServerColor(112,32,7),
               color13= new SuperMap.REST.ServerColor(106,45,12),
               color14= new SuperMap.REST.ServerColor(129,80,50),
               color15= new SuperMap.REST.ServerColor(160,154,146);

            for(var i = -4; i < 2197; i++){
                var num = parseInt(i/135);
                var item = new SuperMap.REST.ThemeGridUniqueItem();
                    item.caption=1;
                    item.unique = i;
                    item.visible = true;
                switch(num)
                {
                    case 0:
                        item.color = color0;
                        break;
                    case 1:
                        item.color = color1;
                        break;
                    case 2:
                        item.color = color2;
                        break;
                    case 3:
                        item.color = color3;
                        break;
                    case 4:
                        item.color = color4;
                        break;
                    case 5:
                        item.color = color5;
                        break;
                    case 6:
                        item.color = color6;
                        break;
                    case 7:
                        item.color = color7;
                        break;
                    case 8:
                        item.color = color8;
                        break;
                    case 9:
                        item.color = color9;
                        break;
                    case 10:
                        item.color = color10;
                        break;
                    case 11:
                        item.color = color11;
                        break;
                    case 12:
                        item.color = color12;
                        break;
                    case 13:
                        item.color = color13;
                        break;
                    case 14:
                        item.color = color14;
                        break;
                    case 15:
                        item.color = color15;
                        break;
                    default:
                        item.color = color0;
                        break;
                }
                items.push(item);
              }
              return items;
        }


        var themeGridUnique = new SuperMap.REST.ThemeGridUnique({
            defaultcolor: new SuperMap.REST.ServerColor(0,0,0),
            items: setItems()
        });
        themeParameters = new SuperMap.REST.ThemeParameters({
            datasetNames: ["JingjinTerrain"],
            dataSourceNames: ["Jingjin"],
            themes: [themeGridUnique]
        });

        themeService.processAsync(themeParameters);
    }

    function themeCompleted(themeEventArgs) {
        if(themeEventArgs.result.resourceInfo.id) {
            themeLayer = new SuperMap.Layer.TiledDynamicRESTLayer("jingjin_themeGridUnique", DemoURL.jingjin_rest, {cacheEnabled:false,transparent: true,layersID: themeEventArgs.result.resourceInfo.id}, {"maxResolution": "auto"});
            themeLayer.events.on({"layerInitialized": addThemeLayer});
        }
    }
    function addThemeLayer() {
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

