<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Bootstrap的HTML标准模板</title>
<!-- Bootstrap -->
<link href="<%=basePath %>/jsp/bootstrap/css/bootstrap.min.css"
	rel="stylesheet">
<!--你自己的样式文件 -->
<link href="css/your-style.css" rel="stylesheet">
<!-- 以下两个插件用于在IE8以及以下版本浏览器支持HTML5元素和媒体查询，如果不需要用可以移除 -->
<!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
</head>
<body>
	<h1>Hello, world!</h1>
	<!-- 如果要使用BOOTSTRAP的JS插件，必须先调入JQUERY -->
	<!-- 包括所有BOOTSTRAP的JS插件或者可以根据需要使用的JS插件调用　-->
	<script src="<%=basePath %>/jslib/jquery/jquery-1.9.1.min.js"></script>
	<script src="<%=basePath %>/jsp/bootstrap/js/bootstrap.min.js"></script>

</body>
</html>
