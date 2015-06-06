//debugger;
function _IncludeScript(inc){
	var script='<'+'script type="text/javascript" src="/arcgisT/supermap/lib/'+inc+'"'+'><'+'/script>'; 
	document.writeln(script);
}

function _IncludeStyle(inc){
	var style='<'+'link type="text/css" rel="stylesheet" href="/arcgisT/supermap/styles/'+inc+'"'+' />'; 
	document.writeln(style); 
}

function _GetBrowser(){
	var ua=navigator.userAgent.toLowerCase();
	if(ua.indexOf('opera')!=-1)return'opera';
	else if(ua.indexOf('msie')!=-1)return'ie';
	else if(ua.indexOf('safari')!=-1)return'safari';
	else if(ua.indexOf('gecko')!=-1)return'gecko';
	else return false;
}

if(!Function.__typeName){
	_IncludeStyle('SuperMap.Web.Controls.Legend.css');
	_IncludeStyle('SuperMap.Web.Mapping.InfoWindow.css');

	_IncludeScript('MicrosoftAjax.js');//务必先引入该脚本库

	_IncludeScript('SuperMap.Web.js');
	
	_IncludeScript('SuperMap.Web.iServerJava6R.js');

}