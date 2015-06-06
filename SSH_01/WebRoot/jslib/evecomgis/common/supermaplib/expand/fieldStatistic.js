(function() {
    var map, layer, layersName = [], currentData, currentStatisticResult;
    function dowork() {
        var inputDiv = $("<div style='margin-top:20px;'></div>")
        $("<span>图层：</span>").appendTo(inputDiv);
        var input = $("<select id='layerSelect' style='width:150px'></select>");
        input.appendTo(inputDiv);
        $("<span>字段：</span>").appendTo(inputDiv);
        var input = $("<select id='fieldSelect' style='width:100px'></select>");
        input.appendTo(inputDiv);
        $("#func").append(inputDiv);
        
        addBtn("统计",fieldStatistic);
        
        $("#layerSelect").change(function(){
            //getFields(this.value);
            getFields();
        });
        
        map = new SuperMap.Map("map",{controls: [
            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.Navigation({
                dragPanOptions: {
                                    enableKinetic: true
                                }
            })]
        });
        layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", DemoURL.world,{
            transparent: true, cacheEnabled: true}, {maxResolution:"auto"}); 
        layer.events.on({"layerInitialized":addLayer});    
    }

    function addLayer() {
        map.addLayers([layer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        queryLayersInfo();
    }
    //查询图层信息
    function queryLayersInfo() {
        var getLayersInfoService = new SuperMap.REST.GetLayersInfoService(DemoURL.world, {
                eventListeners: {"processCompleted": queryLayersInfoCompleted, "processFailed": processFailed}
            });
        getLayersInfoService.processAsync();
    }
    
    //显示子图层信息
    function queryLayersInfoCompleted(queryEventArgs) {
        var i, len, sublayer, layersInfo,
            result = queryEventArgs.result;
        if(result && result.subLayers && result.subLayers.layers){
            layersInfo = result.subLayers.layers;
            layersName = [];
            for(i = 0, len = layersInfo.length; i < len; i++){
                subLayer = layersInfo[i];
                if("UGC" == subLayer.type){
                    //记录数据源，数据集信息供字段查询统计使用
                    if(subLayer.datasetInfo.name && subLayer.datasetInfo.dataSourceName){
                        layersName[i] = {name: subLayer.datasetInfo.name,
                                    dataSourceName:subLayer.datasetInfo.dataSourceName};
                    }
                }
            }
        }
        //添加图层信息到选择列表
        $("#layerSelect").empty();
        var innerHTML = "";
        var layerSelect = $("#layerSelect")[0];//document.getElementById("layerSelect");
        if(!layerSelect){
            return;
        }
        var option;
        for(i = 0; i < layersName.length; i++){
            layerSelect.options[i] = new Option(layersName[i].name, layersName[i].name);
        }
        getFields();
    }
    
    
    function getFields(){
        var name = $("#layerSelect :selected").text();
        var i, len, dataInfo, getFieldsService;
        for(i = 0, len = layersName.length; i < len; i++ ){
            dataInfo = layersName[i];
            if(dataInfo.name == name){
                //设置数据集，数据源，查询fields信息
                currentData = dataInfo;
                getFieldsService = new SuperMap.REST.GetFieldsService( DemoURL.world_data, {
                    eventListeners: {"processCompleted": getFieldsCompleted, "processFailed": processFailed},
                    datasource: dataInfo.dataSourceName,
                    dataset: dataInfo.name
                });
                getFieldsService.processAsync();
                break;
            }
        }
    }
    
    function getFieldsCompleted(getFieldsEventArgs){
        var i, len, result = getFieldsEventArgs.result
            fieldNames = result.fieldNames,
            innerHTML = "";
        //注，因为iE8下动态更新option无效，所以这里先移除再整体添加
        var parentDIV =  $("#fieldSelect").parent();
        $("#fieldSelect").remove();
        for(i = 0, len = fieldNames.length; i < len; i++){
            innerHTML += "<option>" + fieldNames[i] + "</option>";
        }
        var fieldSelect = $("<select id='fieldSelect' style='width:100px'></select>");
        fieldSelect.append($(innerHTML));
        parentDIV.append(fieldSelect);
    }
    
    function fieldStatistic(fieldname){
        var fieldname = $("#fieldSelect :selected").text();
        currentStatisticResult = {fieldName: fieldname};
        if(currentData){
            var keys = SuperMap.REST.StatisticMode;
            //针对六种统计方式分别进行请求
            for(var key in keys){
                currentStatisticResult[keys[key]] = null;
                
                var statisticService = new SuperMap.REST.FieldStatisticService( DemoURL.world_data ,{
                    eventListeners: {"processCompleted": statisticComplete, "processFailed": processFailed},
                    datasource: currentData.dataSourceName,
                    dataset: currentData.name,
                    field: fieldname,
                    statisticMode: keys[key]
                })
                statisticService.processAsync();
            }
        }
    }
    
    function statisticComplete(fieldStatisticEventArgs){
        var getAll = true, 
            result = fieldStatisticEventArgs.result;
        if(currentStatisticResult){
            if(null == currentStatisticResult[result.mode]){
                currentStatisticResult[result.mode] = result.result;
            }
        }
        for(var key in currentStatisticResult){
            if(null == currentStatisticResult[key]){
                getAll = false;
                break;
            }
        }
        if(getAll){
            showResult(currentStatisticResult);
        }
    }
    
    function showResult(){
        //如果有，删除之前的结果
        $("#fieldResult").remove();
        var fieldRestulHTML = '<div id="fieldResult" class="alert alert-success fade in" style="position:absolute; top: 350px; left: 50px; z-index: 2000; text-align: center;">' 
                            + '<button class="close" data-dismiss="alert">&times;</button>'
                            + '<strong>字段（' +  currentStatisticResult.fieldName + '）统计结果:</strong>'
                            + '</div>';
        var fieldResult = $(fieldRestulHTML);
        //这里因为想借用中文显示，所以使用定义的内部数组而不是SuperMap.REST.StatisticMode..
        var keys = ["AVERAGE","MAX","MIN","STDDEVIATION","SUM","VARIANCE"],
            table = $("<table id='trafficRes' class='table table-bordered'><tr><td>平均值</td><td>最大值</td><td>最小值</td>"
                    + "<td>标准差</td><td>和</td><td>方差</td></tr></table>");
        var resultTR = $("<tr></tr>");
        for(var i = 0; i < keys.length; i++){
            $("<td>" + currentStatisticResult[keys[i]] + "</td>").appendTo(resultTR);
        }
        table.append(resultTR);
        fieldResult.append(table);
        $('#map').append(fieldResult);
        
    }
    
    function processFailed(e) {
        doMapAlert("",e.error.errorMsg,true);
    }
    function clearFeatures() {
        //先清除上次的显示结果
        vectorLayer.removeAllFeatures();
        vectorLayer.refresh();
    }
    dowork();
})();
