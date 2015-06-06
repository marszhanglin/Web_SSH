//ע�������ռ�
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
	 *@Param callback �ص�����
	 *@Description ����popup��
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
	 *@Description ����popup��
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
	 *@Description ���ͼ��Ҫ�ؽ������������״̬
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
	 *@Param config required ��ȡXML�����ò�������
	 *@Description ��ʼ��������ʼ��һЩȫ�ֵı���
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
	 *@Description ���
	 */
	this.addPointEvent = function() {
		$locationObject.control.point.activate();
	}

	/**
	 *@Title setLocation
	 *@Author Link
	 *@Date 2014-1-15
	 *@Param point required GPS�������{i:id,n:name,x:����,y:ά��,z:�߶�}
	 *@Param point.width point.height point.pic �����ʽ�����û���������Ĭ��ʹ�ù���ʱ�������ļ��е���ʽ�����ȫ��û��ָ��ʹ��supermapĬ����ʽ����ʽ�������supermap API
	 *@Description ��λ���ܴ��������������
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
	 *@Param data required �����json��ʽ���� [{i:id,n:name,x:����,y:ά��,z:�߶�},{i:id,n:name,x:����,y:ά��,z:�߶�}]
	 *@Param interval required �����ʱ�� int���� ��λ����
	 *@Param lineStyle 2��֮�����ߵ���ʽ�����û��ָ��ʹ��supermapĬ����ʽ����ʽ�������supermap API
	 *@Param pointStyle �����ʽ�����û���������Ĭ��ʹ�ù���ʱ�������ļ��е���ʽ�����ȫ��û��ָ��ʹ��supermapĬ����ʽ����ʽ�������supermap API
	 *@Description �켣�طŹ��ܣ�ͨ������һ��GPS����Ϊ��ͼ�������
	 */
	this.gradualLocationEvent = function(data, interval, lineStyle, pointStyle) {
		//���Ƚ���Ļ��λ����Ҫ�켣�طŵĵ�ͼ��Χ��
		var multiPoint = new SuperMap.Geometry.MultiPoint();
		for(var i = 0; i < data.length; i++) {
			multiPoint.addPoint(new SuperMap.Geometry.Point(data[i].x, data[i].y));
		}
		$locationObject.map.zoomToExtent(multiPoint.getBounds(),false);
		//Ϊ��������������������ͨ��ʱ������
		data.sort(function(a, b) {
			return new Date(a.t.replace(/\-/g, "/"))-new Date(b.t.replace(/\-/g, "/"));
		});
		//ͨ������ļ��ʱ�䶨ʱ�������ͻ��߷���
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
	 *@Param points ȫ����Ҫ��ѯ�ĵ��ȵ�
	 *@Param searchBounds ��ѯ���ʰ뾶 ��λǧ��
	 *@Param showCount ��ʾ��Χ�����������ĸ���
	 *@Param eventPoint �·��㣬���û�д����򼤻���������ͨ������������������ĵ��ȵ�
	 *@Param style �����ʽ����ͼ�ꡢ��ȡ��߶�
	 *@Description �������·��������Χ�ڵĵ��ȵ�
	 */
	$locationObject.dispatchEvent = function (points,searchBounds,showCount,eventPoint,style) {
		var tools = new evecomgis.gisimpl.supermap.base.Tools();
		if(eventPoint == null) {//����û�д����·��ص����ʾ�·���ͨ���û��ֶ����ʵ��
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
		} else {//��������봫����·�������ĵ��ȵ�
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