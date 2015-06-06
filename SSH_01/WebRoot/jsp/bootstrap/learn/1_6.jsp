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
<title>Bootstrap的HTML排版</title>
<!-- Bootstrap -->
<link href="<%=basePath %>/jsp/bootstrap/css/bootstrap.min.css"
	rel="stylesheet">
<!--你自己的样式文件 -->
   <link href="<%=basePath %>/jsp/bootstrap/css/self_style.css" rel="stylesheet">      

<!-- 如果要使用BOOTSTRAP的JS插件，必须先调入JQUERY -->
<!-- 包括所有BOOTSTRAP的JS插件或者可以根据需要使用的JS插件调用　-->
<script src="<%=basePath %>/jslib/jquery/jquery-1.9.1.min.js"></script>
<script src="<%=basePath %>/jsp/bootstrap/js/bootstrap.min.js"></script>
</head>
<body> 
<h3 class="text-center">horizontal表单 </h3>
<form class="form-horizontal" role="form" style="margin: 10px 10px 10px 10px;">
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">邮箱</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" id="inputEmail3" placeholder="请输入您的邮箱地址">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword3" placeholder="请输入您的邮箱密码">
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <div class="checkbox">
        <label>
          <input type="checkbox"> 记住密码
        </label>
      </div>
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-default">进入邮箱</button>
    </div>
  </div>
</form>


<!-- 内联表单 --><h3 class="text-center">内联表单 </h3><br>
<form class="form-inline" role="form">
  <div class="form-group">
    <label class="sr-only" for="exampleInputEmail2">邮箱</label>
    <input type="email" class="form-control" id="exampleInputEmail2" placeholder="请输入你的邮箱地址">
  </div>
  <div class="form-group">
    <label class="sr-only" for="exampleInputPassword2">密码</label>
    <input type="password" class="form-control" id="exampleInputPassword2" placeholder="请输入你的邮箱密码">
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox"> 记住密码
    </label>
  </div>
  <button type="submit" class="btn btn-default">进入邮箱</button>
</form>

  <!-- 表单控件 --><h3 class="text-center">表单控件</h3><br>
<form class="form-inline" role="form">
  <div class="form-group">
    <label class="sr-only" for="exampleInputEmail2">邮箱</label>
    <input type="email" class="form-control" id="exampleInputEmail2" placeholder="请输入你的邮箱地址">
  </div>
  <div class="form-group"  >
    <select class="form-control"> 
      <option class="text-success">男</option> 
      <option class="text-danger">女</option>  
      </select>
  </div>
  <div class="form-group">
    <label class="sr-only" for="exampleInputPassword2">密码</label>
    <input type="password" class="form-control" id="exampleInputPassword2" placeholder="请输入你的邮箱密码">
  </div>
    <div class="form-group">
    <textarea class="form-control" rows="3"></textarea>
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox"> 记住密码
    </label>
  </div>
  <div class="radio">
    <label>
      <input type="radio" name="optionsRadios" id="optionsRadios1" value="love" checked>
      喜欢
    </label>
  </div>
    <div class="radio">
    <label>
      <input type="radio" name="optionsRadios" id="optionsRadios2" value="hate">
      不喜欢
    </label>
  </div>
  
  <div class="form-group">
    <label class="checkbox-inline">
      <input type="checkbox"  value="option1">游戏
    </label>
    <label class="checkbox-inline">
      <input type="checkbox"  value="option2">摄影
    </label>
    <label class="checkbox-inline">
    <input type="checkbox"  value="option3">旅游
    </label>
  </div>
  <div class="form-group">
    <label class="radio-inline">
      <input type="radio"  value="option1" name="sex">男性
    </label>
    <label class="radio-inline">
      <input type="radio"  value="option2" name="sex">女性
    </label>
    <label class="radio-inline">
      <input type="radio"  value="option3" name="sex">中性
    </label>
  </div>
  <button type="submit" class="btn btn-default">进入邮箱</button>
</form>

<!-- 按钮 --><h3 class="text-center">按钮</h3><br>
<table class="table table-bordered table-striped">  
    <thead>  
      <tr>  
        <th>Button</th>  
        <th>class=""</th>  
        <th>Description</th>  
      </tr>  
    </thead>  
    <tbody>  
      <tr>  
        <td><button class="btn" href="#">Default</button></td>  
        <td><code>btn</code></td>  
        <td>Standard gray button with gradient</td>  
      </tr>  
      <tr>  
        <td><button class="btn btn-primary" href="#">Primary</button></td>  
        <td><code>btn btn-primary</code></td>  
        <td>Provides extra visual weight and identifies the primary action in a set of buttons</td>  
      </tr>  
      <tr>  
        <td><button class="btn btn-info" href="#">Info</button></td>  
        <td><code>btn btn-info</code></td>  
        <td>Used as an alternative to the default styles</td>  
      </tr>  
      <tr>  
        <td><button class="btn btn-success" href="#">Success</button></td>  
        <td><code>btn btn-success</code></td>  
        <td>Indicates a successful or positive action</td>  
      </tr>  
      <tr>  
        <td><button class="btn btn-warning" href="#">Warning</button></td>  
        <td><code>btn btn-warning</code></td>  
        <td>Indicates caution should be taken with this action</td>  
      </tr>  
      <tr>  
        <td><button class="btn btn-danger" href="#">Danger</button></td>  
        <td><code>btn btn-danger</code></td>  
        <td>Indicates a dangerous or potentially negative action</td>  
      </tr>  
      <tr>  
        <td><button class="btn btn-inverse" href="#">Inverse</button></td>  
        <td><code>btn btn-inverse</code></td>  
        <td>Alternate dark gray button, not tied to a semantic action or use</td>  
      </tr>
      <tr>
      <td><button class="btn btn-primary btn-lg" type="button">大型按钮.btn-lg</button></td>  
      <td><button class="btn btn-primary" type="button">正常按钮</button></td> 
      <td><button class="btn btn-primary btn-sm" type="button">小型按钮.btn-sm</button></td> 
      </tr>  
    </tbody>  
  </table>
  <button class="btn btn-primary btn-xs" type="button">超小型按钮.btn-xs</button>
  <button class="btn btn-primary btn-block disabled" type="button">通过添加类名disabled禁用按钮</button>
  
  <!-- 表单大小 --><h3 class="text-center">表单大小</h3><br>
  <form role="form">
  <div class="form-group">
    <label class="control-label">控件变大</label>
    <input class="form-control input-lg" type="text" placeholder="添加.input-lg，控件变大">
  </div>
  <div class="form-group">
    <label class="control-label">正常大小</label>
    <input class="form-control" type="text" placeholder="正常大小">
  </div>  
  <div class="form-group">
    <label class="control-label">控件变小</label>
    <input class="form-control input-sm" type="text" placeholder="添加.input-sm，控件变小">
  </div> 
