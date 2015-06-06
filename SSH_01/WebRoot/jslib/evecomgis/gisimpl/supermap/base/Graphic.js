//注册命名空间
Namespace.register("evecomgis.gisimpl.supermap.base");


evecomgis.gisimpl.supermap.base.Graphic = function(config){
	
	config = config || {};

	var $GraphicObject=this;
	
	//地图对象
	this.map;
	//矢量图层
	var vectorLayer;
	
	var drawObject;

	var callbackFun;
	
	this.init = function (config) {
		$GraphicObject.map = config.map;
		vectorLayer = new SuperMap.Layer.Vector("vectorLayer");
		
		vectorLayer.style = $GraphicObject.setStyle(config);
		
		$GraphicObject.map.addLayers([vectorLayer]);
	}
	
	//设置样式
    this.setStyle = function(config) {
    	config = config || {};
    	
    	var style = new SuperMap.Style();
    	
    	style.dashStyle = config.dashStyle || 'solid';
    	style.fill = config.fill || true;
    	style.fillColor = config.fillColor || '#FF0000';
    	if(config.lineCap){
    		style.lineCap = config.lineCap;
    	};
    	style.lineWidth = config.lineWidth || 2;
    	style.fillOpacity = config.fillOpacity || 0.3;
    	if(config.pointRadius){
    		style.pointRadius = config.pointRadius;
    	}else{
    		style.pointRadius = 1;
    	}
    	style.stroke = config.stroke || true;
    	style.strokeColor = config.strokeColor || '#FF0000';
    	style.strokeWidth = config.strokeWidth || 2;
    	
    	return style;
    	
    }
	
    //
    function destroy(){
    	if(drawObject!=null){
			drawObject.deactivate();
			$GraphicObject.map.removeControl(drawObject);
			drawObject.destroy();
		}
    }
    
    //
    function activate(obj){
		if(callbackFun){
    		drawObject.events.on({"featureadded": callbackFun});
		}
    	$GraphicObject.map.addControl(drawObject);
		drawObject.activate();
    }
    
	
	//画面  altKey岛洞多变形
	this.drawPolygon = function(){
		destroy();
		drawObject = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Polygon,{
			handlerOptions:{
				holeModifier: "altKey"
			}
		});
		activate(drawObject);
	}

	
	//画自由多边形  altKey岛洞多变形
	this.drawFreePolygon = function(){
		destroy();
		drawObject = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Polygon,{
			handlerOptions:{
				holeModifier: "altKey",
				freehand:true
			}
		});
		activate(drawObject);
	}
	
	//画点
	this.drawPoint = function(){
		destroy();
		drawObject = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Point);
		activate(drawObject);
	}
	
	//画单线
	this.drawSinglePath = function(){
		destroy();
		drawObject = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Path,{
			handlerOptions:{
				maxVertices  : 2
			}
		});
		activate(drawObject);
		
	}
	
	//画线
	this.drawPath = function(){
		
		destroy();
		drawObject = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Path,{
			handlerOptions:{
				freehand:false
			}
		});
		activate(drawObject);
		
	}

	//画自由线
	this.drawFreePath = function(){
		
		destroy();
		drawObject = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Path,{
			handlerOptions:{
				freehand:true
			}
		});
		activate(drawObject);
		
	}
	
	//画圆
	this.drawCircle = function(){
		destroy();
		drawObject = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.RegularPolygon,{handlerOptions:{sides:60}});
		activate(drawObject);
	}
	
	//画椭圆
	this.drawEllipse = function(){
		destroy();
		drawObject = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.RegularPolygon,{handlerOptions:{sides:60,irregular : true}});
		activate(drawObject);
	}
	
	//画三角形
	this.drawTriangle = function(){
		destroy();
		drawObject = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.RegularPolygon,{handlerOptions:{sides:3,irregular : true}});
		activate(drawObject);
	}
	
	
	//画矩形
	this.drawRegularPolgon = function(){
		destroy();
		drawObject = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.RegularPolygon,{
			handlerOptions:{
				irregular : true
			}
		});
		activate(drawObject);
	}
	
	this.changeType = function(type){
		type = type.toLowerCase();
		switch(type){
			case 'line':$GraphicObject.drawSinglePath();break;
			case 'polyline':$GraphicObject.drawPath();break;
			case 'triangle':$GraphicObject.drawTriangle();break;
			case 'freehandpolyline':$GraphicObject.drawFreePath();break;
			case 'extent':$GraphicObject.drawRegularPolgon();break;
			case 'circle':$GraphicObject.drawCircle();break;
			case 'ellipse':$GraphicObject.drawEllipse();break;
			case 'polygon':$GraphicObject.drawPolygon();break;
			case 'freehandpolygon':$GraphicObject.drawFreePolygon();break;
		}
	}
	
	//两点间画线
	this.pointToPoint = function(startX,startY,endX,endY){
		
		var startPoint = new SuperMap.Geometry.Point(startX, startY);
		var endPoint = new SuperMap.Geometry.Point(endX, endY);
		var points = [startPoint,endPoint];
		var roadLine = new SuperMap.Geometry.LineString(points);
		var layer = new SuperMap.Layer.Vector();
		layer.geometry = roadLine;
		vectorLayer.addFeatures(layer);
	}
	
	this.addGraphic = function(geometry,style){
		var layer = new SuperMap.Layer.Vector();
		layer.style = style;
		layer.geometry = geometry;
		vectorLayer.addFeatures(layer);
	}
	
	//清除图层
	this.resetMap = function() {
		destroy();
		vectorLayer.removeAllFeatures();
	}
	//设置回调函数
	this.setCallbackFun = function(fun){
		callbackFun = fun;
	}
	//返回回调函数
	this.getCallbackFun = function(){
		return callbackFun;
	}
	
	//画图完成事件
	this.drawCompleted = function(eventArgs){
		//$GraphicObject.drawCompletedHandler(eventArgs);
		
	} 
	
	this.drawCompletedHandler = function (eventArgs){
		
	}
	
	//this.init(config);
}

