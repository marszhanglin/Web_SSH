(function() {
    var map, layer, heatMapLayer;
    function dowork() {

        $("#func").append($("<div style='margin-top:20px;'><span>热点数量：</span><input type='text' style='width:50px' id='heatNums' value='200'></div>"));
        $("#func").append($("<div style='margin-top:20px;margin-right:10px'><span>热点半径：</span><input type='text'  style='width:30px' value='50' id='heatradius'></div>"));
		 $("#func").append($("<div class='control-group' style='margin-top: 15px; margin-bottom: 0px;'><label class='control-label' for='heatradius'></label><div class='controls'><select style='width:70px' id='radiusUnit'><option value='px'>px</option><option value ='degree'>degree</option></select></div></div>"));
		
        var create = '渲染热点', remove = '清除';
        addBtn(create,createHeatPoints);
        addBtn(remove,clearHeatPoints);
        map = new SuperMap.Map("map",{controls: [                      
            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.Navigation({
                dragPanOptions: {
                                    enableKinetic: true
                                }
            })]
        });
        map.addControl(new SuperMap.Control.MousePosition());
        layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", DemoURL.world, {transparent: true, cacheEnabled: true}, {maxResolution:"auto"}); 
        heatMapLayer = new SuperMap.Layer.HeatMapLayer(
            "heatMap",
            {
                "radius":45,
                "featureWeight":"value",
                "featureRadius":"geoRadius"
            }
        );
        layer.events.on({"layerInitialized": addLayer});
    }

    function addLayer() {
        map.addLayers([layer,heatMapLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
    }
    function createHeatPoints(){
        clearHeatPoints();
        var heatPoints = [];
        var num = parseInt($('#heatNums').val());
        var radius = parseInt($('#heatradius').val());
        //var useGeoRadius = "checked" == $('#useGeoRadius').attr('checked');
		var unit = $("#radiusUnit").val(),
			useGeoRadius = false;
		if("degree" == unit){
			useGeoRadius = true;
		}
        heatMapLayer.radius = radius
        for(var i=0; i < num; i++){
            heatPoints[i] = new SuperMap.Feature.Vector(
                new SuperMap.Geometry.Point(
                    Math.random()*360 - 180,
                    Math.random()*180 - 90
                ),
                {
                    "value":Math.random()*9,
                 "geoRadius":useGeoRadius?radius:null
                }
            );
        }
        heatMapLayer.addFeatures(heatPoints);
    }
    
    function clearHeatPoints(){
        heatMapLayer.removeAllFeatures();
    }
    dowork();
})();