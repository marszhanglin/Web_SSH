<script type="text/javascript">
function $getRootPath(){
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath=window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht=curWwwPath.substring(0,pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return(localhostPaht+projectName);
}

var $_root_path = $getRootPath();
if(typeof($) == "undefined") {
	document.write("<script src=\"${ pageContext.request.contextPath }/jslib/evecomgis/common/jquery-1.9.0.js\" type=\"text/javascript\" charset=\"utf-8\"><\/script>");
}

</script>

<!-- 样式 -->
<link rel="stylesheet" type="text/css" href="${ pageContext.request.contextPath }/jslib/evecomgis/common/arcgislib/library/3.7/3.7/js/dojo/dijit/themes/tundra/tundra.css" charset="utf-8"/>
<link rel="stylesheet" type="text/css" href="${ pageContext.request.contextPath }/jslib/evecomgis/common/arcgislib/library/3.7/3.7/js/esri/css/esri.css" charset="utf-8" />
<link rel="stylesheet" type="text/css" href="${ pageContext.request.contextPath }/jslib/evecomgis/common/css/base.css" charset="utf-8" />
<link rel="stylesheet" type="text/css" href="${ pageContext.request.contextPath }/jslib/evecomgis/common/css/common.css" charset="utf-8" />
<link rel="stylesheet" type="text/css" href="${ pageContext.request.contextPath }/jslib/evecomgis/common/css/style.css" charset="utf-8" />

<!-- 公共包 -->
<script type="text/javascript" src="${ pageContext.request.contextPath }/jslib/evecomgis/common/arcgislib/library/3.7/3.7/init.js" charset="utf-8"></script>
<script type="text/javascript" src="${ pageContext.request.contextPath }/jslib/evecomgis/common/supermaplib/core/include.js" charset="utf-8"></script>
<script type="text/javascript" src="${ pageContext.request.contextPath }/jslib/evecomgis/common/supermaplib/core/SuperMap.Include.js" charset="utf-8"></script>
<script type="text/javascript" src="${ pageContext.request.contextPath }/jslib/evecomgis/common/Namespace.js" charset="utf-8"></script>
<script type="text/javascript" src="${ pageContext.request.contextPath }/jslib/evecomgis/common/jquery.xml2json.js" charset="utf-8"></script>
<script type="text/javascript" src="${ pageContext.request.contextPath }/jslib/evecomgis/common/readXMLConfig.js" charset="utf-8"></script>

<!-- arcGis相关包  -->
<script type="text/javascript" src="${ pageContext.request.contextPath }/jslib/evecomgis/gisimpl/arcgis/base/initMap.js" charset="utf-8"></script>
<script type="text/javascript" src="${ pageContext.request.contextPath }/jslib/evecomgis/gisimpl/arcgis/base/measureLength.js" charset="utf-8"></script>
<script type="text/javascript" src="${ pageContext.request.contextPath }/jslib/evecomgis/gisimpl/arcgis/base/Graphic.js" charset="utf-8"></script>
<script type="text/javascript" src="${ pageContext.request.contextPath }/jslib/evecomgis/gisimpl/arcgis/base/roam.js" charset="utf-8"></script>
<script type="text/javascript" src="${ pageContext.request.contextPath }/jslib/evecomgis/gisimpl/arcgis/base/printMap.js" charset="utf-8"></script>
<script type="text/javascript" src="${ pageContext.request.contextPath }/jslib/evecomgis/common/monitor.js" charset="utf-8"></script>
<script type="text/javascript" src="${ pageContext.request.contextPath }/jslib/evecomgis/gisimpl/arcgis/base/location.js" charset="utf-8"></script>
<script type="text/javascript" src="${ pageContext.request.contextPath }/jslib/evecomgis/gisimpl/arcgis/base/tools.js" charset="utf-8"></script>
<script type="text/javascript" src="${ pageContext.request.contextPath }/jslib/evecomgis/gisimpl/arcgis/base/query.js" charset="utf-8"></script>

<!-- supermap相关包 -->
<script type="text/javascript" src="${ pageContext.request.contextPath }/jslib/evecomgis/gisimpl/supermap/base/tools.js" charset="utf-8"></script>
<script type="text/javascript" src="${ pageContext.request.contextPath }/jslib/evecomgis/gisimpl/supermap/base/initMap.js" charset="utf-8"></script>
<script type="text/javascript" src="${ pageContext.request.contextPath }/jslib/evecomgis/gisimpl/supermap/base/query.js" charset="utf-8"></script>
<script type="text/javascript" src="${ pageContext.request.contextPath }/jslib/evecomgis/gisimpl/supermap/base/location.js" charset="utf-8"></script>
<script type="text/javascript" src="${ pageContext.request.contextPath }/jslib/evecomgis/gisimpl/supermap/base/Graphic.js" charset="utf-8"></script>
<script type="text/javascript" src="${ pageContext.request.contextPath }/jslib/evecomgis/gisimpl/supermap/base/measureLength.js" charset="utf-8"></script>
<script type="text/javascript" src="${ pageContext.request.contextPath }/jslib/evecomgis/gisimpl/supermap/base/roam.js" charset="utf-8"></script>
<script type="text/javascript" src="${ pageContext.request.contextPath }/jslib/evecomgis/gisimpl/supermap/base/printMap.js" charset="utf-8"></script>

<!-- gis接口 -->
<script type="text/javascript" src="${ pageContext.request.contextPath }/jslib/evecomgis/igis/baseGis.js" charset="utf-8"></script>

