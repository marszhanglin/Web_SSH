/**每页长度 */
var response_onePage_size=10;
/**第几页 */
var response_onePage_num=1;
/**共几页 */
var response_onePage_all;
/**记录数 */
var response_sum_line;

/**搜索资源 */
function resPonseSearchOnclick(){  
	var responseIndiName= $('#responseIndiName')[0].value; 
	var responseIndiCode= $('#responseIndiCode')[0].value;   
	var responseIndiSource= $('#responseIndiSource')[0].value;  
	
	/**resTree*/ 
	$.post(eve.contextPath + '/jf/planmodel/responseSearch', {
		responseIndiName : responseIndiName , responseIndiCode : responseIndiCode , responseIndiSource : responseIndiSource , response_onePage_size : response_onePage_size ,response_onePage_num :response_onePage_num , planInfoID : planInfoID
    }, function(result) {
    	var resjson1=new Array();
    	if(result.success){
    		set_value_onfinish_responsepost(result);
    		for( var i=0;i<result.json.length;i++){
    	     	  var contactAddress=result.json[i];
    	     	  var obj = eval('(' + contactAddress + ')'); 
    	     	  var newContactAddress= {
		    	         	"attributes": {
		    	         		"displayOrder": i
		    	         	},
		    	         	"checked": false,
		    	         	"children": [],
		    	         	"id": obj.id,
		    	         	"pid": "",
		    	         	"obj_name" : obj.indiname,
		    	         	"state": "open",
		    	         	// onmouseout='abc();' onmouseover='restest2(\""+obj.name+obj.tablenamecn+"\");'
		    	         	"text": "<table   style='margin:1px 1px 1px 1px; width:500px;'>" +
		    	         			"<tr><td width='40%' style='BORDER-RIGHT: #b6b6b6 1px solid;'>"+((obj.indiname.length>15)?(obj.indiname.substr(0,14)+".."):obj.indiname)+"</td>" +
		    	         				"<td width='30%' style='BORDER-RIGHT: #b6b6b6 1px solid;'>"+((obj.indisource!=null&&obj.indisource.length>15)?(obj.indisource.substr(0,14)+".."):((obj.indisource==null)?"":obj.indisource))+"</td>"
		    	         	+"<td style='BORDER-RIGHT: #b6b6b6 1px solid;' width='30%'>"+((obj.indicode==null)?'':obj.indicode)+"</td><tr></table>"
		    	         }; 
    	     	 resjson1.push(newContactAddress); 
    	     	} 
    		resPonseTree.tree('loadData',resjson1); 
    	} 
    }, 'json');  
}





function response_page_select_onchange(){
	var response_page_select_value= $("#response_page_select")[0].value;
	if(response_page_select_value=="10"){
		response_onePage_size="10";
		response_onePage_num=1;
		resPonseSearchOnclick();
	}else if(response_page_select_value=="20"){
		response_onePage_size="20";
		response_onePage_num=1;
		resPonseSearchOnclick();
	}else if(response_page_select_value=="30"){
		response_onePage_size="30";
		response_onePage_num=1;
		resPonseSearchOnclick();
	}else if(response_page_select_value=="40"){
		response_onePage_size="40";
		response_onePage_num=1;
		resPonseSearchOnclick();
	}else if(response_page_select_value=="50"){
		response_onePage_size="50";
		response_onePage_num=1;
		resPonseSearchOnclick();
	}else if(response_page_select_value=="100"){
		response_onePage_size="100";
		response_onePage_num=1;
		resPonseSearchOnclick();
	}else if(response_page_select_value=="200"){
		response_onePage_size="200";
		response_onePage_num=1;
		resPonseSearchOnclick();
	}else if(response_page_select_value=="300"){
		response_onePage_size="300";
		response_onePage_num=1;
		resPonseSearchOnclick();
	}else if(response_page_select_value=="400"){
		response_onePage_size="400";
		response_onePage_num=1;
		resPonseSearchOnclick();
	}else if(response_page_select_value=="500"){
		response_onePage_size="500";
		response_onePage_num=1;
		resPonseSearchOnclick();
	}
}

