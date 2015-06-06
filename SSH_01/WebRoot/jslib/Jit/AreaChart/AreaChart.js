var json1 = {
	'label' : [ '自然灾害', '事故灾害', '公共卫生', '公共安全' ],
	'values' : [{
		'label' : '0',
		'values' : [ 0 , 0 , 0 , 0 ]
	},{
		'label' : '1',
		'values' : [0, 2, 3, 4 ]
	}, {
		'label' : '2',
		'values' : [ 3 , 1 , 0 , 1  ]
	}, {
		'label' : '3',
		'values' : [ 3 , 2 , 3 , 1  ]
	}, {
		'label' : '4',
		'values' : [ 0 , 1 , 3 , 3  ]
	}, {
		'label' : '5',
		'values' : [ 5 , 6 , 0 , 3  ]
	}, {
		'label' : '6',
		'values' : [ 2 , 4 , 2 , 4  ]
	}, {
		'label' : '7',
		'values' : [ 2 , 0, 5 , 4  ]
	}, {
		'label' : '8',
		'values' : [ 2, 0 , 2 , 4  ]
	}, {
		'label' : '9',
		'values' : [ 2 , 4 , 2, 4  ]
	}, {
		'label' : '10',
		'values' : [ 2, 0, 2 , 4 ]
	}, {
		'label' : '11',
		'values' : [ 2 , 0 , 2 , 4 ]
	}, {
		'label' : '12',
		'values' : [ 2 , 4, 0, 4  ]
	}, {
		'label' : '13',
		'values' : [ 0 , 0, 0, 0  ]
	}  ]

};

/*var json = {
		'label' : [ '自然灾害', '事故灾难', '公共卫生', '公共安全' ],
		'values' : [{
			'label' : '0',
			'values' : [0,0,0,0]
		},{
			'label' : '1',
			'values' : []
		}, {
			'label' : '2',
			'values' : []
		}, {
			'label' : '3',
			'values' : []
		}, {
			'label' : '4',
			'values' : []
		}, {
			'label' : '5',
			'values' : []
		}, {
			'label' : '6',
			'values' : []
		}, {
			'label' : '7',
			'values' : []
		}, {
			'label' : '8',
			'values' : []
		}, {
			'label' : '9',
			'values' : []
		}, {
			'label' : '10',
			'values' : []
		}, {
			'label' : '11',
			'values' : []
		}, {
			'label' : '12',
			'values' : []
		} ,{
			'label' : '13',
			'values' : [0,0,0,0]
		}]

	};

		//json.values[0].values.push(${nature.m0});
		json.values[1].values.push('${nature.m0}');
		json.values[2].values.push('${nature.m1}');
		json.values[3].values.push('${nature.m2}');
		json.values[4].values.push('${nature.m3}');
		json.values[5].values.push('${nature.m4}');
		json.values[6].values.push('${nature.m5}');
		json.values[7].values.push('${nature.m6}');
		json.values[8].values.push('${nature.m7}');
		json.values[9].values.push('${nature.m8}');
		json.values[10].values.push('${nature.m9}');
		json.values[11].values.push('${nature.m10}');
		json.values[12].values.push('${nature.m11}');
		
		//json.values[0].values.push(${event.m0});
		json.values[1].values.push('${event.m0}');
		json.values[2].values.push('${event.m1}');
		json.values[3].values.push('${event.m2}');
		json.values[4].values.push('${event.m3}');
		json.values[5].values.push('${event.m4}');
		json.values[6].values.push('${event.m5}');
		json.values[7].values.push('${event.m6}');
		json.values[8].values.push('${event.m7}');
		json.values[9].values.push('${event.m8}');
		json.values[10].values.push('${event.m9}');
		json.values[11].values.push('${event.m10}');
		json.values[12].values.push('${event.m11}');
		
		//json.values[0].values.push(${health.m0});
		json.values[1].values.push('${health.m0}');
		json.values[2].values.push('${health.m1}');
		json.values[3].values.push('${health.m2}');
		json.values[4].values.push('${health.m3}');
		json.values[5].values.push('${health.m4}');
		json.values[6].values.push('${health.m5}');
		json.values[7].values.push('${health.m6}');
		json.values[8].values.push('${health.m7}');
		json.values[9].values.push('${health.m8}');
		json.values[10].values.push('${health.m9}');
		json.values[11].values.push('${health.m10}');
		json.values[12].values.push('${health.m11}');
		
		//json.values[0].values.push(${social.m0});
		json.values[1].values.push('${social.m0}');
		json.values[2].values.push('${social.m1}');
		json.values[3].values.push('${social.m2}');
		json.values[4].values.push('${social.m3}');
		json.values[5].values.push('${social.m4}');
		json.values[6].values.push('${social.m5}');
		json.values[7].values.push('${social.m6}');
		json.values[8].values.push('${social.m7}');
		json.values[9].values.push('${social.m8}');
		json.values[10].values.push('${social.m9}');
		json.values[11].values.push('${social.m10}');
		json.values[12].values.push('${social.m11}');

*/
$(function() {
	var areaChart = new $jit.AreaChart({
		injectInto : 'infovis',
		width : 656,
		height : 114,
		animate : true,
		Margin : {
			top : 5,
			left : 15,
			right : 5,
			bottom : 0
		},
		
		labelOffset : 1,
		selectOnHover : true,
		showAggregates : true, // 是否显示总数
		showLabels : true,
		// could also be 'stacked'
		type : 'stacked',// 'stacked:gradient' : 'stacked',
		// 显示的文字样式
		Label : {
			type : 'Native', // can be 'Native' or 'HTML'
			size : 13,
			family : 'Arial',
			color : 'black'
		},
		// enable tips
		Tips : {
			enable : true,
			onShow : function(tip, elem) {
				tip.innerHTML = "<b>" + elem.name + "</b>: " + elem.value;
			}
		},
		filterOnClick : true, // 点击收缩
		restoreOnRightClick : true
	// 右击舒展
	});
	// 加载 JSON data.
	//alert(JSON.stringify(json));
	areaChart.loadJSON(json1);
});