</form>  
<form role="form" class="form-horizontal">
  <div class="form-group">
    <div class="col-xs-4">
      <input class="form-control input-lg" type="text" placeholder=".col-xs-4">
    </div>
    <div class="col-xs-4">
      <input class="form-control input-lg" type="text" placeholder=".col-xs-4">
    </div>
    <div class="col-xs-4">
      <input class="form-control input-lg" type="text" placeholder=".col-xs-4">
    </div>
  </div>
  <div class="form-group">
    <div class="col-xs-6"><input class="form-control" type="text" placeholder=".col-xs-6"></div>
    <div class="col-xs-6"><input class="form-control" type="text" placeholder=".col-xs-6"></div>
    
  </div>  
  <div class="form-group">
    <div class="col-xs-5">
      <input class="form-control input-sm" type="text" placeholder=".col-xs-5">
    </div>
    <div class="col-xs-7">
      <input class="form-control input-sm" type="text" placeholder=".col-xs-7">
    </div>
  </div>  
  <input class="form-control input-lg" id="disabledInput" type="text" placeholder="表单已被禁用，不可输入" disabled>
</form> 
<!-- 表单控件状态 --><h3 class="text-center">表单控件状态</h3><br>
<form role="form">
  <div class="form-group has-success">
    <label class="control-label" for="inputSuccess1">成功状态</label>
    <input type="text" class="form-control" id="inputSuccess1" placeholder="成功状态" >
  </div>
  <div class="form-group has-warning">
    <label class="control-label" for="inputWarning1">警告状态</label>
    <input type="text" class="form-control" id="inputWarning1" placeholder="警告状态">
  </div>
  <div class="form-group has-error">
    <label class="control-label" for="inputError1">错误状态</label>
    <input type="text" class="form-control" id="inputError1" placeholder="错误状态">
  </div>
</form> 
<form role="form">
  <div class="form-group has-success has-feedback">
    <label class="control-label" for="inputSuccess1">成功状态</label>
    <input type="text" class="form-control" id="inputSuccess1" placeholder="成功状态" >
    <span class="glyphicon glyphicon-ok form-control-feedback"></span>
  </div> 
  <div class="form-group has-warning has-feedback">
    <label class="control-label" for="inputWarning1">警告状态</label>
    <input type="text" class="form-control" id="inputWarning1" placeholder="警告状态">
    <span class="glyphicon glyphicon-warning-sign form-control-feedback"></span>
  </div> 
  <div class="form-group has-error has-feedback"> 
    <label class="control-label" for="inputError1">错误状态</label> 
    <input type="text" class="form-control" id="inputError1" placeholder="错误状态"> 
    <span class="glyphicon glyphicon-remove form-control-feedback"></span> 
  </div> 
</form> 

<!-- 图片 --><h3 class="text-center">图片</h3><br>
<div class="container">
  <div class="row">
    <div class="col-sm-4">
      <img   alt="140x140" src="http://placehold.it/140x140">
        <div>默认图片</div>
    </div>
    <div class="col-sm-4">
      <img  class="img-rounded" alt="140x140" src="http://placehold.it/140x140"> 
        <div>圆角图片</div>
    </div>
    <div class="col-sm-4">
      <img  class="img-circle" alt="140x140" src="http://placehold.it/140x140">
        <div>圆形图片</div>
    </div>
      <div class="row">
        <div class="col-sm-6">
          <img  class="img-thumbnail" alt="140x140" src="http://placehold.it/140x140"> 
            <div>缩略图</div>
        </div>
        <div class="col-sm-6">
          <img  class="img-responsive" alt="140x140" src="http://placehold.it/140x140" /> 
          <div>响应式图片</div>
        </div>
      </div>
  </div>
</div> 
<!-- 图片 --><h3 class="text-center">图标 很多找找材料	</h3><br>
	<span class="glyphicon glyphicon-search"></span>
	<span class="glyphicon glyphicon-asterisk"></span>
	<span class="glyphicon glyphicon-plus"></span>
	<span class="glyphicon glyphicon-cloud"></span>
</body>
</html>
