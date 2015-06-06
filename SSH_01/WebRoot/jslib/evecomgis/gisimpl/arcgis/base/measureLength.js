Namespace.register("evecomgis.gisimpl.arcgis.base");

evecomgis.gisimpl.arcgis.base.MeasureLength = function (monitor) {
    dojo.require("esri.toolbars.draw");
    dojo.require("esri.tasks.geometry");
    dojo.require("esri.dijit.Popup");
    esri.config.defaults.io.proxyUrl = "/proxy";
    esri.config.defaults.io.alwaysUseProxy = false;
    var $measureLengthObj = this;
    this.monitor = monitor;
	this.map;
    this.graphic;
    this.geometryService;
    this.pointArray = new Array();
    this.mapClickHandler;
    this.totalDistace;
    this.popupArray = new Array();
	this.mapClickHandler;
	this.mapDownHandler;
	this.mapUpHandler;
	this.lineType;
	this.autoClear = true;
	this.markerSymbol;
	this.graphicLayer = new Array();
	this.pointLayerArray = new Array();

	this.distance = function (evt) {
		var inPoint = new esri.geometry.Point(evt.mapPoint.x, evt.mapPoint.y, $measureLengthObj.map.spatialReference);
		
		var startLoc = new esri.Graphic(evt.mapPoint, $measureLengthObj.markerSymbol);
		$measureLengthObj.pointLayerArray.push(startLoc);
        $measureLengthObj.map.graphics.add(startLoc);
		
		
		$measureLengthObj.pointArray.push(inPoint);
		if($measureLengthObj.pointArray.length <= 1)
			return;
		var distParams = new esri.tasks.DistanceParameters();
		distParams.geometry1 = $measureLengthObj.pointArray[$measureLengthObj.pointArray.length - 2];
		distParams.geometry2 = $measureLengthObj.pointArray[$measureLengthObj.pointArray.length - 1];
		distParams.geodesic = true;
		
		$measureLengthObj.geometryService.distance(distParams, function (d) {
			var point = $measureLengthObj.pointArray[$measureLengthObj.pointArray.length-1];
			var popup = new esri.dijit.Popup({marginLeft:0,marginTop:0}, dojo.create("div"));
			var content = "";
			$measureLengthObj.totalDistace = (parseFloat($measureLengthObj.totalDistace) + parseFloat(d)).toFixed(1);
			if(d/1000 < 0.1) {
			    content += d.toFixed(1)+"M("
			} else {
			    content += (d/1000).toFixed(1)+"KM("
			}
			
			if(($measureLengthObj.totalDistace/1000) < 0.1) {
			    content += $measureLengthObj.totalDistace + "M)";
			} else {
			    content += ($measureLengthObj.totalDistace/1000).toFixed(1) + "KM)";
			}
			dojo.addClass(popup.domNode, "myTheme");
			popup.resize(140,0);
			popup.setMap($measureLengthObj.map);
			popup.setTitle(content);
			popup.show(point);
			$measureLengthObj.popupArray.push(popup);
		});
	}
    
    this.init = function (config) {
        $measureLengthObj.monitor.removeAllMonitor();
        $measureLengthObj.map = config.map;
		$measureLengthObj.lineType = config.lineType;
		$measureLengthObj.autoClear = config.autoClear == null ? true : config.autoClear == "true" ? true : false;
		
		$measureLengthObj.markerSymbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 5, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0, 0.5]), 6), new dojo.Color([255, 0, 0, 0.9]));
		
		$measureLengthObj.graphic = new evecomgis.gisimpl.arcgis.base.Graphic();
		$measureLengthObj.graphic.init(config);
		$measureLengthObj.graphic.tb.on("draw-end",function (evt){
		    $measureLengthObj.monitor.removeAllMonitor();
		    $measureLengthObj.graphicLayer.push($measureLengthObj.graphic.graphic);
		});
		$measureLengthObj.geometryService = new esri.tasks.GeometryService(config.url);
		$measureLengthObj.pointArray = new Array();
		$measureLengthObj.totalDistace = 0;
		$measureLengthObj.popupArray = new Array();
    }

	this.activeMeasure = function (lineType) {
		$measureLengthObj.restore();
		if($measureLengthObj.lineType == "01") {
		    $measureLengthObj.mapClickHandler = $measureLengthObj.monitor.addMonitor("$measureClickHandler", "onClick", $measureLengthObj.map, $measureLengthObj.distance);
		} else if($measureLengthObj.lineType == "02") {
		    $measureLengthObj.mapDownHandler = $measureLengthObj.monitor.addMonitor("$measureDownHandler", "onMouseDown", $measureLengthObj.map, $measureLengthObj.distance);
			$measureLengthObj.mapUpHandler = $measureLengthObj.monitor.addMonitor("$measureUpHandler", "onMouseUp", $measureLengthObj.map, $measureLengthObj.distance);
		}
		if(lineType == null) {
			$measureLengthObj.graphic.changeType($measureLengthObj.lineType == "02" ? "freehandpolyline" : "polyline");
		} else {
			$measureLengthObj.graphic.changeType(lineType == "02" ? "freehandpolyline" : "polyline");
		}
		
	}

	this.restore = function (isClear) {
	    $measureLengthObj.monitor.removeAllMonitor();
        if($measureLengthObj.graphic != null && isClear == true) {
        	for(var i=0; i < $measureLengthObj.graphicLayer.length; i++) {
        		$measureLengthObj.map.graphics.remove($measureLengthObj.graphicLayer[i]);
        	}
        	
            if($measureLengthObj.popupArray != null) {
                for(var i=0; i < $measureLengthObj.popupArray.length; i++) {
                    $measureLengthObj.popupArray[i].destroy();
                }
            }
            $measureLengthObj.popupArray.length = 0;
            
            for(var i=0; i < $measureLengthObj.pointLayerArray.length; i++) {
                $measureLengthObj.map.graphics.remove($measureLengthObj.pointLayerArray[i]);
            }
            $measureLengthObj.pointLayerArray.length = 0;
        }
		$measureLengthObj.pointArray.length = 0;
		$measureLengthObj.totalDistace = 0;
		$measureLengthObj.graphic.disableDraw();
	}
	
}
