//ע�������ռ�
Namespace.register("evecomgis.gisimpl.supermap.base");

evecomgis.gisimpl.supermap.base.Tools = function () {
	var $tools = this;

    /**
     * @Title despatch
     * @Param config.map ��ͼ����
     * @Param config.sourcePoint ��ͼ�ϵ�����㼯��
     * @Param config.targetPoint �¼�������
     * @Param config.pointNum ��ȡ���ٸ����·��������ĸ���
     * @Param config.pointIcon ������ȵ�ͼ��
     * @Return �����������������
     * @Description �����������
     * @Author Link
     * @Date 2013-12-23
     */
    this.despatch = function(config) {
        //��ͼ�ϵ�����㼯��
        this.sourcePonit = config.sourcePoint;
        //�¼�������
        this.targetPoint = config.targetPoint;
        //����
        this.despatchArray = new Array();

		//����Ŀ����Դ�����
		for (var i=0; i<this.sourcePonit.length; i++) {
			var object = {};
			var sourceX = this.sourcePonit[i].x;
			var sourceY = this.sourcePonit[i].y;
			var distance = $tools.getDistance(this.targetPoint.x,this.targetPoint.y,sourceX,sourceY).toFixed(1);
			object.point = this.sourcePonit[i];
			object.distance = distance;
			this.despatchArray.push(object);
		}


		//����
		if(this.despatchArray != null && this.despatchArray.length > 0) {
			this.despatchArray = $tools.sortArrayObject(this.despatchArray, "distance", false);
		}

		return this.despatchArray;

    }
    /**
     * @Title sortArrayObject
     * @Param arr ����
     * @Param prop ͨ���ĸ���������
     * @Param desc trueΪ����falseΪ����
     * @Return �����������������
     * @Description �����������
     * @Author Link
     * @Date 2013-12-23
     */
    this.sortArrayObject = function(arr, prop, desc) {
        var props = [], ret = [], i = 0, len = arr.length;
        if ( typeof prop == 'string') {
            for (; i < len; i++) {
                var oI = arr[i];
                (props[i] = new String(oI && oI[prop] || ''))._obj = oI;
            }
        } else if ( typeof prop == 'function') {
            for (; i < len; i++) {
                var oI = arr[i];
                (props[i] = new String(oI && prop(oI) || ''))._obj = oI;
            }
        } else {
            throw '�������ʹ���';
        }
		if(desc) {
			props.sort(function(a,b){return b-a;});
		} else {
			props.sort(function(a,b){return a-b;});
		}
        
        for ( i = 0; i < len; i++) {
            ret[i] = props[i]._obj;
        }
        return ret;
    };

    /**
     * @Title getDistance
     * @Param point1X:��һ����㾭��(������)
     * @Param point1Y:��һ�����γ��(������)
     * @Param point2X:�ڶ�����㾭��(������)
     * @Param point2Y:�ڶ������γ��(������)
     * @Return ������������
     * @Description ��ȡ��������֮��ľ��뵥λ����
     * @Author Link
     * @Date 2013-12-23
     */
    this.getDistance = function(point1X, point1Y, point2X, point2Y) {
        var JL_JD = 102834.74258026089786013677476285;
        var JL_WD = 111712.69150641055729984301412873;
        var tDistance = 0;
        try {
            var xabs = Math.abs((point1X - point2X) * JL_JD);
            var yabs = Math.abs((point1Y - point2Y) * JL_WD);
            tDistance = Math.round(Math.sqrt(xabs * xabs + yabs * yabs));
        } catch(error) {
            return -1;
        }
        return tDistance;
    }

}