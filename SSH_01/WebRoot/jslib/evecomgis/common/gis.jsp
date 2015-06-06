<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html style="width:100%;height:100%;">
  <head>
    <base href="<%=basePath%>">
    
    <title>map</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!-- gis api -->
	<%@include file="/jslib/evecomgis/common/gis_common.jsp"%>
	
	<script type="text/javascript" src="/ecssp/jslib/jquery-easyui/jquery-easyui-1.3.6/jquery.easyui.min.js" charset="utf-8"></script>
	<link rel="stylesheet" type="text/css" href="/ecssp/jslib/jquery-easyui/jquery-easyui-theme/default/easyui.css" charset="utf-8"></link>
	
	<!-- 封装文件 -->
	<style>
	.esriPopup.myTheme .contentPane {
			display: none;
		}
		
		.esriPopup.myTheme .titleButton.close {
			right: 3px;
			background-position: 0 -171px;
			width: 12px;
			height: 17px;
			display: none;
		}
		
		.esriPopup.myTheme .titleButton.maximize {
			right: 22px;
			background-position: 0 -251px;
			width: 11px;
			height: 11px;
			display: none;
			top: 5px;
		}
		
		.esriPopup.myTheme .actionsPane {
			background: #444444 !important;
			border-radius: 0px 0px 5px 5px;
			-moz-border-radius: 0px 0px 5px 5px;
			-webkit-border-radius: 0px 0px 5px 5px;
			-o-border-radius: 0px 0px 5px 5px;
			border-top: none;
		}
		
		.esriPopup.myTheme .pointer, .esriPopup.myTheme .outerPointer {
			position: absolute;
		}
		
		.esriPopup.myTheme .outerPointer.left, .esriPopup.myTheme .outerPointer.right, .esriPopup.myTheme .pointer.bottom, .esriPopup.myTheme .pointer.top {
			display:none;
		}
		
		
      #messages{
        background-color: #fff;
        box-shadow: 0 0 5px #888;
        font-size: 12px;
        padding: 0.5em;
        position: absolute;
        z-index: 40;
        border-style:solid;
        border-width:1px;
        width : 200px;
        
      }
	</style>
	<script type="text/javascript">

      var map;
	  var base;
      
		function init (config) {
			base = new evecomgis.igis.Base(config);
		}
		function addPoint(){
			unbind();
			base.locationObject.addPointEvent();
		}
		
		function measure(){
			unbind();
			base.measureObject.activeMeasure('01');
		}
		
		function clear(){
			unbind();
			base.queryMapObject.doUnActivity(true);
			base.graphicsObject.resetMap(true);
			base.locationObject.clearGraphics(true);
			base.measureObject.restore(true);
			base.roamObject.areaZoomDeactivate();
			document.getElementById("messages").style.display="none";
			document.getElementById("info").innerHTML="";
		}
		function unbind() {
			base.roamObject.areaZoomDeactivate();
			base.locationObject.clearGraphics(false);
			base.measureObject.restore(false);
			base.queryMapObject.doUnActivity(false);
		}
		
		
		function zoomIn(){
			unbind();
			base.roamObject.zoomInMap();
		}
		
		function zoomOut(){
			unbind();
			base.roamObject.zoomOutMap();
		}
		
		function drawGraphic(type){
			unbind();
			base.graphicsObject.changeType(type);
		}
		
		function queryMap(){
			unbind();
			base.queryMapObject.doQuery("01");
		}
		
		function hideMessage(){
			document.getElementById("messages").style.display="none";
		}
		
		function searchBuffer(){
			unbind();
			base.locationObject.addPointEvent();
			var x = base.locationObject.gisX;
			var y = base.locationObject.gisY;
			base.queryMapObject.setPoint(x,y);
			base.queryMapObject.bufferMap();
		}
		
		function setTitle(){
			return "\${A}";
		}
		
		function setContent(){
			var content = "ID:"+"\${OBJECTID}" + "<br/>"
						+ "地址：" + "\${D}" + "</br>" 
						+ "店主：" + "\${C}" + "</br>" 
						+ "x：" + "\${G}" + "</br>" 
						+ "y：" + "\${F}" + "</br>" ;
						
			return content;
		}
	
	function dispatch(){
		unbind();
		var pointArr = [ {
				t : '2013-12-10 10:12:10',
				x : 118.08469966392846,
				y : 24.48189502736572
			}, {
				t : '2013-12-11 10:12:10',
				x : 118.08737655756002,
				y : 24.491115438763312
			}, {
				t : '2013-12-12 10:12:10',
				x : 118.09808413208625,
				y : 24.492900034517685
			}, {
				t : '2013-12-13 10:12:10',
				x : 118.1087917066125,
				y : 24.495874360774973
			}, {
				t : '2013-12-14 10:12:10',
				x : 118.12009414639018,
				y : 24.500633282786633
			} ]
			
		base.locationObject.dispatchEvent(pointArr,5,3);
	}
	
	function monite(){
		var json = [ {
				t : '2013-12-10 10:12:10',
				x : 118.08469966392846,
				y : 24.48189502736572
			}, {
				t : '2013-12-11 10:12:10',
				x : 118.08737655756002,
				y : 24.491115438763312
			}, {
				t : '2013-12-12 10:12:10',
				x : 118.09808413208625,
				y : 24.492900034517685
			}, {
				t : '2013-12-13 10:12:10',
				x : 118.1087917066125,
				y : 24.495874360774973
			}, {
				t : '2013-12-14 10:12:10',
				x : 118.12009414639018,
				y : 24.500633282786633
			} ];
		
		unbind();
		base.queryMapObject.doUnActivity(true);
		base.locationObject.gradualLocationEvent(json, 1000, {
					fillColor : "red",
					strokeColor : "yellow",
					pointRadius : 6
				}, null);
	}
		
		$(function () {
			
			var xmlUrl;
			if("${param.gistype}"=="1") {
				$("#btn").text("supermap");
				xmlUrl = "/ecssp/jslib/evecomgis/common/arcgis-config.xml";
			} else {
				xmlUrl = "/ecssp/jslib/evecomgis/common/supermap-config.xml";
				$("#btn").text("arcgis");
			}

			var configReader = new evecomgis.common.ReadXMLConfig(xmlUrl,init);
			configReader.readXMLReturnJson();
		});

		function testWin(obj) {
			var contentHTML = "<div style='font-size:.8em; opacity: 0.8; overflow-y:hidden;'>";
			contentHTML += "<div>id:1<br>name:test<br>x:" + obj.x + "<br>y:" + obj.y + "</div></div>";
			return contentHTML;
		}

		var $time;
		var $dataLength = 1;
		var $data = [ {
				t : '2013-12-10 10:12:10',
				x : 118.08469966392846,
				y : 24.48189502736572
			}, {
				t : '2013-12-11 10:12:10',
				x : 118.08737655756002,
				y : 24.491115438763312
			}, {
				t : '2013-12-12 10:12:10',
				x : 118.09808413208625,
				y : 24.492900034517685
			}, {
				t : '2013-12-13 10:12:10',
				x : 118.1087917066125,
				y : 24.495874360774973
			}, {
				t : '2013-12-14 10:12:10',
				x : 118.12009414639018,
				y : 24.500633282786633
			} ];

		function addPointInterval() {
			if($dataLength < $data.length) {
				unbind();
				base.locationObject.clearMarker();
			}
				
			if($dataLength < $data.length) {
				base.locationObject.setLocation($data[$dataLength-1],true);
				base.locationObject.setLocation($data[$dataLength],true);
				$dataLength = $dataLength + 2;
			} else {
				if($data[$dataLength-1] != null) {
					base.locationObject.setLocation($data[$dataLength-1],true);
				}
				clearInterval($time);
				$time = null;
			}
		}

		function changeGis() {
			if("${param.gistype}"=="1") {
				window.location.href="/ecssp/jslib/evecomgis/common/gis.jsp?gistype=2";
			} else {
				window.location.href="/ecssp/jslib/evecomgis/common/gis.jsp?gistype=1";
			}
			
		}

    </script>
  </head>
  
  <body style="width: 100%; height: 100%; overflow: hidden;">
  <div>
	<button onclick="monite();">测试定位</button>
	<button id="btn" onclick="changeGis();">supermap</button>