//////////////////////////////////////////////ajax for graphic/////////////////////////////////////////////////////////////////


/***
evecomgis.gisimpl.supermap.base.Graphic = function(config){
	
	config = config || {};

	var $GraphicObject=this;
	//地图对象
	this.map;
	
	this.featuresLayer;
	

    //初始化绘图
    this.init=function(config){
    	if(config == undefined) {
			alert("config没有定义!");
			return;
		}
		if(config.map ==null) {
			alert("map不能为空!");
			return;
		}
    	$GraphicObject.map=config.map;
		
	   
	    //创建矢量要素图层，为显示分析结果做准备。
        //判断浏览器，如果为IE，就创建VMLLayer；如果为非IE，就创建SVGLayer
//        if(Sys.Browser.name != "Microsoft Internet Explorer") {
            $GraphicObject.featuresLayer = $create(SuperMap.Web.Mapping.SVGLayer, null, null, null, null);
        }else if(document.documentMode >= 9) {
            $GraphicObject.featuresLayer = $create(SuperMap.Web.Mapping.SVGLayer, null, null, null, null);
        }else {
            $GraphicObject.featuresLayer = $create(SuperMap.Web.Mapping.VMLLayer, null, null, null, null);
        }

        //将所创建图层加载到地图控件中
        $GraphicObject.map.setLayers([$GraphicObject.featuresLayer]);
	   
    }

    this.setStyle = function(config) {
    	config = config || {};
    	var style = new SuperMap.Web.Core.Style();
    	style.dashStyle = config.dashStyle || 'solid';
    	style.fill = config.fill || false;
    	style.fillColor = config.fillColor || '#FF0000';
    	if(config.lineCap){
    		style.lineCap = config.lineCap;
    	};
    	style.lineWidth = config.lineWidth || 2;
    	style.opacity = config.opacity || 0.5;
    	if(config.pointRadius){
    		style.pointRadius = config.pointRadius;
    	}
    	style.stroke = config.stroke || true;
    	style.strokeColor = config.strokeColor || '#FF0000';
    	
    	return style;
    }
    
    //绘制点
    this.drawPointEntity = function(){
        var drawPoint = $create(SuperMap.Web.Actions.DrawPoint, {map: map}, null, null, null);
        map.set_action(drawPoint);
        drawPoint.add_actionCompleted($GraphicObject.drawCompleted);
    }

    //绘制线
    this.drawLineEntity = function(){
        var drawLine = $create(SuperMap.Web.Actions.DrawLine, {map: map}, null, null, null);
        map.set_action(drawLine);
        drawLine.onClick(map);
        drawLine.add_actionCompleted($GraphicObject.drawCompleted);
    }
    
    //绘制矩形
    this.drawRectangleEntity = function(){
        var drawRectangle = $create(SuperMap.Web.Actions.DrawRectangle, {map: map}, null, null, null);
        map.set_action(drawRectangle);
        drawRectangle.add_actionCompleted($GraphicObject.drawCompleted);
    }

    //绘制面
    this.drawPolygonEntity = function(){
        var drawPolygon = $create(SuperMap.Web.Actions.DrawPolygon, {map: map}, null, null, null);
        map.set_action(drawPolygon);
        drawPolygon.add_actionCompleted($GraphicObject.drawCompleted);
    }


    //绘制圆
    this.drawCircleEntity = function(){
        var drawCircle = $create(SuperMap.Web.Actions.DrawCircle, {map: map}, null, null, null);
        map.set_action(drawCircle);
        drawCircle.add_actionCompleted($GraphicObject.drawCompleted);
    }
    
    
    //将绘制的图形加载到矢量要素图层上。绘制点、线和面结束后传回的回调函数中都是DrawGeometryArgs类型的参数，而绘制圆后传回的回调函数的参数为 DrawCircleArgs，因此以下这个函数不能将圆加载到矢量图层上
    this.drawCompleted = function(drawGeometryArgs){
        var feature = new SuperMap.Web.Core.Feature();
        feature.geometry = drawGeometryArgs.geometry;
        feature.style = $GraphicObject.setStyle({fill:true,fillColor:"#FF00FF",strokeColor:"#5082e5",opacity:0.5});
        $GraphicObject.featuresLayer.addFeature(feature);
        
    }
	
	//地图清除图层
	this.resetMap=function(map){
		
		 $GraphicObject.featuresLayer.clearFeatures();
        
	}
	
	this.init(config);
	
}

****/