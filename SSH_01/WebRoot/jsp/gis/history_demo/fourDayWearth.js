//气象网站描点
var layerid_now="layerid_now_350000"
  //判断set_imag_src图标
  function set_imag_src(fuzhouWeather_i_time){
	  var imag_src='';
	  switch (fuzhouWeather_i_time) {
						case "雨夹雪": 
							imag_src=rootPath+"/echart/demo/images/small/d06.gif";
							break;
						case "阵雪": 
							imag_src=rootPath+"/echart/demo/images/small/d16.gif";
							break;
						case "多云": 
							imag_src=rootPath+"/echart/demo/images/small/d01.gif";
							break;
						case "晴": 
							imag_src=rootPath+"/echart/demo/images/small/d00.gif";
							break;
						case "小雨": 
							imag_src=rootPath+"/echart/demo/images/small/d07.gif";
							break;
						case "阴": 
							imag_src=rootPath+"/echart/demo/images/small/d02.gif";
							break;
						case "阵雨": 
							imag_src=rootPath+"/echart/demo/images/small/d11.gif";
							break;
						case "小雪": 
							imag_src=rootPath+"/echart/demo/images/small/d08.gif";
							break;
						default: 
							imag_src=rootPath+"/echart/demo/images/small/d14.gif";
							break;
						} 
	  return imag_src;
  }