</div>
  	<div id="messages" style="display:none;">
		<div style='float:left;width:200px;height:30px;'><span style='float:left;font-size:12px;font-weight:bold;margin-bottom:10px;'>信息</span><a href="#" style="padding-left:147px;" onclick='$("#messages").hide();return false;'>关闭</a></div>
		<div id="info" style='width:200px;overflow-y:auto;'>
		
		</div>
	</div>
    <div id="mapDiv" style="position:absolute;left:0px;right:0px;width:100%;height:100%;">
		
    <div id="toolBarDiv" style="">
  	</div>
		<div style="position:absolute;z-index:100;z-index:9999;" class="tool">
			<a href="javascript:zoomIn()" title="地图放大"><img src="jslib/evecomgis/common/image/tool_1.jpg"
				border="0" onMouseOver="this.src='jslib/evecomgis/common/image/tool_1on.jpg';"
				onMouseOut="this.src='jslib/evecomgis/common/image/tool_1.jpg'" />
			</a><a href="javascript:zoomOut()" title="地图缩小"><img src="jslib/evecomgis/common/image/tool_2.jpg"
				width="42" height="35" border="0"
				onMouseOver="this.src='jslib/evecomgis/common/image/tool_2on.jpg';"
				onMouseOut="this.src='jslib/evecomgis/common/image/tool_2.jpg'" />
			</a><a href="javascript:addPoint()" title="坐标采集"><img src="jslib/evecomgis/common/image/tool_3.jpg" border="0"
				onMouseOver="this.src='jslib/evecomgis/common/image/tool_3on.jpg';"
				onMouseOut="this.src='jslib/evecomgis/common/image/tool_3.jpg'" />
			</a><a id="measure" href="javascript:measure();" title="测距"><img src="jslib/evecomgis/common/image/tool_4.jpg" border="0"
				onMouseOver="this.src='jslib/evecomgis/common/image/tool_4on.jpg';"
				onMouseOut="this.src='jslib/evecomgis/common/image/tool_4.jpg'" />
			</a><a href="javascript:clear()" title="清除"><img src="jslib/evecomgis/common/image/tool_5.jpg" border="0"
				onMouseOver="this.src='jslib/evecomgis/common/image/tool_5on.jpg';"
				onMouseOut="this.src='jslib/evecomgis/common/image/tool_5.jpg'" />
			</a>
			<a title="地图查询"
				onclick="javascript:queryMap()"
				href="javascript:void(0);"><img src="jslib/evecomgis/common/image/seepoi1.png"
				border="0" onMouseOver="this.src='jslib/evecomgis/common/image/seepoi2.png';"
				onMouseOut="this.src='jslib/evecomgis/common/image/seepoi1.png'" />
			</a>
			<a title="指挥调度"
				onclick="dispatch();"
				href="javascript:void(0);"><img src="jslib/evecomgis/common/image/tool_a.png"
				border="0" onMouseOver="this.src='jslib/evecomgis/common/image/tool_aon.png';"
				onMouseOut="this.src='jslib/evecomgis/common/image/tool_a.png'" />
			</a>
			<a id=aFloatTools_Show class=btnOpen title="实时监控"
				onclick="monite()"
				href="javascript:void(0);"><img src="jslib/evecomgis/common/image/tool_6.jpg"
				border="0" onMouseOver="this.src='jslib/evecomgis/common/image/tool_6on.jpg';"
				onMouseOut="this.src='jslib/evecomgis/common/image/tool_6.jpg'" />
			</a>
			<a  href="javascript:base.roamObject.areaZoomInMap();" title="拉框放大"><img src="jslib/evecomgis/common/image/large.png"
				border="0" onMouseOver="this.src='jslib/evecomgis/common/image/largeover.png';"
				onMouseOut="this.src='jslib/evecomgis/common/image/large.png'" />
			<a href="javascript:base.roamObject.areaZoomOutMap();" title="拉框缩小"><img src="jslib/evecomgis/common/image/small.png"
				border="0" onMouseOver="this.src='jslib/evecomgis/common/image/smallover.png';"
				onMouseOut="this.src='jslib/evecomgis/common/image/small.png'" />
			</a>
			</a><a id="draw" href="javascript:" title="画图"><img src="jslib/evecomgis/common/image/graphic.png"
				border="0" onMouseOver="this.src='jslib/evecomgis/common/image/graphicover.png';"
				onMouseOut="this.src='jslib/evecomgis/common/image/graphic.png'" />
			</a>
		</div>
    	
    	
    	

		<DIV id=floatTools class=float0831
			style="position:absolute;z-index:100;">
			<DIV id=divFloatToolsView class=floatR>
				<table width="432" height="231" border="0" cellpadding="0"
					cellspacing="0">
					<tr>
						<td valign="top" background="jslib/evecomgis/common/image/box_1.jpg"><table
								width="100%" height="25" border="0" cellpadding="0"
								cellspacing="0">
								<tr>
									<td width="85%">&nbsp;</td>
									<td width="5%">&nbsp;</td>
									<td width="10%"><a href="#"
										onclick="javascript:$('#divFloatToolsView').animate({width: 'hide', opacity: 'hide'}, 'normal',function(){ $('#divFloatToolsView').hide();kf_setCookie('RightFloatShown', 1, '', '/', 'www.istudy.com.cn'); });$('#aFloatTools_Show').attr('style','display:block');$('#aFloatTools_Hide').attr('style','display:none');"><img
											src="jslib/evecomgis/common/image/blank.gif" width="39" height="16" border="0" />
									</a></td>
								</tr>
							</table>
							<table width="90%" height="30" border="0" align="center"
								cellpadding="0" cellspacing="0">
								<tr>
									<td style="color:#FFFFFF"><span style="color:#fff7a3">缓冲范围：</span><input
										type="text" id="bufferNum" style="width:100px" /> 公里 <a
										href="javascript:searchBuffer();"><img
											src="jslib/evecomgis/common/image/box_btn.jpg" width="59" height="21" border="0" />
									</a></td>
								</tr>
							</table>
							<table width="100%" height="157" border="0" cellpadding="0"
								cellspacing="0">
								<tr>
									<td width="23%" valign="top"><table width="85%"
											height="30" border="0" align="center" cellpadding="0"
											cellspacing="0">
											<tr>
												<td style="color:#b5b5b5">选择图层</td>
											</tr>
										</table>
										<table width="85%" border="0" align="center" cellpadding="0"
											cellspacing="0">
											<tr>
												<td height="30" style="color:#fff"><input
													name="resourceType" type="checkbox" value="team"
													checked="checked" />救援队伍</td>
											</tr>
											<tr>
												<td height="30" style="color:#fff"><input
													name="resourceType" type="checkbox" value="expor"
													checked="checked" />救援专家</td>
											</tr>
											<tr>
												<td height="30" style="color:#fff"><input
													name="resourceType" type="checkbox" value="material"
													checked="checked" />救援物资</td>
											</tr>
											<tr>
												<td height="30" style="color:#fff"><input
													name="resourceType" type="checkbox" value="danger"
													checked="checked" />危险源</td>
											</tr>
										</table></td>
									<td width="77%" valign="top" id="toolBarDiv"></td>
					</tr>
				</table>
			</DIV>
		</DIV>
    
    </div>
	
	<div id="drawList" class=" easyui-menu" style="text-align:left; padding:5px;width:388px;background:url('jslib/evecomgis/common/image/battle.png');">
        <ul style="margin:0;padding:0 0 0 0px;" class="drawList_a">
            <a href="javascript:drawGraphic('Line')" title="单线段">
            <img src="jslib/evecomgis/common/image/line1.png" border="0" onMouseOver="this.src='jslib/evecomgis/common/image/line2.png';"
				onMouseOut="this.src='jslib/evecomgis/common/image/line1.png'" />
            </a>
            <a href="javascript:drawGraphic('Polyline')" title="多线段">
            <img src="jslib/evecomgis/common/image/polyline1.png" border="0" onMouseOver="this.src='jslib/evecomgis/common/image/polyline2.png';"
				onMouseOut="this.src='jslib/evecomgis/common/image/polyline1.png'" />
            </a>
            <a href="javascript:drawGraphic('FreehandPolyline')" title="自由线">
            <img src="jslib/evecomgis/common/image/freeline1.png" border="0" onMouseOver="this.src='jslib/evecomgis/common/image/freeline2.png';"
				onMouseOut="this.src='jslib/evecomgis/common/image/freeline1.png'" />
            </a>
            <a href="javascript:drawGraphic('Triangle')" title="三角形">
            <img src="jslib/evecomgis/common/image/sanjiao1.png" border="0" onMouseOver="this.src='jslib/evecomgis/common/image/sanjiao2.png';"
				onMouseOut="this.src='jslib/evecomgis/common/image/sanjiao1.png'" />
            </a>
            <a href="javascript:drawGraphic('Extent')" title="矩形">
            <img src="jslib/evecomgis/common/image/extend1.png" border="0" onMouseOver="this.src='jslib/evecomgis/common/image/extend2.png';"
				onMouseOut="this.src='jslib/evecomgis/common/image/extend1.png'" />
            </a>
            <a href="javascript:drawGraphic('Circle')" title="圆形">
            <img src="jslib/evecomgis/common/image/circle1.png" border="0" onMouseOver="this.src='jslib/evecomgis/common/image/circle2.png';"
				onMouseOut="this.src='jslib/evecomgis/common/image/circle1.png'" />
            </a>
            <a href="javascript:drawGraphic('Ellipse')" title="椭圆形">
            <img src="jslib/evecomgis/common/image/tuoyuan1.png" border="0" onMouseOver="this.src='jslib/evecomgis/common/image/tuoyuan2.png';"
				onMouseOut="this.src='jslib/evecomgis/common/image/tuoyuan1.png'" />
            </a>
            <a href="javascript:drawGraphic('Polygon')" title="多边形">
            <img src="jslib/evecomgis/common/image/polyon1.png" border="0" onMouseOver="this.src='jslib/evecomgis/common/image/polyon2.png';"
				onMouseOut="this.src='jslib/evecomgis/common/image/polyon1.png'" />
            </a>
            <a href="javascript:drawGraphic('FreehandPolygon')" title="自由多边形">
            <img src="jslib/evecomgis/common/image/freepoly1.png" border="0" onMouseOver="this.src='jslib/evecomgis/common/image/freepoly2.png';"
				onMouseOut="this.src='jslib/evecomgis/common/image/freepoly1.png'" />
            </a>

        </ul>
    </div>
    
    <div id="measureList" class=" easyui-menu" style="text-align:left;padding:5px;width:220px;background:url('jslib/evecomgis/common/image/battle.png');">
        <ul style="margin:0;padding:0 0 0 0px;" class="drawList_a">
            <a href="javascript:measure();" title="测距">
            <img src="jslib/evecomgis/common/image/length1.png" onMouseOver="this.src='jslib/evecomgis/common/image/length2.png';"
				onMouseOut="this.src='jslib/evecomgis/common/image/length1.png'" />
            </a>
            <a href="javascript:drawGraphic('Polyline')" title="三角形测面">
            <img src="jslib/evecomgis/common/image/sjarea1.png" onMouseOver="this.src='jslib/evecomgis/common/image/sjarea2.png';"
				onMouseOut="this.src='jslib/evecomgis/common/image/sjarea1.png'" />
            </a>
            <a href="javascript:drawGraphic('FreehandPolyline')" title="矩形测面">
            <img src="jslib/evecomgis/common/image/etarea1.png" onMouseOver="this.src='jslib/evecomgis/common/image/etarea2.png';"
				onMouseOut="this.src='jslib/evecomgis/common/image/etarea1.png'" />
            </a>
            <a href="javascript:drawGraphic('Triangle')" title="圆形测面">
            <img src="jslib/evecomgis/common/image/yxarea1.png" onMouseOver="this.src='jslib/evecomgis/common/image/yxarea2.png';"
				onMouseOut="this.src='jslib/evecomgis/common/image/yxarea1.png'" />
            </a>
            <a href="javascript:drawGraphic('Extent')" title="多边形测面">
            <img src="jslib/evecomgis/common/image/dbarea1.png" onMouseOver="this.src='jslib/evecomgis/common/image/dbarea2.png';"
				onMouseOut="this.src='jslib/evecomgis/common/image/dbarea1.png'" />
            </a>

        </ul>
    </div>
    
    
    <script>
        $(function(){
            $("#draw").bind('mouseover',function(e){
                e.preventDefault();
                $('#drawList').menu('show', {
                    left: 61,
                    top: 454
                });
            });
            
            $("#drawList").bind('click',function(e){
                $("#drawList").menu("hide");
            });
        });
        
    </script>
	
  </body>
</html>
