(function () {
    /**
     * 脚本引用说明：该三维球的效果使用的是第三方的脚本库，脚本位置在js/third-party
     * ThreeWebGL.js、ThreeExtras.js、RequestAnimationFrame.js、Detector.js、globe.js
     * 可以参考资源：https://github.com/climboid/webgl-globe
     */

    //定义全局globe变量
    var globe = null;

    function dowork() {
        //添加“加载数据”按钮
        var LoadData = '加载数据';
        addBtn(LoadData, loadData);
        $("#map").css('border', '1px solid #3473b7');
        //使用globe.js文件创建三维球模型，并指定装载地球的div
        globe = DAT.Globe(document.getElementById('map'));
        globe.animate();
    }

    function loadData() {
        //通过SQL查询返回需要的数据
        var queryParam, queryBySQLParams, queryBySQLService;
        queryParam = new SuperMap.REST.FilterParameter({
            name:"Capitals@World#1"
        });
        queryBySQLParams = new SuperMap.REST.QueryBySQLParameters({
            queryParams:[queryParam]
        });
        queryBySQLService = new SuperMap.REST.QueryBySQLService(DemoURL.world, {
            eventListeners:{
                "processCompleted":processCompleted,
                "processFailed":processFailed
            }
        });
        queryBySQLService.processAsync(queryBySQLParams);
    }

    function processCompleted(queryEventArgs) {
        var result = queryEventArgs.result.recordsets[0].features;
        //创建dataArr数组，用来组成WebGL Globe所需要的数据格式
        var dataArr = [];
        for (var item in result) {
            dataArr.push(result[item].geometry.y);
            dataArr.push(result[item].geometry.x);
            dataArr.push(result[item].data.CAP_POP / 100000000);
        }
        //为三维球装载数据并展示
        globe.addData(dataArr, {format:'magnitude'});
        globe.createPoints();
    }

    function processFailed() {
        //查询失败后在控制台输出错误信息
        console.log("SQL查询数据失败，请检查服务配置");
    }

    dowork();
})();
