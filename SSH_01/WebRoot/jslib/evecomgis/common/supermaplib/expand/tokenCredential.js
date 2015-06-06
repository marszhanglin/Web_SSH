(function () {
    var map, layer, url, value;

    function dowork() {
        var create = '输入安全信息';
        addBtn(create, messageInput);
        //初始化面板
        var modal =
            '<div id="myModal" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: block; top: 20%">'
                + '<div class="modal-header">'
                + '<button type="button" id="closeMe" class="close" data-dismiss="modal" aria-hidden="true">×</button>'
                + '<h3 id="myModalLabel">请输入服务地址和安全认证信息</h3></div>'
                + '<div class="modal-body">'
                + '<form class="form-horizontal">'
                + '<div class="control-group">'
                + '<label class="control-label" for="serverAddr">服务地址</label>'
                + '<div class="controls">'
                + '<input type="text" id="serverAddr">'
                + '<p class="muted" style="text-indent: 0;">例如：http://localhost:8090/iserver/services/map-world/rest/maps/World;本范例要求rest图层服务</p>'
                + '</div>'
                + '</div>'
                + '<div class="control-group">'
                + '<label class="control-label" for="token">token值</label>'
                + '<div class="controls">'
                + '<input type="text" id="token">'
                + '<p class="muted" style="text-indent: 0;">说明：在安全认证开启并且对图层设置访问权限的时候填写token</p>'
                + '</div>'
                + '</div>'
                + '</form>'
                + '</div>'
                + '<div class="modal-footer">'
                + '<button id="commit" class="btn btn-primary">确定</button>'
                + '</div>'
                + '</div>'
                + '<div id="backdrop" class="modal-backdrop fade in"></div>';

        function messageInput() {
            $("body").append(modal);

            $("#closeMe, #backdrop").click(function () {
                $('#backdrop').remove();
                $('#myModal').remove();
            });
            $("#commit").click(function () {
                value = $("#token").val();
                url = $("#serverAddr").val();
                SuperMap.Credential.CREDENTIAL = new SuperMap.Credential(value);
                $('#backdrop').remove();
                $('#myModal').remove();
                if (url !== "") {
                    init();
                }
            });
        }
    }

    function init() {
        if (!map) {
            map = new SuperMap.Map("map", {controls: [
                new SuperMap.Control.ScaleLine(),
                new SuperMap.Control.Zoom(),
                new SuperMap.Control.Navigation({
                    dragPanOptions: {
                        enableKinetic: true
                    }
                })],
                allOverlays: true
            });
        }
        layer = new SuperMap.Layer.TiledDynamicRESTLayer("Layer", url, {transparent: true, cacheEnabled: true, redirect: true}, {maxResolution: "auto"});
        layer.events.on({"layerInitialized": addLayer});
    }

    function addLayer() {
        var center = new SuperMap.LonLat(0, 0);
        map.addLayers([layer]);
        map.setCenter(center, 0);
    }

    dowork();
})();
