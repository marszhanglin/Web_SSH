//注册命名空间
Namespace.register("evecomgis.gisimpl.supermap.base");

evecomgis.gisimpl.supermap.base.PrintMap = function (monitor) {
	var $printMapObj = this;
	//地图ID
	this.mapId;
	//浏览器类型
	this.broz;
	//弹出窗的HTML代码
	this.html;
	this.printWindow;

	this.init = function (mapId) {
		$printMapObj.mapId = mapId;
		if(document.getElementById(mapId)==null) {
			alert("地图ID不存在无法初始化打印控件！");
			return;
		}
		$printMapObj.broz = SuperMap.Browser.name;
		var strInnerHTML = document.getElementById(mapId).innerHTML;
		var htmlHeader = "<!DOCTYPE html><html><head><META HTTP-EQUIV='pragma' CONTENT='no-cache'><META HTTP-EQUIV='Cache-Control' CONTENT='no-cache, must-revalidate'><META HTTP-EQUIV='expires' CONTENT='Wed, 26 Feb 1997 08:21:57 GMT'><meta http-equiv='Content-Type' content='text/html; charset=utf-8' /><meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' /><meta name='apple-mobile-web-app-capable' content='yes' /><title>地图打印</title>";
		var importCss = "<link href='/ecssp/jslib/evecomgis/common/supermaplib/theme/default/style.css' rel='stylesheet'><link href='/ecssp/jslib/evecomgis/common/supermaplib/theme/sm-doc.css' rel='stylesheet' />";
		var importJs = "<script src='/ecssp/jslib/evecomgis/common/supermaplib/expand/jquery.js'></script><script type = 'text/javascript'>" + "\n" + "function printDiv(){$('.newuiPrint').css({'display':'none'});window.print();$('.newuiPrint').css({'display':'block'});}</script>";
		var htmlBody = "</head><body><div class='print-header'><div class='superD'><h3>地图</h3></div><div id='"+mapId+"' >" +strInnerHTML + "</div><div id='superft'><div class='printClose'>" + "<span class='newuiPrint' onclick = 'printDiv()'></span></div></div></div></body></html>";
		$printMapObj.html = htmlHeader + importCss + importJs + htmlBody;
	}

	this.onloadHTML = function () {
		var strDOM = document.getElementById($printMapObj.mapId).children[0].children;
		for(var i = 0, length = strDOM.length; i < length ; i++){
			var idStr = strDOM[i].id;
			if(idStr.indexOf("SuperMap.Control.ScaleLine") == -1 && idStr.indexOf("SuperMap.Map") == -1){
				strCss = strDOM[i].style.cssText;
				strCss = strCss + "display: none;";
				strDOM[i].style.cssText = strCss;
			}
		}
		
		var canvasPrint = $printMapObj.printWindow.document.getElementsByTagName("canvas");
		var canvasMap = document.getElementsByTagName("canvas");
		for(var i = 0,length = canvasPrint.length;i< length;i++){
			$printMapObj.pasteCanvas(canvasMap[i],canvasPrint[i]);
		}
	}

	this.pasteCanvas = function (canvasMap,canvasPrint) {
        var contextMap = canvasMap.getContext('2d');
		
        var imagedataMap=contextMap.getImageData(0,0,canvasMap.width,canvasMap.height);
        var contextPrint = canvasPrint.getContext('2d');
        contextPrint.putImageData(imagedataMap, 0, 0);        
    }

	this.print = function () {
		$printMapObj.printWindow = window.open("");
		$printMapObj.printWindow.document.write($printMapObj.html);
        $printMapObj.printWindow.document.close();
		if ($printMapObj.broz == 'firefox') {
            $printMapObj.printWindow.onload = $printMapObj.onloadHTML;
        } else if ($printMapObj.broz == 'safari'||$printMapObj.broz == 'chrome'||$printMapObj.broz == 'msie') {
            window.setTimeout($printMapObj.onloadHTML,50);
        } else {
			window.setTimeout($printMapObj.onloadHTML,50);
		}
	}

}