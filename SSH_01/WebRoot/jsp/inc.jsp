<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib uri="http://com.evecom.util.tag/ButtonTag" prefix="btn"%>
<%
	String mobile = String.valueOf(request.getSession().getAttribute("mobile"));

%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- 引入系统样式-->

<link href="${ctx}/css/myReset.css" rel="stylesheet" type="text/css" />
<link href="${ctx}/css/focmp-up.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="${ctx}/js/jslib/extBrowser.js" charset="utf-8"></script>
<script type="text/javascript">
<!--
   var ctx = '${ctx}';
//-->
</script>

<!-- 引入my97日期时间控件 -->
<script type="text/javascript" src="${ctx}/js/jslib/My97DatePicker4.8b3/My97DatePicker/WdatePicker.js" charset="utf-8"></script>


<!-- 引入jQuery -->
<script src="${ctx}/js/jslib/jquery-1.8.3.js" type="text/javascript" charset="utf-8"></script>
<!-- 引入工具类 -->
<script type="text/javascript" src="${ctx}/js/utils.js" charset="utf-8"></script>

<!-- 首页农历新历输出开始 -->
<script type="text/javascript" src="${ctx}/js/jslib/SystemCalendar.js"></script>

<%-- 引入Highcharts --%>
<script src="${ctx}/js/jslib//Highcharts-3.0.6/js/highcharts.js" type="text/javascript" charset="utf-8"></script>
<script src="${ctx}/js/jslib/Highcharts-3.0.6/js/modules/exporting.js" type="text/javascript" charset="utf-8"></script>
<%-- 引入Highcharts扩展 --%>
<script src="${ctx}/js/jslib/extHighcharts.js" type="text/javascript" charset="utf-8"></script>
<link rel="stylesheet" href="${ctx}/jsp/chart/chartStyle.css" type="text/css">
<%-- 引入EasyUI --%>
<link href="${ctx}/js/jslib/jquery-easyui/jquery-easyui-theme/default/easyui.css" rel="stylesheet" type="text/css" />
<link href="${ctx}/js/jslib/jquery-easyui/jquery-easyui-theme/icon.css" rel="stylesheet" type="text/css" />
<link href="${ctx}/js/jslib/jquery-easyui/icons/icon-all.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="${ctx}/js/jslib/jquery-easyui/jquery-easyui-1.3.6/jquery.easyui.min.js" charset="utf-8"></script>
<script type="text/javascript" src="${ctx}/js/jslib/jquery-easyui/jquery-easyui-1.3.6/locale/easyui-lang-zh_CN.js" charset="utf-8"></script>
<script src="${ctx}/js/jslib/jquery.jdirk.js" type="text/javascript"></script>
<script src="${ctx}/js/jslib/jquery-easyui/release/jeasyui.extensions.all.min.js"></script>
<script src="${ctx}/js/jslib/jquery-easyui/icons/jeasyui.icons.all.js"></script>
<link href="${ctx}/js/jslib/jquery-easyui/jeasyui-extensions/jeasyui.extensions.css" rel="stylesheet" type="text/css" />

<script src="${ctx}/js/jslib/jquery.nicescroll.js"></script>
<%--引入附件上传插件--%>
<link href="${ctx}/js/jslib/jquery-easyui/plugins/uploadify/uploadify.css" rel="stylesheet" type="text/css" />
<script src="${ctx}/js/jslib/jquery-easyui/jeasyui-extensions/jeasyui.extensions.progressbar.js"></script>
<script src="${ctx}/js/jslib/jquery-easyui/plugins/uploadify/jquery.uploadify.js?ver=<%=System.currentTimeMillis()%>"></script>
<script src="${ctx}/js/jslib/jquery-easyui/jeasyui-extensions/jquery.euploadify.js"></script>



<!-- 引入EasyUI Portal插件 -->
<link rel="stylesheet" href="${ctx}/js/jslib/jquery-easyui-portal/portal.css" type="text/css">
<script type="text/javascript" src="${ctx}/js/jslib/jquery-easyui-portal/jquery.portal.js" charset="utf-8"></script>
<script type="text/javascript" src="${ctx}/js/jslib/jquery.SuperSlide.2.1.1.js" charset="utf-8"></script>

<!-- 引入datetimepicker插件 -->
<link rel="stylesheet" href="${ctx}/js/jslib/datetimepicker/jquery.datetimepicker.css" type="text/css">
<script type="text/javascript" src="${ctx}/js/jslib/datetimepicker/jquery.datetimepicker.js" charset="utf-8"></script>

<!-- 引入fullcalendar插件 -->
<link href='${ctx}/js/fullcalendar/fullcalendar/fullcalendar.css' rel='stylesheet' />
<link href='${ctx}/js/fullcalendar/fullcalendar/fullcalendar.print.css' rel='stylesheet' media='print' />
<script src="${ctx}/js/fullcalendar/fullcalendar/fullcalendar.min.js"></script>

<!-- 引入easydialog插件 -->
<link href="${ctx}/main/css/easydialog.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" charset="utf-8" src="${ctx}/main/js/easydialog.min.js"></script>
<script type="text/javascript" charset="utf-8" src="${ctx}/js/ttScrollBar.js"></script>

<!-- 扩展EasyUI -->
<script type="text/javascript" src="${ctx}/js/jslib/extEasyUI.js?v=201305241044" charset="utf-8"></script>

<!-- 扩展jQuery -->
<script type="text/javascript" src="${ctx}/js/jslib/extJquery.js?v=201305301341" charset="utf-8"></script>

<!--引入validate校验 -->
<script type="text/javascript" charset="utf-8" src="${ctx}/js/validate/jquery.validate.js"></script>
<script language="javascript" charset="utf-8" type="text/javascript" src="${ctx}/js/validate/customValidate.js"></script>


<script>
//改变全局异常回调事件
$.easyui.ajaxError(function (XMLHttpRequest, textStatus, errorThrown) {
	
});


function loginOut() {
	if (confirm("是否要退出系统？")) {
		$.ajax({
			url:"${ctx}/login/systemExit_login.action",
			type:'post',
			data:{},
			dataType: 'json',
			success: function(result){
				window.top.location.href = "${ctx}/jsp/tyjg/login/loginx.jsp"
			 }
		});
	}
}
function modifyPwd(){
	window.parent.parent.frames['mainFrame'].location.href = url;
}






$(document).ready(function(){
	$(".sc").niceScroll({  
		cursorcolor:"#555",  
		cursoropacitymax:1,  
		touchbehavior:false,  
		cursorwidth:"8px",  
		cursorborder:"0",  
		cursorborderradius:"8px"  
	}); 
});

</script>


</script>