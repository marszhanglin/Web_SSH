//注册命名空间
Namespace.register("evecomgis.gisimpl.arcgis.base");

/**
 * @Title evecomgis.gisimpl.arcgis.base.InitArcGisMap
 * @Param urlArray
 *            服务请求URL数组,格式为[{initType:'',url:''}]其中initType为图层渲染方式, '01'为切片方式,
 *            '02'为动态方式, 图层渲染顺序根据传入数组顺序，即0为最底层.
 * @Param componentId
 *            渲染地图组件ID
 * @Param mapOption
 *            地图可选配置项(详细参见ARCGIS API)
 * @Param measureOption
 *            地图测距对象，如果需要测距请传入地图测距对象
 * @Description 初始化动态ArcGis地图
 * @author Link
 * @Date 2013-12-13
 */
evecomgis.gisimpl.arcgis.base.InitArcGisMap = function(config, monitor) {
    
	//自定义天地图对象
	function initLayer() {
		dojo
				.declare(
						"ogc.WMTSLayer",
						esri.layers.TiledMapServiceLayer,
						{
							config:null,
							setConfig: function(config) {
								this.config = config;
							},
							constructor : function(o) {
								this.setConfig(o);
								this.id = o.layerId;
								this.visible = o.visible === "true" ? true : false;
								this.spatialReference = new esri.SpatialReference(
										{
											wkid : parseInt(o.wkid)
										});
								this.initialExtent = new esri.geometry.Extent(
										parseFloat(o.initLeftTopX), parseFloat(o.initLeftTopY), parseFloat(o.initRightBottomX), parseFloat(o.initRightBottomY),
										this.spatialReference);
								this.fullExtent = new esri.geometry.Extent(
										parseFloat(o.fullLeftTopX), parseFloat(o.fullLeftTopY), parseFloat(o.fullRightBottomX), parseFloat(o.fullRightBottomY),
										this.spatialReference);
								// 构造lods
								var lods = [];
								var resolution = parseFloat(o.resolution);
								var scale = parseFloat(o.scale);
								for (var i = parseInt(o.startLayer); i < parseInt(o.endLayer); i++) {
									lods.push({
										"level" : i,
										"scale" : scale,
										"resolution" : resolution
									});
									resolution = resolution / 2;
									scale = scale / 2;
								}
								this.tileInfo = new esri.layers.TileInfo({
									"dpi" : o.dpi,
									"format" : o.format,
									"compressionQuality" : parseInt(o.compressionQuality),
									"spatialReference" : {
										"wkid" : o.wkid
									},
									"rows" : parseInt(o.rows),
									"cols" : parseInt(o.cols),
									"origin" : {
										"x" : parseInt(o.x),
										"y" : parseInt(o.y)
									},
									"lods" : lods
								});
								this.loaded = true;
								this.onLoad(this);
							},
							getTileUrl : function(level, row, col) {
								return this.config.url
										+"&"
										+ this.config.levelPropertyName
										+"="
										+ level
										+ "&"
										+ this.config.rowsPropertyName
										+ "="
										+ row
										+ "&"
										+ this.config.colsPropertyName
										+ "="
										+ col;
							}
						});
	}
	
	//初始化自定义天地图对象
	initLayer();

	// 当前对象
	var initArcGisObject = this;
	// 请求路径与渲染方式数组
	this.urlArray = config.urlArray;
	// 地图渲染到页面上某个控件的ID
	this.componentId = config.id;
	// 构建地图时可选配置对象（详细请查询ARCGIS API）
	this.mapOption = config.mapOption;
	// 地图对象
	this.map;
	// 可选配置对象
	this.mapOption = config.mapOption;

	// 初始化地图
	this.initMap = function(callback) {

		if (document.getElementById(initArcGisObject.componentId) == null) {
			alert("错误: 页面不存在该控件ID，地图无法加载");
			return;
		}

		if (!Object.prototype.toString.call(initArcGisObject.urlArray) === '[object Array]'
				|| initArcGisObject.urlArray == null
				|| initArcGisObject.urlArray.length == 0) {
			alert("错误: 路径地址不为数组或数组为空");
			return;
		}
		dojo.require("esri.map");
		// 是否显示logo表示
		initArcGisObject.mapOption.logo = false;
		// 是否可拉框
        initArcGisObject.mapOption.slider = true;
		// 可拉框样式
		initArcGisObject.mapOption.sliderStyle = 'large';
		initArcGisObject.map = new esri.Map(initArcGisObject.componentId,
				initArcGisObject.mapOption);

		if (initArcGisObject.urlArray != null
				&& initArcGisObject.urlArray.length == null) {// 假如只有一个的时候
			var layer;
			if (initArcGisObject.urlArray.initType == "01") {// 贴片类型
				layer = new esri.layers.ArcGISTiledMapServiceLayer(
						initArcGisObject.urlArray.url);
			} else if (initArcGisObject.urlArray.initType == "02") {// 动态类型
				layer = new esri.layers.ArcGISDynamicMapServiceLayer(
						initArcGisObject.urlArray.url);
			} else if(initArcGisObject.urlArray.initType == "03") {//天地图
				layer = new ogc.WMTSLayer(initArcGisObject.urlArray.skyMapConfig);
			}
			initArcGisObject.map.addLayer(layer);
		} else {// 假如多个的时候
			var array = new Array();
			for (var i = 0; i < initArcGisObject.urlArray.length; i++) {
				var url = initArcGisObject.urlArray[i];
				if (url.initType == "01") {// 贴片类型
					array[i] = new esri.layers.ArcGISTiledMapServiceLayer(
							url.url);
				} else if (url.initType == "02") {// 动态类型
					array[i] = new esri.layers.ArcGISDynamicMapServiceLayer(
							url.url);
				} else if (url.initType == "03") {// 天地图类型
					array[i] = new ogc.WMTSLayer(url.skyMapConfig);
				}
			}
			initArcGisObject.map.addLayers(array);
		}

		if (callback != null)
			callback(initArcGisObject.map);
	}

	// 将地图加载到页面
	this.loadMap = function(callback) {
		dojo.addOnLoad(function() {
			initArcGisObject.initMap(callback);
		});
		return initArcGisObject.map;
	}
}
