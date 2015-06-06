//注册命名空间
Namespace.register("evecomgis.gisimpl.arcgis.base");

/**
 * @Title evecomgis.gisimpl.arcgis.base.QueryMap
 * @param map 
 * @Description 
 * @author alean
 * @Date 2013-12-20
 */
evecomgis.gisimpl.arcgis.base.QueryMap = function() {

	//	dojo.require("esri.map");
	//	dojo.require("esri.tasks.query");
	//	dojo.require("esri.tasks.geometry");
	dojo.require("esri/map");
	dojo.require("esri/layers/FeatureLayer");
	dojo.require("esri/tasks/query");
	dojo.require("esri/tasks/QueryTask");
	dojo.require("esri/tasks/GeometryService");
	dojo.require("esri/tasks/BufferParameters");
	dojo.require("esri/graphic");
	dojo.require("esri/InfoTemplate");
	dojo.require("esri/symbols/SimpleMarkerSymbol");
	dojo.require("esri/symbols/SimpleLineSymbol");
	dojo.require("esri/symbols/SimpleFillSymbol");
	dojo.require("esri/config");
	dojo.require("dojo/_base/Color");
	dojo.require("dojo/dom");
	dojo.require("dojo/domReady");

	var $queryObj = this;

	var queryTask;
	var tb;

	var radius;
	var unit;
	var title;
	var content;

	var map;
	var queryTaskUrl;
	var geomeryServiceUrl;
	var geometryService;
	var featureLayers = [];
	var queryHandler;
	var onBufferCompleteHandler;
	var callbackHandler;

	var graphicHandler ;

	//画图数组
	var graphicArr = [];
	
	var x;//经度
	var y;//纬度

	var cfg;
	
	/**
	 * 
	 * @param {Object} config
	 * map : 地图
	 * radius : 半径
	 * callbackHandler ：回调函数
	 * unit : 单位
	 * fields ：查询字段
	 * queryTaskUrl ：查询地图的图层
	 * geomeryServiceUrl ：几何服务
	 */
	this.init = function(config) {
		$("#messages").css("left", config.map.width - $("#messages").width()-14);
		$("#messages").css("height", config.map.height - 19);
		$("#info").css("height", $("#messages").height()-30);

		cfg = config;

		map = config.map;
		title = config.titleCallBack?eval(config.titleCallBack+"()") : "";
		content = config.contentCallBack?eval(config.contentCallBack+"()") : "";
		radius = config.radius || 3;
		callbackHandler = config.callbackHandler || null;
		unit = config.unit || esri.tasks.GeometryService.UNIT_KILOMETER;
		geomeryServiceUrl = config.geomeryServiceUrl;
		esriConfig.defaults.io.proxyUrl = "/proxy.jsp";
		
		geometryService = new esri.tasks.GeometryService(geomeryServiceUrl);
		
		queryTaskUrl = config.queryTaskUrl;
		
		var symbol = new esri.symbols.SimpleMarkerSymbol(
				esri.symbols.SimpleMarkerSymbol.STYLE_CIRCLE, 12,
				new esri.symbols.SimpleLineSymbol(
						esri.symbols.SimpleLineSymbol.STYLE_NULL,
						new dojo.Color( [ 247, 34, 101, 0.9 ]), 1),
				new dojo.Color( [ 207, 34, 171, 0.5 ]));
		
		if(queryTaskUrl){
			if(queryTaskUrl.level){
				if(queryTaskUrl.level.length){
					for(var i=0;i<queryTaskUrl.level.length;i++){
						var level = queryTaskUrl.level[i];
						$queryObj.addFeatrue(level,symbol);
					}
				}else{
					var level = queryTaskUrl.level;
					$queryObj.addFeatrue(level,symbol);
				}
			}
		}
		
		map.addLayers(featureLayers);
		

		tb = new esri.toolbars.Draw(map);
		tb.on("draw-end",$queryObj.queryMapExtent);
	}
	
	//触发定位画圆查询
	this.bufferMap = function(){
		if(!x || !y){
			alert('请先定位坐标！');
			return;
		}
		if(!radius){
			alert('请输入查询半径');
			return;
		}
		var point = new esri.geometry.Point(x, y, $locationObj.map.spatialReference);
		this.queryMap(point);
	}
	
	//触发拉框查询
	this.doQuery = function(type){
		type = type || "01";
		if(type=="01"){
			type = "extent";
		}
		if(type=="02"){
			type = "circle";
		}
		if(type=="03"){
			type = "polygon";
		}
		tb.activate(type);
		graphicHandler = dojo.connect(map.graphics, "onClick", showInfoWindow);
	}

	//触发点击画圆查询
	this.doActivity = function() {
		this.doUnActivity();
		queryHandler = dojo.connect(map, "onClick", this.queryMap);

		onBufferCompleteHandler = dojo.connect(geometryService,
				"onBufferComplete", this.onBufferComplete);
	}
	
	//取消查询
	this.doUnActivity = function(isGraphic) {
		isGraphic = isGraphic;
		if (isGraphic) {
			tb.deactivate();
			dojo.disconnect(queryHandler);
			dojo.disconnect(onBufferCompleteHandler);
			$queryObj.clear();
			for(var i=0;i<featureLayers.length;i++){
				featureLayers[i].clearSelection();
			}
			
		} else {
			tb.deactivate();
			dojo.disconnect(queryHandler);
			dojo.disconnect(onBufferCompleteHandler);
			dojo.disconnect(graphicHandler);
		}
	}
	
	
	//添加feature层
	this.addFeatrue = function(level,symbol){
		var fields = level.fields? level.fields.split(",") : ["*"];
		var orderByFields = level.orderByFields? level.orderByFields.split(",") : [""];
		if(level.url){
			var featureLayer = new esri.layers.FeatureLayer(level.url, {
				mode : esri.layers.FeatureLayer.MODE_SELECTION,
				//infoTemplate : new esri.InfoTemplate(title, content),
				
				outFields : fields,
				orderByFields : orderByFields
			});
			featureLayer.setSelectionSymbol(symbol);
			featureLayers.push(featureLayer);
		}
	}
	
	//设置圆形查询的中心点
	this.setPoint = function(lon,lat){
		x = lon;
		y = lat;
	}
	
	//矩形区域查询
	this.queryMapExtent = function(evt){
		$queryObj.clear();
		var geometry = evt.geometry;
		$queryObj.query(geometry);
		tb.deactivate();
	}
	
	//圆形区域查询
	this.queryMap = function(evt) {
		//define input buffer parameters
		var params = new esri.tasks.BufferParameters();
		params.geometries = [ evt.mapPoint ];//
		params.distances = [ radius ];
		params.unit = eval(unit);//esri.tasks.GeometryService.UNIT_KILOMETER;
		params.bufferSpatialReference = new esri.SpatialReference( {
			wkid : 3857
		});
		params.outSpatialReference = map.spatialReference;

		geometryService.buffer(params);
	};
	
	//圆形查询缓冲区完成
	this.onBufferComplete = function(result) {
		$queryObj.clear();
		
		var bufferGeometry = result[0];
		
		$queryObj.query(bufferGeometry);
	};
	
	this.setQuerySymbol = function(fillType,lineType,lineColor,lineWidth,fillColor){
		var lineColors = lineColor.split(",");
		var fillColors = fillColor.split(",");
		if(lineColors.length==1){
			lineColors = lineColor;
		}
		if(fillColors.length==1){
			fillColors = fillColor;
		}
		var symbol = new esri.symbol.SimpleFillSymbol(fillType,
				new esri.symbol.SimpleLineSymbol(lineType, new dojo.Color( lineColors),lineWidth),
				new dojo.Color(fillColors));
	}
	
	this.setQueryPointSymbol = function(){
		var symbol = new esri.symbols.SimpleMarkerSymbol(
				esri.symbols.SimpleMarkerSymbol.STYLE_CIRCLE, 12,
				new esri.symbols.SimpleLineSymbol(
						esri.symbols.SimpleLineSymbol.STYLE_NULL,
						new dojo.Color( [ 247, 34, 101, 0.9 ]), 1),
				new dojo.Color( [ 207, 34, 171, 0.5 ]));
	}
	
	
	//根据几何图形查询地图
	this.query = function(bufferGeometry){
		// draw the buffer geometry on the map as a map graphic
		var symbol = new esri.symbol.SimpleFillSymbol("none",
				new esri.symbol.SimpleLineSymbol("solid", new dojo.Color( [
						255, 0, 0 ]), 2),
				new dojo.Color( [ 255, 255, 0, 0.25 ]));

		var graphic = new esri.Graphic(bufferGeometry, symbol);
		//图形加入数组
		graphicArr.push(graphic);
		map.graphics.add(graphic);

		//Select features within the buffered polygon. To do so we'll create a query to use the buffer graphic
		//as the selection geometry.
		var query = new esri.tasks.Query();
		query.geometry = bufferGeometry;
		

		for(var i=0;i<featureLayers.length;i++){
			featureLayers[i]
				.selectFeatures(
						query,
						esri.layers.FeatureLayer.SELECTION_SUBTRACT,
						function(results) {
							if(callbackHandler){
								callbackHandler(results);
							}else{
								document.getElementById("info").innerHTML = "";
								var size = results.length/100+1;
								for(var i=1;i<=size;i++){
									var totalPopulation = sumPopulation(results,i);
									document.getElementById("info").innerHTML = document.getElementById("info").innerHTML + "<div>名称：<input id='_searchName' type='text' style='width:90px;' /><button onclick='base.queryMapObject.searchByName();'>查询</button></div>" + totalPopulation;
									document.getElementById('messages').style.display = '';
								}
							}
						});
		}
	}

	this.searchByName = function () {
		var name = $("#_searchName").val();
		$("#info div:gt(0)").each(function () {
			if($(this).html().indexOf(name) == -1) {
				$(this).remove();
			}
		});
	}

	function showInfoWindow (evt){
		if(!evt.graphic.attributes){
			return;
		}
		var point = evt.graphic.attributes.point;

		var title = evt.graphic.attributes.title;
		var content = evt.graphic.attributes.content;
		$queryObj.addInfoWindow(point.x,point.y,title,content);
	}
	
	//提示窗口
	this.addInfoWindow = function(x,y, title, content) {
		var point = new esri.geometry.Point(x, y, base.map.spatialReference);
		var width = width || 300;
		var height = height || 100;
		base.map.infoWindow.setTitle(title);
		base.map.infoWindow.setContent(content);
		base.map.infoWindow.resize(width, height);
		base.map.infoWindow.show(point);

		base.map.setScale(999.90794353627);
		base.map.centerAt(point);
		//alert(base.map.getScale());

	}
	
	//清空查询图层
	this.clear = function(){
		
		for(var i=0;i<graphicArr.length;i++){
			map.graphics.remove(graphicArr[i]);
		}
		for(var i=0;i< featureLayers.length;i++){
			featureLayers[i].clear();
		}
		graphicArr = [];
		
		if(document.getElementById('messages') != null) {
			document.getElementById('messages').style.display = 'none';
		}
	}

	this.addGraphic = function(obj) {
		var point = obj.point;
		var width = obj.width || cfg.addGraphic.width;
		var height = obj.height || cfg.addGraphic.height;
		var pic = obj.pic || cfg.addGraphic.pic;
		var offsetx = obj.offsetx || 0;
		var offsety = obj.offsety || 0;

		var symbol = (new esri.symbol.PictureMarkerSymbol(pic, width, height)).setOffset(offsetx,offsety);
		

		var griphic = new esri.Graphic(point, symbol);
		graphicArr.push(griphic);
		griphic.setAttributes(obj);
		map.graphics.add(griphic);

	}

	//查询结果展示方法
	function sumPopulation(features,size) {
		var popTotal = "";
		/*
		features.sort(function (a, b){
			return a.attributes.A.localeCompare(b.attributes.A);
		});
		*/
		
		for ( var x = (size-1)*100; x < features.length && x<size*100; x++) {

			var content = "ID:"+features[x].attributes["OBJECTID"] + "<br/>"
						+ "地址：" + features[x].attributes["D"] + "</br>" 
						+ "店主：" + features[x].attributes["C"] + "</br>" 
						+ "x：" + features[x].attributes["G"] + "</br>" 
						+ "y：" + features[x].attributes["F"] + "</br>" ;
		
			var temp = "ID:"+features[x].attributes["OBJECTID"] + ","
					 + "x:" + features[x].attributes["G"] + "," 
					 + "y:" + features[x].attributes["F"];
			
			var title = features[x].attributes["A"];

			
			var point = new esri.geometry.Point(features[x].attributes["G"], features[x].attributes["F"], map.spatialReference);
			//画图标
			$queryObj.addGraphic({point:point,width:32,height:32,offsetx:0,offsety:16,title:title,content:content});

			
				popTotal = popTotal + "<div style='margin-bottom:10px;left:280px;'>"
						 + "<a style='cursor:hand;font-size:12pt;color:#FF0000;' title='"+temp+"' onclick='base.queryMapObject.addInfoWindow(\""+features[x].attributes["G"]+"\",\""+features[x].attributes["F"]+"\",\""+title+"\",\""+content+"\")'>" + features[x].attributes["A"] + "</a>" //名称
						 //+ "</br>" + features[x].attributes["B"] //地区
					     //+ "</br>" + features[x].attributes["C"] //名字
						 + "</br><span>" + features[x].attributes["D"] + "</span>" //地址
					     //+ "</br>" + features[x].attributes["E"]
						 //+ "</br>" + features[x].attributes["F"] //纬度
					     //+ "</br>" + features[x].attributes["G"]; //经度
				popTotal = popTotal + "</div>";
		}
		if(features.length<1){
			popTotal = popTotal + "该区域无数据";
		}
		//popTotal = popTotal + "</div>";
		return popTotal;
	}
}
