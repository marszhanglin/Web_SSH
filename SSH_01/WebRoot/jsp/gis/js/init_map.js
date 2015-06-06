/**
 * 初始化地图及地图相关控件
 */

//基础接口对象
var base;
//自定义图层
var customLayers = new Array();

//绑定事件对象
var handlerArray = {};

var moniteOver = null;

var moniteOut = null;

//初始化地图
function init(config) {
    dojo.require("esri.layers.MapImageLayer");
	base = new evecomgis.igis.Base(config);
	
	//显示经纬度
	if(document.getElementById("lonlat") != null) {
		setTimeout(function (){
			base.map.on("mouse-move", function (evt) {
				document.getElementById("lonlat").innerText = "";
				document.getElementById("lonlat").innerText = "经度:" + evt.mapPoint.x.toFixed(4) + ", 纬度:" + evt.mapPoint.y.toFixed(4);
			});
		}, 800);
	}
	
	
	base.map.centerAndZoom(new esri.geometry.Point(119.54515457, 26.19595489),0);
	base.map.on("zoom-end", function (evt) {
		var level = base.map.getLevel();
		if(level==0 || level == 1){
			removeImage('shengjie');
			addImageLayer('shengjie',rootPath+'/style/gis/images/city1.png',new esri.geometry.Extent(115.8024, 23.5555, 120.4271, 28.3323, base.map.spatialReference));
		}else if(level==2){
			removeImage('shengjie');
            addImageLayer('shengjie',rootPath+'/style/gis/images/city2.png',new esri.geometry.Extent(115.8024, 23.5555, 120.4271, 28.3323, base.map.spatialReference));
		}
		else if(level == 3){
			removeImage('shengjie');
            addImageLayer('shengjie',rootPath+'/style/gis/images/city3.png',new esri.geometry.Extent(115.8024, 23.5555, 120.4271, 28.3323, base.map.spatialReference));
		} 
        else if(level == 4){
            removeImage('shengjie');
            addImageLayer('shengjie',rootPath+'/style/gis/images/city4.png',new esri.geometry.Extent(115.8024, 23.5555, 120.4271, 28.3323, base.map.spatialReference));
        } else{
            removeImage('shengjie');
        }
        
    });
	initMap();

}

/**
 * 重写初始化地图
 */
function initMap(){
	switchImageLayer();
}

// 切换矢量地图
function switchVectorLayer() {
	base.map.getLayer("WMTSImageLayer").setVisibility(false);
	base.map.getLayer("WMTSImageMarkLayer").setVisibility(false);
	base.map.getLayer("WMTSShadwLayer").setVisibility(false);
	base.map.getLayer("WMTSShadwMarkLayer").setVisibility(false);
	base.map.getLayer("WMTSVectorLayer").setVisibility(true);
	base.map.getLayer("WMTSVectorMarkLayer").setVisibility(true);
}

// 切换影像地图
function switchImageLayer() {
	base.map.getLayer("WMTSShadwLayer").setVisibility(false);
	base.map.getLayer("WMTSShadwMarkLayer").setVisibility(false);
	base.map.getLayer("WMTSVectorLayer").setVisibility(false);
	base.map.getLayer("WMTSVectorMarkLayer").setVisibility(false);
	base.map.getLayer("WMTSImageLayer").setVisibility(true);
	base.map.getLayer("WMTSImageMarkLayer").setVisibility(true);
}

// 切换晕渲地图
function switchShawdLayer() {
	base.map.getLayer("WMTSVectorLayer").setVisibility(false);
	base.map.getLayer("WMTSVectorMarkLayer").setVisibility(false);
	base.map.getLayer("WMTSImageLayer").setVisibility(false);
	base.map.getLayer("WMTSImageMarkLayer").setVisibility(false);
	base.map.getLayer("WMTSShadwLayer").setVisibility(true);
	base.map.getLayer("WMTSShadwMarkLayer").setVisibility(true);
}


// 描点
function addPoint() {
	unbind();
	base.locationObject.addPointEvent();
}

