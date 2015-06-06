<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE HTML >
<html style="width: 100%; height: 100%; overflow: hidden;">
	<head>
		<title>应急指挥</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0"> 
		<!-- 引入地图公共脚本 -->
		<%-- <jsp:include page="/inc_gis.jsp"></jsp:include> --%>
			<!-- 地图相关脚本 -->
			<%@include file="/jsp/gis/gis_common.jsp"%>
			<!-- 地图初始化脚本 -->
			<script type="text/javascript"
				src="${ pageContext.request.contextPath }/jsp/gis/js/init_map.js"
				charset="utf-8"></script>
				<!-- 地图业务脚本 -->
				
				
		<!-- 事件气泡描点样式 -->
<%-- 		<link rel="stylesheet" type="text/css"
			href="${ pageContext.request.contextPath }/style/gis/emergency-event.css"
			charset="utf-8" /> --%>
		<!-- 综合应用样式和右边框样式 -->
<%-- 		<link rel="stylesheet" type="text/css"
			href="${ pageContext.request.contextPath }/style/gis/monitor_zhyy.css"
			charset="utf-8" />
		<script type="text/javascript"
			src="${ pageContext.request.contextPath }/jslib/CommonFunc.js"></script> --%>

<%-- 		<!-- 事件脚本 -->
		<script type="text/javascript"
			src="${ pageContext.request.contextPath }/evecom/ecapp/incident/emergency_event.js"></script> --%>
		<!-- <script type="text/javascript">
			rootPath = '${ pageContext.request.contextPath }';

			$(function() {
				
				// 延迟描点，防止因加载地图时间过长导致的错误
				setTimeout(function() {
					//气泡描点
					getGisEventPop();
					//图标描点
					getGisEventPoints();
					//加载影象图层  在gis文件夹下的init_map.js中初始化时就加载
				    //switchImageLayer();
				  	//显示右侧窗口
				    showLeftWin('tabPanel_T_EVENT_INFO','事件查询',rootPath+'/evecom/ecapp/prewarn/forecastingdisplay/rainwatermonitor/hyhjgl02.png');
				   	//右侧窗口添加数据
				  	queryEventList();
				}, 2000);
				
				
				//右侧窗口自适应屏幕高度
				var height=$(window).height()-285;
				$('#eventListPan').css('height',height);
				
				 //右侧窗口点击按钮控制界面显隐
			    $(".rightAside1>a").click(function() {
			        if($(this).hasClass("hidebtn")) {
			            $(this).removeClass("hidebtn").addClass("showbtn");
			            $(this).siblings().hide('fast');
			            $(this).parent().width("0");
			        }
			        else {
			            $(this).removeClass("showbtn").addClass("hidebtn");
			            $(this).siblings().show('fast');
			            $(this).parent().width("307px");
			        }
			    });
			    
			    $(".rightAside1>a").trigger('click');
			    
			});
			
		</script> -->
	</head>
	<body style="width: 100%; height: 100%; overflow: hidden;">
		<!-- 地图组件容器 -->
		<div id="mapDiv" style="width: 100%; height: 100%;"></div>	
		
		<!-- 地图放大缩小 -->
		<div class="map-zoom">
			<div class="zoom-arrows">
				<a href="javascript:base.roamObject.panUpMap();" class="up"
					title="向上移动"></a>
				<a href="javascript:base.roamObject.panDownMap();" class="down"
					title="向下移动"></a>
				<a href="javascript:base.roamObject.panLeftMap();" class="left"
					title="向左移动"></a>
				<a href="javascript:base.roamObject.panRightMap();" class="right"
					title="向右移动"></a>
			</div>
		</div> 
	</body>
</html>