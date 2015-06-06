<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML >
<html lang="zh-cn">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap 101 Template</title>

    <!-- Bootstrap -->
    <link href="<%=basePath %>/jsp/bootstrap/css/bootstrap.min.css" rel="stylesheet"> 
    <script src="<%=basePath %>/jslib/jquery/jquery-1.9.1.min.js"></script> 
    <script src="<%=basePath %>/jsp/bootstrap/js/bootstrap.min.js"></script>
  </head>
  <body>
     
	<div class="jumbotron">
	<h1>你好，世界！<br>
	<small><a href="http://getbootstrap.com/components/#glyphicons">http://getbootstrap.com/components/#glyphicons</a></small><br>
	<small><a href="http://www.imooc.com/learn/141">http://www.imooc.com/learn/141</a></small></h1>
	
	<a href="<%=basePath %>struts/bootstrap/Bootstrap_bs15.action" >Learn 1 全局样式及排版» </a> <br>
	<a href="<%=basePath %>struts/bootstrap/Bootstrap_bs16.action" >Learn 1 表单» </a>
	
	</div>  
  </body>
</html>