//注册命名空间
Namespace.register("evecomgis.gisimpl.supermap.base");

/**
 *@Title evecomgis.gisimpl.supermap.base.Query
 *@Author Link
 *@Date 2014-01-13
 *@Description 范围查询
 */
evecomgis.gisimpl.supermap.base.Query = function() {
    var $supermapQuery = this;
    //矢量图层
    this.vectorLayer;
    //标记图层
    this.markerLayer;
    //popup框
    this.infowin;
    //样式
    this.style;
    //配置对象
    this.config;
    //矩形对象
    this.drawRectangle;
    //控制器
    this.control;
    //地图对象
    this.map;
    //多边形对象
    this.drawPolygon;
    //圆形对象
    this.drawCircle;
	//结果列表集合
	this.arrayList;

    this.init = function(config) {
        if (config == null) {
            alert("配置对象为空无法初始化查询控件");
            return;
        }

        if (config.map == null) {
            alert("地图对象为空无法初始化查询控件");
            return;
        }

        if (config.queryLayerUrl == null || config.queryLayerUrl.length == 0) {
            alert("查询图层地址为空无法初始化查询控件");
            return;
        }

        if (config.queryLayerSet == null || config.queryLayerSet.length == 0) {
            alert("查询图层数据集为空无法初始化查询控件");
            return;
        }

		$("#messages").css("left", config.map.div.offsetWidth - $("#messages").width()-14);
		$("#messages").css("height", config.map.div.offsetHeight - 19);
		$("#info").css("height", $("#messages").height()-30);
		
        $supermapQuery.config = config;
        $supermapQuery.map = config.map;
		$supermapQuery.arrayList = new Array();
        //新建一个vectorLayer的矢量图层
        $supermapQuery.vectorLayer = new SuperMap.Layer.Vector("Query Vector Layer");
        //创建一个有标签的图层
        $supermapQuery.markerLayer = new SuperMap.Layer.Markers("Query Markers");
        $supermapQuery.map.addLayer($supermapQuery.vectorLayer);
        $supermapQuery.map.addLayer($supermapQuery.markerLayer);
        $supermapQuery.style = {
            strokeColor : "#304DBE",
            strokeWidth : 1,
            pointerEvents : "visiblePainted",
            fillColor : "#304DBE",
            fillOpacity : 0.3
        };
    }
    
    //矩形操作成功回调函数
    this.processCompleted = function(queryEventArgs) {
        var i, j, result = queryEventArgs.result, marker, id, name, x, y;
        //queryEventArgs服务端返回的对象
        var iconUrl = $supermapQuery.config.iconUrl == null ? "/ecssp/jslib/evecomgis/common/supermaplib/theme/images/marker.png" : $supermapQuery.config.iconUrl;
        var width = $supermapQuery.config.iconWidth == null ? 44 : parseInt($supermapQuery.config.iconWidth);
        var height = $supermapQuery.config.iconHeight == null ? 33 : parseInt($supermapQuery.config.iconHeight);
        if (result && result.recordsets) {
            for ( i = 0, recordsets = result.recordsets, len = recordsets.length; i < len; i++) {
                if(Object.prototype.toString.call($supermapQuery.config.queryLayerSet) === '[object Array]') {
                    for(var k=0; k < $supermapQuery.config.queryLayerSet.length; k++) {
                        if(recordsets[i].datasetName == $supermapQuery.config.queryLayerSet[k].layerName) {
                            id = $supermapQuery.config.queryLayerSet[k].attrId;
                            name = $supermapQuery.config.queryLayerSet[k].attrName;
                            x = $supermapQuery.config.queryLayerSet[k].attrX;
                            y = $supermapQuery.config.queryLayerSet[k].attrY;
                            break;
                        }
                    }
                } else {
                    id = $supermapQuery.config.queryLayerSet.attrId;
                    name = $supermapQuery.config.queryLayerSet.attrName;
                    x = $supermapQuery.config.queryLayerSet.attrX;
                    y = $supermapQuery.config.queryLayerSet.attrY;
                }
                if (recordsets[i].features) {
                    for ( j = 0; j < recordsets[i].features.length; j++) {
                        var f = recordsets[i].features[j];
                        var point = f.geometry, size = new SuperMap.Size(width, height), offset = new SuperMap.Pixel(-(size.w / 2), -size.h), icon = new SuperMap.Icon(iconUrl, size, offset);
                        marker = new SuperMap.Marker(new SuperMap.LonLat(point.x, point.y), icon);
                        marker.custom_id = f.attributes[id];
                        marker.custom_name = f.attributes[name];
                        marker.custom_x = f.attributes[x];
                        marker.custom_y = f.attributes[y];
                        marker.events.on({
                            "click" : $supermapQuery.openInfoWin,
                            "scope" : marker
                        });

						var o = {};
						o.i = f.attributes[id];
                        o.n = f.attributes[name];
                        o.x = f.attributes[x];
                        o.y = f.attributes[y];
						$supermapQuery.arrayList.push(o);
                        $supermapQuery.markerLayer.addMarker(marker);
                    }
                }
				$supermapQuery.showList();
            }
        }
    }
    //矩形操作失败调用回调函数
    this.processFailed = function(e) {
        alert(e.error.errorMsg);
    }

    this.openInfoWin = function() {
        $supermapQuery.closeInfoWin();
        var marker = this;
        var lonlat = marker.getLonLat();
		var contentHTML;
		if($supermapQuery.config.callback != null) {
			var objectValue = {};
			objectValue.id = marker.custom_id;
			objectValue.name = marker.custom_name;
			objectValue.x = marker.custom_x;
			objectValue.y = marker.custom_y;
			var callback = $supermapQuery.config.callback+"(objectValue)";
			contentHTML = eval(callback);
		} else {
			contentHTML = "<div style='font-size:.8em; opacity: 0.8; overflow-y:hidden;'>";
			contentHTML += "<div>ID:" + marker.custom_id + "<br>名称：" + marker.custom_name + "<br>x:" + marker.custom_x + "<br>y:" + marker.custom_y + "</div></div>";
		}
        
        
        var popup = new SuperMap.Popup.FramedCloud("popwin", new SuperMap.LonLat(lonlat.lon, lonlat.lat), null, contentHTML, null, true);

        $supermapQuery.infowin = popup;
        $supermapQuery.map.addPopup(popup);
    }
    //关闭popup框
    this.closeInfoWin = function() {
        if ($supermapQuery.infowin) {
            try {
                $supermapQuery.infowin.hide();
                $supermapQuery.infowin.destroy();
            } catch(e) {
            }
        }
    }
    //清除查询结果
    this.doUnActivity = function(isClear) {
		var clear = isClear!=null ? isClear : $supermapQuery.config.autoClear;
        if(clear!=null) {
			$supermapQuery.vectorLayer.removeAllFeatures();
			$supermapQuery.markerLayer.clearMarkers();
		}
        $supermapQuery.closeInfoWin();
        if ($supermapQuery.control != null) {
            $supermapQuery.control.box.deactivate();
        }

        if ($supermapQuery.drawPolygon != null) {
            $supermapQuery.drawPolygon.deactivate();
        }

        if ($supermapQuery.drawCircle != null) {
            $supermapQuery.drawCircle.deactivate();
        }
		$supermapQuery.arrayList.length = 0;
		$("#messages").css("display","none");
    }
    //矩形
    this.drawRectangleCompleted = function() {
        //先清除上次的显示结果
        $supermapQuery.doUnActivity(true);
        if($supermapQuery.control == null) {
			$supermapQuery.control = new SuperMap.Control();
			SuperMap.Util.extend($supermapQuery.control, {//Util工具类   extend指的是将复制所有的属性的源对象到目标对象
				draw : function() {
					this.box = new SuperMap.Handler.Box($supermapQuery.control, {
						"done" : this.notice
					});
					//此句是创建一个句柄，Box是一个处理地图拖放一个矩形的事件，这个矩形显示是开始于在按下鼠标，然后移动鼠标，最后完成在松开鼠标。
					//this.box.boxDivClassName = "qByBoundsBoxDiv";//boxDivClassName用于绘制这个矩形状的图形
					//激活句柄
					this.box.activate();
				},
				//将拖动的矩形显示在地图上
				notice : function(bounds) {
					this.box.deactivate();
					//处理关闭激活句柄

					var ll = $supermapQuery.map.getLonLatFromPixel(new SuperMap.Pixel(bounds.left, bounds.bottom)), //getLonLatFromPixel从视口坐标获得地理坐标
					ur = $supermapQuery.map.getLonLatFromPixel(new SuperMap.Pixel(bounds.right, bounds.top));
					queryBounds = new SuperMap.Bounds(ll.lon, ll.lat, ur.lon, ur.lat);

					var feature = new SuperMap.Feature.Vector();
					feature.geometry = queryBounds.toGeometry(), feature.style = $supermapQuery.style;
					$supermapQuery.vectorLayer.addFeatures(feature);

					var queryParam, queryByBoundsParams, queryService, queryParamArray;
					queryParamArray = new Array();
					if (Object.prototype.toString.call($supermapQuery.config.queryLayerSet) === '[object Array]') {//如果为多个参数即为数组的时候
						for (var i = 0; i < $supermapQuery.config.queryLayerSet.length; i++) {
							queryParam = new SuperMap.REST.FilterParameter({
								name : $supermapQuery.config.queryLayerSet[i].layerName
							});
							//FilterParameter设置查询条件，name是必设的参数，（图层名称格式：数据集名称@数据源别名）
							queryParamArray.push(queryParam);
						}
					} else {
						queryParam = new SuperMap.REST.FilterParameter({
							name : $supermapQuery.config.queryLayerSet.layerName
						});
						queryParamArray.push(queryParam);
					}

					queryByBoundsParams = new SuperMap.REST.QueryByBoundsParameters({
						queryParams : queryParamArray,
						bounds : queryBounds
					});
					//queryParams查询过滤条件参数数组。bounds查询范围
					queryService = new SuperMap.REST.QueryByBoundsService($supermapQuery.config.queryLayerUrl, {
						eventListeners : {
							"processCompleted" : $supermapQuery.processCompleted,
							"processFailed" : $supermapQuery.processFailed
						}
					});
					//向服务端传递参数，然后服务端返回对象
					queryService.processAsync(queryByBoundsParams);
				}
			});
			$supermapQuery.map.addControl($supermapQuery.control);
		} else {
			$supermapQuery.control.box.activate();
		}
    }

    this.drawCompleted = function(drawGeometryArgs) {
        var feature = new SuperMap.Feature.Vector();
        feature.geometry = drawGeometryArgs.feature.geometry, feature.style = $supermapQuery.style;
        $supermapQuery.vectorLayer.addFeatures(feature);

        var queryParam, queryByGeometryParameters, queryService, queryParamArray;
        queryParamArray = new Array();
        if (Object.prototype.toString.call($supermapQuery.config.queryLayerSet) === '[object Array]') {//如果为多个参数即为数组的时候
            for (var i = 0; i < $supermapQuery.config.queryLayerSet.length; i++) {
                queryParam = new SuperMap.REST.FilterParameter({
                    name : $supermapQuery.config.queryLayerSet[i].layerName
                });
                //FilterParameter设置查询条件，name是必设的参数，（图层名称格式：数据集名称@数据源别名）
                queryParamArray.push(queryParam);
            }
        } else {
            queryParam = new SuperMap.REST.FilterParameter({
                name : $supermapQuery.config.queryLayerSet.layerName
            });
            queryParamArray.push(queryParam);
        }
        queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters({
            queryParams : queryParamArray,
            geometry : drawGeometryArgs.feature.geometry,
            spatialQueryMode : SuperMap.REST.SpatialQueryMode.INTERSECT
        });
        queryService = new SuperMap.REST.QueryByGeometryService($supermapQuery.config.queryLayerUrl, {
            eventListeners : {
                "processCompleted" : $supermapQuery.processCompleted,
                "processFailed" : $supermapQuery.processFailed
            }
        });
        queryService.processAsync(queryByGeometryParameters);
        drawGeometryArgs.object.deactivate();
    }
    //激活几何查询对象
    this.doQuery = function(type) {
        $supermapQuery.doUnActivity(true);
        var drawType = type == null ? $supermapQuery.config.type : type;
        if (drawType == "01") {//矩形
            $supermapQuery.drawRectangleCompleted();
        } else if (drawType == "02") {//多边形
            if ($supermapQuery.drawPolygon == null) {
                $supermapQuery.drawPolygon = new SuperMap.Control.DrawFeature($supermapQuery.vectorLayer, SuperMap.Handler.Polygon);
                $supermapQuery.drawPolygon.events.on({
                    "featureadded" : $supermapQuery.drawCompleted
                });
                $supermapQuery.map.addControl($supermapQuery.drawPolygon);
                $supermapQuery.drawPolygon.activate();
            } else {
                $supermapQuery.drawPolygon.activate();
            }
        } else if (drawType == "03") {//圆形
            if ($supermapQuery.drawCircle == null) {
                $supermapQuery.drawCircle = new SuperMap.Control.DrawFeature($supermapQuery.vectorLayer, SuperMap.Handler.RegularPolygon, {
                    handlerOptions : {
                        sides : 50
                    }
                });
                $supermapQuery.drawCircle.events.on({
                    "featureadded" : $supermapQuery.drawCompleted
                });
                $supermapQuery.map.addControl($supermapQuery.drawCircle);
                $supermapQuery.drawCircle.activate();
            } else {
                $supermapQuery.drawCircle.activate();
            }
        }
    }

	//显示查询结果列表
	this.showList = function () {
		var html = "";
		$supermapQuery.arrayList.sort(function (a, b){
			return a.n.localeCompare(b.n);
		});
		for(var i=0; i < $supermapQuery.arrayList.length; i++) {
			var id = $supermapQuery.arrayList[i].i;
			var name = $supermapQuery.arrayList[i].n;
			var x = $supermapQuery.arrayList[i].x;
			var y = $supermapQuery.arrayList[i].y;
			html += "<div style='cursor:hand;margin-bottom:15px;'><a href='#' title='id:" + id + " x:" + x + " y:" + y + "' onclick='base.queryMapObject.showPoint(\"" + id + "\", \"" + name + "\", \"" + x + "\", \"" + y + "\");return false;'>" + $supermapQuery.arrayList[i].n + "</a></div>";
		}

		if($supermapQuery.arrayList.length == 0) {
			html += "<div style='color:red;font-size:17px;'>未查询到相关数据！</div>";
		}

		html = "<div>名称：<input id='_searchName' type='text' style='width:90px;' /><button onclick='base.queryMapObject.searchByName();'>查询</button></div>" + html;
		
		$("#info").html(html);
		$("#messages").css("display","block");
	}

	this.searchByName = function () {
		var name = $("#_searchName").val();
		$("#info div:gt(0)").each(function () {
			if($(this).html().indexOf(name) == -1) {
				$(this).remove();
			}
		});
	}


	//点击列表条目地图显示该条目所在地图位置并显示相关信息
	this.showPoint = function(i,n,x,y) {
		$supermapQuery.closeInfoWin();
		var contentHTML;
		if($supermapQuery.config.callback != null) {
			var objectValue = {};
			objectValue.id = i;
			objectValue.name = n;
			objectValue.x = x;
			objectValue.y = y;
			var callback = $supermapQuery.config.callback+"(objectValue)";
			contentHTML = eval(callback);
		} else {
			contentHTML = "<div style='font-size:.8em; opacity: 0.8; overflow-y:hidden;'>";
			contentHTML += "<div>ID:" + i + "<br>名称：" + n + "<br>x:" + x + "<br>y:" + y + "</div></div>";
		}
        var lonlat = new SuperMap.LonLat(x, y);
        var popup = new SuperMap.Popup.FramedCloud("popwin", lonlat, null, contentHTML, null, true);
		var scale = 0.002201549263350591;//1:100000比例参数
        $supermapQuery.infowin = popup;
        $supermapQuery.map.addPopup(popup);
		$supermapQuery.map.setCenter(lonlat);
		$supermapQuery.map.zoomToScale(scale,true);
	}
}
