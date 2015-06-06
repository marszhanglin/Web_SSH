Namespace.register("evecomgis.gisimpl.arcgis.base");

evecomgis.gisimpl.arcgis.base.Location = function() {

	dojo.require("esri.map");
	dojo.require("esri.layers.agstiled");
	dojo.require("esri.toolbars.draw");
	dojo.require("esri.geometry.Point");
	dojo.require("esri.SpatialReference");
	dojo.require("esri.geometry.Multipoint");
	dojo.require("esri.layers.GraphicsLayer");
	
	
    dojo.require("esri.symbols.PictureFillSymbol");

	//地图
	var map ;
	//当前类
	var $locationObj = this;
	//画图类
	var $graphicObj ;
	//测量长度
	var $measureLengthObj ;
	//排序工具类
	var $sortObj ;
	//
	var $roamObj;
	//工具条类
	var tb ;
	//描点事件
	var addPointHandler;
	//当前图层
	var griphic;
	
	var geometryService;
	
	var gisX,gisY;
	
	var i = 0;
	var isLock = false;
	var jsonArr;
	
	//当前台风点
	var typhoonPoint;

	var cfg;

	//图标数组
	var graphicArr = [];

	//gps要素层
	var gpsGraphicsLayer;
	
	$locationObj.init = function(config){
	
		cfg = config;

		$locationObj.map = config.map;
		if($graphicObj==null){
			
			$graphicObj = new evecomgis.gisimpl.arcgis.base.Graphic();
			$graphicObj.init(config);
		}
		
		if($locationObj.tb==null){
			$locationObj.tb = $graphicObj.tb;
		}
		
		if($locationObj.$sortObj == null){
			$locationObj.$sortObj = new evecomgis.gisimpl.arcgis.base.Tools();
		}
		
		if($locationObj.$measureLengthObj == null){
			$locationObj.$measureLengthObj = new evecomgis.gisimpl.arcgis.base.MeasureLength();
		}
		
		if($locationObj.geometryService == null){
			if(config.geomeryServiceUrl)
				$locationObj.geometryService = new esri.tasks.GeometryService(config.geomeryServiceUrl);
			else{
				alert("几何服务地址不存在！");
				return;
			}
		}
		
		if($locationObj.$roamObj == null){
			$locationObj.$roamObj = new evecomgis.gisimpl.arcgis.base.Roam();
			$locationObj.$roamObj.init($locationObj.map);
		}

		if(gpsGraphicsLayer == null){
			gpsGraphicsLayer = new esri.layers.GraphicsLayer(); 
			$locationObj.map.addLayer(gpsGraphicsLayer);
		}
	}
	
	$locationObj.areaBuffer = function(point,length){
		var params = new esri.tasks.BufferParameters();
		params.geometries  = [ point ];
		params.distances = [ length ];
		params.unit = esri.tasks.GeometryService.UNIT_METER;
		params.bufferSpatialReference = new esri.SpatialReference({wkid: 32662});//32662
		params.outSpatialReference = $locationObj.map.spatialReference;
		$locationObj.geometryService.buffer(params,this.showBuffer);
	}
	$locationObj.showBuffer = function(bufferedGeometries){
		var symbol = new esri.symbol.SimpleFillSymbol(
	        esri.symbol.SimpleFillSymbol.STYLE_SOLID,
	        new esri.symbol.SimpleLineSymbol(
	          esri.symbol.SimpleLineSymbol.STYLE_SOLID,
	          new dojo.Color([255,0,0,0.65]), 2
	        ),
	        new dojo.Color([255,0,0,0.35])
        );
	    
	    dojo.forEach(bufferedGeometries, function(geometry) {
	        var graphic = new esri.Graphic(geometry, symbol);
			graphicArr.push(graphic);
	    	$locationObj.map.graphics.add(graphic);
      	});
      	
	}
	

	
	/**
	 * 指挥调度事件
	 * points : [{t:时间,i:ID,n:名称,x:经度,y:维度}]
	 * searchBounds：半径
	 * showCount 显示数量
	 * eventPoint 事发点：{x:经度,y:维度}
	 * style : 查询点的样式
	 ****/
	$locationObj.dispatchEvent = function(points,searchBounds,showCount,eventPoint,style){

		var point ;
		searchBounds = searchBounds || 3;
		showCount = showCount || -1;

		if(eventPoint && eventPoint.x && eventPoint.y){
			point = $locationObj.getPoint(eventPoint.x,eventPoint.y);
			$locationObj.areaBuffer(point,searchBounds*1000);
			$locationObj.dispatch({x:point.x,y:point.y,pointArr:points,radius:searchBounds,count:showCount});
		}else{
			dojo.disconnect(addPointHandler);
			addPointHandler = dojo.connect($locationObj.map, "onClick", function(evt){
			
				var point = evt.mapPoint;
				
				//清空
				//$locationObj.clearGraphics();
				
				var size = cfg.addPoint.size;
				var pic = cfg.addPoint.pic;
				
				var symbol = $locationObj.getPointPic(pic, size, size).setOffset(0, size/2);
				$locationObj.griphic = new esri.Graphic(point, symbol);
				graphicArr.push($locationObj.griphic);
				$locationObj.map.graphics.add($locationObj.griphic);
				
				//居中显示
				$locationObj.map.centerAt(point);

		
				dojo.disconnect(addPointHandler);
				$locationObj.areaBuffer(point,searchBounds*1000);
				var config = {x:point.x,y:point.y,pointArr:points,radius:searchBounds,count:showCount};
				if(style){
					if(style.pic){
						config.pic = style.pic;
					}
					if(style.width){
						config.width = style.width;
					}
					if(style.height){
						config.height = style.height;
					}
				}
				$locationObj.dispatch(config);
			});
		}
		
		

	}
	
	

	//选择描点事件
    $locationObj.addPointEvent = function(callbackEvent) {
        if(callbackEvent!=null && callbackEvent != undefined){
            addPointHandler = dojo.connect($locationObj.map, "onClick", callbackEvent);
        }else{
            addPointHandler = dojo.connect($locationObj.map, "onClick", $locationObj.addPoint);
        }
    }


	

	/**
	 * 渐进定位事件
	 * data : [{i:ID,n:名称,t:时间,x:经度,y:维度}]
	 * interval:时间间隔，时间单位毫秒。1秒=1000毫秒
	 * lineStyle:线的样式
	 * pointStyle:点的样式
	 *
	 */
	$locationObj.gradualLocationEvent = function(data, interval, lineStyle, pointStyle, lineLayer, pointLayer, typhoonLayer) {
		if(isLock){
			alert('实时监控进行中！')
			return;
		}
		
		i = 0;

		
		//清除所有图层
		//$locationObj.clearGraphics();
		data.layer = pointLayer;
		$locationObj.setGradualLocation(data, interval, lineStyle, pointStyle, lineLayer, typhoonLayer);
		
		$locationObj.setCenterAreaPoint(data);

	}
	
	
	
	/***
	 * 功能描述：根据给出的搜索半径和搜索个数查找
	 * 参数说明：obj 对象
	 * x      : x轴坐标,经度
	 * y      : y轴坐标，维度
	 * pointArr : 数组 [ {
	 *						t : '2013-12-10 10:12:10',
	 *						x : 118.08469966392846,
	 *						y : 24.48189502736572
	 *	   				}]
	 * radius : 显示半径
	 * count  : 显示个数
	 *
	 *****/
	$locationObj.dispatch = function(obj){
		
		//坐标轴
		var x = obj.x;
		var y = obj.y;
		//坐标数组
		var pointArr = obj.pointArr;
		//显示半径
		var radius = obj.radius;
		//显示的个数
		var count = obj.count || -1;
		
		//获取坐标点
		var point = $locationObj.getPoint(x,y);
		
		var pic = obj.pic || cfg.dispatch.pic;
		var width = obj.width || cfg.dispatch.width;
		var height = obj.height || cfg.dispatch.height;

		//sort by point and arr
		var afterSortArr ;
		var option = {sourcePoint:pointArr,targetPoint:point};
		if(radius==null || radius == undefined || radius==''){
			radius = -1;
		}
		afterSortArr = $locationObj.$sortObj.despatch(option);
		

		//return new arr ,set location
		for(var i=0;(i<afterSortArr.length && (i<count || count==-1));i++){
			if(radius==-1 || parseFloat(afterSortArr[i].distance) <= parseFloat(radius)*1000){
				$locationObj.setLocation({x:afterSortArr[i].point.x,y:afterSortArr[i].point.y,pic:pic,width:width,height:height});
			}
		}
		
	}

	/**
	 * 功能描述 ：冒泡排序
	 * 参数说明 ：
	 * arr     : 要排序的json数组：json格式：[{t:'2012-10-12 12:23:10',x:118:12312312,y:24.123123123}]；
	 *		             其中d字段必须要有，排序时有用到。
	 * func    : 要比较的方法，方法返回true表示调换位置，false表示位置不变。
	 */
	function bubbleSort(arr, func) {
		//外层循环，共要进行arr.length次求最大值操作
		for ( var i = 0; i < arr.length; i++) {
			//内层循环，找到第i大的元素，并将其和第i个元素交换
			for ( var j = i; j < arr.length; j++) {
				if (func(arr[i].t, arr[j].t)) {
					//交换两个元素的位置
					var temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}
		}
	}

	/**
	 * 功能描述 ：比较两个时间的大小
	 * 参数说明 ：
	 * beginTime ：开始时间
	 * endTime   ：结束时间
	 */
	function comptime(beginTime, endTime) {
		//var beginTime = "2009-09-21 00:00:00";
		//var endTime = "2009-09-21 00:00:01";
		var beginTimes = beginTime.substring(0, 10).split('-');
		var endTimes = endTime.substring(0, 10).split('-');

		beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0]
				+ ' ' + beginTime.substring(10, 19);
		endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' '
				+ endTime.substring(10, 19);

		var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
		return a < 0;
	}

	/**
	 * 根据json数据和时间间隔，描点
	 * data:[{t:时间，n:名称,i:ID,x:经度,y:维度}]
	 * interval:时间间隔，时间单位毫秒。1秒=1000毫秒
	 * lineStyle:线的样式
	 * pointStyle:点的样式
	 */
	$locationObj.setGradualLocation = function(data, interval, lineStyle, pointStyle, lineLayer, typhoonLayer) {
		i = 0;
		isLock = true;
		var data = data;
		lineStyle = lineStyle || {};
		pointStyle = pointStyle || {};
		var option = {sec:interval,lineStyle:lineStyle,pointStyle:pointStyle, layer:data.layer};

		//排序
		bubbleSort(data, comptime);

		//描点
		$locationObj.gradualLocation(data,option,lineLayer, typhoonLayer);
		
	}

	/****
	 * 功能描述：渐进定位
	 * data :[{t:时间，n:名称,i:ID,x:经度,y:维度}]
	 * option : {sec:时间间隔,lineStyle:线的样式,pointStyle:点的样式};
	 * 
	 ****/
	$locationObj.gradualLocation = function(data,option,lineLayer,typhoonLayer) {
		if (i >= data.length || i<0){
			isLock = false;
			i= -1 ;
			return;
		}
		var json = eval(data[i]);
		var x = json.x;
		var y = json.y;
		
		//时间间隔
		var sec = option.sec || cfg.gradualLocation.sec;

		//点样式
		var pic = option.pointStyle.pic || cfg.gradualLocation.pic;
		var width = option.pointStyle.width || cfg.gradualLocation.width;
		var height = option.pointStyle.height || cfg.gradualLocation.height;

		//线样式
		var color = option.lineStyle.color || cfg.gradualLocation.color;
		var lineStyle = option.lineStyle.lineStyle || cfg.gradualLocation.lineStyle;
		var linewidth = option.lineStyle.linewidth || cfg.gradualLocation.linewidth;
		

		//draw line bettwen two point
		if (i > 0) {
			$graphicObj.setLine({color:color,lineStyle:lineStyle,width:linewidth});
			$graphicObj.pointToPoint(data[i-1].x, data[i-1].y, x, y, lineLayer);
		}

		//change current point symbol
		//$locationObj.setGraphicSymbol(pic,width,height);

		var curentPoint = data[i];
		curentPoint.offsetx = 0;
		if(curentPoint.offsety == null){
			curentPoint.offsety = height/2;
		}
		curentPoint.layer = option.layer;
		
		
		
		//draw new point symbol
		$locationObj.setLocation(curentPoint, typhoonLayer);
		i++;
		
		setTimeout(function() {
			$locationObj.gradualLocation(data,option,lineLayer,typhoonLayer);
		}, sec);
	}

	//描点
	$locationObj.addPoint = function(evt) {
		var point = evt.mapPoint;
		var screenPoint = evt.screenPoint;
		//清空
		//$locationObj.clearGraphics();
		
		var size = cfg.addPoint.size;
		var pic = cfg.addPoint.pic;
		
		var symbol = $locationObj.getPointPic(pic, size, size).setOffset(0, size/2);
		$locationObj.griphic = new esri.Graphic(point, symbol);
		//$locationObj.griphic.setAttributes(obj);
		graphicArr.push($locationObj.griphic);
		$locationObj.map.graphics.add($locationObj.griphic);
		
		//居中显示
		$locationObj.map.centerAt(point);
		//取消描点事件
		dojo.disconnect(addPointHandler);
		//获取坐标值
		$locationObj.gisX = point.x;
		$locationObj.gisY = point.y;

		//返回坐标对象
		return point;
	}
	
	/**
	 *
	 */
	$locationObj.setTyphoonSymble = function(point,typhoonLayer){
		
		if(typhoonPoint != null){
			typhoonLayer.remove(typhoonPoint);
		}
		typhoonLayer.remove(typhoonPoint);
		var typhoonSymbol = $locationObj.getPointPic($_root_path+'/style/gis/images/weather/typhoon.gif', 32, 32).setOffset(0,0);

		typhoonPoint = new esri.Graphic(point, typhoonSymbol);
		
		typhoonLayer.add(typhoonPoint);
		
	}
	

	/**
	 * 功能描述：  定位功能
	 * 参数说明： obj 对象
	 * 其中必须参数如下：
	 * x     : x轴坐标,经度
	 * y     : y轴坐标，维度
	 * pic   : 图片的地址，默认有图片
	 * size  ：图片显示大小，默认16
	 * 
	 ***/
	$locationObj.setLocation = function(obj,typhoonLayer,isFeatrue) {
		
		var x = obj.x;
		var y = obj.y;
		var point = $locationObj.getPoint(x, y);
		if(typhoonLayer!=null){
		    $locationObj.setTyphoonSymble(point,typhoonLayer);
		}
		
		if(!isFeatrue){
			obj.point = point;
			$locationObj.addGraphic(obj);
		}else{
			var width = obj.width || cfg.addGraphic.width;
			var height = obj.height || cfg.addGraphic.height;
			var pic = obj.pic || cfg.addGraphic.pic;
			var offsetx = obj.offsetx || 0;
			var offsety = obj.offsety || 0;

			var symbol = $locationObj.getPointPic(pic, width, height).setOffset(offsetx,offsety);

			var graphic = new esri.Graphic(point, symbol);
			graphic.setAttributes(obj);
			gpsGraphicsLayer.add(graphic);
		}
	}

	
	/**
	 * 功能描述：多点定位同时定位
	 * 参数说明：
	 * json    : 格式{data:[x:118.123456789,y:24.123456789,pic:'',size:2]}
	 * 		     x,y 参数必须有
	 *           除了必须参数外，还可以加入其它的参数
	 ***/
	$locationObj.setMutiLocation = function(json) {

		json = eval(json.data);
		for ( var i = 0; i < json.length; i++) {
			$locationObj.setLocation(json[i]);
		}

	}

	//弹出提示窗口
	$locationObj.showInfoWindowMessage = function(evt) {
		var point = evt.mapPoint;
		var screenPoint = evt.screenPoint;
		var attributes = evt.graphic.attributes;
		$locationObj.addInfoWindow(evt, attributes.title, '坐标x：' + point.x
				+ '</br>坐标y：' + point.y + '</br>sp坐标x：' + screenPoint.x
				+ '</br>sp坐标y：' + screenPoint.y + '</br>' + attributes.content);
	}

	/**
	 * 功能描述 ：地图上添加图标
	 * 参数说明 ：
	 * obj     : 对象格式{point:point,pic:pic,size......}
	 * 其中必须项：
	 * point : 坐标点对象
	 * pic   : 图片的地址，默认有图片
	 * size  ：图片显示大小，默认16
	 **/
	$locationObj.addGraphic = function(obj) {
		var point = obj.point;
		var width = obj.width || cfg.addGraphic.width;
		var height = obj.height || cfg.addGraphic.height;
		var pic = obj.pic || cfg.addGraphic.pic;
		var offsetx = obj.offsetx || 0;
		var offsety = obj.offsety || 0;

		var symbol = $locationObj.getPointPic(pic, width, height).setOffset(offsetx,offsety);

		$locationObj.griphic = new esri.Graphic(point, symbol);
		graphicArr.push($locationObj.griphic);
		$locationObj.griphic.setAttributes(obj);
		if(obj.layer == null) {
			$locationObj.map.graphics.add($locationObj.griphic);
		} else {
			obj.layer.add($locationObj.griphic);
		}
	}

	/**
	 * 功能描述：设置griphic图标
	 * 参数说明：
	 * image  : 图片url地址
	 * width  ：宽度
	 * height : 高度
	 */
	$locationObj.setGraphicSymbol = function(image, width, height,offsetx,offsety) {
		if ($locationObj.griphic != null && typeof ($locationObj.griphic) != undefined){
			offsetx = offsetx || 0;
			offsety = offsety || 0;
			$locationObj.griphic.setSymbol($locationObj.getPointPic(image,
					width, height).setOffset(offsetx,offsety));
		}
	}

	/**********************************业务方法  结束**************************************/

	/**********************************公用方法  开始**************************************/

	//实例化一个point对象
	$locationObj.getPoint = function(x, y) {
		return new esri.geometry.Point(x, y, $locationObj.map.spatialReference);
	}

	//设置地图上描点图标
	$locationObj.getPointPic = function(image, width, height) {
		var image = image || cfg.getPointPic.image;
		var width = width || cfg.getPointPic.width;
		var height = height || cfg.getPointPic.height;
		return new esri.symbol.PictureMarkerSymbol(image, width, height);
	}

	//清除描点
	$locationObj.clearGraphics = function(isClear) {

		isClear = isClear;

		//取消地图定位绑定事件
		dojo.disconnect(addPointHandler);

		if(isClear){
			//gpsGraphicsLayer
			$locationObj.clearMarker();

			for(var j = 0;j<graphicArr.length;j++){
				$locationObj.map.graphics.remove(graphicArr[j]);
			}
			graphicArr = [];

			$locationObj.map.infoWindow.hide();

			$graphicObj.resetMap(isClear);

			i = -1;
			isLock = false;
			$locationObj.gisX = '';
			$locationObj.gisY = '';
		}
	}

	$locationObj.clearMarker = function(){
		gpsGraphicsLayer.clear();
	}
	

	//提示窗口
	$locationObj.addInfoWindow = function(evt, title, content, width, height) {
		var width = width || 300;
		var height = height || 100;
		$locationObj.map.infoWindow.setTitle(title);
		$locationObj.map.infoWindow.setContent(content);
		$locationObj.map.infoWindow.resize(width, height);
		$locationObj.map.infoWindow.show(evt.screenPoint, $locationObj.map
				.getInfoWindowAnchor(evt.screenPoint));
	}
	
	$locationObj.setCenterAreaPoint = function(arr,point) {
			var multipoint = new esri.geometry.Multipoint($locationObj.map.spatialReference);
			for(var i=0; i < arr.length; i++) {
				multipoint.addPoint($locationObj.getPoint(arr[i].x,arr[i].y));
			}
			if(point != null || point != undefined){
				multipoint.addPoint(point);
			}
			var extent = multipoint.getExtent();
			
			$locationObj.map.setExtent(extent.expand(3));
		}
	
	//资源调度提示窗
	$locationObj.showResInfoWindow = function(evt) {
		var point = evt.mapPoint;
		var screenPoint = evt.screenPoint;
		var attributes = evt.graphic.attributes;
		$locationObj.showInfoWindow(evt, attributes.title, attributes.content);
	}
	
	$locationObj.showInfoWindow=function(evt, title, content, width, height){
		var width = width || 300;
		var height = height || 500;
		$locationObj.map.infoWindow.setTitle(title);
		$locationObj.map.infoWindow.setContent(content);
		$locationObj.map.infoWindow.resize(width, height);
		$locationObj.map.infoWindow.show(evt.screenPoint, $locationObj.map
				.getInfoWindowAnchor(evt.screenPoint));
	}

	/**********************************公用方法  结束**************************************/
	
	//$locationObj.init();

}