// 测距
function measure() {
    unbind();
    base.measureObject.activeMeasure('01');
}

// 清除
function clearGisMap() {
    unbind();
    base.graphicsObject.resetMap(true);
    base.locationObject.clearGraphics(true);
    base.measureObject.restore(true);
    for(var i=0; i<customLayers.length; i++) {
        customLayers[i].clear();
    }
}

// 放大
function zoomIn() {
    unbind();
    base.roamObject.zoomInMap();
}

// 缩小
function zoomOut() {
    unbind();
    base.roamObject.zoomOutMap();
}



// 多点定位
/**
 * id : 图层id
 * isClear : 是否清空图层
 * data : 数据集合
 * url ： 图片路径
 * width ：宽度
 * height ：高度
 * offsetX ：x轴偏移量
 * offsetY ：y轴偏移量
 * infoCallback : 回调函数
 * @param {Object} o
 */
function locationPoint(o) {
	if(o.isClear == null) {
		clearLayer(o.id);
	}
	var graphicLayer;
	if(base.map.getLayer(o.id) == null) {
		graphicLayer = new esri.layers.GraphicsLayer({id:o.id});
		base.map.addLayer(graphicLayer);
		customLayers.push(graphicLayer);
		graphicLayer.on("mouse-over", function (evt) {
			base.map.setMapCursor("pointer");
		});
		graphicLayer.on("mouse-out", function (evt) {
			base.map.setMapCursor("default");
		});
		
		if(o.infoCallback != null) {
			handlerArray[o.id] = graphicLayer.on("click", function (evt) {
				evt.graphic.attributes.infoCallback(evt);
			});
		}
	} else {
		graphicLayer = base.map.getLayer(o.id);
	}
	
	var data = o.data;
	var arr = new Array();
	for(var i=0; i < data.length; i++) {
		if(data[i][o.lonName] == null || data[i][o.latName] == null) {
			continue;
		}
		var point = base.locationObject.getPoint(data[i][o.lonName], data[i][o.latName]);
		arr.push(point);
		var obj = {
			point: point,
			layer: graphicLayer,
			pic: o.url || (typeof(o.urlType) == "undefined" ? null : o.urlType[data[i][o.typeName]] || data[i].pic),
			width: o.width || (typeof(o.typeWidth) == "undefined" ? null : o.typeWidth[data[i][o.typeName]]),
			height: o.height || (typeof(o.typeHeight) == "undefined" ? null : o.typeHeight[data[i][o.typeName]]),
			offsetx: o.offsetX || (typeof(o.typeOffsetX) == "undefined" ? null : o.typeOffsetX[data[i][o.typeName]]),
			offsety: o.offsetY || (typeof(o.typeOffsetY) == "undefined" ? null : o.typeOffsetY[data[i][o.typeName]]),
			data: data[i],
			infoCallback: o.infoCallback
		}
		// 记录点所属的表
		if(o.tableName != null && o.tableName != undefined){
			obj.tableName = o.tableName;
		}
        // 记录点弹出框类型
        if(o.mode != null && o.mode != undefined){
            obj.mode = o.mode;
        }
		base.locationObject.addGraphic(obj);
	}
	
//	if(arr.length > 0)
//		base.locationObject.setCenterAreaPoint(arr);
}

