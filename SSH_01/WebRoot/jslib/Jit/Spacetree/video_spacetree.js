

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
    name : "拖动会场开始会议",
    data : {type :"F0" },
    type : "try",
    children : [ ]
} ;

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
//		alert("error--add");
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

function blackhtml_noadd(node){
	var rtn='<div class="treeTab-editBox" style="float:left;visibility:hidden; ">'+
	'<span class="treeTab-arrowL"></span>'+
	'<ul>'+ 
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

function blackhtml_nodel_noupdata(node){
	var rtn='<div class="treeTab-editBox" style="float:left;visibility:hidden; ">'+
	'<span class="treeTab-arrowL"></span>'+
	'<ul>'+
		
		'<li onclick="addOnCanvas(this,\''+node.data.type+'\',\''+node.id+'\');">'+
			'<a href="#"><img src="'+getRootPath()+'/evecom/ecapp/plan/images/treetab-plus.png"  alt="">新增</a>'+
		'</li>'+ 
		'<li onclick="cancelOnCanvas();">'+
			'<a href="#"><img src="'+getRootPath()+'/evecom/ecapp/plan/images/treetab-cancel.png" alt="">取消</a>'+
		'</li>'+
	'</ul>'+
	'</div>' ; 
	return rtn;
} 

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


 

function pushTaskByRecursive(obj1,newDisProjectNode){
	//填充任务安排
    for(var i=0;i<obj1.plantasks.length;i++){
    	var newTaskNode={
          id : obj1.plantasks[i].id,
          name : obj1.plantasks[i].taskname,            
          data : {
          	type :"F0234",
        	obj:obj1
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
	resetleftlist();
	loadmeettree();  //type:"1"
	$.post(getRootPath() + '/site/siteList.action', { }, function(result) {
		 var html="<ul class='vm_list'>";
		 var site_list_div=$("#site_list_div");
		for(var i=0;i<result.length;i++){
			switch (result[i].siteStatus) {
			case "0":
				html+="<li style='z-index:1000;' class='offline' id='"+result[i].siteId+"_SS' class='drop'><a href='#'>"+result[i].siteName+"</a></li>";
				break;
			case "1":
				html+="<li style='z-index:1000;' id='"+result[i].siteId+"_SS' class='drop'><a href='#'>"+result[i].siteName+"</a></li>";
				break;
			default:
				html+="<li style='z-index:1000;' class='offline' id='"+result[i].siteId+"_SS' class='drop'><a href='#'>"+result[i].siteName+"</a></li>";
				break;
			}
			
		 }
		html+="</ul>";
		site_list_div.empty();
		site_list_div.append(html);
		$('.vm_list .drop').draggable({
            revert:true,
            proxy:'clone',
        	onDragLeave:function(e,source){
	            $(source).addClass('trash');
	        },
	        onDrop:function(e,source){
	            $(source).addClass('trash');
	        },
	        onBeforeDrag:function(e,source){
	            $(source).addClass('trash');
	        }/*,
	        proxy: function(source){
//	        	alert($(source).attr("id"));
	    		var p = $('<div style="border:1px solid #ccc;width:80px"></div>');
	    		p.html($(source).html()).appendTo('body');
	    		return p;
	    	}*/
        });
		 $('#infovis').droppable({
	        accept:'.drop',
	        onDragEnter:function(e,source){
	            $(source).addClass('trash');
	        },
	        onDragLeave:function(e,source){
	            $(source).removeClass('trash');
	        },
	        onDrop:function(e,source){
	            $(source).removeClass('trash');
	            if($(source).attr("id")=="djk"){
	            	var obj={
	            		    id : "1232131",
	            		    name : "东街口测试点",
	            		    data : {type :"DJK" },
	            		    type : "try",
	            		    children : [ ]
	            		};
	            	json.children.push(obj);
	            	loadjt(undefined);
//	            	survConnect(siteIdList,channelId);
	            	survConnect('东街口测试点#-#6001@192.168.99.220','undefined');
	            }else{
	            	reload_byid($(source).attr("id")); 
	            }
	            
	        }
	    });   
		 
		  
		
	}, 'json');
	
	
	/*$.post(getRootPath() + '/site/siteList.action', {type:"2" }, function(result) {
		 var html="<ul class='vm_list'>";
		 var site_list_div_2=$("#site_list_div_2");
		for(var i=0;i<result.length;i++){
			switch (result[i].siteStatus) {
			case "0":
				html+="<li style='z-index:1000;' class='offline' id='"+result[i].siteId+"_SS' class='drop'><a href='#'>"+result[i].siteName+"</a></li>";
				break;
			case "1":
				html+="<li style='z-index:1000;' id='"+result[i].siteId+"_SS' class='drop'><a href='#'>"+result[i].siteName+"</a></li>";
				break;
			default:
				html+="<li style='z-index:1000;' class='offline' id='"+result[i].siteId+"_SS' class='drop'><a href='#'>"+result[i].siteName+"</a></li>";
				break;
			}
		}
		html+="</ul>";
		site_list_div_2.empty();
		site_list_div_2.append(html);
		$('.vm_list .drop').draggable({
           revert:true,
           proxy:'clone',
       	onDragLeave:function(e,source){
	            $(source).addClass('trash');
	        },
	        onDrop:function(e,source){
	            $(source).addClass('trash');
	        },
	        onBeforeDrag:function(e,source){
	            $(source).addClass('trash');
	        },
	        proxy: function(source){
//	        	alert($(source).attr("id"));
	    		var p = $('<div style="border:1px solid #ccc;width:80px"></div>');
	    		p.html($(source).html()).appendTo('body');
	    		return p;
	    	}
       });
		 $('#infovis').droppable({
	        accept:'.drop',
	        onDragEnter:function(e,source){
	            $(source).addClass('trash');
	        },
	        onDragLeave:function(e,source){
	            $(source).removeClass('trash');
	        },
	        onDrop:function(e,source){
	            $(source).removeClass('trash');
	            
	            reload_byid($(source).attr("id")); 
	        }
	    });   
		 
		  
		
	}, 'json');*/
	
	st = new $jit.ST({
				injectInto : 'infovis',
				duration : 500,
				transition : $jit.Trans.Quart.easeInOut,
				levelDistance : 70,
				offsetX: 0,
				offsetY: 160,
				Navigation : {
					enable : true,
					panning : true,
					type: 'Native',
					zooming: 0
				},
				
				Node : {
					height : 57,
					width : 100,
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
					switch (node.data.siteStatus) {
					case "404":
						label.innerHTML = '<div class="tree_tab">'
						+ '<img src="'+getRootPath()+'/images/camera.png" alt="">'
						+ '<span>'+node.name+'</span>' + '</div>';
						break;
					case "0":
						label.innerHTML = '<div class="tree_tab">'
							+ '<img src="'+getRootPath()+'/images/camera2.png" alt="">'
							+ '<span>'+node.name+'</span>' + '</div>';
						break;
					case "1":
						label.innerHTML = '<div class="tree_tab">'
							+ '<img src="'+getRootPath()+'/images/camera.png" alt="">'
							+ '<span>'+node.name+'</span>' + '</div>';
						break;
					default:
						label.innerHTML = '<div class="tree_tab">'
							+ '<img src="'+getRootPath()+'/images/camera.png" alt="">'
							+ '<span>'+node.name+'</span>' + '</div>';
						break;
					}
					 if(node.data.type){
						if(node.data.type=="DJK"){
							label.innerHTML = '<div class="tree_tab">'
								+ '<img src="'+getRootPath()+'/images/video_2.png" alt="">'
								+ '<span>'+node.name+'</span>' + '</div>';
						}
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
					 
					label.onmouseover=function(){ 
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
					node.data.$color = "transparent";//透明
				}, 
				
				onBeforePlotLine : function(adj) {
					if (adj.nodeFrom.selected && adj.nodeTo.selected) {
						adj.data.$color = "#ee0000";
						adj.data.$lineWidth = 3;
					} else {
						delete adj.data.$color;
						delete adj.data.$lineWidth;
					}
				}
			});  
	st.canvas.config.orientation='top';
	loadjt(undefined); 
}

 
// 删除节点  不用重新加载的方式
function deleteNode(id) {
	st.removeSubtree(id, true, 'animate',{onComplete : function() {
				st.refresh(); 
				alert("removeSubtree ok");
			}});
}
//已经添加的会场数据
var checkedIds = "";
//重新加载左侧tree
function reload(node){  
       if(node.id.indexOf("|S")>-1){//只选择会场的节点
           var spiltId = node.id.split('|');
           if(checkedIds.length>0){
        	   checkedIds =checkedIds+ ","+spiltId[0]; 
           }else{
        	   checkedIds +=spiltId[0]; 
           }
           
       } 
    if(checkedIds != ""){//加载右边选中的树 
         $.post(getRootPath() + '/site/tree.action?checkedIds='+checkedIds, { }, function(result) {
     		var data;
     		data=buildTreeData(result, parent)
     		json=null;
     		json=data[0];
     		loadjt(undefined);
     		st.refresh();
     	}, 'json');
    }
}

//重新加载左侧spacetree    
function reload_byid(id){  
	if(id.indexOf("_SS")>-1){//只选择会场的节点
        var spiltId = id.split('_SS');
           if(checkedIds.length>0){
        	   checkedIds =checkedIds+ ","+spiltId[0]; 
           }else{
        	   checkedIds +=spiltId[0]; 
           } 
	}
    if(checkedIds != ""){//加载右边选中的树 
         $.post(getRootPath() + '/site/tree.action?checkedIds='+checkedIds, { }, function(result) {
     		var data;
     		data=buildTreeData(result, parent);
     		json=null;
     		json=data[0]; 
     		st.refresh();
     		loadjt(undefined);
     		$("#zkhy_id")[0].style.display="inline";
      		$("#qxhy_id")[0].style.display="inline";
      		$("#main_cont_bottom_div_id")[0].style.display="none";
     	}, 'json');
    }
}


function  loadmeettree(){
 	//左边会场树
 	$('#leftAsite').tree({
 		url : getRootPath()+"/site/tree.action"  ,
 		parentField : 'pid',
 		checkbox : true,
 		dnd : true, 
        onBeforeDrag :function(node){  
        }, 
        onStopDrag :function(node){ 
        	reload(node);
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
 		onCheck: function(node,check) {
             var nodes = $(this).tree('getChecked');
             var checkedIds = "";
             for(var i =0;i<nodes.length;i++){
                if(nodes[i].id.indexOf("|S")>-1){//只选择会场的节点
                    var spiltId = nodes[i].id.split('|');
                    checkedIds += spiltId[0];
                    if(i!=nodes.length-1){
                       checkedIds +=",";
                    }
                }
             }
             $('#rightAsite').empty();//清空右边已选中的树
             //表单隐藏值填入
         	$("#selectedSite").val(checkedIds);
             if(checkedIds != ""){//加载右边选中的树
                  //加载右面板树
                  $('#rightAsite').tree({
                     url : "${ctx}/site/tree.action?checkedIds="+checkedIds,
                     parentField : 'pid',
                     lines : false,
                     panelHeight : 'auto',
                     checkbox : false
                  });
             }
 		},
 		onLoadSuccess : function(node, data) {
 			
 		},
 		cascadeCheck : true
 	 }).css("height",260); 
 	
 	
}



/** 数据转换tree到jit spacetree */
function buildTreeData(data, parent) { 
	var idFiled, textFiled, parentField; 
		idFiled =  'id';
		textFiled =   'text';
		parentField = 'pid';
		var i, l, treeData = [], tmpMap = [];
		for (i = 0, l = data.length; i < l; i++) {
			tmpMap[data[i][idFiled]] = data[i];
		}
		for (i = 0, l = data.length; i < l; i++) {
			if (tmpMap[data[i][parentField]] && data[i][idFiled] != data[i][parentField]) {
				if (!tmpMap[data[i][parentField]]['children'])
					tmpMap[data[i][parentField]]['children'] = [];
//				data[i]['text'] = data[i][textFiled];
				data[i]['name'] = data[i][textFiled];
				if(data[i].attributes){
					data[i].data=new Object();
					data[i].data.siteStatus = data[i].attributes.siteStatus;
				}else{
					data[i].data=new Object();
					data[i].data.siteStatus = "404";
				}
				tmpMap[data[i][parentField]]['children'].push(data[i]);
			} else {
//				data[i]['text'] = data[i][textFiled];
				data[i]['name'] = data[i][textFiled];
				if(data[i].attributes){
					data[i].data=new Object();
					data[i].data.siteStatus = data[i].attributes.siteStatus;
				}else{
					data[i].data=new Object();
					data[i].data.siteStatus = "404";
				}
				treeData.push(data[i]);
			}
		}
		return treeData;  
};
var stop_meetid="";
var index_name=0;
var meetname="";
var meets=new Array();
var meetid_openclick="";
function openClick(){
	if(checkedIds.length==0){
		return ;
	}
	//请求召开会议
	$.post(getRootPath() + '/apply/nowVideoMeet.action', 
			{applyRoomId:"50", applyConfTitle:"会议"+(++index_name),selectedSite:checkedIds},
		function(result) {
		nowMeet_self(result.obj.id);
		stop_meetid=result.obj.id;
		meetname="会议"+(++index_name);
 		resetleftlist();
 		$("#zkhy_id")[0].style.display="none";
 		$("#qxhy_id")[0].style.display="none";
 		$("#main_cont_bottom_div_id")[0].style.display="inline";
 		
 		meetid_openclick=result.obj.id; 
 	}, 'json'); 
}

function cancelmeet(){
	newmeet();
}

//请求后台  重置左侧页面列表
function resetleftlist(){
	var new_meet_left_div=$("#new_meet_left_div_id")
	new_meet_left_div.empty();
	var html_left="<li id='newmeet' class='on' onclick='newmeet();'><a><span>新会议</span></a></li>";
	//请求获取所有会议
	 $.post(getRootPath() + '/apply/getallMeets.action', 
			{},
		function(result) {
			meets=result.obj;
			index_name=meets.length;
			for(var i=0;i<meets.length;i++){
				html_left+="<li id=\'"+meets[i].id+"\' onclick='leftClickLoadMeet(this.id);'><a><span>"+meets[i].confTitle+"</span></a></li>";
			}
			new_meet_left_div.append(html_left);
			
			if(meetid_openclick){
				$('#new_meet_left_div_id').children().each(function(index){
		 			if($(this).attr('class')=='on'){
		 				$(this).removeClass("on");
		 				return false;
		 			}
		 		}); 
		 		$("#"+meetid_openclick).addClass("on");
			}
 	}, 'json');  
	
}

function leftClickLoadMeet(meetid){
	stop_meetid=meetid;
	$('#new_meet_left_div_id').children().each(function(index){
		if($(this).attr('class')=='on'){
			$(this).removeClass("on");
			return false;
		}
	}); 
	$("#"+meetid).addClass("on");
	
	
	//请求获取会议对应的checkedIds
	 $.post(getRootPath() + '/apply/getMeetcheckedIds.action', 
			{meetid:meetid},
 		function(result) {
		// meets=result.obj.;
		meetname=result.obj[0].confTitle;
		// 请求获取sp数据并加载到json并填充到st
		$.post(getRootPath() + '/site/tree.action?checkedIds='
				+ result.obj[0].applySiteIds, {}, function(result) {
			var data;
			data = buildTreeData(result, parent);
			json = null;
			json = data[0];
			st.refresh();
			loadjt(undefined);
//			intoControl(meetid);
			$("#zkhy_id")[0].style.display="none";
	 		$("#qxhy_id")[0].style.display="none";
	 		$("#main_cont_bottom_div_id")[0].style.display="inline";
		}, 'json');
	}, 'json');  
}
// 新会员点击
function newmeet(){
	$('#new_meet_left_div_id').children().each(function(index){
		if($(this).attr('class')=='on'){
			$(this).removeClass("on");
			return false;
		}
	}); 
	$("#newmeet").addClass("on");
	
	json={
		    id : "node000",
		    name : "拖动会场开始会议",
		    data : {type :"F0" },
		    type : "try",
		    children : [ ]
		};
	checkedIds="";
	st.refresh();
	loadjt(undefined);
	$("#zkhy_id")[0].style.display = "inline";
	$("#qxhy_id")[0].style.display = "inline";
	$("#main_cont_bottom_div_id")[0].style.display = "none";
}


//立即召开   sessionId
function nowMeet_self(id) {
		var formApplys = new FormApplys(id, "", "", "", "", "", "", "", "", "",
				"", "", "", "","",sessionId);
		var formApplyBO = new FormBOApply(formApplys);
		var tableBO = new TableBO(0, 0, 10);
		var request = new Request("nowVideoMeet", tableBO, formApplyBO, "",
				"dddd");
		send($.toJSON(request));

}
function dddd(){
	alert(132312);
}
//进入会控
function intoControl(id) {
	location.href=ctx+"/jsp/meet/control/control.jsp?currApplyId="+id;
	
}


function finishmeet(){
	finishConf(stop_meetid);
	resetleftlist();
	json={
		    id : "node000",
		    name : "拖动会场开始会议",
		    data : {type :"F0" },
		    type : "try",
		    children : [ ]
		};
	checkedIds="";
	st.refresh();
	loadjt(undefined);
	$("#zkhy_id")[0].style.display = "inline";
	$("#qxhy_id")[0].style.display = "inline";
	$("#main_cont_bottom_div_id")[0].style.display = "none";
}

//海康监控视频接入
function survConnect(siteIdList,channelId) {
	if(stop_meetid.length==0){
		stop_meetid=meetid_openclick;
	}
	$.post(getRootPath() + '/apply/getActiveId.action', {applyId:stop_meetid }, function(result) {
		
		var formControl = new FormControlAddSite(stop_meetid,result.id,result.id,siteIdList,sessionId);
		var formBOControl = new FormBOControl(formControl);
		var tableBO = new TableBO(0, 0, 10);
		var request = new Request("survConnect", tableBO, formBOControl, "",
				"callBackSurvConnect");
		send($.toJSON(request));
		alert("监控接入需要一段时间，请接入完成后关闭该提示框");
 	}, 'json');
	
	
}