/**首页*/
function response_page_firstpage_onclick(){
	response_onePage_num=1;
	resPonseSearchOnclick();
}
/**下一页*/
function response_page_rightnextpage_onclick(){
	if(response_onePage_num<response_onePage_all){
		response_onePage_num=response_onePage_num+1;
		resPonseSearchOnclick();
	}
}
/**上一页*/
function response_page_leftnextpage_onclick(){
	if(response_onePage_num!=1){
		response_onePage_num=response_onePage_num-1;
		resPonseSearchOnclick();
	} 
}
/**末页*/
function response_page_lastpage_onclick(){
	response_onePage_num=response_onePage_all;
	resPonseSearchOnclick();
}
/**分页赋值 第共几页 */
function set_value_onfinish_responsepost(result){
	response_sum_line=parseInt(result.sum_line, 10);
	response_onePage_all=parseInt(response_sum_line/response_onePage_size+"")+1;
	$("#response_page_allpage_span")[0].innerHTML="共"+(parseInt(response_sum_line/response_onePage_size+"")+1)+"页";
	$("#response_page_input_num")[0].value=response_onePage_num;
}



/**添加响应指标*/
var addResPonseFun = function() {
	var dialog = parent.eve.modalDialog({
		title : '添加响应指标信息',
		width : 640,
	    height : 400,
		url : eve.contextPath + '/jf/planmodel/responseindiadd?id='+planInfoID,
		buttons : [ {
			text : '保 存',
			iconCls:'icon-save',
			handler : function() {
				dialog.find('iframe').get(0).contentWindow.submitForm(dialog, window);
			}
		} , {
          text : '取 消',
          iconCls : 'icon-cancel',
          handler : function() {
              dialog.dialog('destroy');
          }
      }]
	});
};

function delete_response_indi_byid(){
	$.post(eve.contextPath + '/jf/planmodel/delResponseIndi', {
		id : resPonse_indi_node.id
    }, function(result) {
    	if(result.success){
//    		reloadData(result.clickNodeId);
//    		deleteNode(id)
    		$('#ResponsesearchForm input').val('');
		    resPonseSearchOnclick(); 
    	} 
    	resPonse_indi_node=undefined;
    }, 'json');
}
/**编辑响应指标*/
var editResponseIndiFun = function() {
	var dialog = parent.eve.modalDialog({
		title : '修改响应指标信息',
		width : 640,
	    height : 400,
		url : eve.contextPath + '/jf/planmodel/responseedit?id='+resPonse_indi_node.id,
		buttons : [ {
			text : '保 存',
			iconCls:'icon-save',
			handler : function() {
				dialog.find('iframe').get(0).contentWindow.submitForm(dialog, window);
			}
		} , {
          text : '取 消',
          iconCls : 'icon-cancel',
          handler : function() {
              dialog.dialog('destroy');
          }
      }]
	});
	resPonse_indi_node=undefined;
};

function responseIndicorrAddOndrap(type,resPonse_indi_id){
	var dialog = parent.eve.modalDialog({
		title : '配置响应指标对应信息',
		width : 640,
	    height : 450,
		url : eve.contextPath + '/jf/planmodel/drapresponseIndicorr?resLevel='+type+"&resPonse_indi_id="+resPonse_indi_id,
		buttons : [ {
			text : '保 存',
			iconCls:'icon-save',
			handler : function() {
				dialog.find('iframe').get(0).contentWindow.submitForm(dialog, window);
			}
		} , {
          text : '取 消',
          iconCls : 'icon-cancel',
          handler : function() {
              dialog.dialog('destroy');
          }
      }]
	});
	resPonse_indi_node=undefined; 
};

function  editResponseIndicorrFun(id){
	var dialog = parent.eve.modalDialog({
		title : '修改响应指标对应信息',
		width : 640,
	    height : 400,
		url : eve.contextPath + '/jf/planmodel/responseIndicorredit?id='+id,
		buttons : [ {
			text : '保 存',
			iconCls:'icon-save',
			handler : function() {
				dialog.find('iframe').get(0).contentWindow.submitForm(dialog, window);
			}
		} , {
          text : '取 消',
          iconCls : 'icon-cancel',
          handler : function() {
              dialog.dialog('destroy');
          }
      }]
	});
};