// 定位
function locationSamePoints(o) {
	var graphicLayer;
	if(base.map.getLayer(o.id) == null) {
		graphicLayer = new esri.layers.GraphicsLayer({id:o.id});
		base.map.addLayer(graphicLayer);
		customLayers.push(graphicLayer);
		graphicLayer.on("mouse-over", function (evt) {
			base.map.setMapCursor("pointer");
		});
		graphicLayer.on("mouse-out", function (evt) {
			base.map.setMapCursor("default");
		});
		
		if(o.infoCallback != null) {
			handlerArray[o.id] = graphicLayer.on("click", function (evt) {
				evt.graphic.attributes.infoCallback(evt);
			});
		}
	} else {
		graphicLayer = base.map.getLayer(o.id);
	}
	
	var data = o.data;
	var arr = new Array();
	//for(var i=0; i < data.F_AREA_XY.length; i++) {
	if(o.lon != null || o.lat != null) {
		//continue;
		var point = base.locationObject.getPoint(o.lon, o.lat);
		arr.push(point);
		var obj = {
			point: point,
			layer: graphicLayer,
			pic: o.url || (typeof(o.urlType) == "undefined" ? null : o.urlType[data[o.typeName]]),
			width: o.width || (typeof(o.typeWidth) == "undefined" ? null : o.typeWidth[data[o.typeName]]),
			height: o.height || (typeof(o.typeHeight) == "undefined" ? null : o.typeHeight[data[o.typeName]]),
			offsetx: o.offsetX || (typeof(o.typeOffsetX) == "undefined" ? null : o.typeOffsetX[data[o.typeName]]),
			offsety: o.offsetY || (typeof(o.typeOffsetY) == "undefined" ? null : o.typeOffsetY[data[o.typeName]]),
			data: data,
			infoCallback: o.infoCallback
		}
		base.locationObject.addGraphic(obj);
	}
		
	//}
	
}

// 显示弹出窗口
function openInfoWindow(evt, id, title, url, width, height, closeHandler, isLock) {
	closeAllArtWin();
	var point = new esri.geometry.ScreenPoint(evt.screenPoint.x+document.body.offsetWidth/4, evt.screenPoint.y);
	var centerPoint = base.map.toMap(point);
	base.map.centerAt(centerPoint);
	setTimeout(function() {
		var cp = base.map.toScreen(evt.mapPoint);
		openArtWindow(id, title, url, width, height, cp.x+15, (document.body.offsetHeight-100)/2, closeHandler, isLock);
	}, 600);
}

function openMapInfoWindow(evt, title, content, width, height){
	base.locationObject.addInfoWindow(evt, title, content, width, height);
}

// 显示气泡窗口
function openPopup(evt, title, content, width, height, className) {
	base.map.infoWindow.hide();
	if(title != null) {
		base.map.infoWindow.setTitle(title);
	}
	base.map.infoWindow.setContent(content);
	base.map.infoWindow.resize(width, height);
	if(className != null) {
		dojo.addClass(base.map.infoWindow.domNode, className);
	}
	base.map.infoWindow.show(evt.mapPoint, evt.mapPoint);
	base.map.centerAt(evt.mapPoint);
	
	
}

//点击行显示详情并定位点
//lon经度， lat纬度，wid窗口ID，title， ww窗口宽度， wh窗口高度，wurl窗口路径，layerId图层id为空表示不描点只将地图定位到当前位置（试用于地图上已经存在点的情况）
//pw图片宽度， ph图片高度，offsetx图片x偏移， offsety图片y偏移，purl图片路径, infoCallback是否绑定点击后显示弹出窗, o.isClear如果需要描点是否清除图层
//closeHandler窗口关闭后需要执行的函数, isLock是否模态窗口
function clickRowShowWindow(o) {
	if(typeof(o) == "string") {
		o = eval("("+o+")");
	}
	
	if(o.lon != null && o.lon.length != 0 && o.lat != null && o.lat.length != 0) {
		var point = base.locationObject.getPoint(o.lon, o.lat);
		var screenPoint = base.map.toScreen(point);
		screenPoint = new esri.geometry.ScreenPoint(screenPoint.x+250, screenPoint.y);
		var offsetxPoint = base.map.toMap(screenPoint);
		base.map.centerAt(offsetxPoint);
	}
	if(o.layerId != null && o.lon != null && o.lon.length != 0 && o.lat != null && o.lat.length != 0) {
		//清除图层
		if(o.isClear != null) {
			clearLayer(o.layerId);
		}
		
		var graphicLayer;
		if(base.map.getLayer(o.layerId) == null) {
			graphicLayer = new esri.layers.GraphicsLayer({id:o.layerId});
			base.map.addLayer(graphicLayer);
			customLayers.push(graphicLayer);
			graphicLayer.on("mouse-over", function (evt) {
				base.map.setMapCursor("pointer");
			});
			graphicLayer.on("mouse-out", function (evt) {
				base.map.setMapCursor("default");
			});
		} else {
			graphicLayer = base.map.getLayer(o.layerId);
		}
		
		//构建描点对象
		var obj = {
			point: point,
			layer: graphicLayer,
			pic:o.purl,
			width:o.pw,
			height:o.ph,
			offsetx: o.offsetx,
			dataId:o.dataId,
			otherId:o.otherId,
			offsety: o.offsety
		}
		//描点
		base.locationObject.addGraphic(obj);
		if(o.infoCallback != null) {
			handlerArray[o.layerId] = graphicLayer.on("click", function (evt) {
				eval(o.infoCallback+"(evt)");
			});
		}
	}
	
	//设置延迟显示窗口，确保地图居中后才获取地图中心点，保证窗口位置不发生偏移
	if(o.lon != null && o.lon.length != 0 && o.lat != null && o.lat.length != 0) {
		var evt = {
				mapPoint : base.locationObject.getPoint(o.lon, o.lat)
			};
			openPopup(evt, o.title, o.content, 240, 200,"customInfo");
	} else {
		var mapPoint = new Object();
		mapPoint = base.locationObject.getPoint(o.lon, o.lat);
		openPopup(evt, o.title, o.content, 240, 200,"customInfo");
		//openArtWindow(o.wid, o.title, o.wurl, o.ww, o.wh, document.body.offsetWidth / 2 - o.ww/2, document.body.offsetHeight / 2 - o.wh/2 + 101, o.closeHandler, o.isLock);
	}
}


