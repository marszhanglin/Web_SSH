//注册命名空间
Namespace.register("evecomgis.gisimpl.arcgis.base");
/**
 * @Title evecomgis.gisimpl.arcgis.base.InitArcGisMap
 * @Param  config  包含如下属性
 *  map 地图对象
 *  drawType 图形类型（Line：线，Polyline：多端线，FreehandPolyline：自由线段，Triangle：三角形,Extent：矩形,Circle：圆圈,Ellipse：椭圆,Polygon：多边形，FreehandPolygon：自由多边形）
 *  lineStyle 线条样式  参数(solid:实线,dash：虚线，dashdot：虚线加点,dashdotdot：线段加两点,dot：点,longdot:长虚线,longdashdot:长虚线加点,null：无,shortdash:断虚线,shortdashdot:短虚线加点,shortdashdotdot:短间隔点,shortdot:短点)
 *  color 颜色（形式如"#FF0000",或者RGB类型"rgb(50,40,30)",RGB增加透明度"rgba(50,40,30,0.25)"透明度值范围是0到1,或颜色英文"blue")
 *  width 线的宽度
 *  cap  线端样式(butt:截头,round:圆端,square:平方)
 *  join 转折处样式(bevel:斜角,miter:斜角加圆角,round:圆角)
 *  fillColor 图形填充颜色（形式如"#FF0000",或者RGB类型"rgb(50,40,30)",RGB增加透明度"rgba(50,40,30,0.25)"透明度值范围是0到1,或颜色英文"blue")
 *  imagePath 图形填充图片路径
 *  markImgage 标志物图片路径
 *  markWidth  标志物图片宽度
 *  markHeight 标志物图片高度
 *  startStyle 绘图时线的样式
 *  startColor 绘图时线的颜色
 *  startWidth 绘图时线的宽度
 * @Description 图形绘制
 * @author Hubert
 * @Date 2013-12-16
 */
