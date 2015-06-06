//注册命名空间
Namespace.register("evecomgis.gisimpl.supermap.base");

evecomgis.gisimpl.supermap.base.Location = function () {
	var $locationObject = this;
	this.vectorLayer;
	this.style;
	this.control;
	this.map;
	this.isMulti;
	this.tempIsMulit;
	this.tempCancleFunc;
	this.tempPoint;
	this.markerLayer;
	this.isPopup;
	this.callback;
	this.infowin;
	this.autoClear;
	this.locationMarkerLayer;


	/**
     *@Title openWin
	 *@Author Link
	 *@Date 2014-01-20
	 *@Param callback 回调函数
	 *@Description 构建popup框
	 */
	this.openWin = function (callback) {
		$locationObject.closeWin();
        var marker = this;
        var lonlat = marker.getLonLat();
		var contentHTML;
		if($locationObject.callback != null) {
			var objectValue = {};
			objectValue.x = lonlat.lon;
			objectValue.y = lonlat.lat;
			var callback = $locationObject.callback+"(objectValue)";
			contentHTML = eval(callback);
		} else {
			contentHTML = "<div style='font-size:.8em; opacity: 0.8; overflow-y:hidden;'>";
			contentHTML += "<div>x:" + lonlat.lon + "<br>y:" + lonlat.lat + "</div></div>";
		}
        
        var popup = new SuperMap.Popup.FramedCloud("popwin", new SuperMap.LonLat(lonlat.lon, lonlat.lat), null, contentHTML, null, true);
        $locationObject.infowin = popup;
        $locationObject.map.addPopup(popup);
	}

	/**
	 *@Title closeWin
	 *@Author Link
	 *@Date 2014-01-20
	 *@Description 销毁popup框
	 */
	this.closeWin = function () {
		if ($locationObject.infowin) {
            try {
                $locationObject.infowin.hide();
                $locationObject.infowin.destroy();
            } catch(e) {
            }
        }
	}

	/**
	 *@Title clearGraphics
	 *@Author Link
	 *@Date 2014-01-20
	 *@Description 清除图层要素解除控制器激活状态
	 */
	this.clearGraphics = function (isClear) {
		var clear = isClear == null ? $locationObject.autoClear : isClear;
		if(clear!=false) {
			$locationObject.vectorLayer.removeAllFeatures();
			$locationObject.markerLayer.clearMarkers();
			$locationObject.locationMarkerLayer.clearMarkers();
		}
		$locationObject.closeWin();
		if($locationObject.control != null) {
			if($locationObject.tempCancleFunc != null) {
				$locationObject.control.point.cancel = $locationObject.tempCancleFunc;
			}
			$locationObject.control.point.deactivate();
		}
		if($locationObject.tempIsMulit != null) {
			$locationObject.isMulti = $locationObject.tempIsMulit;
		}
		
	}

	/**
	 *@Title init
	 *@Author Link
	 *@Date 2014-1-15
	 *@Param config required 读取XML的配置参数对象
	 *@Description 初始化函数初始化一些全局的变量
	 */
	this.init = function (config) {
		$locationObject.map = config.map;
		$locationObject.isClear = config.autoClear;
		$locationObject.isPopup = config.isPopup;
		$locationObject.isMulti = config.isMulti;
		$locationObject.style = config.style;
		$locationObject.callback = config.callback;
		$locationObject.control = new SuperMap.Control();
		$locationObject.vectorLayer = new SuperMap.Layer.Vector("location Vector");
		$locationObject.markerLayer = new SuperMap.Layer.Markers("location Markers");
		$locationObject.locationMarkerLayer = new SuperMap.Layer.Markers("location Markers Layer");
		SuperMap.Util.extend($locationObject.control, {
			draw: function () {
				this.point = new SuperMap.Handler.Point($locationObject.control, {
					"done" : this.notice
				});
			},

			notice: function (point) {
				$locationObject.tempPoint = point;
				var size = new SuperMap.Size(config.style.width, config.style.height), offset = new SuperMap.Pixel(-(size.w / 2), -size.h), icon = new SuperMap.Icon(config.style.background, size, offset);
                marker = new SuperMap.Marker(new SuperMap.LonLat(point.x, point.y), icon);
				if(config.isPopup != null) {
					marker.events.on({"click":$locationObject.openWin});
				}
				$locationObject.markerLayer.addMarker(marker);
				if($locationObject.isMulti == null) {
					$locationObject.control.point.deactivate();
				}

				$locationObject.map.setCenter(new SuperMap.LonLat(point.x,point.y));
			}
		});
		base.map.addLayer($locationObject.vectorLayer);
		base.map.addLayer($locationObject.markerLayer);
		base.map.addLayer($locationObject.locationMarkerLayer);
		$locationObject.map.addControl($locationObject.control);
	}

	/**
	 *@Title addPointEvent
	 *@Author Link
	 *@Date 2014-1-15
	 *@Description 描点
	 */
	this.addPointEvent = function() {
		$locationObject.control.point.activate();
	}

	/**
	 *@Title setLocation
	 *@Author Link
	 *@Date 2014-1-15
	 *@Param point required GPS坐标对象{i:id,n:name,x:经度,y:维度,z:高度}
	 *@Param point.width point.height point.pic 描点样式，如果没传入该属性默认使用构造时候配置文件中的样式，如果全部没有指定使用supermap默认样式，样式参数详见supermap API
	 *@Description 定位功能传入点坐标进行描点
	 */
	this.setLocation = function (point, isNewLayer) {
		var style = null;
		if(point.width != null || point.height != null || point.pic != null) {
			style = {};
			style.width = point.width;
			style.height = point.height;
			style.background = point.pic;
		}
		if(style != null) {
			var width = style.width == null ? $locationObject.style.width : style.width;
			var height = style.height == null ? $locationObject.style.width : style.height;
			var background = style.background == null ? $locationObject.style.background : style.background;
		} else {
			var width = $locationObject.style.width;
			var height = $locationObject.style.height;
			var background = $locationObject.style.background;
		}
		
		var size = new SuperMap.Size(width, height), offset = new SuperMap.Pixel(-(size.w / 2), -size.h), icon = new SuperMap.Icon(background, size, offset);
		var lonLat =  new SuperMap.LonLat(point.x, point.y)
		marker = new SuperMap.Marker(lonLat, icon);
		if($locationObject.isPopup != null) {
			marker.events.on({"click":$locationObject.openWin});
		}

		if(isNewLayer == null) {
			$locationObject.markerLayer.addMarker(marker);
		} else {
			$locationObject.locationMarkerLayer.addMarker(marker);
		}
	}

	this.clearMarker = function () {
		$locationObject.locationMarkerLayer.clearMarkers();
	}

	/**
	 *@Title gradualLocationEvent
	 *@Author Link
	 *@Date 2014-1-16
	 *@Param data required 传入的json格式数据 [{i:id,n:name,x:经度,y:维度,z:高度},{i:id,n:name,x:经度,y:维度,z:高度}]
	 *@Param interval required 描点间隔时间 int类型 单位毫秒
	 *@Param lineStyle 2点之间连线的样式，如果没有指定使用supermap默认样式，样式参数详见supermap API
	 *@Param pointStyle 描点样式，如果没传入该属性默认使用构造时候配置文件中的样式，如果全部没有指定使用supermap默认样式，样式参数详见supermap API
	 *@Description 轨迹回放功能，通过传入一组GPS坐标为地图描点连线
	 */
	this.gradualLocationEvent = function(data, interval, lineStyle, pointStyle) {
		//首先将屏幕定位到需要轨迹回放的地图范围内
		var multiPoint = new SuperMap.Geometry.MultiPoint();
		for(var i = 0; i < data.length; i++) {
			multiPoint.addPoint(new SuperMap.Geometry.Point(data[i].x, data[i].y));
		}
		$locationObject.map.zoomToExtent(multiPoint.getBounds(),false);
		//为传入的数组进行排序，排序通过时间排序
		data.sort(function(a, b) {
			return new Date(a.t.replace(/\-/g, "/"))-new Date(b.t.replace(/\-/g, "/"));
		});
		//通过传入的间隔时间定时调用描点和划线方法
		var index = 0;
		var time = setInterval(function () {
			if(pointStyle != null) {
				data[index].width = pointStyle.width;
				data[index].height = pointStyle.height;
				data[index].pic = pointStyle.pic;
			}
			$locationObject.setLocation(data[index]);
			if(index > 0) {
				var lineString = new SuperMap.Geometry.LineString([new SuperMap.Geometry.Point(data[index].x, data[index].y), new SuperMap.Geometry.Point(data[index-1].x, data[index-1].y)]);
				var vector = new SuperMap.Feature.Vector(lineString, null, lineStyle);
				$locationObject.vectorLayer.addFeatures(vector);
			}
			if(index < data.length - 1) {
				index++;
			} else {
				clearInterval(time);
			}
		}, interval);
	}

	/**
	 *@Title dispatchEvent
	 *@Author Link
	 *@Date 2014-01-20
	 *@Param points 全部需要查询的调度点
	 *@Param searchBounds 查询访问半径 单位千米
	 *@Param showCount 显示范围内满足条件的个数
	 *@Param eventPoint 事发点，如果没有传入则激活描点控制器通过描点后计算满足条件的调度点
	 *@Param style 点的样式包括图标、宽度、高度
	 *@Description 计算与事发点最近范围内的调度点
	 */
	$locationObject.dispatchEvent = function (points,searchBounds,showCount,eventPoint,style) {
		var tools = new evecomgis.gisimpl.supermap.base.Tools();
		if(eventPoint == null) {//假如没有传入事发地点则表示事发地通过用户手动描点实现
			$locationObject.tempIsMulit = $locationObject.isMulti;
			$locationObject.isMulti = null;
			$locationObject.tempCancleFunc = $locationObject.control.point.cancel;
			$locationObject.control.point.cancel = function () {
				var config = {};
				config.sourcePoint = points;
				var point = {x: $locationObject.tempPoint.x, y: $locationObject.tempPoint.y};
				config.targetPoint = point;
				var sortPoints = tools.despatch(config);
				$locationObject.isMulti = $locationObject.tempIsMulit;
				$locationObject.control.point.cancel = $locationObject.tempCancleFunc;
				for(var i=0; i < sortPoints.length; i++) {
					if(showCount != null && showCount <= i) {
						break;
					}

					if(sortPoints[i].distance <= (searchBounds*1000)) {
						var pointStyle = style == null ? $locationObject.style : style;
						if(pointStyle != null) {
							sortPoints[i].point.width = pointStyle.width;
							sortPoints[i].point.height = pointStyle.height;
							sortPoints[i].point.pic = pointStyle.background;
						}
						$locationObject.setLocation(sortPoints[i].point);
					} else {
						break;
					}
				}
				var radius;
				if($locationObject.map.getUnits() == "degree") {
					radius = 1/102834.74258026089786013677476285*searchBounds*1000;
				} else if ($locationObject.map.getUnits() == "km") {
					radius = searchBounds;
				} else {
					radius = searchBounds*1000;
				}
				
				var circle = SuperMap.Geometry.Polygon.createRegularPolygon($locationObject.tempPoint, radius, 360, 0);
				var vector = new SuperMap.Feature.Vector(circle);
				$locationObject.vectorLayer.addFeatures(vector);
			}
			$locationObject.addPointEvent();
		} else {//否则计算与传入的事发地最近的调度点
			var pointStyle = style == null ? $locationObject.style : style;
			eventPoint.width = pointStyle.width;
			eventPoint.height = pointStyle.height;
			eventPoint.pic = pointStyle.background;
			$locationObject.setLocation(eventPoint);
			var config = {
				targetPoint:eventPoint,
				sourcePoint:points
			}
			var sortPoints = tools.despatch(config);
			for(var i=0; i < sortPoints.length; i++) {
				if(showCount != null && showCount <= i) {
					break;
				}

				if(sortPoints[i].distance <= (searchBounds*1000)) {
					var pointStyle = style == null ? $locationObject.style : style;
					if(pointStyle != null) {
						sortPoints[i].point.width = pointStyle.width;
						sortPoints[i].point.height = pointStyle.height;
						sortPoints[i].point.pic = pointStyle.background;
					}
					$locationObject.setLocation(sortPoints[i].point);
				} else {
					break;
				}
			}
			var radius;
			if($locationObject.map.getUnits() == "degree") {
				radius = 1/102834.74258026089786013677476285*searchBounds;
			} else if ($locationObject.map.getUnits() == "km") {
				radius = 1000*searchBounds;
			} else {
				radius = searchBounds;
			}
			
			var circle = SuperMap.Geometry.Polygon.createRegularPolygon(new SuperMap.Geometry.Point(eventPoint.x, eventPoint.y), radius, 360, 0);
			var vector = new SuperMap.Feature.Vector(circle);
			$locationObject.vectorLayer.addFeatures(vector);
		}
	}

}