//清空单个图层
function clearLayer(id) {
	if(base.map.getLayer(id) == null) {
		return;
	}
	//if(handlerArray[id] != null) {
	//	handlerArray[id].remove();
	//	delete handlerArray[id];
	//}
	base.map.getLayer(id).clear();
}



function unbind() {
	base.roamObject.areaZoomDeactivate();
	base.locationObject.clearGraphics(false);
	base.measureObject.restore(false);
}


//绘图
function drawGraphic(type) {
	unbind();
	base.graphicsObject.changeType(type);
}
//人员轨迹
function monite(data) {
    clearLayer(data.lineLayerId);
    clearLayer(data.pointLayerId);
    clearLayer(data.typhoonLayerId);
    var lineLayer;
    var pointLayer;
    var typhoonLayer;
    
    if(base.map.getLayer(data.typhoonLayerId) == null) {
        typhoonLayer = new esri.layers.GraphicsLayer({id:data.typhoonLayerId});
        base.map.addLayer(typhoonLayer);
        customLayers.push(typhoonLayer);
    } else {
        typhoonLayer = base.map.getLayer(data.typhoonLayerId);
    }
    
    if(base.map.getLayer(data.lineLayerId) == null) {
        lineLayer = new esri.layers.GraphicsLayer({id:data.lineLayerId});
        base.map.addLayer(lineLayer);
        customLayers.push(lineLayer);
    } else {
        lineLayer = base.map.getLayer(data.lineLayerId);
    }
    
    if(base.map.getLayer(data.pointLayerId) == null) {
        pointLayer = new esri.layers.GraphicsLayer({id:data.pointLayerId});
        base.map.addLayer(pointLayer);
        customLayers.push(pointLayer);
        
        
        moniteOver = pointLayer.on("mouse-over", function (evt) {
            var msg = evt.graphic.attributes.t+'</br>';
            msg += '风速（米/秒）：48</br>';
            msg += '气压（百帕）：940</br>';
            msg += '移向/移速（公里/小时）：N/10</br>';
            base.map.infoWindow.hide();
            base.map.infoWindow.resize(300, 150);
            dojo.addClass(base.map.infoWindow.domNode, "customInfo");
            base.map.infoWindow.setTitle(evt.graphic.attributes.n);
            base.map.infoWindow.setContent(msg);
            base.map.infoWindow.show(evt.mapPoint);
            base.map.setMapCursor("pointer");
        });
        
        moniteOut = pointLayer.on("mouse-out", function (evt) {
            base.map.infoWindow.hide();
            base.map.setMapCursor("default");
        });
    } else {
        pointLayer = base.map.getLayer(data.pointLayerId);
    }
    
    for(var i=0; i < data.json.length; i++) {
        data.json[i].x = data.json[i].x || data.json[i][data.lonName];
        data.json[i].y = data.json[i].y || data.json[i][data.latName];
        data.json[i].t = data.json[i].t || data.json[i][data.timeName];
    }

    unbind();
    var interval = parseInt(data.interval) || 1000;
    base.locationObject.gradualLocationEvent(data.json, interval, {
        fillColor : data.fillColor || "red",
        strokeColor : data.strokeColor || "yellow",
        pointRadius : data.pointRadius || 6
    }, null, lineLayer, pointLayer, typhoonLayer);
}

