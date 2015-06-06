var _$baseUrl;

function _IncludeScript(inc) {
    var script = '<' + 'script type="text/javascript" src="' + _$baseUrl + '/jslib/evecomgis/common/supermaplib/core/' + inc + '"' + '><' + '/script>';
    document.writeln(script);
}

function _IncludeStyle(inc) {
    var style = '<' + 'link type="text/css" rel="stylesheet" href="' + _$baseUrl + '/jslib/evecomgis/common/supermaplib/theme/default/' + inc + '"' + ' />';
    document.writeln(style);
}

function _GetBrowser() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('opera') != -1)
        return 'opera';
    else if (ua.indexOf('msie') != -1)
        return 'ie';
    else if (ua.indexOf('safari') != -1)
        return 'safari';
    else if (ua.indexOf('gecko') != -1)
        return 'gecko';
    else
        return false;
}

function _$getBaseUrl() {
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var prePath = strFullPath.substring(0, pos);
    var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
    _$baseUrl = prePath + postPath;
}

if (!Function.__typeName) {
    _$getBaseUrl();
    _IncludeStyle('SuperMap.Web.Controls.Legend.css');
    _IncludeStyle('SuperMap.Web.Mapping.InfoWindow.css');
    
    _IncludeScript('MicrosoftAjax.js');
    //务必先引入该脚本库

    _IncludeScript('SuperMap.Web.js');

    _IncludeScript('SuperMap.Web.iServerJava6R.js');

}