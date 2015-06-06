$(document).ready(function() {

//	var tabNum=1;
//右边信息框点击显隐
    $("#asideR-SH").click(function() {
        if ($(this).hasClass("asideR-hide")) {
            $(".asideR-title").hide();
            $(".asideR-content").hide();
            $(".asideR").width("0");
            $(this).removeClass("asideR-hide").addClass("asideR-show").css("left","-8px");
        } else{
            $(".asideR-title").show();
            $(".asideR-content").show();
            $(".asideR").width("304px");
            $(this).removeClass("asideR-show").addClass("asideR-hide").css("left","0");
        }; 
    });
	
//    //某个tab点击
//    $("#tab_li_1").click(function(){
//    	var asideR-contents= $(".asideR-content");
//    	for(var i;i<asideR-contents.length;i++){
//    		var item =asideR-contents[i];
//    		item.style.display="none";
//    	}
//    	$(this).style.display="";
//    });
//顶部标签点击滚动效果
	//设置tabs宽度
    var asideR_tabW = 0;
    var asideR_tabS = $(".asideR-tabs-shown").width();
    var asideR_tabL = parseInt($(".asideR-tabs-shown ul").css("left").replace("px",""));
    $(".asideR-tabs-shown li").each(function() {
    	asideR_tabW = $(this).width() + asideR_tabW + 9;
    });
    $(".asideR-tabs-shown ul").width(asideR_tabW);

    //头部事件标签点击滚动--左
    $(".asideR-left").click(function() {
    	if (asideR_tabL >= 0) {
            $(this).addClass("disabled");
    		return false;
    	} else{
            $(".asideR-right").removeClass("disabled");
    		asideR_tabL = asideR_tabL + 90;
    		$(".asideR-tabs-shown ul").animate({
    			left: asideR_tabL + "px"
    		});
    		if (asideR_tabL >= 0) {
    			$(".asideR-tabs-shown ul").animate({
	    			left: 0 + "px"
	    		});
    		};
    	};
    });
    //头部事件标签点击滚动--右
    $(".asideR-right").click(function() {
    	if (asideR_tabL <= (asideR_tabW - asideR_tabS) * (-1)) {
            $(this).addClass("disabled");
    		return false;
    	} else{
            $(".asideR-left").removeClass("disabled");
    		asideR_tabL = asideR_tabL - 90;
    		$(".asideR-tabs-shown ul").animate({
    			left: asideR_tabL + "px"
    		});
    		if (asideR_tabL <= (asideR_tabW - asideR_tabS) * (-1)) {
	    		$(".asideR-tabs-shown ul").animate({
	    			left: (asideR_tabW - asideR_tabS) * (-1) + "px"
	    		});
	    	};
    	};
    });

//右边信息框标签点击切换激活状态
    $(".asideR-tabs-shown li").click(function() {
        $(this).addClass("active").siblings().removeClass("active");
    });

});