evecomgis.gisimpl.arcgis.base.Graphic = function() {
	
	var $GraphicObject=this;
	//地图对象
	this.map;
	//图层对象
	this.graphic;
	//画图工具
	this.tb;
	//绘图类型
    this.drawType;
	//样式
	this.lineStyle;
    //颜色
	this.color;
	//宽度
	this.width;
	this.startStyle;
	this.startColor;
	this.startWidth;
	//线端样式
	this.cap;
	//转折处样式
	this.join;
	//填充图形颜色
	this.fillColor;
	//填充图片路径
	this.imagePath;
	//标志物图片
	this.markImage;
	//标志物宽度
	this.markWidth;
	//标志物高度
	this.markHeight;
	//标志物
	this.markerSymbol;
	//线
	this.lineSymbol;
	//填充物
	this.fillSymbol;
	this.pictureFillSymbol;
	
	//自定义图层
	this.customGraphicLayer;

	var graphicArr = [];
	
    dojo.require("esri.map");
    dojo.require("esri.geometry.Point");
    dojo.require("esri.toolbars.draw");
    dojo.require("esri.symbols.SimpleMarkerSymbol");
    dojo.require("esri.symbols.SimpleLineSymbol");
    dojo.require("esri.symbols.PictureFillSymbol");
    dojo.require("esri.symbols.CartographicLineSymbol");
    dojo.require("esri.graphic");
    dojo.require("esri.geometry");
    dojo.require("esri.InfoTemplate");
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
	
	    $GraphicObject.drawType=config.drawType;
		//画图工具
		$GraphicObject.tb = new esri.toolbars.Draw(config.map);
		
		//样式
		$GraphicObject.lineStyle=config.lineStyle==null?"solid":config.lineStyle;
	    //颜色
		$GraphicObject.color=config.color==null?"black":config.color;
		//宽度
		$GraphicObject.width=config.width==null?2:config.width;
		//画图时线的样式
		$GraphicObject.startStyle=config.startStyle==null?"solid":config.startStyle;
		//画图时线的颜色
		$GraphicObject.startColor=config.startColor==null?"#FF0000":config.startColor;
		//画图时线的宽度
		$GraphicObject.startWidth=config.startWidth==null?2:config.startWidth;
		//线端样式
		$GraphicObject.cap=config.cap==null?"round":config.cap;
		//转折处样式
		$GraphicObject.join=config.join==null?"round":config.join;
		//填充图形颜色
		$GraphicObject.fillColor=config.fillColor||"rgba(255,255,0,0.25)";
		//填充图片路径
		$GraphicObject.imagePath=config.imagePath;
		//标志物图片
		$GraphicObject.markImage=config.markImage|| $_root_path + "/jslib/evecomgis/common/image/event_ssbb.png";
		//标志物宽度
		$GraphicObject.markWidth=config.markWidth||15;
		//标志物高度
		$GraphicObject.markHeight=config.markHeight||15;
		//线的属性
	    $GraphicObject.lineSymbol = new esri.symbols.CartographicLineSymbol(
	      $GraphicObject.lineStyle,
	      $GraphicObject.color,
		  $GraphicObject.width,
	      $GraphicObject.cap,
	      $GraphicObject.join,5
	    );
		//定义填充形状属性(图片填充)
	   $GraphicObject.pictureFillSymbol = new esri.symbols.PictureFillSymbol(
		  	$GraphicObject.imagePath,
		  	new esri.symbols.SimpleLineSymbol(
		    $GraphicObject.lineStyle,
		    $GraphicObject.color,
		    $GraphicObject.width
		  ), 
		  0, 
		  0
		);
	   //定义填充形状属性
	   $GraphicObject.fillSymbol = new esri.symbol.SimpleFillSymbol(
		   	esri.symbol.SimpleFillSymbol.STYLE_SOLID,
 			new esri.symbol.SimpleLineSymbol(
 			$GraphicObject.lineStyle,
 			$GraphicObject.color,
 			$GraphicObject.width),
 			$GraphicObject.fillColor);
	   
	   //定义标志物
	   $GraphicObject.markerSymbol=new esri.symbol.PictureMarkerSymbol($GraphicObject.markImage,$GraphicObject.markWidth,$GraphicObject.markHeight);
	   
	   //画图时线的属性
	    $GraphicObject.startLineSymbol = new esri.symbols.CartographicLineSymbol(
	      $GraphicObject.startStyle,
	      $GraphicObject.startColor,
		  $GraphicObject.startWidth,
	      "round",
	      "round",5
	    );
	   //定义画图时线的样式
	   $GraphicObject.tb.setLineSymbol($GraphicObject.startLineSymbol);
	   //定义绘画结束事
	   $GraphicObject.tb.on("draw-end",$GraphicObject.addGraphic);
	   
	   
    }
    //绘画结束地图增加图形
    this.addGraphic=function(evt) {

      $GraphicObject.tb.deactivate();
     
      $GraphicObject.map.enableMapNavigation();

      var symbol;
      if ( evt.geometry.type === "point" || evt.geometry.type === "multipoint") {
        symbol = $GraphicObject.markerSymbol;
      } else if ( evt.geometry.type === "line" || evt.geometry.type === "polyline") {
        symbol = $GraphicObject.lineSymbol;
      }
      else {
    	  if($GraphicObject.imagePath==undefined||$GraphicObject.imagePath==="")
        	symbol = $GraphicObject.fillSymbol;
    	  else
    		symbol = $GraphicObject.pictureFillSymbol;
      }
      $GraphicObject.graphic=new esri.Graphic(evt.geometry, symbol);
      graphicArr.push($GraphicObject.graphic);
      
      if($GraphicObject.customGraphicLayer != null) {
		  $GraphicObject.customGraphicLayer.add($GraphicObject.graphic);
	  } else {
		  $GraphicObject.map.graphics.add($GraphicObject.graphic);
	  }
      
      
	}
    
    //重新定义线的样式
    this.setLine=function(lineConfig){
    	
		$GraphicObject.lineStyle=lineConfig.lineStyle||$GraphicObject.lineStyle;
		$GraphicObject.color=lineConfig.color||$GraphicObject.color;
		$GraphicObject.width=lineConfig.width||$GraphicObject.width;
		$GraphicObject.cap=lineConfig.cap||$GraphicObject.cap;
		$GraphicObject.join=lineConfig.join||$GraphicObject.join;
		$GraphicObject.lineSymbol=new esri.symbols.CartographicLineSymbol(
	    $GraphicObject.lineStyle,
	    $GraphicObject.color,
		$GraphicObject.width, 
	    $GraphicObject.cap,
	    $GraphicObject.join, 5
	   );
    }
    //重新定义标志物
    this.setMarkSymbol=function(markConfig){
    	$GraphicObject.markImage=markConfig.markImage||$GraphicObject.markImage;
    	$GraphicObject.markWidth=markConfig.markWidth||$GraphicObject.markWidth;
    	$GraphicObject.markHeight=markConfig.markHeight||$GraphicObject.markHeight;
    	$GraphicObject.markerSymbol=new esri.symbol.PictureMarkerSymbol($GraphicObject.markImage,$GraphicObject.markWidth,$GraphicObject.markHeight);
    }
    
    //重新定义填充物的样式
    this.setfillSymbol=function(fillConfig){
    	//线条样式
		$GraphicObject.lineStyle=fillConfig.lineStyle||$GraphicObject.lineStyle;
	    //线条颜色
		$GraphicObject.color=fillConfig.color||$GraphicObject.color;
		//线条宽度
		$GraphicObject.width=fillConfig.width||$GraphicObject.width;
		//填充颜色
		$GraphicObject.fillColor=fillConfig.fillColor||$GraphicObject.fillColor;
		//填充图片
		$GraphicObject.imagePath=fillConfig.imagePath||$GraphicObject.imagePath;
		if($GraphicObject.imagePath==undefined||$GraphicObject.imagePath===""){
			
			$GraphicObject.fillSymbol = new esri.symbol.SimpleFillSymbol(
		   	esri.symbol.SimpleFillSymbol.STYLE_SOLID,
 			new esri.symbol.SimpleLineSymbol(
 			$GraphicObject.lineStyle,
 			$GraphicObject.color,
 			$GraphicObject.width),
 			$GraphicObject.fillColor);
		}else{
			
			$GraphicObject.pictureFillSymbol=new esri.symbols.PictureFillSymbol(
			  $GraphicObject.imagePath,
			  new esri.symbols.SimpleLineSymbol(
			  $GraphicObject.lineStyle,
			  $GraphicObject.color,
			  $GraphicObject.width
			  ), 
			  0, 
			  0
			);
		}
		
    }
    /**
     * 重新定义画图时线的样式
     * @param startLineConfig
     * startStyle 线的样式
     * startColor 线的颜色
     * startWidth 线的宽度
     */
    this.setStartLineSymbol=function(startLineConfig){
		$GraphicObject.startStyle=startLineConfig.startStyle||$GraphicObject.startStyle;
		$GraphicObject.startColor=startLineConfig.startColor||$GraphicObject.startColor;
		$GraphicObject.startWidth=startLineConfig.startWidth||$GraphicObject.startWidth;
		$GraphicObject.startLineSymbol = new esri.symbols.CartographicLineSymbol(
	      $GraphicObject.startStyle,
	      $GraphicObject.startColor,
		  $GraphicObject.startWidth,
	      "round",
	      "round",5
	    );
    	
    }
    //根据坐标在地图上画点
    this.addPoint=function(x,y){
    	
    	var point=new esri.geometry.Point(x, y ,$GraphicObject.map.spatialReference);
		var graphic = new esri.Graphic(point, $GraphicObject.markerSymbol);
		graphicArr.push(graphic);
		
		if($GraphicObject.customGraphicLayer != null) {
			$GraphicObject.customGraphicLayer.add(graphic);
		} else {
			$GraphicObject.map.graphics.add(graphic);
		}
    	
    	
    }
	//改变绘图样式方法
	this.changeType=function(drawType, layer){
		if(layer != null) {
			if($GraphicObject.map.getLayer(layer.id) == null) {
				$GraphicObject.map.addLayer(layer);
			}
			$GraphicObject.customGraphicLayer = layer;
		}
		var tool1 = drawType.toLowerCase(); 
	    $GraphicObject.map.disableMapNavigation();
	    $GraphicObject.tb.activate(tool1);
           
	}
	
	//两点间画线
	this.pointToPoint=function(startX,startY,endX,endY,graphicLayer){
		
		$GraphicObject.tb.deactivate(); 
		
	    $GraphicObject.map.enableMapNavigation();
		var myGeometry=new esri.geometry.Polyline();
		var aa=new Array();//定义两点坐标数组
		aa[0]=new  Array();
		aa[1]=new  Array();
		aa[0][0]=startX;
		aa[0][1]=startY;
		aa[1][0]=endX;
		aa[1][1]=endY;
		myGeometry.paths[0]=aa;
		myGeometry.type ="polyline";
		
		var graphic = new esri.Graphic(myGeometry,$GraphicObject.lineSymbol);
		graphicArr.push(graphic);
		if(graphicLayer == null) {
			$GraphicObject.map.graphics.add(graphic);
		} else {
			graphicLayer.add(graphic);
		}
		
	}
	//画缓冲区
	this.circleArea=function(object){
		$GraphicObject.tb.deactivate(); 
	    $GraphicObject.map.enableMapNavigation();
	    var myGeometry=new esri.geometry.Polygon();
	    myGeometry.paths[0]=object;
		myGeometry.type ="polygon";

		var graphic = new esri.Graphic(myGeometry,$GraphicObject.lineSymbol);
		graphicArr.push(graphic);
		if($GraphicObject.customGraphicLayer != null) {
			$GraphicObject.customGraphicLayer.add(graphic);
		} else {
			$GraphicObject.map.graphics.add(graphic);
		}
	}
	
	//地图清除图层
	this.resetMap=function(isclear){
		if(isclear){
			for(var i=0;i<graphicArr.length;i++){
				$GraphicObject.map.graphics.remove(graphicArr[i]);
			}
			graphicArr = [];
			
			if($GraphicObject.customGraphicLayer != null) {
				$GraphicObject.customGraphicLayer.clear();
			}
		}
		$GraphicObject.tb.deactivate();
		$GraphicObject.map.enableMapNavigation();
		 //map.graphics.clear();
        
	}
	//禁用画图
	this.disableDraw=function (){
		
		$GraphicObject.tb.deactivate();
		$GraphicObject.map.enableMapNavigation();
	}
	
	//通过数据库存储的点画图形
	this.drawGraphic = function (jsonString, layerId) {
		if($GraphicObject.map.getLayer(layerId) == null) {
			$GraphicObject.map.addLayer(new esri.layers.GraphicsLayer({id:layerId}));
		}
		
		var polygonJson  = {"rings":eval(jsonString),"spatialReference":{"wkid":$GraphicObject.map.spatialReference}};
		var polygon = new esri.geometry.Polygon(polygonJson);
		var symbol = $GraphicObject.fillSymbol;
		$GraphicObject.graphic=new esri.Graphic(polygon, symbol);
	    graphicArr.push($GraphicObject.graphic);
	    $GraphicObject.map.getLayer(layerId).add($GraphicObject.graphic);
	}
}
