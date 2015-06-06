//type  F0根节点   F01组织机构    F012具体组织
//type  F0根节点   F023处置项目  F0234任务安排
//type  F0根节点   F03资源调度    F034具体资源
//type  F0根节点   F04响应配置    (F041一级响应 F042二级响应 F043三级响应 F044四级响应)


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
            } , {
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
                children : [ {
                    id : "node0041",
                    name : "I级响应",
                    data : {
                    	type : 'F041'
                    },
                    children : []
                }, {
                    id : "node0042",
                    name : "II级响应",
                    data : {
                    	type : 'F042'
                    },
                    children : []
                }, {
                    id : "node0043",
                    name : "III级响应",
                    data : {
                    	type : 'F043'
                    },
                    children : []
                }, {
                    id : "node0044",
                    name : "IV级响应",
                    data : {
                    	type : 'F044'
                    },
                    children : []
                }]
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
		            } , {
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
		                children : [{
		                    id : "node0041",
		                    name : "I级响应",
		                    data : {
		                    	type : 'F041'
		                    },
		                    children : []
		                }, {
		                    id : "node0042",
		                    name : "II级响应",
		                    data : {
		                    	type : 'F042'
		                    },
		                    children : []
		                }, {
		                    id : "node0043",
		                    name : "III级响应",
		                    data : {
		                    	type : 'F043'
		                    },
		                    children : []
		                }, {
		                    id : "node0044",
		                    name : "IV级响应",
		                    data : {
		                    	type : 'F044'
		                    },
		                    children : []
		                }]
		            }]
		} ;
	post4Data(clickNodeId); 
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
	case "F0":
		addProjectFun();
		break;
	case "F01":
		addOrganizationFun();
		break; 
	case "F023":
		addTaskFun(id);
		break;
	case "F0234":
		addTaskFun(id);
		break; 
	case "F03":
		addResourceFun();
		break;
//	case "F04":
//		addOrganizationFun();
//		break;
	default:
