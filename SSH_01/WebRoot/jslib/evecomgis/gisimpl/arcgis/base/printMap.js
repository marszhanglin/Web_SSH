//注册命名空间
Namespace.register("evecomgis.gisimpl.arcgis.base");

evecomgis.gisimpl.arcgis.base.PrintMap = function(monitor){
    dojo.require("esri.dijit.Print");
    var $printMapObject = this;
    this.printObj;
    this.monitor = monitor;
	this.config;
    this.init = function (config) {
		$printMapObject.config = config;
        esri.config.defaults.io.proxyUrl = config.proxyUrl;
        esri.config.defaults.io.alwaysUseProxy=true;
        $printMapObject.printObj = new esri.dijit.Print(config.printConfig, dojo.byId(config.id));
        $printMapObject.printObj.startup();
		document.getElementById(config.id).style.display = "none";
    }

	this.print = function () {
		document.getElementById(config.id).click();
	}
}
	
	
	
	
	
	
	
	
	
	
	
	