//获取图层元素坐标
function getGraphicLonLat(layerId) {
	if(layerId == null || base.map.getLayer(layerId) == null) {
		return;
	}
	var pointArr = new Array();
	var polygonArr = new Array();
	var graphics = base.map.getLayer(layerId).graphics;
	for(var i=0; i < graphics.length; i++) {
		if(graphics[i].geometry.type == 'multipoint') {
			for(var j=0; j < graphics[i].geometry.points.length; j++) {
				pointArr.push({
					lon: graphics[i].geometry.points[j][0],
					lat: graphics[i].geometry.points[j][1]
				});
			}
		} else if(graphics[i].geometry.type == 'point'){
			pointArr.push({
				lon: graphics[i].geometry.x,
				lat: graphics[i].geometry.y
			});
		} else if(graphics[i].geometry.type == "polygon") {
			var array = new Array();
			for(var j=0; j < graphics[i].geometry.rings[0].length; j++) {
				array.push([
					graphics[i].geometry.rings[0][j][0],
					graphics[i].geometry.rings[0][j][1]
				]);
			}
			polygonArr.push(array);
		}
	}
	
	var data = {
		"point" : pointArr,
		"polygon" : polygonArr
	};
	return data;
}

//通过要素点坐标缩放显示图层上所有要素
function zoomToGraphicsLayer(layerId) {
	if(base.map.getLayer(layerId) == null) {
		return;
	}
	
	var multipoint = new esri.geometry.Multipoint(base.map.spatialReference);
	var graphics = base.map.getLayer(layerId).graphics;
	for(var i=0; i < graphics.length; i++) {
		if(graphics[i].geometry.type == 'point' || graphics[i].geometry.type == 'multipoint') {
			multipoint.addPoint(base.locationObject.getPoint(graphics[i].geometry));
		}
		
		if(graphics[i].geometry.type == "polygon") {
			for(var k=0; k < graphics[i].geometry.rings.length; k++) {
				for(var j=0; j < graphics[i].geometry.rings[k].length; j++) {
					multipoint.addPoint(base.locationObject.getPoint(graphics[i].geometry.rings[k][j][0],graphics[i].geometry.rings[k][j][1]));
				}
			}
		}
	}
	
	var extent = multipoint.getExtent();
	base.map.setExtent(extent.expand(3));
}

//根据坐标绘制多边形
function drawPolygon(jsonString, layerId) {
	base.graphicsObject.drawGraphic(jsonString, layerId);
}

//添加图片
function addImageLayer(i, u, e) {
	if(base.map.getLayer(i) != null) {
		return;
	}

	var layer = new esri.layers.MapImageLayer({
		id:i
	});
	layer.addImage(new esri.layers.MapImage({
		href:u,
		extent:e
	}));
	base.map.addLayer(layer);
}


//移除图片
function removeImage(id) {
    if(base.map.getLayer(id) != null) {
        base.map.removeLayer(base.map.getLayer(id));
    }
}

$(function() {
	var xmlUrl = $_root_path+"/jslib/evecomgis/common/arcgis-config.xml";
	var configReader = new evecomgis.common.ReadXMLConfig(xmlUrl, init);
	configReader.readXMLReturnJson();
});