/**添加处置项目窗*/
var addProjectFun = function() {
	var dialog = parent.eve.modalDialog({
		title : '添加处置项目信息',
		width : 640,
	    height : 350,
		url : eve.contextPath + '/jf/planmodel/projectadd?id='+planInfoID,
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
	    height : 350,
		url : eve.contextPath + '/jf/planmodel/projectedit?id='+planInfoID+"&projectId="+projectId,
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
		url : eve.contextPath + '/jf/planmodel/taskadd?id='+addProjectID,
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
		url : eve.contextPath + '/jf/planmodel/taskadd?id='+addProjectID+"&taskDeptId="+taskDeptId,
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
		url : eve.contextPath + '/jf/planmodel/taskedit?taskId='+taskId,
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