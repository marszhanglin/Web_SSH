﻿(function() {
    var featuresOrigin = [];
    var map, local, layer,  pointLayer,drawPoint, lineLayer,markerLayer,vector, select;
    var pointArray=[];
    var styleDraw = {
        strokeColor: "#304DBE",
        strokeWidth: 2,
        pointerEvents: "visiblePainted",
        fillColor: "#304DBE",
        fillOpacity: 0.8,
        pointRadius:6
    };
    style = {
        strokeColor: "#304DBE",
        strokeWidth: 2,
        pointerEvents: "visiblePainted",
        fillColor: "#304DBE",
        fillOpacity: 0.8
    };

    var style_green = {
        strokeColor: "#FFF",
        strokeOpacity: 1,
        strokeWidth: 2,
        pointRadius: 6,
        pointerEvents: "visiblePainted",
        fillColor: '#545BF4'
    };

    var style_green1 = {
        strokeColor: "#FFF",
        strokeOpacity: 1,
        strokeWidth: 2,
        pointRadius: 6,
        pointerEvents: "visiblePainted",
        fillColor: '#50E7F8'
    };

    var style_green2 = {
        strokeColor: "#FFF",
        strokeOpacity: 1,
        strokeWidth: 2,
        pointRadius: 6,
        pointerEvents: "visiblePainted",
        fillColor: '#0C9CFE'
    };
	var style1 = {
        fillColor: '#F00',
        fillOpacity: 0.6,
        strokeWidth: 0
    };

    var style2 = {
        fillColor: '#0F0',
        fillOpacity: 0.6,
        strokeWidth: 0
    };

    var style3 = {
        fillColor: '#00F',
        fillOpacity: 0.6,
        strokeWidth: 0
    };
    smCompanyArr = [
        ["北京超图软件股份有限公司上海分公司",13522414.5106,3662690.3875,"上海市闸北虬江路1000号聚源大厦办公楼1505室"],
        ["北京超图软件股份有限公司广州分公司",12608758.6677,2647887.5456,"广州市体育西路109号高盛大厦9楼G单元"],
        ["北京超图软件股份有限公司成都分公司",11584664.2393,3588559.6862,"成都市高新区天府大道中段1268号天府软件园E区"],
        ["北京超图软件股份有限公司杭州分公司",13375617.5430,3538667.9064,"杭州市天目山路159号现代国际大厦A座"],
        ["北京超图软件股份有限公司西安分公司",12127616.0783,4064501.0071,"西安高新区丈八一路一号 汇鑫IBC（A座）"],
        ["北京超图软件股份有限公司长沙分公司",12573006.2587,3277897.5105,"长沙市芙蓉中路二段359号佳天国际新城北栋8H"],
        ["北京超图软件股份有限公司沈阳分公司",13740261.8165,5131821.5120,"沈阳市沈河区市府大路262甲号新华科技大厦"]
    ];
    function dowork() {
        var textPoint = "绘制点集",textBLine = "根据点集生成B样条曲线", bookMark = "标注",bookMark2 = "标注扇区" , remove = '清除',createPrint = '打印';
        addBtn(textPoint,createPoint);
        addBtn(textBLine,createBLine);
        addBtn(bookMark,createMarker);
		addBtn(bookMark2,createMarker2);
        addBtn(createPrint,function(){createPrintMap("map")});
        addBtn(remove,clearAllFeatures);
        
        

        //新建点矢量图层
        pointLayer = new SuperMap.Layer.Vector("pointLayer");
        //对点图层应用样式styleDraw（前面有定义）
        pointLayer.style = styleDraw;
        drawPoint=new SuperMap.Control.DrawFeature(pointLayer,SuperMap.Handler.Point);
        drawPoint.events.on({"featureadded": drawCompleted});
        //新建线矢量图层
        lineLayer = new SuperMap.Layer.Vector("lineLayer");
        //对线图层应用样式styleDraw（前面有定义）
        lineLayer.style = styleDraw;




        //定义layer图层，TiledDynamicRESTLayer：分块动态 REST 图层
        layer = new SuperMap.Layer.TiledDynamicRESTLayer("China", DemoURL.china_Map, { transparent: true, cacheEnabled: true }, { maxResolution: "auto" , useCanvas:false});
        //为图层初始化完毕添加addLayer()事件
        layer.events.on({"layerInitialized":addLayer});
        map = new SuperMap.Map("map",{controls: [
            new SuperMap.Control.LayerSwitcher(),
            new SuperMap.Control.OverviewMap(),
            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.Navigation({
                dragPanOptions: {
                                    enableKinetic: true
                                }}) ,drawPoint
            ]
        });
        markerLayer = new SuperMap.Layer.Markers("Markers");
		vector = new SuperMap.Layer.Vector("Vector Layer");
    }

    function addLayer() {
        map.addLayers([layer, pointLayer,lineLayer,markerLayer,vector]);
		select = new SuperMap.Control.SelectFeature(vector, {onSelect: onFeatureSelect, onUnselect: onFeatureUnselect});
        map.addControl(select);
        map.setCenter(new SuperMap.LonLat(11983722.7315, 3942864.5449), 3);
    }
    //绘制点
    function createPoint()
    {
        drawPoint.activate();
    }
    //绘制B样条线
    function createBLine()
    {
         if(pointArray.length<2)
         {
             doMapAlert("","请绘制至少两个点！");
             return;
         }
        drawPoint.deactivate()
        var geo1=SuperMap.Geometry.LineString.createBspline(pointArray,10);
        var vector1 = new SuperMap.Feature.Vector(
            geo1,
            {},
            styleDraw
        );
        lineLayer.addFeatures([vector1]);
    }
    function drawCompleted(drawGeometryArgs)
    {
        var feature= drawGeometryArgs.feature;
        var geometry=feature.geometry;
        //将每次绘制的点存起来
        pointArray.push(geometry);

        //停止画点面控制
        //drawPoint.deactivate();
    }
    //移除整个图层要素
    function clearAllFeatures(){
        pointArray=[];
        pointLayer.removeAllFeatures();
        lineLayer.removeAllFeatures();
        markerLayer.clearMarkers();
        vector.removeAllFeatures();
        if(map.popups.length != 0){
            var i = 0,lengthPopup = map.popups.length;
            while(i < lengthPopup){
                map.removePopup(map.popups[0]);
                i++;
            }
        }

        map.events.un({"zoomend":featureEvent});
    }
    /**
    *打印地图，支持ie9及以上，chrome，firefox等.
    *请注意相关css,js文件是否存在.
    *Parameters:
    *id <String>  id 为map div的id
    */
    function createPrintMap(id){
        var broz = SuperMap.Browser.name;
        if(broz == 'msie' && parseInt(SuperMap.Browser.version) < 9){
            doMapAlert("","ie9版本以下部分打印功能不支持");
            return;
        }
        var printWindow = window.open("");
        var strInnerHTML = document.getElementById(id).innerHTML;
        var strHeader = "<!DOCTYPE html><html><head><META HTTP-EQUIV='pragma' CONTENT='no-cache'><META HTTP-EQUIV='Cache-Control' CONTENT='no-cache, must-revalidate'><META HTTP-EQUIV='expires' CONTENT='Wed, 26 Feb 1997 08:21:57 GMT'><meta http-equiv='Content-Type' content='text/html; charset=utf-8' /><meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' /><meta name='apple-mobile-web-app-capable' content='yes' /><title>地图打印</title>";
        var strCSS = "<link href='./css/sm.css' rel='stylesheet' /><link href='./css/sm-responsive.css' rel='stylesheet' /><link href='../theme/default/style.css' rel='stylesheet'><link href='./css/sm-doc.css' rel='stylesheet' />";
        var strScript = "<script src='./js/jquery.js'></script><script type = 'text/javascript'>" + "\n" + "function printDiv(){$('.newuiPrint').css({'display':'none'});window.print();$('.newuiPrint').css({'display':'block'});}</script>";
        var strBody = "</head><body><div class='print-header'><div class='superD'><h3>地图</h3></div><div id='"+id+"' >" +strInnerHTML + "</div><div id='superft'><div class='printClose'>" + "<span class='newuiPrint' onclick = 'printDiv()'></span></div></div></div></body></html>";
        var strHTML = strHeader + strCSS + strScript + strBody;
        printWindow.document.write(strHTML);
        printWindow.document.close();
        function onloadHTML(){
            var strDOM = printWindow.document.getElementById(id).children[0].children;
            for(var i = 0, length = strDOM.length; i < length ; i++){
                var idStr = strDOM[i].id;
                if(idStr.indexOf("SuperMap.Control.ScaleLine") == -1 && idStr.indexOf("SuperMap.Map") == -1){
                    strCss = strDOM[i].style.cssText;
                    strCss = strCss + "display: none;";
                    strDOM[i].style.cssText = strCss;
                }
            }
            
            var canvasPrint = printWindow.document.getElementsByTagName("canvas");
            var canvasMap = document.getElementsByTagName("canvas");
            for(var i = 0,length = canvasPrint.length;i< length;i++){
                pasteCanvas(canvasMap[i],canvasPrint[i]);
            }
        }
        if (broz == 'firefox') {
            printWindow.onload = onloadHTML;
        } else if (broz == 'safari'||broz == 'chrome'||broz == 'msie') {
            window.setTimeout(onloadHTML,50);
        }
    }
    function pasteCanvas(canvasMap,canvasPrint){
        var contextMap = canvasMap.getContext('2d');
        var imagedataMap=contextMap.getImageData(0,0,canvasMap.width,canvasMap.height);
        var contextPrint = canvasPrint.getContext('2d');
        contextPrint.putImageData(imagedataMap, 0, 0);        
    }
    //添加标注
    function createMarker(){
        markerLayer.clearMarkers();
        for(var i = 0,lengthCompany = smCompanyArr.length;i < lengthCompany ;i++){
            var point = new SuperMap.Geometry.Point(parseFloat(smCompanyArr[i][1]),parseFloat(smCompanyArr[i][2])),           
                strContent = new Array(smCompanyArr[i][0],smCompanyArr[i][3]),
                size = new SuperMap.Size(32, 32),
                offset = new SuperMap.Pixel(-(size.w / 2), -size.h),
                feature = new SuperMap.Feature(markerLayer, new SuperMap.LonLat(point.x, point.y));
            feature.data.icon = new SuperMap.Icon("./images/markerflag.png", size, offset);        
            var marker = feature.createMarker();        
            var markerClick = function (evt,feature,strContent) {
                SuperMap.Event.stop(evt);
                this.win.open(feature,{
                    "name":strContent[0],
                    "informition":strContent[1]
                });
            };
            marker.events.register("click", feature, function(feature,strContent){
                return function(evt){
                    markerClick(evt,feature,strContent);
                }
            }(feature,strContent));
            markerLayer.addMarker(marker);
        }
    }

    function distance(a, b) {
        return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
    }

	//添加标注
	function createMarker2(){
        vector.removeAllFeatures();

        var resolution = map.getResolutionForZoom(map.zoom);
        var curve1 = SuperMap.Geometry.Polygon.createRegularPolygonCurve(
            new SuperMap.Geometry.Point(12085722.7315, 3942864.5449),
            21.7*2,
            20,
            20,
            90-10,
            resolution
        );
        var sector1 = new SuperMap.Feature.Vector(
            curve1,
            {},
            style_green2
        );

        var curve12 = SuperMap.Geometry.Polygon.createRegularPolygonCurve(
            new SuperMap.Geometry.Point(12085722.7315, 3942864.5449),
            21.7*2,
            20,
            20,
            210-10,
            resolution
        );
        var sector12 = new SuperMap.Feature.Vector(
            curve12,
            {},
            style_green2
        );

        var curve13 = SuperMap.Geometry.Polygon.createRegularPolygonCurve(
            new SuperMap.Geometry.Point(12085722.7315, 3942864.5449),
            21.7*2,
            20,
            20,
            330-10,
            resolution
        );
        var sector13 = new SuperMap.Feature.Vector(
            curve13,
            {},
            style_green2
        );

        var curve2 = SuperMap.Geometry.Polygon.createRegularPolygonCurve(
            new SuperMap.Geometry.Point(12085722.7315, 3942864.5449),
            18.3*2,
            20,
            30,
            90-15,
            resolution
        );
        var sector2 = new SuperMap.Feature.Vector(
            curve2,
            {},
            style_green
        );

        var curve22 = SuperMap.Geometry.Polygon.createRegularPolygonCurve(
            new SuperMap.Geometry.Point(12085722.7315, 3942864.5449),
            18.3*2,
            20,
            30,
            210-15,
            resolution
        );
        var sector22 = new SuperMap.Feature.Vector(
            curve22,
            {},
            style_green
        );

        var curve23 = SuperMap.Geometry.Polygon.createRegularPolygonCurve(
            new SuperMap.Geometry.Point(12085722.7315, 3942864.5449),
            18.3*2,
            20,
            30,
            330-15,
            resolution
        );
        var sector23 = new SuperMap.Feature.Vector(
            curve23,
            {},
            style_green
        );

        var origin = new SuperMap.Geometry.Point(11983722.7315,3942864.5449);
        var height = 13.8*2;
        var width = 3.6*2;
        var geo1 = SuperMap.Geometry.Polygon.createBsplinesurface(origin,height,width,90,resolution);
        var vector1 = new SuperMap.Feature.Vector(
            geo1,
            {},
            style_green1
        );
        var geo12 = SuperMap.Geometry.Polygon.createBsplinesurface(origin,height,width,210,resolution);
        var vector12 = new SuperMap.Feature.Vector(
            geo12,
            {},
            style_green1
        );
        var geo13 = SuperMap.Geometry.Polygon.createBsplinesurface(origin,height,width,330,resolution);
        var vector13 = new SuperMap.Feature.Vector(
            geo13,
            {},
            style_green1
        );

        var height = 11.2*2;
        var width = 4.2*2;
        var geo2 = SuperMap.Geometry.Polygon.createBsplinesurface(origin,height,width,90,resolution);
        var vector2 = new SuperMap.Feature.Vector(
            geo2,
            {},
            style_green2
        );
        var geo22 = SuperMap.Geometry.Polygon.createBsplinesurface(origin,height,width,210,resolution);
        var vector22 = new SuperMap.Feature.Vector(
            geo22,
            {},
            style_green2
        );
        var geo23 = SuperMap.Geometry.Polygon.createBsplinesurface(origin,height,width,330,resolution);
        var vector23 = new SuperMap.Feature.Vector(
            geo23,
            {},
            style_green2
        );

        var height = 8.8*2;
        var width = 5.0*2;
        var geo3 = SuperMap.Geometry.Polygon.createBsplinesurface(origin,height,width,90,resolution);
        var vector3 = new SuperMap.Feature.Vector(
            geo3,
            {},
            style_green
        );
        var geo32 = SuperMap.Geometry.Polygon.createBsplinesurface(origin,height,width,210,resolution);
        var vector32 = new SuperMap.Feature.Vector(
            geo32,
            {},
            style_green
        );
        var geo33 = SuperMap.Geometry.Polygon.createBsplinesurface(origin,height,width,330,resolution);
        var vector33 = new SuperMap.Feature.Vector(
            geo33,
            {},
            style_green
        );

        origin = new SuperMap.Geometry.Point(11883722.7315,3942864.5449);
        var geoTriangle = SuperMap.Geometry.Polygon.createRegularPolygonTriangle(origin,height*2,width*2,12,90,resolution);
        var vectorTriangle = new SuperMap.Feature.Vector(
            geoTriangle,
            {},
            style
        );

        vector.addFeatures([
            vector1,vector2,vector3,
            vector12,vector22,vector32,
            vector13,vector23,vector33,
            sector1,sector2,
            sector12,sector22,
            sector13,sector23,
            vectorTriangle
        ]);
        featuresOrigin = featuresOrigin.concat( vector1,vector2,vector3,
            vector12,vector22,vector32,
            vector13,vector23,vector33,
            sector1,sector2,
            sector12,sector22,
            sector13,sector23,
            vectorTriangle);

        select.activate();

        // 固定大小下触发此事件，按照设置的像素，和当前的分辨率，重新构造Geometry，从而达到固定大小的效果
        map.events.on({
            "zoomend":featureEvent
        });
    }

    function featureEvent(event){
        var solution = map.getResolutionForZoom(map.zoom);
        var features = [];

        var length = featuresOrigin.length;
        for(var i=0;i<length;i++)
        {
            var geo = featuresOrigin[i].geometry;
            var vector1 = new SuperMap.Feature.Vector(
                geoFixed(geo,solution),
                {},
                featuresOrigin[i].style
            );
            features.push(vector1);
        }
        vector.removeAllFeatures();
        vector.addFeatures(features);
    }

    function geoFixed(geo,resolution){
        if(geo != null && geo.polygonType != undefined)
        {
            if(geo.polygonType == "Curve")
            {
                var origin = geo.origin;
                var radius = geo.radius;
                var sides = geo.sides;
                var r = geo.r;
                var angel = geo.angel;
                return SuperMap.Geometry.Polygon.createRegularPolygonCurve(origin,radius,sides,r,angel,resolution);
            }else if(geo.polygonType == "Triangle")
            {
                var origin = geo.origin;
                var height = geo.height;
                var width = geo.width;
                var lineLength = geo.lineLength;
                var angel = geo.angel;
                return SuperMap.Geometry.Polygon.createRegularPolygonTriangle(origin,height,width,lineLength,angel,resolution);
            }else if(geo.polygonType == "Bspline")
            {
                var origin = geo.origin;
                var height = geo.height;
                var width = geo.width;
                var lineLength = geo.lineLength;
                var angel = geo.angel;
                return SuperMap.Geometry.Polygon.createBsplinesurface(origin,height,width,angel,resolution);
            }
        }
    }
	
	//要素被选中时调用此函数
    function onFeatureSelect(feature) {
       {
            selectedFeature = feature;
            var contentHTML = "<div style='font-size:.8em; opacity: 0.8; overflow-y:hidden;'>" +
                "<span style='font-weight: bold; font-size: 18px;'>详细信息</span><br>";
            contentHTML +="</div>";
            //初始化一个弹出窗口，当某个地图要素被选中时会弹出此窗口，用来显示选中地图要素的属性信息
            popup = new SuperMap.Popup.FramedCloud("chicken",
                feature.geometry.getBounds().getCenterLonLat(),
                null,
                contentHTML,
                null,
                true);
            feature.popup = popup;
            map.addPopup(popup);
        }
    }

    //清除要素时调用此函数
    function onFeatureUnselect(feature) {
        map.removePopup(feature.popup);
        feature.popup.destroy();
        feature.popup = null;
    }
	
    this.win = new InforWindow_z({"map":map});
    function InforWindow_z(param){
        var t = this;
        t.infowin = null;
        t.map = null;
        t.init = function(param){
            for(var key in param){
                t[key] = param[key];
            }
        }
        t.open = function(feature,data){
            t.close();
            t.create(feature,data);
        }
        t.create = function(feature,data){
           var contentHTML = "<div style='font-size:.8em; opacity: 0.8; overflow-y:hidden;'>" + 
                          "<span style='font-weight: bold; font-size: 18px;'>详细信息</span><br>";
            contentHTML += "公司名称：" + data.name + "<br>";
            contentHTML += "公司地址："  + data.informition + "</div>";
            //初始化一个弹出窗口，当某个地图要素被选中时会弹出此窗口，用来显示选中地图要素的属性信息
            var popup = new SuperMap.Popup.FramedCloud("chicken", 
                            feature.marker.lonlat,
                            null,
                            contentHTML,
                            null,
                            true);
            feature.popup = popup;
            map.addPopup(popup);
            t.infowin = popup;
        }
        t.close = function(){
            if(t.infowin){
                try{
                    t.infowin.hide();
                    t.infowin.destroy();
                }
                catch(e){}
            }
        }
        t.init(param);
    }
    dowork();
})();