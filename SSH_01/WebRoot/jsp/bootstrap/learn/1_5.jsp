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
<title>全局样式</title>
<!-- Bootstrap -->
<link href="<%=basePath %>/jsp/bootstrap/css/bootstrap.min.css"
	rel="stylesheet">
<!--你自己的样式文件 -->
<!-- <link href="css/your-style.css" rel="stylesheet"> -->
<!-- 以下两个插件用于在IE8以及以下版本浏览器支持HTML5元素和媒体查询，如果不需要用可以移除 -->
<!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
        <!-- 如果要使用BOOTSTRAP的JS插件，必须先调入JQUERY -->
	<!-- 包括所有BOOTSTRAP的JS插件或者可以根据需要使用的JS插件调用　-->
	<script src="<%=basePath %>/jslib/jquery/jquery-1.9.1.min.js"></script>
	<script src="<%=basePath %>/jsp/bootstrap/js/bootstrap.min.js"></script>
</head>
<body>

      <!-- Main jumbotron for a primary marketing message or call to action -->
      <div class="jumbotron">
        <h1>Hello, world!</h1>
        <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
        <p><a href="#" >Learn more »</a></p>
      </div>
      <!--Bootstrap中使用了<small>标签来制作副标题-->
		<h1>Bootstrap标题一<small>我是副标题</small></h1>
		<h2>Bootstrap标题二<small>我是副标题</small></h2>
		<h3>Bootstrap标题三<small>我是副标题</small></h3>
		<h4>Bootstrap标题四<small>我是副标题</small></h4>
		<h5>Bootstrap标题五<small>我是副标题</small></h5>
		<h6>Bootstrap标题六<small>我是副标题</small></h6>
		<!-- 强调内容 --><br>
		<p>我是普通文本，我的样子长成这样我是普通文本，我的样子长成这样我是普通文本，</p>
		<p class="lead">我是特意要突出的文本，我的样子成这样。我是特意要突出的文本，我的样子长成这样。</p>
    	<!-- 粗体 --><br>
    	<p style="font-size: 20px;">我在学习Bootstrap，我要掌握<strong>Bootstrap</strong>的所有知识。</p>
    	<!-- 斜体 --><br>
    	<p>我在慕课网上跟大漠一起学习Bootstrap的使用。我一定要学会Bootstrap。</p>
 		<p>我在慕课网上跟<em>大漠</em>一起学习<i>Bootstrap</i>的使用。我一定要学会<i>Bootstrap</i>。</p>
 		<!-- 强调相关的类 --><br>
		<div class="text-muted">.text-muted 效果</div>
		<div class="text-primary">.text-primary效果</div>
		<div class="text-success">.text-success效果</div>
		<div class="text-info">.text-info效果</div>
		<div class="text-warning">.text-warning效果</div>
		<div class="text-danger">.text-danger效果</div>
		<!-- 对齐相关的类 --><br>
		<div class="jumbotron">
		<p class="text-left">我居左</p>
		<p class="text-center">我居中</p>
		<p class="text-right">我居右</p>
		<p class="text-justify">我两端对齐</p>
		<p class="text-justify">我两端对齐There is clearly a need for CSS to be
			taken seriously by graphic artists. The Zen Garden aims to excite,
			inspire, and encourage participation. To begin, view some of the
			existing designs in the list. Clicking on any one will load the style
			sheet into this very page. The code remains the same, the only thing
			that has changed is the external .css file.</p>
			</div>
			<!-- 列表 --><br>
			<ul>
				<li>无序列表信息1</li>
				<li>无序列表信息2</li>
				<li>无序列表信息3</li>
			</ul>
			<ol>
				<li>有序列表信息1</li>
				<li>有序列表信息2</li>
				<li>有序列表信息3</li>
			</ol>
			<dl>
				<dt>定义列表标题</dt>
				<dd>定义列表信息1</dd>
				<dd>定义列表信息2</dd> 
			</dl>
			
			<!--无序列表去点-->
			<ul>
				<li>项目列表
					<ul>
						<li>带有项目符号</li>
						<li>带有项目符号</li>
					</ul>
				</li>
				<li>项目列表
					<ul class="list-unstyled">
						<li>不带项目符号</li>
						<li>不带项目符号</li>
					</ul>
				</li>
				<li>项目列表</li>
			</ul>
			<!--有序列表去序号-->
			<ol>
				<li>项目列表
					<ol>
						<li>带有项目编号</li>
						<li>带有项目编号</li>
					</ol>
				</li>
				<li>项目列表
					<ol class="list-unstyled">
						<li>不带项目编号</li>
						<li>不带项目编号</li>
					</ol>
				</li>
				<li>项目列表</li>
			</ol>
			
			<!-- 内联列表 --><br>
			<ul class="list-inline">
			    <li><STRONG>W3cplus</STRONG></li>
			    <li><STRONG>Blog</STRONG></li>
			    <li><STRONG>CSS3</STRONG></li>
			    <li><STRONG>jQuery</STRONG></li>
			    <li><STRONG>PHP</STRONG></li>
			</ul>
			<ul class="list-inline">
			    <li>W3cplus</li>
			    <li>Blog</li>
			    <li>CSS3</li>
			    <li>jQuery</li>
			    <li>PHP</li>
			</ul>

		<!-- 定义列表 --><br>
		<dl>
		    <dt>W3cplus</dt>
		    <dd>一个致力于推广国内前端行业的技术博客</dd>
		    <dt>慕课网</dt>
		    <dd>一个真心在做教育的网站</dd>
		    <!-- <dt>慕课网</dt>
		    <dd><ul class="list-inline">
			    <li>W3cplus</li>
			    <li>Blog</li>
			    <li>CSS3</li>
			    <li>jQuery</li>
			    <li>PHP</li>
			</ul></dd> -->
		</dl>
		
		
		<!-- 代码风格 --><br>
		<div>
			code风格：
			<code>&lt;code&gt;</code>
			、
			<code>&lt;pre&gt;</code>
			和
			<code>&lt;kbd&gt;</code>
		</div>
		<div>
			pre风格：
			<pre>
			&lt;ul&gt;
			&lt;li&gt;...&lt;/li&gt;
			&lt;li&gt;...&lt;/li&gt;
			&lt;li&gt;...&lt;/li&gt;
			&lt;/ul&gt;
			</pre>
		</div>
		kbd风格：
		<kbd>ctrl+c</kbd>
		<kbd>ctrl+v</kbd>
		</div>
		
		
		<!-- 表格风格 --><br>
		<h1>基础表格</h1>
	<table class="table">
	   <thead>
	     <tr>
	       <th>表格标题</th>
	       <th>表格标题</th>
	       <th>表格标题</th>
	     </tr>
	   </thead>
	   <tbody>
	     <tr>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	     </tr>
	     <tr>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	     </tr>
	   </tbody>
	 </table>
	<h1>斑马线表格</h1>
	<table class="table table-striped">
	   <thead>
	     <tr>
	       <th>表格标题</th>
	       <th>表格标题</th>
	       <th>表格标题</th>
	     </tr>
	   </thead>
	   <tbody>
	     <tr>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	     </tr>
	     <tr>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	     </tr>
	     <tr>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	     </tr>
	     <tr>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	     </tr>
	   </tbody>
	 </table>
	<h1>带边框的表格</h1>
	 <table class="table table-bordered">
	   <thead>
	     <tr>
	       <th>表格标题</th>
	       <th>表格标题</th>
	       <th>表格标题</th>
	     </tr>
	   </thead>
	   <tbody>
	     <tr>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	     </tr>
	     <tr>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	     </tr>
	     <tr>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	     </tr>
	     <tr>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	     </tr>
	   </tbody>
	 </table>
	<h1>鼠标悬浮高亮的表格</h1>
	<table class="table table-striped table-bordered table-hover">
	   <thead>
	     <tr>
	       <th>表格标题</th>
	       <th>表格标题</th>
	       <th>表格标题</th>
	     </tr>
	   </thead>
	   <tbody>
	     <tr>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	     </tr>
	     <tr>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	     </tr>
	     <tr>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	     </tr>
	     <tr>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	     </tr>
	   </tbody>
	 </table>
	 <h1>紧凑型表格</h1>
	  <table class="table table-condensed">
	   <thead>
	     <tr>
	       <th>表格标题</th>
	       <th>表格标题</th>
	       <th>表格标题</th>
	     </tr>
	   </thead>
	   <tbody>
	     <tr>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	     </tr>
	     <tr>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	     </tr>
	     <tr>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	     </tr>
	     <tr>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	     </tr>
	   </tbody>
	 </table>
	 <h1>响应式表格</h1>
	 <div class="table-responsive">
	   <table class="table table-bordered">
	   <thead>
	     <tr>
	       <th>表格标题</th>
	       <th>表格标题</th>
	       <th>表格标题</th>
	     </tr>
	   </thead>
	   <tbody>
	     <tr>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	     </tr>
	     <tr>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	     </tr>
	     <tr>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	     </tr>
	     <tr>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	       <td>表格单元格</td>
	     </tr>
	   </tbody>
	 </table>
	</div>
	<table class="table table-bordered">
  <thead>
    <tr>
      <th>tr的类名</th>
      <th>描述</th>
    </tr>
  </thead>
  <tbody>
    <tr class="active">
      <td>.active</td>
      <td>表示当前活动的信息</td>
    </tr>
    <tr class="success">
      <td>.success</td>
      <td>表示成功或者正确的行为</td>
    </tr>
    <tr class="info">
      <td>.info</td>
      <td>表示中立的信息或行为</td>
    </tr>
    <tr class="warning">
      <td>.warning</td>
      <td>表示警告，需要特别注意</td>
    </tr>
    <tr class="danger">
      <td>.danger</td>
      <td>表示危险或者可能是错误的行为</td>
    </tr>
  </tbody>
</table> 

<!-- 多彩列表组 --><h3 class="text-center">多彩列表组</h3>
<div class="list-group">
    <a href="##" class="list-group-item active"><span class="badge">5902</span>图解CSS3</a>
    <a href="##" class="list-group-item list-group-item-success"><span class="badge">15902</span>W3cplus</a>
	<a href="##" class="list-group-item list-group-item-info"><span class="badge">59020</span>慕课网</a>
	<a href="##" class="list-group-item list-group-item-warning"><span class="badge" >0</span><div>adads<br><span >Sass中国的撒</span><br><em>大大撒大苏打似的阿斯顿大苏打上</em></div></a>
	<a href="##" class="list-group-item list-group-item-danger"><span class="badge">10</span>Mobile教程</a>
</div>
</body>
</html>
