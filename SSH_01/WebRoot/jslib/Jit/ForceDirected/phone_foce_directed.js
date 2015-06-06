var labelType, useGradients, nativeTextSupport, animate;

(function() {
	var ua = navigator.userAgent, iStuff = ua.match(/iPhone/i)
			|| ua.match(/iPad/i), typeOfCanvas = typeof HTMLCanvasElement, nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'), textSupport = nativeCanvasSupport
			&& (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
	//I'm setting this based on the fact that ExCanvas provides text support for IE
	//and that as of today iPhone/iPad current text support is lame
	labelType = (!nativeCanvasSupport || (textSupport && !iStuff)) ? 'Native'
			: 'HTML';
	nativeTextSupport = labelType == 'Native';
	useGradients = nativeCanvasSupport;
	animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
	elem : false,
	write : function(text) {
		if (!this.elem)
			this.elem = document.getElementById('log');
		this.elem.innerHTML = text;
		this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
	}
};

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
//forcedirected对象 
var fd;
var json;
function init_JIT_forcedirected() {
	
	//刷新左侧页面
	resetleftlist();
	
	
	//加载右侧列表 
	$.post(getRootPath() + '/contacts/queryList_contactsAction.action', {}, function(result) {
		var html = "<ul class='vm_list'>";
		var site_list_div = $("#site_list_div");
		for (var i = 0; i < result.length; i++) {
			html += "<li style='z-index:1000;' id='" + result[i].id+"_"+result[i].userName+"_"+result[i].mobilePhone
					+ "_SS' class='drop'><a href='#'>" + result[i].userName+result[i].mobilePhone+
					"</a></li>";
		}
		html += "</ul>";
		site_list_div.empty();
		site_list_div.append(html);
		$('.vm_list .drop').draggable({
			revert : true,
			proxy : 'clone',
			onDragLeave : function(e, source) {
				//	            $(source).addClass('trash');
			},
			onDrop : function(e, source) {
				//	            $(source).addClass('trash');
			},
			onBeforeDrag : function(e, source) {
				//	            $(source).addClass('trash');
			}
		});
		$('#infovis').droppable({
			accept : '.drop',
			onDragEnter : function(e, source) {
				$(source).addClass('trash');
			},
			onDragLeave : function(e, source) {
				$(source).removeClass('trash');
			},
			onDrop : function(e, source) {
				$(source).removeClass('trash');
				reload($(source).attr("id"));
			}
		});
	}, 'json');
	
	

	// init data
	json = [ {
		"adjacencies" : [],
		"data" : {
			"$color" : "transparent",
			"$type" : "circle",
			"mytype" : "F"
		},
		"id" : "j0",
		"name" : "&nbsp&nbsp&nbsp&nbsp&nbsp电话会议"
	} ];
	// end  /ecssp/WebRoot/evecom/ecapp/plan/planmodel/model_configuration.jsp
	// init ForceDirected
	fd = new $jit.ForceDirected({
		//id of the visualization container
		injectInto : 'infovis',
		offsetX : 50,
		offsetY : 0,
		//Enable zooming and panning
		//with scrolling and DnD
		Navigation : {
			enable : true,
			type : 'Native',
			//Enable panning events only if we're dragging the empty
			//canvas (and not a node).
			panning : 'avoid nodes',
			zooming : 10
		//zoom speed. higher is more sensible
		},
		// Change node and edge styles such as
		// color and width.
		// These properties are also set per node
		// with dollar prefixed data-properties in the
		// JSON structure.
		Node : {
			overridable : true,
			dim : 20
		},
		Edge : {
			overridable : true,
			color : '#17A715',
			lineWidth : 2.5
		},
		// Add node events
		Events : {
			enable : true,
			type : 'Native',
			//Change cursor style when hovering a node
			onMouseEnter : function() {
				fd.canvas.getElement().style.cursor = 'move';
			},
			onMouseLeave : function() {
				fd.canvas.getElement().style.cursor = '';
			},
			//Update node positions when dragged
			onDragMove : function(node, eventInfo, e) {
				var pos = eventInfo.getPos();
				node.pos.setc(pos.x, pos.y);
				fd.plot();
			},
			//Implement the same handler for touchscreens
			onTouchMove : function(node, eventInfo, e) {
				$jit.util.event.stop(e); //stop default touchmove event
				this.onDragMove(node, eventInfo, e);
			}
		},
		//Number of iterations for the FD algorithm
		iterations : 200,
		//Edge length
		levelDistance : 130,
		// This method is only triggered
		// on label creation and only for DOM labels (not native canvas ones).
		onCreateLabel : function(domElement, node) {
			// Create a 'name' and 'close' buttons and add them
			// to the main node label
			var nameContainer = document.createElement('span'),
			//          closeButton = document.createElement('span'),
			style = nameContainer.style;
			nameContainer.className = 'name';
			switch (node.data.mytype) {
			case "F1":
				nameContainer.innerHTML = '<div class="tree_tab">'
						+ '<img src="' + getRootPath()
						+ '/images/linkman.png" alt="">' + '<span>'
						+ node.name + '</span>' + '</div>';
				break;
			case "F2":
				nameContainer.innerHTML = '<div class="tree_tab">'
						+ '<img src="' + getRootPath()
						+ '/images/linkman.png" alt="">' + '<span>'
						+ node.name + '</span>' + '</div>';
				break;
			case "F3":
				nameContainer.innerHTML = '<div class="tree_tab">'
						+ '<img src="' + getRootPath()
						+ '/images/linkman.png" alt="">' + '<span>' + node.name
						+ '</span>' + '</div>';
				break;
			case "F4":
				nameContainer.innerHTML = '<div class="tree_tab">'
						+ '<img src="' + getRootPath()
						+ '/images/linkman.png" alt="">' + '<span>' + node.name
						+ '</span>' + '</div>';
				break;
			case "F":
				nameContainer.innerHTML = '<div class="tree_tab">'
						+ '<img src="' + getRootPath()
						+ '/images/linkmanf.png" alt="">' + '<span>' + node.name
						+ '</span>' + '</div>';
				break;
			default:
				break;
			}
			//编辑节点文字
			domElement.ondblclick = function() {
				switch (node.data.mytype) {
				case "F1":
					location.href = eve.contextPath
							+ '/evecom/ecapp/yxjk/sysmon.jsp';
					break;
				default:
					break;
				}
			}

			//      closeButton.className = 'close';
			//      closeButton.innerHTML = 'x';
			domElement.appendChild(nameContainer);
			//      domElement.appendChild(closeButton);
			style.fontSize = "1.2em";
			style.color = "#ddd";
			//Fade the node and its connections when
			//clicking the close button
			//      closeButton.onclick = function() {
			//        node.setData('alpha', 0, 'end');
			//        node.eachAdjacency(function(adj) {
			//          adj.setData('alpha', 0, 'end');
			//        });
			//        fd.fx.animate({
			//          modes: ['node-property:alpha',
			//                  'edge-property:alpha'],
			//          duration: 500
			//        });
			//      };
			//Toggle a node selection when clicking
			//its name. This is done by animating some
			//node styles like its dimension and the color
			//and lineWidth of its adjacencies.
			nameContainer.onclick = function() {
				//set final styles
				fd.graph.eachNode(function(n) {
					if (n.id != node.id)
						delete n.selected;
					n.setData('dim', 20, 'end');
					n.eachAdjacency(function(adj) {
						adj.setDataset('end', {
							lineWidth : 2.5,
							color : '#17A715'
						});
					});
				});
				if (!node.selected) {
					node.selected = true;
					node.setData('dim', 20, 'end');
					node.eachAdjacency(function(adj) {
						adj.setDataset('end', {
							lineWidth : 4,
							color : '#17A715'
						});
					});
				} else {
					delete node.selected;
				}
				//trigger animation to final styles
				fd.fx.animate({
					modes : [ 'node-property:dim',
							'edge-property:lineWidth:color' ],
					duration : 500
				});
				// Build the right column relations list.
				// This is done by traversing the clicked node connections.
				//        var html = "<h4>" + node.name + "</h4><b> connections:</b><ul><li>",
				list = [];
				node.eachAdjacency(function(adj) {
					if (adj.getData('alpha'))
						list.push(adj.nodeTo.name);
				});
			};

		},
		// Change node styles when DOM labels are placed
		// or moved.
		onPlaceLabel : function(domElement, node) {
			var style = domElement.style;
			var left = parseInt(style.left);
			var top = parseInt(style.top);
			var w = domElement.offsetWidth;
			style.left = (left - w / 2) + 'px';
			style.top = (top - 20) + 'px';
			style.display = '';
		},
		onBeforePlotLine : function(adj) {
			//        if(node.id=='y11'){
			////        	adj.data.$color = "#F0290F";
			//        	adj.setDataset('end', {
			//                lineWidth: 3,
			//                color: '#F0290F'
			//              });
			//        }
			//线条颜色及大小
			switch (adj.nodeTo.id) {
			case "y11":
				adj.data.$color = "#17A715";
				//		adj.data.$color = "#F0290F";
				//		adj.data.$lineWidth= 5;
				break;
			default:
				adj.data.$color = "#17A715";
				break;
			}
		}
	});
	// load JSON data.
	loadfd(); 
	//拨打电话注册
	connectServce();
}

//已经添加的会场数据
var checkedIds = "";
//重新加载数据到fd
function reload(id) {
	if(id.indexOf("_")>-1){//只选择会场的节点
        var spiltId = id.split('_');
        if(checkedIds.length>0){
     	   checkedIds =checkedIds+ ","+spiltId[0]+"INT"+spiltId[1]+"INT"+spiltId[2]; 
        }else{
     	   checkedIds +=spiltId[0]+"INT"+spiltId[1]+"INT"+spiltId[2]; 
        } 
    }
	var new_obj;
	new_obj={
			"adjacencies" : [{
				"nodeTo" : "j0",
				"nodeFrom" : "f1",
				"data" : {}
			}],
			"data" : {
				"$color" : "transparent",
				"$type" : "circle",
				"mytype" : "F2"
			},
			"id" : spiltId[0],
			"name" : spiltId[1]
		};
//	填充数据到json
	json.push(new_obj);
	fd.loadJSON(json);
	// compute positions incrementally and animate.
	fd.computeIncremental({
		iter : 40,
		property : 'end',
		onStep : function(perc) {
			//Log.write(perc + '% loaded...');
		},
		onComplete : function() {
			// Log.write('');
			fd.animate({
				modes : [ 'linear' ],
				transition : $jit.Trans.Elastic.easeOut,
				duration : 2500
			});
		}
	});
	
	$("#zkhy_id")[0].style.display="inline";
	$("#qxhy_id")[0].style.display="inline";
	$("#main_cont_bottom_div_id")[0].style.display="none";
	$('#new_meet_left_div_id').children().each(function(index){
		if($(this).attr('class')=='on'){
			$(this).removeClass("on");
			return false;
		}
	}); 
	$("#newmeet").addClass("on");
}
var index_name=0;
//召开会议点击
function call(){
	//没有添加人员时
	if(checkedIds.length==0){
		return ;
	}
	var users;
	users=getSelectedMeetUsers();
	var userids="";
	for(var i=0;i<users.length;i++){
		if(userids.length==0){
			userids=users[i].id;
		}else{
			userids+=","+users[i].id;
		}
	}
	//请求召开会议 保存数据
	$.post(getRootPath() + '/apply/nowPhoneMeet.action', 
			{applyname:"会议"+(++index_name),userids:userids},
		function(result) {
				
 		resetleftlist();
 	}, 'json'); 
	$("#zkhy_id")[0].style.display="none";
	$("#qxhy_id")[0].style.display="none";
	$("#main_cont_bottom_div_id")[0].style.display="inline";
//	checkedIds="";
	//拨打电话
	StartTelConf(users);
	//alert(StartTelConf(users));
	
}

//取消
function cancelmeet(){
	newmeet();
}


function getSelectedMeetUsers(){
	var arr=new Array();
	if(checkedIds.length>0){
		var ids=checkedIds.split(",");
		for(var i=0;i<ids.length;i++){
			var int=ids[i].split("INT");
			var new_obj={
					id:int[0],
					name:int[1],
					type:0,
					telephone:int[2]
			}
			arr.push(new_obj);
		}
	}
	return arr;
}

//请求后台  重置左侧页面列表
function resetleftlist(){
	var new_meet_left_div=$("#new_meet_left_div_id")
	new_meet_left_div.empty();
	var html_left="<li class='on' id='newmeet' onclick='newmeet();'><a>新会议</a></li>";
	//请求获取所有会议
	 $.post(getRootPath() + '/apply/getallphoneMeets.action', 
			{},
		function(result) {
			meets=result.obj;
			index_name=meets.length;
			for(var i=0;i<meets.length;i++){
				html_left+="<li id=\'"+meets[i].id+"\' onclick='leftClickLoadMeet(this.id);'><a>"+meets[i].applyname+"</a></li>";
			}
			new_meet_left_div.append(html_left);
 	}, 'json');  
	
}


//新会员点击
function newmeet(){
	$('#new_meet_left_div_id').children().each(function(index){
		if($(this).attr('class')=='on'){
			$(this).removeClass("on");
			return false;
		}
	}); 
	$("#newmeet").addClass("on");
	//当点击左侧会场后再去拖动右侧就新建一个会议
	 checkedIds="";
	 json=[{
			"adjacencies" : [],
			"data" : {
				"$color" : "transparent",
				"$type" : "circle",
				"mytype" : "F"
			},
			"id" : "j0",
			"name" : "&nbsp&nbsp&nbsp&nbsp&nbsp电话会议"
		} ];
	 loadfd(); 
	 $("#zkhy_id")[0].style.display="inline";
	$("#qxhy_id")[0].style.display="inline";
	$("#main_cont_bottom_div_id")[0].style.display="none";
}

//左侧点击
function leftClickLoadMeet(meetid){
	$("#zkhy_id")[0].style.display="none";
	$("#qxhy_id")[0].style.display="none";
	$("#main_cont_bottom_div_id")[0].style.display="inline";
	$('#new_meet_left_div_id').children().each(function(index){
		if($(this).attr('class')=='on'){
			$(this).removeClass("on");
			return false;
		}
	}); 
	$("#"+meetid).addClass("on");
	
	//请求获取会议对应的checkedIds
	 $.post(getRootPath() + '/apply/getmeetphoneusers.action', 
			{meetid:meetid},
		function(result) {
			var userids=result.obj[0].userids;
			//传用户ids，请求用户信息列表
			$.post(getRootPath() + '/contacts/queryListByIds_contactsAction.action', 
					{userids:userids},
				function(result) { 
						json=[{
							"adjacencies" : [],
							"data" : {
								"$color" : "transparent",
								"$type" : "circle",
								"mytype" : "F"
							},
							"id" : "j0",
							"name" : "&nbsp&nbsp&nbsp&nbsp&nbsp电话会议"
						} ];
						for(var i=0;i<result.length;i++){
							var new_obj= {
									"adjacencies" : [{
										"nodeTo" : "j0",
										"nodeFrom" : "f1",
										"data" : {}
									}],
									"data" : {
										"$color" : "transparent",
										"$type" : "circle",
										"mytype" : "F2"
									},
									"id" : result[i].id,
									"name" : result[i].userName
								};
							//填充数据到json
							json.push(new_obj);
						} 
						loadfd();
						//当点击左侧会场后再去拖动右侧就新建一个会议
						 checkedIds="";
						 json=[{
								"adjacencies" : [],
								"data" : {
									"$color" : "transparent",
									"$type" : "circle",
									"mytype" : "F"
								},
								"id" : "j0",
								"name" : "&nbsp&nbsp&nbsp&nbsp&nbsp电话会议"
							} ];
		 	}, 'json');  
	}, 'json');   
}

//刷新fd
function loadfd(){
	fd.loadJSON(json);
	fd.computeIncremental({
		iter : 40,
		property : 'end',
		onStep : function(perc) {
		},
		onComplete : function() {
			fd.animate({
				modes : [ 'linear' ],
				transition : $jit.Trans.Elastic.easeOut,
				duration : 2500
			});
		}
	});
}
