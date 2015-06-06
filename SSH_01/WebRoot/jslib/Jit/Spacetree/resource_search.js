/**每页长度 */
var res_onePage_size=10;
/**第几页 */
var res_onePage_num=1;
/**共几页 */
var res_onePage_all;
/**记录数 */
var sum_line;

/**搜索资源*/
function resSearchOnclick(){  
	var resNmae= $('#resNmae')[0].value; 
	var resType= $('#resType')[0].value;   
	var resArea= $('#resArea')[0].value;  
	
	/**resTree*/ 
	$.post(eve.contextPath + '/jf/planmodel/resSearch', {
		resNmae : resNmae , resType : resType , resArea : resArea , res_onePage_size : res_onePage_size ,res_onePage_num :res_onePage_num
    }, function(result) {
    	var resjson1=new Array();
    	if(result.success){
    		set_value_onfinishpost(result);
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
		    	         	"obj_name" : obj.name,
		    	         	"state": "open",
		    	         	// onmouseout='abc();' onmouseover='restest2(\""+obj.name+obj.tablenamecn+"\");'
		    	         	"text": "<table   style='margin:1px 1px 1px 1px; width:500px;'><tr><td width='40%' style='BORDER-RIGHT: #b6b6b6 1px solid;'>"+((obj.name.length>15)?(obj.name.substr(0,14)+".."):obj.name)+"</td><td width='30%' style='BORDER-RIGHT: #b6b6b6 1px solid;'>"+((obj.deptname==null)?'':obj.deptname)+"</td>"
		    	         	+"<td style='BORDER-RIGHT: #b6b6b6 1px solid;' width='30%'>"+((obj.tablenamecn==null)?'':obj.tablenamecn)+"</td><tr></table>"
		    	         }; 
    	     	 resjson1.push(newContactAddress); 
    	     	} 
    		resTree.tree('loadData',resjson1); 
    	} 
    }, 'json');  
}


/**添加资源调度窗*/
var addResourceFun = function() {
	var dialog = parent.eve.modalDialog({
		title : '添加资源调度信息',
		width : 640,
	    height : 315,
		url : eve.contextPath + '/jf/planmodel/resourceadd?id='+planInfoID,
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
/**编辑资源调度窗*/
var editResourceFun = function(resourceId) {
	var dialog = parent.eve.modalDialog({
		title : '编辑资源调度信息',
		width : 640,
	    height : 315,
		url : eve.contextPath + '/jf/planmodel/resourceedit?id='+planInfoID+"&resourceId="+resourceId,
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

function resAddOndrap(){
//	$.post(eve.contextPath + '/jf/planmodel/drapResource', {
//		planInfoID : planInfoID , equipId: ResourceDrapedNode.id
//	}, function(result) {
//		if(result.success){
////			reloadData("node003"); 
//			editResourceFun(result.id);
//		} 
//	}, 'json');
	
	
	
	var dialog = parent.eve.modalDialog({
		title : '添加资源调度信息',
		width : 640,
	    height : 315,
		url : eve.contextPath + '/jf/planmodel/resourceadd?id='+planInfoID
		+"&equipId="+ResourceDrapedNode.id,
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


function restest2(record){
	var div=$("#showDetailRes")[0];
	div.innerHTML=record; 
	div.style.visibility="visible";
}

function abc(){
	var div=$("#showDetailRes")[0];
	div.style.visibility="hidden"; 
}


function res_page_select_onchange(){
	var res_page_select_value= $("#res_page_select")[0].value;
	if(res_page_select_value=="10"){
		res_onePage_size="10";
		res_onePage_num=1;
		resSearchOnclick();
	}else if(res_page_select_value=="20"){
		res_onePage_size="20";
		res_onePage_num=1;
		resSearchOnclick();
	}else if(res_page_select_value=="30"){
		res_onePage_size="30";
		res_onePage_num=1;
		resSearchOnclick();
	}else if(res_page_select_value=="40"){
		res_onePage_size="40";
		res_onePage_num=1;
		resSearchOnclick();
	}else if(res_page_select_value=="50"){
		res_onePage_size="50";
		res_onePage_num=1;
		resSearchOnclick();
	}else if(res_page_select_value=="100"){
		res_onePage_size="100";
		res_onePage_num=1;
		resSearchOnclick();
	}else if(res_page_select_value=="200"){
		res_onePage_size="200";
		res_onePage_num=1;
		resSearchOnclick();
	}else if(res_page_select_value=="300"){
		res_onePage_size="300";
		res_onePage_num=1;
		resSearchOnclick();
	}else if(res_page_select_value=="400"){
		res_onePage_size="400";
		res_onePage_num=1;
		resSearchOnclick();
	}else if(res_page_select_value=="500"){
		res_onePage_size="500";
		res_onePage_num=1;
		resSearchOnclick();
	}
}

/**首页*/
function res_page_firstpage_onclick(){
	res_onePage_num=1;
	resSearchOnclick();
}
/**下一页*/
function res_page_rightnextpage_onclick(){
	if(res_onePage_num<res_onePage_all){
		res_onePage_num=res_onePage_num+1;
		resSearchOnclick();
	}
}
/**上一页*/
function res_page_leftnextpage_onclick(){
	if(res_onePage_num!=1){
		res_onePage_num=res_onePage_num-1;
		resSearchOnclick();
	} 
}
/**末页*/
function res_page_lastpage_onclick(){
	res_onePage_num=res_onePage_all;
	resSearchOnclick();
}
/**分页赋值 第共几页 */
function set_value_onfinishpost(result){
	sum_line=parseInt(result.sum_line, 10);
	res_onePage_all=parseInt(sum_line/res_onePage_size+"")+1;
	$("#res_page_allpage_span")[0].innerHTML="共"+(parseInt(sum_line/res_onePage_size+"")+1)+"页";
	$("#res_page_input_num")[0].value=res_onePage_num;
}
