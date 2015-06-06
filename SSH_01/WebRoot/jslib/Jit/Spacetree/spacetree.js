//type  F0根节点   F01组织机构    F012具体组织
//type  F0根节点   F02任务安排    F023处置项目  F0234任务安排
//type  F0根节点   F03资源调度    F034具体资源
//type  F0根节点   F04响应配置 


var labelType, useGradients, nativeTextSupport, animate;
(function() {
	var ua = navigator.userAgent, iStuff = ua.match(/iPhone/i)
			|| ua.match(/iPad/i), typeOfCanvas = typeof HTMLCanvasElement, nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'), textSupport = nativeCanvasSupport
			&& (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
	//I'm setting this based on the fact that ExCanvas provides text support for IE
	//and that as of today iPhone/iPad current text support is lame
	labelType = (!nativeCanvasSupport || (textSupport && !iStuff))
			? 'Native'
			: 'HTML';
	nativeTextSupport = labelType == 'Native';
	useGradients = nativeCanvasSupport;
	animate = !(iStuff || !nativeCanvasSupport);
})();





/**spacetree的初始化json*/  
var json={
    id : "node000",
    name : planInfoName,
    data : {type :"F0" },
    type : "try",
    children : [{
                id : "node001",
                name : "组织机构",
                data : {
                    type : 'F01'
                },
                children : []
            },  {
                id : "node002",
                name : "任务安排",
                data : {
                	type : 'F02'
                },
                children : []
            }, {
                id : "node003",
                name : "资源调度",
                data : {
                	type : 'F03'
                },
                children : []
            }, {
                id : "node004",
                name : "响应配置",
                data : {
                	type : 'F04'
                },
                children : []
            }]
} ;

//数据改变重新加载数据 id为点击位置  该方法在其他页面(dialog)被调用  
function reloadData(clickNodeId){
	json={
		    id : "node000",
		    name : planInfoName,
		    data : {type :"F0" },
		    type : "try",
		    children : [{
		                id : "node001",
		                name : "组织机构",
		                data : {
		                    type : 'F01'
		                },
		                children : []
		            },  {
		                id : "node002",
		                name : "任务安排",
		                data : {
		                	type : 'F02'
		                },
		                children : []
		            }, {
		                id : "node003",
		                name : "资源调度",
		                data : {
		                	type : 'F03'
		                },
		                children : []
		            }, {
		                id : "node004",
		                name : "响应配置",
		                data : {
		                	type : 'F04'
		                },
		                children : []
		            }]
		} ;
	post4Data(clickNodeId);
	
	
//	loadjt();
}
/**隐藏所有黑色增删改编辑部分 */
var hiddenAllblackhtml=function(){
	var treeTab_editBox_list=$(".treeTab-editBox");
	for(var i=0;i<treeTab_editBox_list.length;i++){
		treeTab_editBox_list[i].style.visibility="hidden";
	}
};  
//在画布内双击新增方法
var addOnCanvas=function(a,type,id){
	hiddenAllblackhtml();
	switch (type) {
	case "F01":
		addOrganizationFun();
		break;
	case "F02":
		addProjectFun();
		break;
	case "F023":
		addTaskFun(id);
		break;
	case "F03":
		addResourceFun();
		break;
	//case "F04":
//		addOrganizationFun();
//		break;
	default:
		$.easyui.messager.prompt("操作提醒", "请输入节点内容：",
				function(val) {
					if (val != undefined) {
						addNewNode(val);
					}
				});
		break;
	}
}; 
/**消息提示*/
function MessageAlert(messager){
	$.messager.show({ msg: messager, position: 'topLeft' });
}

/**请求后台删除节点并加载数据*/
function PostDelAndLoad(id,type){
	$.post(eve.contextPath + '/jf/planmodel/delModel', {
		planInfoID : planInfoID , id : id ,type : type
    }, function(result) {
//    	alert("成功删除");
    	if(result.success){
    		reloadData(result.clickNodeId);
//    		deleteNode(id)
    	} 
    }, 'json');
}

//在画布内双击删除方法
var delOnCanvas=function(t,id,type){
	hiddenAllblackhtml();
	//post删除数据  并重新加载
	switch (type) {
	case "F0":
		MessageAlert("该节点不能删除"); 
		break;
	case "F01":
		MessageAlert("该节点不能删除"); 
		break;
	case "F012":
		PostDelAndLoad(id,type);
		break;
	case "F02":
		MessageAlert("该节点不能删除"); 
		break;
	case "F023":
		PostDelAndLoad(id,type);
		break;
	case "F0234":
		PostDelAndLoad(id,type);
		break;
	case "F03":
		MessageAlert("该节点不能删除"); 
		break;
	case "F034":
		PostDelAndLoad(id,type); 
		break;
	case "F04":
		MessageAlert("该节点不能删除"); 
		break;
	default:
		MessageAlert("该节点还未提供删除方法"); 
		break;
	} 
}
//type  F0根节点   F01组织机构    F012具体组织
//type  F0根节点   F02任务安排    F023处置项目  F0234任务安排
//type  F0根节点   F03资源调度    F034具体资源
//type  F0根节点   F04响应配置 
//在画布内双击编辑方法
var editOnCanvas=function(t,id,type){
	hiddenAllblackhtml(); 
	switch (type) {
	case "F012": 
		editOrganizationFun(id);
		break; 
	case "F023": 
		editProjectFun(id);
		break; 
	case "F0234": 
		editTaskFun(id);
		break; 
	case "F034": 
		editResourceFun(id);
		break;
	default:
		MessageAlert("该节点不能编辑"); 
		break;
	}
}
//在画布内双击取消方法
var cancelOnCanvas=function(){
	hiddenAllblackhtml();
//	alert("cancelOnCanvas");
}

function getRootPath() {
	//获取当前网址，如： http://localhost:8083/evecom/share/meun.jsp
	var curWwwPath = window.document.location.href;
	//获取主机地址之后的目录，如： evecom/share/meun.jsp
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	//获取主机地址，如： http://localhost:8083
	var localhostPaht = curWwwPath.substring(0, pos);
	//获取带"/"的项目名，如：/evecom
	var projectName = pathName
			.substring(0, pathName.substr(1).indexOf('/') + 1);
	return (localhostPaht + projectName);
}
//visibility:hidden;   '<li class="treeTab-edit-title">编辑角色信息</lis>'+
function blackhtml(node){
	var rtn='<div class="treeTab-editBox" style="float:left;visibility:hidden; ">'+
	'<span class="treeTab-arrowL"></span>'+
	'<ul>'+
		
		'<li onclick="addOnCanvas(this,\''+node.data.type+'\',\''+node.id+'\');">'+
			'<a href="#"><img src="'+getRootPath()+'/evecom/ecapp/plan/images/treetab-plus.png"  alt="">新增</a>'+
		'</li>'+
		'<li onclick="delOnCanvas(this,\''+node.id+'\',\''+node.data.type+'\');">'+
			'<a href="#"><img src="'+getRootPath()+'/evecom/ecapp/plan/images/treetab-delete.png" alt="">删除</a>'+
		'</li>'+
		'<li onclick="editOnCanvas(this,\''+node.id+'\',\''+node.data.type+'\');">'+
			'<a href="#"><img src="'+getRootPath()+'/evecom/ecapp/plan/images/treetab-edit.png" alt="">编辑</a>'+
		'</li>'+
		'<li onclick="cancelOnCanvas();">'+
			'<a href="#"><img src="'+getRootPath()+'/evecom/ecapp/plan/images/treetab-cancel.png" alt="">取消</a>'+
		'</li>'+
	'</ul>'+
	'</div>' ; 
	return rtn;
} 



/**是否释放拖动 */
var isReleaseDrap=false;
/**被拖动的组织机构node */
var DrapedNode;
/**被拖动的资源node */
var ResourceDrapedNode;
/**被拖动的通讯录node */
var ContactDrapedNode;
/**文本预案id */
var planInfoID;
/**文本预案名称*/
var planInfoName;
/**添加组织机构窗 */
var addOrganizationFun = function() {
	var dialog = parent.eve.modalDialog({
		title : '添加组织机构信息',
		width : 640,
	    height : 405,
		url : eve.contextPath + '/jf/planmodel/orgination_add?id='+planInfoID,
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

/**拖拽通讯录时  添加组织机构窗 */
var addOrganizationFunOnDrap = function(headId) {
	var dialog = parent.eve.modalDialog({
		title : '添加组织机构信息',
		width : 640,
	    height : 405,
		url : eve.contextPath + '/jf/planmodel/orgination_add?id='+planInfoID+"&headId="+headId,
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
/**修改组织机构窗 */
var editOrganizationFun = function(organzitionId) {
	var dialog = parent.eve.modalDialog({
		title : '修改组织机构信息',
		width : 640,
	    height : 405,
		url : eve.contextPath + '/jf/planmodel/orgination_edit?id='+planInfoID+"&organzitionId="+organzitionId,
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
/**添加处置项目窗*/
var addProjectFun = function() {
	var dialog = parent.eve.modalDialog({
		title : '添加处置项目信息',
		width : 640,
	    height : 325,
		url : eve.contextPath + '/jf/planmodel/project_add?id='+planInfoID,
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
/**编辑处置项目窗*/
var editProjectFun = function(projectId) {
	var dialog = parent.eve.modalDialog({
		title : '修改处置项目信息',
		width : 640,
	    height : 325,
		url : eve.contextPath + '/jf/planmodel/project_edit?id='+planInfoID+"&projectId="+projectId,
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
/**添加任务安排窗*/
var addTaskFun = function(addProjectID) {
	var dialog = parent.eve.modalDialog({
		title : '添加任务安排信息',
		width : 640,
	    height : 360,
		url : eve.contextPath + '/jf/planmodel/task_add?id='+addProjectID,
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
/**拖动组织机构时  添加任务安排窗*/
var addTaskFunOnDrap = function(addProjectID,taskDeptId) {
	var dialog = parent.eve.modalDialog({
		title : '添加任务安排信息',
		width : 640,
	    height : 360,
		url : eve.contextPath + '/jf/planmodel/task_add?id='+addProjectID+"&taskDeptId="+taskDeptId,
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
/**编辑任务安排窗*/
var editTaskFun = function(taskId) {
	var dialog = parent.eve.modalDialog({
		title : '修改任务安排信息',
		width : 640,
	    height : 360,
		url : eve.contextPath + '/jf/planmodel/task_edit?taskId='+taskId,
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
/**添加资源调度窗*/
var addResourceFun = function() {
	var dialog = parent.eve.modalDialog({
		title : '添加资源调度信息',
		width : 640,
	    height : 285,
		url : eve.contextPath + '/jf/planmodel/resource_add?id='+planInfoID,
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
		title : '修改资源调度信息',
		width : 640,
	    height : 285,
		url : eve.contextPath + '/jf/planmodel/resource_edit?id='+planInfoID+"&resourceId="+resourceId,
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


var Log = {
	elem : false,
	write : function(text) {

	}
};
function colorA(a) {  
	var th_list =$(".model_conf_a");
	var a_list=$(".model_conf_aa");
	for (var i = 0; i < th_list.length; i++) {
		var item = th_list[i];
		item.style.backgroundColor = "#fff";
	}	
	for(var i = 0; i < a_list.length; i++){
		var item = a_list[i];
		item.style.color = "#000";
	}
	a.style.color="#fff";
	a.parentElement.style.backgroundColor = "#62ADFF";
}
/**组织机构点击*/
function zzjgClick(a){ 
    colorA(a);
    st.onClick('node001');
} 
function rwapClick(a){ 
    colorA(a);
    st.onClick('node002');
}
function zyddClick(a){ 
    colorA(a);
    st.onClick('node003');
}
function xypzClick(a){ 
    colorA(a);
    st.onClick('node004');
}
/**图片*/
var image;
/**树对象*/
var st;
/**点击节点时获取节点的id*/
var cid;
/**点击节点时获取节点的name*/
var cname;
/**标签位置点击时的样式*/
var onclickstyle='background-color: white; text-align: center; color: #f11;';


 

 

/**给spacetree的json填充数据  */
function post4Data(clickNodeId){ 
    $.post(eve.contextPath + '/jf/planmodel/getOrginations', {
         id : planInfoID
     }, function(result) {
     	//填充具体组织
     	for( var i=0;i<result.json.length;i++){
     	  var newOrganitionItem=result.json[i];
     	  var obj = eval('(' + newOrganitionItem + ')'); 
     	  var newOrganitionNode={
     	        id : obj.id,
                name : obj.deptname,  
                data : {
                	type :"F012"
                },
                children : []
     	  };
     	  json.children[0].children.push(newOrganitionNode); 
     	}
     	//填充处置项目
     	for( var y=0;y<result.json1.length;y++){
          var newDisprojectItem=result.json1[y];
          var obj1 = eval('(' + newDisprojectItem + ')'); 
          var newDisProjectNode={
                id : obj1.id,
                name : obj1.projectname,  
                data : {
                	type :"F023"
                },
                children : []
          };
          //填充任务安排
          for(var i=0;i<obj1.plantasks.length;i++){
          	var newTaskNode={
                id : obj1.plantasks[i].id,
                name : obj1.plantasks[i].taskname,            
                data : {
                	type :"F0234"
                },
                children : []
          }; 
           newDisProjectNode.children.push(newTaskNode);
          }
          json.children[1].children.push(newDisProjectNode); 
        }
        
        
        //填充应急资源
        for( var i=0;i<result.json2.length;i++){
          var newResourceItem=result.json2[i];
          var obj2 = eval('(' + newResourceItem + ')'); 
          var newResourceNode={
                id : obj2.id,
                name : obj2.resourcename,  
                data : {
                	type :"F034"
                },
                children : []
          };
          json.children[2].children.push(newResourceNode); 
        } 
     	loadjt(clickNodeId); 
     }, 'json');
}

/**加载jt到画布*/	
function loadjt(clickNodeId){
    st.loadJSON(json);
    st.compute();
    st.geom.translate(new $jit.Complex(-200, 0), "current");
    if(clickNodeId!= undefined){
    	st.refresh();
    	st.onClick(clickNodeId); 
    }else{
    	st.onClick(st.root);
    }
    
    //end

};

function initJit() {  
	
	
	planInfoID= $("#planInfoID")[0].defaultValue;
	planInfoName= $("#planInfoName")[0].defaultValue;
	json.name=planInfoName;
	//组织机构拖动树
    orgTree = $('#orgTreeCalss').tree({
        url : eve.contextPath + '/jf/organization/tree',
        parentField : 'pid',
        dnd : true,
        dataPlain: true,//支持平滑数据 
        onBeforeDrag :function(node){ 
        	DrapedNode=node;
//        	console.log("onBeforeDrag当节点的拖拽开始时触发false");
        	isReleaseDrap=false;
        },
        onStartDrag :function(node){ 
//        	console.log("onStartDrag当开始拖拽节点时触发")
        	//return false;
        },
        onStopDrag :function(node){ 
//        	console.log("onStopDrag当停止拖拽节点时触发")
        	isReleaseDrap=true;
        	//node.text="node.text";
        	//return false;
        },
        onDragEnter :function(target, source){ 
//        	console.log("onDragEnter当节点被拖拽进入某个允许放置的目标节点时触发false")
        	return false;
        },
        onDragOver:function(target, source){ 
//        	console.log("onDragOver当节点被拖拽到允许放置的目标节点上时触发false")
        	return false;
        },
        onDragLeave :function(target, source){ 
//        	console.log("onDragLeave当节点被拖拽离开允许放置的目标节点时触发")
        	//return false;
        },
        onBeforeDrop :function(target, source, point){
//        	console.log("onBeforeDrop节点被放置之前触发false")
        	return false;
        },
        onDrop :function(target, source, point){ 
//        	console.log("onDrop")
        	//return false;
        },
        onClick : function(node) {
            var rootNode =orgTree.tree('getRoot');   
        }
    }); 
     
	//通讯录组点击树
    orgTree = $('#cantastTreeCalss').tree({
        url : eve.contextPath + '/jf/dutyGroup/tree',
        parentField : 'pid',
        dnd : false, //不可拖动
        dataPlain: true,//支持平滑数据 
        onLoadSuccess:function(){//展开根节点
            var node = $(this).tree('find',0);
			$(this).tree('expand', node.target)
       },
		onClick: function(node){//点击事件
//		    $('#groupId').val(node.id);
//		    $('#leftGrid').datagrid('load',eve.serializeObject($('#form')));//左边列表
			$.post(eve.contextPath + '/jf/planmodel/groupClickGetAddress', {
				groupId : node.id 
		    }, function(result) {
		    	var resjson1=new Array();
		    	if(result.success){ 
		    		for( var i=0;i<result.json.length;i++){
		    	     	  var contactAddress=result.json[i];
		    	     	  var obj = eval('(' + contactAddress + ')'); 
		    	     	  var newContactAddress= {
				    	         	"attributes": {
				    	         		"displayOrder": i
				    	         	},
				    	         	"checked": false,
				    	         	"children": [],
				    	         	"iconCls": "",
				    	         	"id": obj.id,
				    	         	"pid": "",
				    	         	"state": "open",
				    	         	"text": obj.name
				    	         };
		    	     	
		    	     	 resjson1.push(newContactAddress); 
		    	     	} 
		    		cantastTreeCalssAddressTree.tree('loadData',resjson1); 
		    	} 
		    }, 'json'); 
		}
    }); 
    
  //分组成员拖动树
    cantastTreeCalssAddressTree = $('#cantastTreeCalssAddress').tree({
        data : [ ],
        parentField : 'pid',
        dnd : true,
        dataPlain: true,//支持平滑数据 
        onBeforeDrag :function(node){ 
        	ContactDrapedNode=node; 
        	isReleaseDrap=false;
        },
        onStartDrag :function(node){ 
//        	console.log("onStartDrag当开始拖拽节点时触发") 
        },
        onStopDrag :function(node){ 
//        	console.log("onStopDrag当停止拖拽节点时触发")
        	isReleaseDrap=true; 
        },
        onDragEnter :function(target, source){ 
//        	console.log("onDragEnter当节点被拖拽进入某个允许放置的目标节点时触发false")
        	return false;
        },
        onDragOver:function(target, source){ 
//        	console.log("onDragOver当节点被拖拽到允许放置的目标节点上时触发false")
        	return false;
        },
        onDragLeave :function(target, source){ 
//        	console.log("onDragLeave当节点被拖拽离开允许放置的目标节点时触发")
        	//return false;
        },
        onBeforeDrop :function(target, source, point){
//        	console.log("onBeforeDrop节点被放置之前触发false")
        	return false;
        },
        onDrop :function(target, source, point){ 
//        	console.log("onDrop") 
        },
        onClick : function(node) {
            var rootNode =orgTree.tree('getRoot');   
        }
    }); 
    
  //应急资源拖动树
    resTree = $('#ResTreeCalss').tree({
        data : [{
        	"attributes": {
        		"displayOrder": "2"
        	},
        	"checked": false,
        	"children": [],
        	"iconCls": "",
        	"id": "03e5d12edbfb499da5ad6925db144e1e",
        	"pid": "",
        	"state": "open",
        	"text": "沙袋"
        },
        {
        	"attributes": {
        		"displayOrder": "4"
        	},
        	"checked": false,
        	"children": [],
        	"iconCls": "",
        	"id": "6f99c86579854513bf66278860a15cab",
        	"pid": "",
        	"state": "open",
        	"text": "消防车"
        },
        {
        	"attributes": {
        		"displayOrder": "5"
        	},
        	"checked": false,
        	"children": [],
        	"iconCls": "",
        	"id": "6f99c86579854513bf66278860a15ca2",
        	"pid": "",
        	"state": "open",
        	"text": "口罩"
        }],
        parentField : 'pid',
        dnd : true,
        dataPlain: true,//支持平滑数据 
        onBeforeDrag :function(node){ 
        	ResourceDrapedNode=node;
//        	console.log("onBeforeDrag当节点的拖拽开始时触发false");
        	isReleaseDrap=false;
        },
        onStartDrag :function(node){ 
//        	console.log("onStartDrag当开始拖拽节点时触发") 
        },
        onStopDrag :function(node){ 
//        	console.log("onStopDrag当停止拖拽节点时触发")
        	isReleaseDrap=true; 
        },
        onDragEnter :function(target, source){ 
//        	console.log("onDragEnter当节点被拖拽进入某个允许放置的目标节点时触发false")
        	return false;
        },
        onDragOver:function(target, source){ 
//        	console.log("onDragOver当节点被拖拽到允许放置的目标节点上时触发false")
        	return false;
        },
        onDragLeave :function(target, source){ 
//        	console.log("onDragLeave当节点被拖拽离开允许放置的目标节点时触发")
        	//return false;
        },
        onBeforeDrop :function(target, source, point){
//        	console.log("onBeforeDrop节点被放置之前触发false")
        	return false;
        },
        onDrop :function(target, source, point){ 
//        	console.log("onDrop") 
        },
        onClick : function(node) {
            var rootNode =orgTree.tree('getRoot');   
        }
    }); 
    
    var rsjson= [{
    	"attributes": {
    		"displayOrder": "2"
    	},
    	"checked": false,
    	"children": [],
    	"iconCls": "",
    	"id": "03e5d12edbfb499da5ad6925db144e1e",
    	"pid": "",
    	"state": "open",
    	"text": "指挥车"
    },
    {
    	"attributes": {
    		"displayOrder": "4"
    	},
    	"checked": false,
    	"children": [],
    	"iconCls": "",
    	"id": "6f99c86579854513bf66278860a15cab",
    	"pid": "",
    	"state": "open",
    	"text": "其他资源1"
    },
    {
    	"attributes": {
    		"displayOrder": "5"
    	},
    	"checked": false,
    	"children": [],
    	"iconCls": "",
    	"id": "6f99c86579854513bf66278860a15ca2",
    	"pid": "",
    	"state": "open",
    	"text": "其他资源2"
    }];
    
    
    post4Data();
    

	//end
	//init Spacetree
	//Create a new ST instance
	st = new $jit.ST({
				injectInto : 'infovis',
				duration : 500,
				transition : $jit.Trans.Quart.easeInOut,
				levelDistance : 90,
				Navigation : {
					enable : true,
					panning : true
				},
				
				Node : {
					height : 57,
					width : 135,
					type : 'rectangle',
					color : '#aaa',
					overridable : true
				},

				Edge : {
					type : 'bezier',
					lineWidth : 2,
					color : '#23A4FF',
					overridable : true
				},

				onBeforeCompute : function(node) {
//					Log.write("loading " + node.name);
				},

				onAfterCompute : function() { 
//					Log.write("done");
				},

				onCreateLabel : function(label, node) {
					label.id = node.id; 
					var shortName;
					if(node.name.length>12){
						shortName=node.name.substr(0,12);
					}else{
						shortName=node.name;
					}
					switch (node.data.type) {
					case "F0":  
						label.innerHTML = '<div class="treeTab F0"> '+
						'<p class="treeTab-title" title="'+node.name+'">'+shortName+'</p>'+
						'</div>'+blackhtml(node);
						
 
								 
						break;
					case "F01": //<p class="treeTab-detail">Organization</p>
						label.innerHTML = '<div class="treeTab F01"> '+
						'<p class="treeTab-title" title="'+node.name+'">'+shortName+'</p>'+
						'</div>'+blackhtml(node);
						break;
					case "F012": 
//						if((node.name.length>12)&&(19>node.name.length)){
//							node.Node.height=70;
//						}else if(node.name.length>18){
//							node.Node.height=90;
//						}else {
//							node.Node.height=50;
//						}
						label.innerHTML = '<div class="treeTab F012"> '+
						'<p class="treeTab-title" title="'+node.name+'">'+shortName+'</p>'+
						'</div>'+blackhtml(node);
						break;
						
					case "F02": //<p class="treeTab-detail">Task schedul</p>
						label.innerHTML = '<div class="treeTab F02"> '+
						'<p class="treeTab-title" title="'+node.name+'">'+shortName+'</p>'+
						'</div>'+blackhtml(node);
						break;
					case "F023": //<p class="treeTab-detail">模板管理</p>
						label.innerHTML = '<div class="treeTab F023"> '+
						'<p class="treeTab-title" title="'+node.name+'">'+shortName+'</p>'+
						'</div>'+blackhtml(node);
						break;
					case "F0234": //<p class="treeTab-detail">模板管理</p>
						label.innerHTML = '<div class="treeTab F0234"> '+
						'<p class="treeTab-title" title="'+node.name+'">'+shortName+'</p>'+
						'</div>'+blackhtml(node);
						break;
						
					case "F03": //<p class="treeTab-detail">Resource</p>
						label.innerHTML = '<div class="treeTab F03"> '+
						'<p class="treeTab-title" title="'+node.name+'">'+shortName+'</p>'+
						'</div>'+blackhtml(node);
						break;
					case "F034": //<p class="treeTab-detail">模板管理</p>
						label.innerHTML = '<div class="treeTab F034"> '+
						'<p class="treeTab-title" title="'+node.name+'">'+shortName+'</p>'+
						'</div>'+blackhtml(node);
						break;
						
					case "F04": //<p class="treeTab-detail">Response</p>
						label.innerHTML = '<div class="treeTab F04"> '+
						'<p class="treeTab-title" title="'+node.name+'">'+shortName+'</p>'+
						'</div>'+blackhtml(node);
						break; 

					default:
						break;
					} 

					label.onclick = function() {
						hiddenAllblackhtml();
						st.onClick(node.id);
						cid = node.id;
						cname = node.name;
//						st.refresh(); 
					};

					//编辑节点文字
					label.ondblclick = function() {
						if (node.name == '任务安排') {
							image = '<img src=' + getRootPath()
									+ '/evecom/ecapp/plan/images/emphasis.png />';
						} else if (node.name == '资源调度') {
							image = '<img src=' + getRootPath()
									+ '/evecom/ecapp/plan/images/building.png />';
						} else {
							image = '<img src=' + getRootPath()
									+ '/evecom/ecapp/plan/images/admin.png />';
						} 
						ondbclick(node.id, node.name, label,node); 
					} 
					//type  F0根节点   F01组织机构    F012具体组织
					//type  F0根节点   F02任务安排    F023处置项目  F0234任务安排
					//type  F0根节点   F03资源调度    F034具体资源
					//type  F0根节点   F04响应配置 
					label.onmouseover=function(){
						//当拖动释放时调用
						if(isReleaseDrap){
							//alert(node.name+node.id+DrapedNode.id+DrapedNode.text);
							switch (node.data.type) {
							case "F01":  
								if(DrapedNode!=undefined){  //组织机构拖动到组织机构时   添加组织机构
									$.post(eve.contextPath + '/jf/planmodel/drapOrganization', {
										planInfoID : planInfoID , deptId : DrapedNode.id 
								    }, function(result) {
								    	if(result.success){
								    		reloadData("node001");  
								    	} 
								    }, 'json');
								}else if(ContactDrapedNode!=undefined){
									addOrganizationFunOnDrap(ContactDrapedNode.id);
								}
								break;
							case "F012":  //通讯录拖动到具体组织机构时   修改负责人  F012_F_U
								if(ContactDrapedNode!=undefined){  
									$.post(eve.contextPath + '/jf/planmodel/drapUpdate', {
										planInfoID : planInfoID , headId : ContactDrapedNode.id , deptId : node.id , type : "F012_F_U"
								    }, function(result) {
								    	if(result.success){ 
								    		if(undefined!=result.MSG){
								    			MessageAlert(result.MSG);
								    		} 
								    	} 
								    }, 'json');
								}
								break;
							case "F023":  //组织机构拖动到处置项目时   新增任务安排并且执行机构是该机构  F023_Z_N
								if(DrapedNode!=undefined){ 
									addTaskFunOnDrap(node.id,DrapedNode.id); 
								}
								break;
							case "F0234":  //组织机构拖动到任务安排时   修改执行机构  F0234_Z_U
								if(DrapedNode!=undefined){  
									$.post(eve.contextPath + '/jf/planmodel/drapUpdate', {
										planInfoID : planInfoID , taskId : node.id , deptId : DrapedNode.id , type : "F0234_Z_U"
								    }, function(result) {
								    	if(result.success){
//								    		reloadData("node001");
								    		if(undefined!=result.MSG){
								    			MessageAlert(result.MSG);
								    		} 
								    	} 
								    }, 'json');
								}
								break;
							case "F03":   //拖动到资源调度时   添加资源调度
								if(ResourceDrapedNode!=undefined){
									$.post(eve.contextPath + '/jf/planmodel/drapResource', {
										planInfoID : planInfoID , resourceName : ResourceDrapedNode.text 
								    }, function(result) {
								    	if(result.success){
								    		reloadData("node003");  
								    	} 
								    }, 'json');
								}
								break; 
							default:
								break;
							} 
							DrapedNode=undefined;
							ResourceDrapedNode=undefined;
							ContactDrapedNode=undefined;
							isReleaseDrap=false;
						} 
					}	 

					//set label styles
					var style = label.style;
					style.width = 100 + 'px';
					style.height = 40 + 'px';
					style.cursor = 'pointer';
					style.color = '#333';
					style.fontSize = '0.8em';
					style.textAlign = 'center';
					style.paddingTop = '3px';
				},

 
				onBeforePlotNode : function(node) {
					
					if (node.selected) {
						node.data.$color = "#4694f6";
					} else {
						delete node.data.$color; 
						switch (node.data.type) {
						case "F01":
							node.data.$color ='#61BFA9';
							break;
						case "F012":
							node.data.$color ='#61BFA9';
							break;
						case "F02":
							node.data.$color ='#D9B837';
						case "F023":
							node.data.$color ='#D9B837';
						case "F0234":
							node.data.$color ='#D9B837';
							break;
						case "F03":
							node.data.$color ='#45B1EF';
						case "F034":
							node.data.$color ='#45B1EF';
							break;
						case "F04":
							node.data.$color ='#E18D21';
							break;
						default:
							break;
						}
					}
				},


				onBeforePlotLine : function(adj) {
					if (adj.nodeFrom.selected && adj.nodeTo.selected) {
						adj.data.$color = "#eed";
						adj.data.$lineWidth = 3;
					} else {
						delete adj.data.$color;
						delete adj.data.$lineWidth;
					}
				}
			});
				

	//Add event handlers to switch spacetree orientation.
//	var top = $jit.id('r-top'), left = $jit.id('r-left'), bottom = $jit
//			.id('r-bottom'), right = $jit.id('r-right'), normal = $jit
//			.id('s-normal'), addSubtree = $jit.id('addSubtree'), delSubtree = $jit
//			.id('delSubtree');
//
//	function changeHandler() {
//		if (this.checked) {
//			top.disabled = bottom.disabled = right.disabled = left.disabled = true;
//			st.switchPosition(this.value, "animate", {
//				onComplete : function() {
//					top.disabled = bottom.disabled = right.disabled = left.disabled = false;
//				}
//			});
//		}
//	};
//
//	function optionNode() {
//		if (this.value == "Add") {//新增子节点
//			var newNode = {
//				id : st.clickedNode.id,
//				name : st.clickedNode.name,
//				data : {},
//				children : [{
//							id : 'node' + new Date().getTime() + '',
//							name : '999',
//							data : {},
//							children : []
//						}]
//			};
//			st.addSubtree(newNode, "animate");
//		} else {//删除子节点
//			st.removeSubtree(st.clickedNode.id, true, 'animate');
//		}
//	}

	// top.onchange = left.onchange = bottom.onchange = right.onchange = changeHandler;
	//addSubtree.onclick = delSubtree.onclick = addNewNode;
	//end
	
	function ondbclick(id, name, label,node) {
		//显示与隐藏增删改的提示
		hiddenAllblackhtml();
		label.children[1].style.visibility="visible";
	 
		
		
		//	$.easyui.showDialog({
		//                title: "提示",
		//                top: 130, left: 170, width: 300, height: 220,
		//                content: "请选择操作", 
		//                buttons: [
		//                    { text: "新增节点", iconCls: "icon-hamburg-pencil", handler: function () { addNewNode();} },
		//                    { text: "删除节点", handler: function () { alert("测试按钮2"); } },
		//                    { text: "编辑节点", handler: function () { alert("测试按钮3"); } }
		//                ]
		//            });
		
		//type  F0根节点   F01组织机构    F012具体组织
		//type  F0根节点   F02任务安排    F023处置项目  F0234任务安排
		//type  F0根节点   F03资源调度    F034具体资源
		//type  F0根节点   F04响应配置 

//		var dialog = parent.eve.modalDialog({
//					title : '编辑角色信息',
//					width : 340,
//					height : 110,
//					content : "&nbsp&nbsp&nbsp&nbsp请选择操作!",
//					buttons : [{
//						text : '新增节点',
//						iconCls : 'icon-save',
//						handler : function() {
//							switch (node.data.type) {
//							case "F01":
//								addOrganizationFun();
//								break;
//							case "F02":
//								addProjectFun();
//								break;
//							case "F023":
//								addTaskFun();
//								break;
//							case "F03":
//								addResourceFun();
//								break;
////							case "F04":
////								addOrganizationFun();
////								break;
//							default:
//								$.easyui.messager.prompt("操作提醒", "请输入节点内容：",
//										function(val) {
//											if (val != undefined) {
//												addNewNode(val);
//											}
//										});
//								break;
//							} 
//							dialog.dialog('destroy');
//						}
//					}, {
//						text : '删除节点',
//						iconCls : 'icon-save',
//						handler : function() {
//							//dialog.find('iframe').get(0).contentWindow.submitForm(dialog, grid, parent.$); 
//							deleteNode(id);
//							dialog.dialog('destroy');
//						}
//					}, {
//						text : '编辑节点',
//						iconCls : 'icon-cancel',
//						handler : function() {
//							$.easyui.messager.prompt("操作提醒", "请输入节点内容：",
//									function(val) {
//										if (val != undefined) { 
//											editNode(label, val)
//										}
//									});
//							dialog.dialog('destroy');
//
//						}
//					}, {
//						text : '取消',
//						iconCls : 'icon-cancel',
//						handler : function() {
//							dialog.dialog('destroy');
//						}
//					}]
//				});
	}
	
	
}



//新增节点  不用重新加载的方式
function addNewNode(pid,id,name,type) {
	var newNode = {
		id : cid,
		name : cname,
		data : {},
		children : [{
					id : 'node' + new Date().getTime() + '',
					name : val,
					data : {},
					children : []
				}]
	};
	//newNode.children[0].data.$alpha=1;
	st.addSubtree(newNode, "animate", {
				hideLabels : false,
				onComplete : function() {//添加成功回调函数
					//alert('成功添加节点');
					st.refresh();
					st.onClick(cid);
				}
			});
	//            st.compute();
	//            st.geom.translate(new $jit.Complex(-200, 0), "current");
	//    //emulate a click on the root node.
	//            st.onClick(st.root);
	//st.graph.addAdjacence(newNode,st.clickedNode);
	//newNode.adjacentTo(st.clickedNode.id);
	//
}
// 删除节点  不用重新加载的方式
function deleteNode(id) {
//	st.removeSubtree(id, true, 'animate');
	st.removeSubtree(id, true, 'animate',{onComplete : function() {
				st.refresh(); 
				alert("removeSubtree ok");
			}});
//	st.refresh(); 
}


/*********拖拽部分*************/
var params = {
		left: 735,	
		top: 360,
		currentX: 0,
		currentY: 0,
		flag: false,
		firsttime:true,
		xyhaschange:false
	};
	//获取相关CSS属性
	var getCss = function(o,key){
//		console.log("getCss");
		return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key]; 	
	};

	//拖拽的实现
	var startDrag = function(bar, target){
//		console.log("startDrag");
		var targetleft=getCss(target, "left");
		if(getCss(target, "left") !== "auto"){
			params.left = getCss(target, "left");
//			console.log("params.left ="+getCss(target, "left"));
		}
		if(getCss(target, "top") !== "auto"){
			params.top = getCss(target, "top");
//			console.log("params.top ="+getCss(target, "top"));
		}
		//o是移动对象
		bar.onmousedown = function(event){
			params.flag = true;
			if(!event){
				event = window.event;
				//防止IE文字选中
				bar.onselectstart = function(){
					return false;
				}  
			}
			var e = event;
			params.currentX = e.clientX;
			params.currentY = e.clientY;
//			console.log("onmousedown-----currentX ="+params.currentX+"---currentY ="+params.clientY);
		};
		//鼠标抬起事件
		document.onmouseup = function(){
			params.flag = false;	
			if(getCss(target, "left") !== "auto"){
				params.left = getCss(target, "left");
			}
			if(getCss(target, "top") !== "auto"){
				params.top = getCss(target, "top");
			}
//			if(params.xyhaschange){
//				params.firsttime=false;
//			}
//			console.log("onmouseup-----currentX ="+params.currentX+"---currentY ="+params.clientY);
		};
		//鼠标移动事件
		document.onmousemove = function(event){
			//防止IE文字选中
			bar.onselectstart = function(){
				return false;
			}
			
			var e = event ? event: window.event;
			if(params.flag){
				var nowX = e.clientX, nowY = e.clientY;
				var disX = nowX - params.currentX, disY = nowY - params.currentY;
//				if(params.firsttime){
//					target.style.left = parseInt(params.left) + disX +701+ "px";
//					target.style.top = parseInt(params.top) + disY +45+ "px";
//				}
				target.style.left = parseInt(params.left) + disX + "px";
				target.style.top = parseInt(params.top) + disY + "px";
				//target.style.left = params.currentX + "px";
				//target.style.top = params.clientY+ "px";
			} 
//			console.log("onmousemove" +
//					"-----currentX="+params.currentX+"currentY="+params.clientY
//					+"---e.clientX="+e.clientX+"e.clientY="+e.clientY
//					+"---target.style.left ="+target.style.left+"target.style.top ="+target.style.top
//					+"---nowX="+nowX+"nowY="+nowY
//					+"---disX="+nowX+"disY="+disY
//					+"---params.left="+params.left+"params.top="+params.top);
//			console.log(target.style.left  +"="+parseInt(params.left) + "+"+disX + "px");
//			console.log(target.style.top  +"="+parseInt(params.top) + "+"+disY + "px");
		}
	};
/*********拖拽部分end*************/