//输入条件查询，事件列表查询，地图描点
function searchWarnClick(province) {
	// 后台查询出信息列表
	$.ajax({
				url : rootPath + '/front/weather/fourDayWeatherData',
				data :{province : province},
				type : 'post',
				success : function(result) {
						// 关闭所有弹出窗口
						closeAllArtWin();
						 // 清除图层
						// clearLayer("warnLayer");  
						var fourDayWeatherData = result.fourDayWeatherData;
						var arr = new Array(); 
						// 若有取回对象
						if (fourDayWeatherData != null
								&& fourDayWeatherData.length != 0) {
							for (var i = 0; i < fourDayWeatherData.length; i++) { 
								var furl = "";
								if (fourDayWeatherData[i].stationlon_correction != null
										&& fourDayWeatherData[i].stationlat_correction != null) {
									
									furl=set_imag_src(fourDayWeatherData[i].weatherdesc12);  
									var warnObj = {
										id : layerid_now,
										url : furl,
										data : fourDayWeatherData[i],
										urlTypeName : fourDayWeatherData[i].weatherdesc12,
										lon : fourDayWeatherData[i].stationlon_correction,// 经度
										lat : fourDayWeatherData[i].stationlat_correction,// 纬度
										infoCallback : warnInfowWind
									};
									locationSamePoints_(warnObj);
									var point = base.locationObject
											.getPoint(
													fourDayWeatherData[i].stationlon_correction,
													fourDayWeatherData[i].stationlat_correction);
									arr.push(point);
									 } 
									/*if (arr.length > 0) {
										base.locationObject
												.setCenterAreaPoint(arr);
									}*/
								}
							mapzoom(5);
							centerToPoint(arr[arr.length-1]);
							} else {
							
								clearLayer(layerid_now);
						}
					}   
			});
}
//点击临时数据
var temp_evt;
function on_select(value){
// 关闭所有弹出窗口
closeAllArtWin();
var temp_data=temp_evt.graphic.attributes.data;
var weatherdesc="";
var image_url="";
var temperature_low="";
var temperature_high="";
var winddirdesc="";
var select_index=0;
switch (value) {
	case "24":
		image_url=set_imag_src(temp_data.weatherdesc24);
		temperature_low=temp_data.temperature24_low;
		temperature_high=temp_data.temperature24_high;
		winddirdesc=temp_data.winddirdesc24;
		weatherdesc=temp_data.weatherdesc24;
		select_index=0;
		break;
	case "36":
		image_url=set_imag_src(temp_data.weatherdesc36);
		temperature_low=temp_data.temperature24_low;
		temperature_high=temp_data.temperature24_high;
		winddirdesc=temp_data.winddirdesc36;
		weatherdesc=temp_data.weatherdesc36;
		select_index=1;
		break;
	case "48":
		image_url=set_imag_src(temp_data.weatherdesc48);
		temperature_low=temp_data.temperature48_low;
		temperature_high=temp_data.temperature48_high;
		winddirdesc=temp_data.winddirdesc48;
		weatherdesc=temp_data.weatherdesc48;
		select_index=2;
		break;
	case "60":
		image_url=set_imag_src(temp_data.weatherdesc60);
		temperature_low=temp_data.temperature48_low;
		temperature_high=temp_data.temperature48_high;
		winddirdesc=temp_data.winddirdesc60;
		weatherdesc=temp_data.weatherdesc60;
		select_index=3;
		break;
	case "72":
		image_url=set_imag_src(temp_data.weatherdesc72);
		temperature_low=temp_data.temperature72_low;
		temperature_high=temp_data.temperature72_high;
		winddirdesc=temp_data.winddirdesc72;
		weatherdesc=temp_data.weatherdesc72;
		select_index=4;
		break;
	case "84":
		image_url=set_imag_src(temp_data.weatherdesc84);
		temperature_low=temp_data.temperature72_low;
		temperature_high=temp_data.temperature72_high;
		winddirdesc=temp_data.winddirdesc84;
		weatherdesc=temp_data.weatherdesc84;
		select_index=5;
		break;
	case "96":
		image_url=set_imag_src(temp_data.weatherdesc96);
		temperature_low=temp_data.temperature96_low;
		temperature_high=temp_data.temperature96_high;
		winddirdesc=temp_data.winddirdesc96;
		weatherdesc=temp_data.weatherdesc96;
		select_index=6;
		break;
	case "108":
		image_url=set_imag_src(temp_data.weatherdesc108);
		temperature_low=temp_data.temperature96_low;
		temperature_high=temp_data.temperature96_high;
		winddirdesc=temp_data.winddirdesc108;
		weatherdesc=temp_data.weatherdesc108;
		select_index=7;
		break;
	case "120":
		image_url=set_imag_src(temp_data.weatherdesc120);
		temperature_low=temp_data.temperature120_low;
		temperature_high=temp_data.temperature120_high;
		winddirdesc=temp_data.winddirdesc120;
		weatherdesc=temp_data.weatherdesc120;
		select_index=8;
		break;
	case "132":
		image_url=set_imag_src(temp_data.weatherdesc132);
		temperature_low=temp_data.temperature120_low;
		temperature_high=temp_data.temperature120_high;
		winddirdesc=temp_data.winddirdesc132;
		weatherdesc=temp_data.weatherdesc132;
		select_index=9;
		break;
	case "144":
		image_url=set_imag_src(temp_data.weatherdesc144);
		temperature_low=temp_data.temperature144_low;
		temperature_high=temp_data.temperature144_high;
		winddirdesc=temp_data.winddirdesc144;
		weatherdesc=temp_data.weatherdesc144;
		select_index=10;
		break;
	case "156":
		image_url=set_imag_src(temp_data.weatherdesc156);
		temperature_low=temp_data.temperature144_low;
		temperature_high=temp_data.temperature144_high;
		winddirdesc=temp_data.winddirdesc156;
		weatherdesc=temp_data.weatherdesc156;
		select_index=11;
		break;
	case "168":
		image_url=set_imag_src(temp_data.weatherdesc168);
		temperature_low=temp_data.temperature168_low;
		temperature_high=temp_data.temperature168_high;
		winddirdesc=temp_data.winddirdesc168;
		weatherdesc=temp_data.weatherdesc168;
		select_index=12;
		break; 
	default:
		break;
	}  
		var div_html = '<div class="row" style="margin-bottom: 10px;">'
			+ '<img src="'+image_url+'" alt=""><span id="where_id" >'+temp_data.cityname+'</span>'
			+'<select name="" id="select_id" onchange="on_select(this.options[this.options.selectedIndex].value)" style="margin-left: 14px;">'
			+ '<option value="24">24小时</option>'
			+ '<option value="36">36小时</option>'
			+ '<option value="48">48小时</option>'
			+ '<option value="60">60小时</option>'
			+ '<option value="72">72小时</option>'
			+ '<option value="84">84小时</option>'
			+ '<option value="96">96小时</option>'
			+ '<option value="108">108小时</option>'
			+ '<option value="120">120小时</option>'
			+ '<option value="132">132小时</option>'
			+ '<option value="144">144小时</option>'
			+ '<option value="156">156小时</option>'
			+ '<option value="168">168小时</option>'
			+ '</select></div><div class="row">'+weatherdesc+'</div>'
			+ '<div class="row">'+temperature_low+'℃ ~ '+temperature_high+'℃</div>'
			+ '<div class="row">微风</div>';
	openPopup(
			temp_evt,temp_data.cityname+"7天预报", div_html, 220, 280, "customInfo");
	document.getElementById("select_id").options[select_index].selected=true;
} 
// 弹气泡窗
function warnInfowWind(evt) {
	var data=evt.graphic.attributes.data; 
	temp_evt=evt; 
	var image_url="";
	image_url=set_imag_src(data.weatherdesc24);
		var div_html = '<div class="row" style="margin-bottom: 10px;">'
			+ '<img src="'+image_url+'" alt=""><span id="where_id" >'+data.cityname+'</span>'
			+'<select name="" id="" onchange="on_select(this.options[this.options.selectedIndex].value)" style="margin-left: 14px;">'
			+ '<option value="24">24小时</option>'
			+ '<option value="36">36小时</option>'
			+ '<option value="48">48小时</option>'
			+ '<option value="60">60小时</option>'
			+ '<option value="72">72小时</option>'
			+ '<option value="84">84小时</option>'
			+ '<option value="96">96小时</option>'
			+ '<option value="108">108小时</option>'
			+ '<option value="120">120小时</option>'
			+ '<option value="132">132小时</option>'
			+ '<option value="144">144小时</option>'
			+ '<option value="156">156小时</option>'
			+ '<option value="168">168小时</option>'
			+ '</select></div><div class="row">'+data.weatherdesc24+'</div>'
			+ '<div class="row">'+data.temperature24_low+'℃ ~ '+data.temperature24_high+'℃</div>'
			+ '<div class="row">'+data.winddirdesc24+'</div>';
	openPopup(
			evt,data.cityname+"7天预报", div_html, 220, 280, "customInfo");
}