//		$.easyui.messager.prompt("操作提醒", "请输入节点内容：",
//				function(val) {
//					if (val != undefined) {
//						addNewNode(val);
//					}
//				});
		alert("error--add");
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
	case "F041":
		PostDelAndLoad(id,type); 
		break;
	case "F042":
		PostDelAndLoad(id,type); 
		break;
	case "F043":
		PostDelAndLoad(id,type); 
		break;
	case "F044":
		PostDelAndLoad(id,type); 
		break;
	default:
		MessageAlert("该节点还未提供删除方法"); 
		break;
	} 
}

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
	case "F041": 
		editResponseIndicorrFun(id);
		break;
	case "F042": 
		editResponseIndicorrFun(id);
		break;
	case "F043": 
		editResponseIndicorrFun(id);
		break;
	case "F044": 
		editResponseIndicorrFun(id);
		break;
	default:
		MessageAlert("该节点不能编辑"); 
		break;
	}
}
//在画布内双击取消方法
var cancelOnCanvas=function(){
	hiddenAllblackhtml(); 
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
/**被拖动的组织机构成员node */
var GroupUserDrapedNode;
/**被拖动的响应指标node */
var resPonse_indi_node;
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
		url : eve.contextPath + '/jf/planmodel/orginationadd?id='+planInfoID,
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
var addContactGroupFunOnDrap = function(headId) {
	var dialog = parent.eve.modalDialog({
		title : '添加组织机构信息',
		width : 640,
	    height : 405,
		url : eve.contextPath + '/jf/planmodel/orginationadd?id='+planInfoID+"&headId="+headId,
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

/**拖拽组织机构成员时  添加组织机构窗 */
var addOrganizationFunOnDrap = function(headId,orgid) {
	var dialog = parent.eve.modalDialog({
		title : '添加组织机构信息',
		width : 640,
	    height : 405,
		url : eve.contextPath + '/jf/planmodel/orginationadd?id='
		+planInfoID+"&headId="+headId+"&orgid="+orgid,
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
/**拖拽组织机构成员时  添加组织机构窗 */
var addOrganizationFunOnDrap_ = function(orgid) {
	var dialog = parent.eve.modalDialog({
		title : '添加组织机构信息',
		width : 640,
	    height : 405,
		url : eve.contextPath + '/jf/planmodel/orginationadd?id='
		+planInfoID+"&orgid="+orgid,
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
		title : '编辑组织机构信息',
		width : 640,
	    height : 405,
		url : eve.contextPath + '/jf/planmodel/orginationedit?id='+planInfoID+"&organzitionId="+organzitionId,
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
     	var json1 = eval('(' + result.json1 + ')'); 
     	for( var y=0;y<json1.length;y++){
          var obj1=json1[y];
//          var obj1 = eval('(' + newDisprojectItem + ')'); 
          var newDisProjectNode={
                id : obj1.id,
                name : obj1.projectname,  
                data : {
                	type :"F023"
                },
                children : []
          }; 
          
          pushTaskByRecursive(obj1,newDisProjectNode); 
          json.children.push(newDisProjectNode);
          
          
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
          json.children[1].children.push(newResourceNode); 
        } 
        
        //填充响应配置指标对应表数据
        for(var i=0;i<result.json3.length;i++){
        	var newResponseIndicorrItem=result.json3[i];
        	var obj3=eval('('+newResponseIndicorrItem+')');
        	switch (obj3.reslevel) {
			case "F041":
				var newResponseIndicorrNode={
                    id : obj3.id,
                    name : obj3.indiname+"&nbsp&nbsp"+obj3.comparisontype+"&nbsp&nbsp"+obj3.indivalue,  
                    data : {
                    	type :"F041"
                    },
                    children : []
              };
				json.children[2].children[0].children.push(newResponseIndicorrNode);
				break;
			case "F042":
				var newResponseIndicorrNode={
                    id : obj3.id,
                    name : obj3.indiname+"&nbsp&nbsp"+obj3.comparisontype+"&nbsp&nbsp"+obj3.indivalue,  
                    data : {
                    	type :"F042"
                    },
                    children : []
              };	
				json.children[2].children[1].children.push(newResponseIndicorrNode);
				break;
			case "F043":
				var newResponseIndicorrNode={
                    id : obj3.id,
                    name : obj3.indiname+"&nbsp&nbsp"+obj3.comparisontype+"&nbsp&nbsp"+obj3.indivalue,  
                    data : {
                    	type :"F043"
                    },
                    children : []
              };
				json.children[2].children[2].children.push(newResponseIndicorrNode);
				break;
			case "F044":
				var newResponseIndicorrNode={
                    id : obj3.id,
                    name : obj3.indiname+"&nbsp&nbsp"+obj3.comparisontype+"&nbsp&nbsp"+obj3.indivalue,  
                    data : {
                    	type :"F044"
                    },
                    children : []
              };
				json.children[2].children[3].children.push(newResponseIndicorrNode);
				break; 
			default:
				break;
			}
        } 
     	loadjt(clickNodeId); 
     }, 'json');
}

function pushTaskByRecursive(obj1,newDisProjectNode){
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
     if(newDisProjectNode.children){
    	  pushTaskByRecursive(obj1.plantasks[i],newDisProjectNode.children[i]);
     } 
    }  
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
};
var orgTree;
var groupUserTreeCalssAddressTree;
var cantastTreeCalss;
var cantastTreeCalssAddress;
var resTree;
var resPonseTree;
function initJit() {
	
	
	planInfoID= $("#planInfoID")[0].defaultValue;
	planInfoName= $("#planInfoName")[0].defaultValue;
	json.name=planInfoName;
	
	resSearchOnclick();
	resPonseSearchOnclick();
	//组织机构拖动树
    orgTree = $('#orgTreeCalss').tree({
        url : eve.contextPath + '/jf/organization/tree',
        parentField : 'pid',
        dnd : true,
        dataPlain: true,//支持平滑数据 
        onBeforeDrag :function(node){ 
        	DrapedNode=node;
        	isReleaseDrap=false;
        }, 
        onStopDrag :function(node){ 
        	isReleaseDrap=true;
        },
        onDragEnter :function(target, source){ 
        	return false;
        },
        onDragOver:function(target, source){ 
        	return false;
        },
        onDragLeave :function(target, source){ 
        },
        onBeforeDrop :function(target, source, point){
        	return false;
        }, 
        onClick : function(node) {
        	DrapedNode=node;
            var rootNode =orgTree.tree('getRoot');  
            $.post(eve.contextPath + '/jf/planmodel/groupClickGetUsers', {
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
		    		groupUserTreeCalssAddressTree.tree('loadData',resjson1); 
		    	}
		    }, 'json');
        },
        onLoadSuccess : function(node, data) {
            $(this).tree('collapseAll');
            var root = $(this).tree('getRoot');
            $(this).tree('expand', root.target);
		  }
    }); 
    
  //组织机构分组成员拖动树
    groupUserTreeCalssAddressTree = $('#groupUserTreeCalssAddressTree').tree({
        data : [ ],
        parentField : 'pid',
        dnd : true,
        dataPlain: true,//支持平滑数据 
        onBeforeDrag :function(node){ 
        	GroupUserDrapedNode=node; 
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
     
	//通讯录组点击树
    cantastTreeCalss = $('#cantastTreeCalss').tree({
        url : eve.contextPath + '/jf/dutyGroup/tree',
        parentField : 'pid',
        dnd : false, //不可拖动
        dataPlain: true,//支持平滑数据 
        onLoadSuccess:function(){//展开根节点
            var node = $(this).tree('find',0);
			$(this).tree('expand', node.target)
       },
		onClick: function(node){ 
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
		    		cantastTreeCalssAddress.tree('loadData',resjson1); 
		    	} 
		    }, 'json'); 
		}
    }); 
    
  //通讯录分组成员拖动树
    cantastTreeCalssAddress = $('#cantastTreeCalssAddress').tree({
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
    
    var res_node_text_temp="";
  //应急资源拖动树
    resTree = $('#ResTreeCalss').tree({
        data : [ ],
        parentField : 'pid',
        dnd : true,
        toggleMenu:'hidden',
        onBeforeDrag :function(node){ 
        	ResourceDrapedNode=node;
        	res_node_text_temp=node.target.innerHTML;
        	node.target.innerHTML='<span class="tree-indent"><span class="tree-title">'+node.obj_name+'</span></span>';
//        	node.target.innerHTML=node.obj_name;
//        	'<span class="tree-indent"></span><span class="tree-icon tree-file "></span><span class="tree-title"><table onmouseout="abc();" onmouseover="restest2(&quot;1救援装备&quot;);" style="margin:1px 1px 1px 1px; width:500px;"><tbody><tr><td width="40%" style="BORDER-RIGHT: #b6b6b6 1px solid;">1</td></tr><tr></tr></tbody></table></span>'
        	isReleaseDrap=false;
        	
        },
        onStopDrag :function(node){ 
        	node.target.innerHTML=res_node_text_temp;
        	isReleaseDrap=true; 
        },
        onDragEnter :function(target, source){ 
        	return false;
        },
        onDragOver:function(target, source){ 
        	return false;
        },
        onBeforeDrop :function(target, source, point){
        	return false;
        }, 
        onClick : function(node) {
            var rootNode =orgTree.tree('getRoot');   
        } ,
        onContextMenu : function(e,node) {
        	node.target.innerHTML=res_node_text_temp; 
        	return false; 
        	
        }
    });  
    
  //应急响应拖动树
    resPonseTree = $('#ResponseTreeCalss').tree({
        data : [ ],
        parentField : 'pid',
        dnd : true,
        toggleMenu:'hidden',
        onBeforeDrag :function(node){ 
        	resPonse_indi_node=node;
        	res_node_text_temp=node.target.innerHTML;
        	node.target.innerHTML='<span class="tree-indent"><span class="tree-title">'+node.obj_name+'</span></span>';
        	isReleaseDrap=false;
        	
        },
        onStopDrag :function(node){
        	node.target.innerHTML=res_node_text_temp;
        	isReleaseDrap=true; 
        },
        onDragEnter :function(target, source){
        	return false;
        },
        onDragOver:function(target, source){
        	return false;
        },
        onBeforeDrop :function(target, source, point){
        	return false;
        }, 
        onClick : function(node) {
            var rootNode =orgTree.tree('getRoot');   
        },
        onContextMenu : function(e,node) {
        	node.target.innerHTML=res_node_text_temp;
        	resPonse_indi_node=node;
        	
        		    e.preventDefault();
        		    // 选择节点
        		    $('#ResponseTreeCalss').tree('select', node.target);
        		    // 显示上下文菜单
        		    $('#responseindi_menu').menu('show', {
        		      left: e.pageX,
        		      top: e.pageY
        		    });
        		 return false; 
        	
        }
    }); 
    
    post4Data();
    
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
				},

				onAfterCompute : function() {  
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
						'</div>';
						break; 
					case "F041":  
						label.innerHTML = '<div class="treeTab F04"> '+
						'<p class="treeTab-title" title="'+node.name+'">'+node.name+'</p>'+
						'</div>'+blackhtml(node);
						break; 
					case "F042":  
						label.innerHTML = '<div class="treeTab F04"> '+
						'<p class="treeTab-title" title="'+node.name+'">'+node.name+'</p>'+
						'</div>'+blackhtml(node);
						break; 
					case "F043":  
						label.innerHTML = '<div class="treeTab F04"> '+
						'<p class="treeTab-title" title="'+node.name+'">'+node.name+'</p>'+
						'</div>'+blackhtml(node);
						break; 
					case "F044":  
						label.innerHTML = '<div class="treeTab F04"> '+
						'<p class="treeTab-title" title="'+node.name+'">'+node.name+'</p>'+
						'</div>'+blackhtml(node);
						break; 

					default:
						break;
					} 

					//type  F0根节点   F01组织机构    F012具体组织
					//type  F0根节点   F023处置项目  F0234任务安排
					//type  F0根节点   F03资源调度    F034具体资源
					//type  F0根节点   F04响应配置    (F041一级响应 F042二级响应 F043三级响应 F044四级响应)
					
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
					 
					label.onmouseover=function(){
						//当拖动释放时调用
						if(isReleaseDrap){
							//alert(node.name+node.id+DrapedNode.id+DrapedNode.text);
							switch (node.data.type) {
							case "F01":  
								if(DrapedNode!=undefined&&GroupUserDrapedNode==undefined){  //组织机构拖动到组织机构时   添加组织机构
//									$.post(eve.contextPath + '/jf/planmodel/drapOrganization', {
//										planInfoID : planInfoID , deptId : DrapedNode.id 
//								    }, function(result) {
//								    	if(result.success){
//								    		editOrganizationFun(result.id);
//								    		//reloadData("node001");  
//								    	} 
//								    }, 'json');
									addOrganizationFunOnDrap_(DrapedNode.id);
								}else if(ContactDrapedNode!=undefined){//通讯录成员拖动到组织机构时     添加组织机构并绑定负责人
									addContactGroupFunOnDrap(ContactDrapedNode.id);
								}else if(GroupUserDrapedNode!=undefined){//组织机构成员拖动到组织机构上   添加组织机构并绑定负责人
									addOrganizationFunOnDrap(GroupUserDrapedNode.id,DrapedNode.id);
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
									resAddOndrap();
								}
								break; 
							case "F041":    
								if(resPonse_indi_node!=undefined){
									responseIndicorrAddOndrap("F041",resPonse_indi_node.id);
								}
								break; 
							case "F042":    
								if(resPonse_indi_node!=undefined){
									responseIndicorrAddOndrap("F042",resPonse_indi_node.id);
								}
								break; 
							case "F043":    
								if(resPonse_indi_node!=undefined){
									responseIndicorrAddOndrap("F043",resPonse_indi_node.id);
								}
								break; 
							case "F044":    
								if(resPonse_indi_node!=undefined){
									responseIndicorrAddOndrap("F044",resPonse_indi_node.id);
								}
								break; 
							default:
								break;
							} 
							DrapedNode=undefined;
							ResourceDrapedNode=undefined;
							ContactDrapedNode=undefined;
							GroupUserDrapedNode=undefined;
							resPonse_indi_node=undefined;
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
						case "F041":
							node.data.$color ='#E18D21';
							break;
						case "F042":
							node.data.$color ='#E18D21';
							break;
						case "F043":
							node.data.$color ='#E18D21';
							break;
						case "F044":
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
	
	function ondbclick(id, name, label,node) {
		//显示与隐藏增删改的提示
		hiddenAllblackhtml();
		if(label.children[1]!=undefined){
			label.children[1].style.visibility="visible"; 
		}
		
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

