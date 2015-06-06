(function() {
    var map, layer1,layer2,projection="EPSG:900913",maptype="vec",level=3;
	function dowork(){
        $("#func").append($("<div style='padding-top:10px;margin-right:10px'><span>地图投影方式切换：</span></div>"));
        $("#func").append($("<div class='control-group'>"
            +"<label class='control-label' for='heatradius'></label>"
            +"<div class='controls'>"
            +"<select style='width:150px' id='projSelect'>"
            +"<option value ='EPSG:900913'>墨卡托投影地图</option>"
            +"<option value ='EPSG:4326'>经纬度投影地图</option>"
            +"</select></div></div>"));

        $("#func").append($("<div style='padding-top:10px;margin-right:10px'><span>地图类型切换：</span></div>"));
        $("#func").append($("<div class='control-group'>"
            +"<label class='control-label' for='heatradius'></label>"
            +"<div class='controls'>"
            +"<select style='width:100px' id='layerTypeSelect'>"
            +"<option value ='vec'>矢量地图</option>"
            +"<option value ='img'>影像地图</option>"
            +"<option value ='ter'>地形地图</option>"
            +"</select></div></div>"));
        map = new SuperMap.Map("map", { controls:[
            new SuperMap.Control.Attribution(),
            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.Navigation({
                dragPanOptions:{
                    enableKinetic:true
                }
            })],
            allOverlays:true,
            projection:"EPSG:900913"//"EPSG:4326"
        });

        layer1 = new SuperMap.Layer.Tianditu({"layerType":"vec"});//img,ter
        layer2 = new SuperMap.Layer.Tianditu({"layerType":"vec","isLabel":true});

        map.addLayers([layer1,layer2]);
        map.setCenter(new SuperMap.LonLat(108.07567641634,36.855795258955).transform("EPSG:4326","EPSG:900913"), 3);

         $("#projSelect").change(function(){
             projection = $(this).attr("value");
             changeMap();
         });

        $("#layerTypeSelect").change(function(){
            maptype = $(this).attr("value");
            if(maptype=="vec"){
                level = 3;
            }
            else if(maptype=="img"){
                level = 2;
            }
            else if(maptype=="ter"){
                level = 3;
            }

            changeMap();
        });
	}

    function changeMap(){
        if(layer2){
            map.removeLayer(layer2);
            map.removeLayer(layer1);
        }

        map.setOptions({
            "projection":projection
        });
        layer1 = new SuperMap.Layer.Tianditu({"layerType":maptype});
        layer2 = new SuperMap.Layer.Tianditu({"layerType":maptype,"isLabel":true});
        map.addLayers([layer1,layer2]);
        if(projection=="EPSG:900913"){
            map.setCenter(new SuperMap.LonLat(108.07567641634,36.855795258955).transform("EPSG:4326","EPSG:900913"), level);
        }
        else{
            map.setCenter(new SuperMap.LonLat(108.07567641634,36.855795258955), level);
        }
    }
    dowork();
})();