/*
data.cityname+"12小时数据"+data.weatherdesc12
		+ '<div class="bottom-btns">' 
		+ '</div>'*/
		

function linkToDetail(id) {
	/* window.open(rootPath+"/site/fz/xx/warnDetail.jsp?warnId="+id); */
	window.open(rootPath + "/front/gis/toWarnDetail?warnId=" + id);
}


//缩放到区域
function zoomToExtent(pointArr) {
	var multipoint = new esri.geometry.Multipoint(base.map.spatialReference);
	for(var i=0; i < pointArr.length; i++) {
		multipoint.addPoint(new esri.geometry.Point(pointArr[i].longitudenow, pointArr[i].latitudenow));
	}
	var extent = multipoint.getExtent();
	base.map.setExtent(extent.expand(4));
	
} 
//缩放到指定级别
function mapzoom(zoomlev){
	base.map.setZoom(zoomlev);
}
//漫游到指定点位置
function centerToPoint(point){
	base.map.centerAt(point);
} 
//根据id清楚图层
function clearLayerBylayerid(layerid){
	if(base.map.getLayer(layerid) != null) {
		base.map.removeLayer(base.map.getLayer(layerid));
	}
}
//数据描点
function locationSamePoints_(o) {
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
	if(o.lon != null || o.lat != null) {
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
		};
		base.locationObject.addGraphic(obj);
	}
}
// 加载时描点
function afterLoadMap() {
	searchWarnClick("福建省");  
}

function province_select_onclick(doc,provice){
	$('.regionsList').children().each(function(index){
		if($(this).attr('class')=='on'){
			$(this).removeClass("on");
			return false;
		}
	});
	$(doc).addClass("on");
	clearLayerBylayerid(layerid_now);
	layerid_now="layerid_now_"+provice
	searchWarnClick(provice);
}
