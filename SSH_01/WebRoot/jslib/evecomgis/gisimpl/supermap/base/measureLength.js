Namespace.register("evecomgis.gisimpl.supermap.base");

function extend(subClass,superClass){

    var F = function(){};

    F.prototype = superClass.prototype;

    subClass.prototype = new F();

    subClass.prototype.constructor = subClass;

    subClass.superclass = superClass.prototype; //加多了个属性指向父类本身以便调用父类函数

    if(superClass.prototype.constructor == Object.prototype.constructor){

        superClass.prototype.constructor = superClass;

    }

}


/**
 * 测量类
 * 继承graphic类，并重写drawCompleted方法
 *
 *
 *
 */
evecomgis.gisimpl.supermap.base.MeasureLength = function (config) {
	config = config || {};
	//evecomgis.gisimpl.supermap.base.Graphic.call(this,config)
	//evecomgis.gisimpl.supermap.base.MeasureLength.prototype = evecomgis.gisimpl.supermap.base.Graphic.prototype;
	
    var $measureLengthObj = this;
	this.map;
	
	//设置测距是否重新测距
	var clear;
	
	//距离或者面积的总和
	this.totalDsitance = 0;
	
	//测量工具类
    var path;
    
    //测距的当前点
	var curentPoint;
	
	//提示框集合
	var popupArr = [];
	
	//测量服务的url地址
	var measureServiceUrl ;
	
	var pointStyle = {};
	var lineStyle = {};

	//画图类
	var graphicObj ;

	var vectorLayer;

	
    
    //初始化测量控制器
    this.initMeasure = function(){
    	var control = new SuperMap.Control();
		SuperMap.Util.extend(control, {
		    draw: function () {
		        path = new SuperMap.Handler.Path( control,
		            {
		            	"point": this.notice,
		            	"done" : this.doneEvent
		            });
		        //this.path.activate();
		    },
		    notice: function (evt) {
		    
		    	var config = pointStyle;
		    	if(!curentPoint){
		    		curentPoint = evt.clone();
		    		$measureLengthObj.addGraphic(curentPoint,config);
		    		return;
		    	}

				var points = [curentPoint,evt];
				var roadLine = new SuperMap.Geometry.LineString(points);
				
				
				var geometry = roadLine,
		            measureParam = new SuperMap.REST.MeasureParameters(geometry), /* MeasureParameters：量算参数类。 客户端要量算的地物间的距离或某个区域的面积*/
		            myMeasuerService = new SuperMap.REST.MeasureService(measureServiceUrl); //量算服务类，该类负责将量算参数传递到服务端，并获取服务端返回的量算结果
		        myMeasuerService.events.on({ "processCompleted": $measureLengthObj.measureComplete });
		
		        //对MeasureService类型进行判断和赋值，当判断出是LineString时设置MeasureMode.DISTANCE，否则是MeasureMode.AREA
		        if (geometry.CLASS_NAME.indexOf("LineString") > -1) {
		            myMeasuerService.measureMode = SuperMap.REST.MeasureMode.DISTANCE;
		        } else {
		            myMeasuerService.measureMode = SuperMap.REST.MeasureMode.AREA;
		        }
		        myMeasuerService.processAsync(measureParam); //processAsync负责将客户端的量算参数传递到服务端。
		        
		    	curentPoint = evt.clone();
		    	$measureLengthObj.addGraphic(curentPoint,config);
		    },
		    doneEvent : function(evt){
		    	var config = lineStyle;
		    	$measureLengthObj.addGraphic(evt,config);
		    	curentPoint = null;
		    	
		    	if(clear){
			    	$measureLengthObj.totalDsitance = 0;
			    	$measureLengthObj.map.removeControl(control);
					path.deactivate();
				}
		    }
		});
		$measureLengthObj.map.addControl(control);
    }

    
    /**
     * 初始化对象
     * config={map:map,url:'',pointStyle:{color:'#FFFFFF'},lineStyle:{color:'#FFFFFF'},clear:true}
     *
     */
    this.init = function (config) {
		
		if(config.graphicConfig){
			graphicObj = config.graphicConfig;
		}

    	clear = config.clear==undefined?true:config.clear ;

		measureServiceUrl = config.url;

        $measureLengthObj.map = config.map;
		
		vectorLayer = new SuperMap.Layer.Vector("meathvectorLayer");
		$measureLengthObj.map.addLayers([vectorLayer]);

		if(config.pointStyle){
			pointStyle = config.pointStyle;
		}
		
		if(config.lineStyle){
			lineStyle = config.lineStyle;
		}
		
		$measureLengthObj.initMeasure();
		
    }
    
	this.addGraphic = function(geometry,style){
		var layer = new SuperMap.Layer.Vector();
		layer.style = style;
		layer.geometry = geometry;
		vectorLayer.addFeatures(layer);
	}
    
	
	
	//设置量算参数，提交服务器
    this.drawCompleted = function(drawGeometryArgs){
       //获得图层几何对象
        var geometry = drawGeometryArgs.feature.geometry,
            measureParam = new SuperMap.REST.MeasureParameters(geometry), /* MeasureParameters：量算参数类。 客户端要量算的地物间的距离或某个区域的面积*/
            myMeasuerService = new SuperMap.REST.MeasureService(measureServiceUrl); //量算服务类，该类负责将量算参数传递到服务端，并获取服务端返回的量算结果
        myMeasuerService.events.on({ "processCompleted": $measureLengthObj.measureComplete });

        //对MeasureService类型进行判断和赋值，当判断出是LineString时设置MeasureMode.DISTANCE，否则是MeasureMode.AREA
        if (geometry.CLASS_NAME.indexOf("LineString") > -1) {
            myMeasuerService.measureMode = SuperMap.REST.MeasureMode.DISTANCE;
        } else {
        	curentPoint = geometry.getCentroid();
            myMeasuerService.measureMode = SuperMap.REST.MeasureMode.AREA;
        }
        myMeasuerService.processAsync(measureParam); //processAsync负责将客户端的量算参数传递到服务端。
    }
    
    //成功返回
    this.measureComplete = function(measureEventArgs) {
         var distance = measureEventArgs.result.distance,
            area = measureEventArgs.result.area,
            unit = measureEventArgs.result.unit;
            
        var contentHTML = "<div style=\'font-size:12px; opacity: 0.8; overflow-y:hidden;\'>"; 
        
        if (distance != -1) {
        	$measureLengthObj.totalDsitance += distance; 
        	var total = $measureLengthObj.totalDsitance;
        	
        	if(distance/1000 < 0.1) {
			    contentHTML += distance.toFixed(1)+"M("
			} else {
			    contentHTML += (distance/1000).toFixed(1)+"KM("
			}
			
			if((total/1000) < 0.1) {
			    contentHTML += total.toFixed(1) + "M)";
			} else {
			    contentHTML += (total/1000).toFixed(1) + "KM)";
			}
        } else if (area != -1) {
        	$measureLengthObj.totalDsitance += area; 
        	contentHTML += "<div>"+"量算结果"+ area + "平方米"+"</div>";
        }
        
        contentHTML += "</div>";
        
        if(curentPoint){
			var popup = new SuperMap.Popup.FramedCloud("popwin",new SuperMap.LonLat(curentPoint.x,curentPoint.y),null,contentHTML,null,true);
			popupArr.push(popup);    
			$measureLengthObj.map.addPopup(popup);
		}
    }
    
    //测距
    this.activeMeasure = function(){
    	$measureLengthObj.restore(clear);
    	path.activate();
    }
    
    this.setClear = function(isClear){
    	clear = isClear || true;
    }
    
    this.getClear = function(){
    	return clear;
    }
    
    //清空图层和popup
    this.restore = function (clean){
    	if(clean){
			vectorLayer.removeAllFeatures();
	    	//$measureLengthObj.resetMap();
	    	for(var i=0;i<popupArr.length;i++){
	    		$measureLengthObj.map.removePopup(popupArr[i]);
	    	}
	    	popupArr = [];
	    	
    		$measureLengthObj.totalDsitance = 0;
    	}
		path.deactivate();
    	
    }

	this.setGraphicObject = function(obj){
		graphicObj = obj;
	}

	this.getGraphicObject = function(){
		return graphicObj;
	}
	
	
}


//extend(evecomgis.gisimpl.supermap.base.MeasureLength,evecomgis.gisimpl.supermap.base.Graphic);
