/*
 COPYRIGHT 2009 ESRI

 TRADE SECRETS: ESRI PROPRIETARY AND CONFIDENTIAL
 Unpublished material - all rights reserved under the
 Copyright Laws of the United States and applicable international
 laws, treaties, and conventions.

 For additional information, contact:
 Environmental Systems Research Institute, Inc.
 Attn: Contracts and Legal Services Department
 380 New York Street
 Redlands, California, 92373
 USA

 email: contracts@esri.com
 */
//>>built
define("esri/toolbars/draw","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/_base/Color dojo/_base/window dojo/has dojo/keys dojo/dom-construct dojo/dom-style esri/kernel esri/sniff esri/toolbars/_toolbar esri/symbols/SimpleMarkerSymbol esri/symbols/SimpleLineSymbol esri/symbols/SimpleFillSymbol esri/graphic esri/geometry/jsonUtils esri/geometry/webMercatorUtils esri/geometry/Polyline esri/geometry/Polygon esri/geometry/Multipoint esri/geometry/Rect dojo/i18n!esri/nls/jsapi".split(" "),
function(F,l,y,k,w,x,q,G,A,H,I,L,J,B,u,C,r,D,K,s,p,z,E,t){var h=F(J,{declaredClass:"esri.toolbars.Draw",_eventMap:{"draw-complete":!0,"draw-end":["geometry"]},constructor:function(b,a){this.markerSymbol=new B(B.STYLE_SOLID,10,new u(u.STYLE_SOLID,new w([255,0,0]),2),new w([0,0,0,0.25]));this.lineSymbol=new u(u.STYLE_SOLID,new w([255,0,0]),2);this.fillSymbol=new C(C.STYLE_SOLID,new u(u.STYLE_SOLID,new w([255,0,0]),2),new w([0,0,0,0.25]));this._points=[];this._defaultOptions={showTooltips:!0,drawTime:75,
tolerance:8,tooltipOffset:15};this._options=l.mixin(l.mixin({},this._defaultOptions),a||{});this._mouse=!q("esri-touch")&&!q("esri-pointer");this._mouse||(this._options.showTooltips=!1);this._onKeyDownHandler=l.hitch(this,this._onKeyDownHandler);this._onMouseDownHandler=l.hitch(this,this._onMouseDownHandler);this._onMouseUpHandler=l.hitch(this,this._onMouseUpHandler);this._onClickHandler=l.hitch(this,this._onClickHandler);this._onMouseMoveHandler=l.hitch(this,this._onMouseMoveHandler);this._onMouseDragHandler=
l.hitch(this,this._onMouseDragHandler);this._onDblClickHandler=l.hitch(this,this._onDblClickHandler);this._updateTooltip=l.hitch(this,this._updateTooltip);this._hideTooltip=l.hitch(this,this._hideTooltip);this._redrawGraphic=l.hitch(this,this._redrawGraphic)},_geometryType:null,respectDrawingVertexOrder:!1,setRespectDrawingVertexOrder:function(b){this.respectDrawingVertexOrder=b},setMarkerSymbol:function(b){this.markerSymbol=b},setLineSymbol:function(b){this.lineSymbol=b},setFillSymbol:function(b){this.fillSymbol=
b},activate:function(b,a){this._geometryType&&this.deactivate();var c=this.map,d=k.connect,g=h;this._options=l.mixin(l.mixin({},this._options),a||{});c.navigationManager.setImmediateClick(!1);switch(b){case g.ARROW:case g.LEFT_ARROW:case g.RIGHT_ARROW:case g.UP_ARROW:case g.DOWN_ARROW:case g.TRIANGLE:case g.CIRCLE:case g.ELLIPSE:case g.RECTANGLE:this._deactivateMapTools(!0,!1,!1,!0);this._onClickHandler_connect=d(c,"onClick",this._onClickHandler);this._onMouseDownHandler_connect=d(c,!this._mouse?
"onSwipeStart":"onMouseDown",this._onMouseDownHandler);this._onMouseDragHandler_connect=d(c,!this._mouse?"onSwipeMove":"onMouseDrag",this._onMouseDragHandler);this._onMouseUpHandler_connect=d(c,!this._mouse?"onSwipeEnd":"onMouseUp",this._onMouseUpHandler);q("esri-touch")&&!q("esri-pointer")&&(this._onMouseDownHandler2_connect=d(c,"onMouseDown",this._onMouseDownHandler),this._onMouseDragHandler2_connect=d(c,"onMouseDrag",this._onMouseDragHandler),this._onMouseUpHandler2_connect=d(c,"onMouseUp",this._onMouseUpHandler));
break;case g.POINT:this._onClickHandler_connect=d(c,"onClick",this._onClickHandler);break;case g.LINE:case g.EXTENT:case g.FREEHAND_POLYLINE:case g.FREEHAND_POLYGON:this._deactivateMapTools(!0,!1,!1,!0);this._onMouseDownHandler_connect=d(c,!this._mouse?"onSwipeStart":"onMouseDown",this._onMouseDownHandler);this._onMouseDragHandler_connect=d(c,!this._mouse?"onSwipeMove":"onMouseDrag",this._onMouseDragHandler);this._onMouseUpHandler_connect=d(c,!this._mouse?"onSwipeEnd":"onMouseUp",this._onMouseUpHandler);
q("esri-touch")&&!q("esri-pointer")&&(this._onMouseDownHandler2_connect=d(c,"onMouseDown",this._onMouseDownHandler),this._onMouseDragHandler2_connect=d(c,"onMouseDrag",this._onMouseDragHandler),this._onMouseUpHandler2_connect=d(c,"onMouseUp",this._onMouseUpHandler));break;case g.POLYLINE:case g.POLYGON:case g.MULTI_POINT:c.navigationManager.setImmediateClick(!0);this._onClickHandler_connect=d(c,"onClick",this._onClickHandler);this._onDblClickHandler_connect=d(c,"onDblClick",this._onDblClickHandler);
this._dblClickZoom=c.isDoubleClickZoom;c.disableDoubleClickZoom();break;default:console.error("Unsupported geometry type: "+b);return}this._onKeyDown_connect=d(c,"onKeyDown",this._onKeyDownHandler);this._redrawConnect=d(c,"onExtentChange",this._redrawGraphic);this._geometryType=b;this._toggleTooltip(!0);c.snappingManager&&("freehandpolyline"!==this._geometryType&&"freehandpolygon"!==this._geometryType&&this._mouse)&&(c.snappingManager._startSelectionLayerQuery(),c.snappingManager._setUpSnapping());
this.onActivate(this._geometryType)},deactivate:function(){var b=this.map;this._clear();var a=k.disconnect;a(this._onMouseMoveHandler_connect);a(this._onMouseDownHandler_connect);a(this._onMouseDragHandler_connect);a(this._onMouseUpHandler_connect);a(this._onMouseDownHandler2_connect);a(this._onMouseDragHandler2_connect);a(this._onMouseUpHandler2_connect);a(this._onClickHandler_connect);a(this._onDblClickHandler_connect);a(this._onKeyDown_connect);a(this._redrawConnect);this._onMouseDownHandler_connect=
this._onMouseMoveHandler_connect=this._onMouseDragHandler_connect=this._onMouseUpHandler_connect=this._onMouseDownHandler2_connect=this._onMouseDragHandler2_connect=this._onMouseUpHandler2_connect=this._onClickHandler_connect=this._onDblClickHandler_connect=this._onKeyDown_connect=this._redrawConnect=null;b.snappingManager&&(b.snappingManager._stopSelectionLayerQuery(),b.snappingManager._killOffSnapping());switch(this._geometryType){case h.CIRCLE:case h.ELLIPSE:case h.TRIANGLE:case h.ARROW:case h.LEFT_ARROW:case h.RIGHT_ARROW:case h.UP_ARROW:case h.DOWN_ARROW:case h.RECTANGLE:case h.LINE:case h.EXTENT:case h.FREEHAND_POLYLINE:case h.FREEHAND_POLYGON:this._activateMapTools(!0,
!1,!1,!0);break;case h.POLYLINE:case h.POLYGON:case h.MULTI_POINT:this._dblClickZoom&&b.enableDoubleClickZoom()}a=this._geometryType;this._geometryType=null;b.navigationManager.setImmediateClick(!1);this._toggleTooltip(!1);this.onDeactivate(a)},_clear:function(){this._graphic&&this.map.graphics.remove(this._graphic,!0);this._tGraphic&&this.map.graphics.remove(this._tGraphic,!0);this._graphic=this._tGraphic=null;this.map.snappingManager&&this.map.snappingManager._setGraphic(null);this._points=[]},
finishDrawing:function(){var b,a=this._points,c=this.map.spatialReference,d=h,a=a.slice(0,a.length);switch(this._geometryType){case d.POLYLINE:if(!this._graphic||2>a.length)return;b=new s(c);b.addPath([].concat(a));break;case d.POLYGON:if(!this._graphic||3>a.length)return;b=new p(c);a=[].concat(a,[a[0].offset(0,0)]);!p.prototype.isClockwise(a)&&!this.respectDrawingVertexOrder&&(console.debug(this.declaredClass+" :  Polygons drawn in anti-clockwise direction will be reversed to be clockwise."),a.reverse());
b.addRing(a);break;case d.MULTI_POINT:b=new z(c),y.forEach(a,function(a){b.addPoint(a)})}k.disconnect(this._onMouseMoveHandler_connect);this._clear();this._setTooltipMessage(0);this._drawEnd(b)},_drawEnd:function(b){if(b){var a=this.map.spatialReference,c;this.onDrawEnd(b);a&&(a.isWebMercator()?c=K.webMercatorToGeographic(b,!0):4326===a.wkid&&(c=D.fromJson(b.toJson())));this.onDrawComplete({geometry:b,geographicGeometry:c})}},_normalizeRect:function(b,a,c){var d=b.x;b=b.y;var g=a.x;a=a.y;var h=Math.abs(d-
g),l=Math.abs(b-a);return{x:Math.min(d,g),y:Math.max(b,a),width:h,height:l,spatialReference:c}},_onMouseDownHandler:function(b){this._dragged=!1;var a;this.map.snappingManager&&(a=this.map.snappingManager._snappingPoint);var c=a||b.mapPoint,d=h;a=this.map;var g=a.spatialReference;this._points.push(c.offset(0,0));switch(this._geometryType){case d.LINE:this._graphic=a.graphics.add(new r(new s({paths:[[[c.x,c.y],[c.x,c.y]]],spatialReference:g}),this.lineSymbol),!0);a.snappingManager&&a.snappingManager._setGraphic(this._graphic);
break;case d.FREEHAND_POLYLINE:this._oldPoint=b.screenPoint;c=new s(g);c.addPath(this._points);this._graphic=a.graphics.add(new r(c,this.lineSymbol),!0);a.snappingManager&&a.snappingManager._setGraphic(this._graphic);break;case d.CIRCLE:case d.ELLIPSE:case d.TRIANGLE:case d.ARROW:case d.LEFT_ARROW:case d.RIGHT_ARROW:case d.UP_ARROW:case d.DOWN_ARROW:case d.RECTANGLE:case d.FREEHAND_POLYGON:this._oldPoint=b.screenPoint,c=new p(g),c.addRing(this._points),this._graphic=a.graphics.add(new r(c,this.fillSymbol),
!0),a.snappingManager&&a.snappingManager._setGraphic(this._graphic)}q("esri-touch")&&b.preventDefault()},_onMouseMoveHandler:function(b){var a;this.map.snappingManager&&(a=this.map.snappingManager._snappingPoint);var c=this._points[this._points.length-1];b=a||b.mapPoint;a=this._tGraphic;var d=a.geometry;switch(this._geometryType){case h.POLYLINE:case h.POLYGON:d.setPoint(0,0,{x:c.x,y:c.y}),d.setPoint(0,1,{x:b.x,y:b.y}),a.setGeometry(d)}},_onMouseDragHandler:function(b){if(q("esri-touch")&&!this._points.length)b.preventDefault();
else{this._dragged=!0;var a;this.map.snappingManager&&(a=this.map.snappingManager._snappingPoint);var c=this._points[0],d=a||b.mapPoint,g=this.map,v=g.spatialReference;a=this._graphic;var k=h,m=g.toScreen(c),f=g.toScreen(d),e=[],e=f.x-m.x,f=f.y-m.y,n=Math.sqrt(e*e+f*f);switch(this._geometryType){case k.CIRCLE:this._hideTooltip();a.geometry=p.createCircle({center:m,r:n,numberOfPoints:60,map:g});a.setGeometry(a.geometry);break;case k.ELLIPSE:this._hideTooltip();a.geometry=p.createEllipse({center:m,
longAxis:e,shortAxis:f,numberOfPoints:60,map:g});a.setGeometry(a.geometry);break;case k.TRIANGLE:this._hideTooltip();e=[[0,-n],[0.8660254037844386*n,0.5*n],[-0.8660254037844386*n,0.5*n],[0,-n]];a.geometry=this._toPolygon(e,m.x,m.y);a.setGeometry(a.geometry);break;case k.ARROW:this._hideTooltip();c=f/n;g=e/n;d=0.25*g*n;v=0.25*n/(f/e);n*=0.25*c;e=[[e,f],[e-d*(1+24/v),f+24*g-n],[e-d*(1+12/v),f+12*g-n],[-12*c,12*g],[12*c,-12*g],[e-d*(1-12/v),f-12*g-n],[e-d*(1-24/v),f-24*g-n],[e,f]];a.geometry=this._toPolygon(e,
m.x,m.y);a.setGeometry(a.geometry);break;case k.LEFT_ARROW:this._hideTooltip();e=0>=e?[[e,0],[0.75*e,f],[0.75*e,0.5*f],[0,0.5*f],[0,-0.5*f],[0.75*e,-0.5*f],[0.75*e,-f],[e,0]]:[[0,0],[0.25*e,f],[0.25*e,0.5*f],[e,0.5*f],[e,-0.5*f],[0.25*e,-0.5*f],[0.25*e,-f],[0,0]];a.geometry=this._toPolygon(e,m.x,m.y);a.setGeometry(a.geometry);break;case k.RIGHT_ARROW:this._hideTooltip();e=0<=e?[[e,0],[0.75*e,f],[0.75*e,0.5*f],[0,0.5*f],[0,-0.5*f],[0.75*e,-0.5*f],[0.75*e,-f],[e,0]]:[[0,0],[0.25*e,f],[0.25*e,0.5*f],
[e,0.5*f],[e,-0.5*f],[0.25*e,-0.5*f],[0.25*e,-f],[0,0]];a.geometry=this._toPolygon(e,m.x,m.y);a.setGeometry(a.geometry);break;case k.UP_ARROW:this._hideTooltip();e=0>=f?[[0,f],[-e,0.75*f],[-0.5*e,0.75*f],[-0.5*e,0],[0.5*e,0],[0.5*e,0.75*f],[e,0.75*f],[0,f]]:[[0,0],[-e,0.25*f],[-0.5*e,0.25*f],[-0.5*e,f],[0.5*e,f],[0.5*e,0.25*f],[e,0.25*f],[0,0]];a.geometry=this._toPolygon(e,m.x,m.y);a.setGeometry(a.geometry);break;case k.DOWN_ARROW:this._hideTooltip();e=0<=f?[[0,f],[-e,0.75*f],[-0.5*e,0.75*f],[-0.5*
e,0],[0.5*e,0],[0.5*e,0.75*f],[e,0.75*f],[0,f]]:[[0,0],[-e,0.25*f],[-0.5*e,0.25*f],[-0.5*e,f],[0.5*e,f],[0.5*e,0.25*f],[e,0.25*f],[0,0]];a.geometry=this._toPolygon(e,m.x,m.y);a.setGeometry(a.geometry);break;case k.RECTANGLE:this._hideTooltip();e=[[0,0],[e,0],[e,f],[0,f],[0,0]];a.geometry=this._toPolygon(e,m.x,m.y);a.setGeometry(a.geometry);break;case k.LINE:a.setGeometry(l.mixin(a.geometry,{paths:[[[c.x,c.y],[d.x,d.y]]]}));break;case k.EXTENT:a&&g.graphics.remove(a,!0);a=new E(this._normalizeRect(c,
d,v));a._originOnly=!0;this._graphic=g.graphics.add(new r(a,this.fillSymbol),!0);g.snappingManager&&g.snappingManager._setGraphic(this._graphic);break;case k.FREEHAND_POLYLINE:this._hideTooltip();if(!1===this._canDrawFreehandPoint(b)){q("esri-touch")&&b.preventDefault();return}this._points.push(b.mapPoint.offset(0,0));a.geometry._insertPoints([d.offset(0,0)],0);a.setGeometry(a.geometry);break;case k.FREEHAND_POLYGON:this._hideTooltip();if(!1===this._canDrawFreehandPoint(b)){q("esri-touch")&&b.preventDefault();
return}this._points.push(b.mapPoint.offset(0,0));a.geometry._insertPoints([d.offset(0,0)],0);a.setGeometry(a.geometry)}q("esri-touch")&&b.preventDefault()}},_canDrawFreehandPoint:function(b){if(!this._oldPoint)return!1;var a=this._oldPoint.x-b.screenPoint.x,c=this._oldPoint.y-b.screenPoint.y,d=this._options.tolerance;if((0>a?-1*a:a)<d&&(0>c?-1*c:c)<d)return!1;a=new Date;if(a-this._startTime<this._options.drawTime)return!1;this._startTime=a;this._oldPoint=b.screenPoint;return!0},_onMouseUpHandler:function(b){if(this._dragged){0===
this._points.length&&this._points.push(b.mapPoint.offset(0,0));var a;this.map.snappingManager&&(a=this.map.snappingManager._snappingPoint);var c=this._points[0];a=a||b.mapPoint;var d=this.map.spatialReference,g=h,k;switch(this._geometryType){case g.CIRCLE:case g.ELLIPSE:case g.TRIANGLE:case g.ARROW:case g.LEFT_ARROW:case g.RIGHT_ARROW:case g.UP_ARROW:case g.DOWN_ARROW:case g.RECTANGLE:k=this._graphic.geometry;break;case g.LINE:k=new s({paths:[[[c.x,c.y],[a.x,a.y]]],spatialReference:d});break;case g.EXTENT:k=
(new E(this._normalizeRect(c,a,d))).getExtent();break;case g.FREEHAND_POLYLINE:k=new s(d);k.addPath([].concat(this._points,[a.offset(0,0)]));break;case g.FREEHAND_POLYGON:k=new p(d),c=[].concat(this._points,[a.offset(0,0),this._points[0].offset(0,0)]),!p.prototype.isClockwise(c)&&!this.respectDrawingVertexOrder&&(console.debug(this.declaredClass+" :  Polygons drawn in anti-clockwise direction will be reversed to be clockwise."),c.reverse()),k.addRing(c)}q("esri-touch")&&b.preventDefault();this._clear();
this._drawEnd(k)}else this._clear()},_onClickHandler:function(b){var a;this.map.snappingManager&&(a=this.map.snappingManager._snappingPoint);b=a||b.mapPoint;a=this.map;var c=a.toScreen(b),d=h;this._points.push(b.offset(0,0));switch(this._geometryType){case d.POINT:this._drawEnd(b.offset(0,0));this._setTooltipMessage(0);break;case d.POLYLINE:1===this._points.length?(c=new s(a.spatialReference),c.addPath(this._points),this._graphic=a.graphics.add(new r(c,this.lineSymbol),!0),a.snappingManager&&a.snappingManager._setGraphic(this._graphic),
this._onMouseMoveHandler_connect=k.connect(a,"onMouseMove",this._onMouseMoveHandler),this._tGraphic=a.graphics.add(new r(new s({paths:[[[b.x,b.y],[b.x,b.y]]],spatialReference:a.spatialReference}),this.lineSymbol),!0)):(this._graphic.geometry._insertPoints([b.offset(0,0)],0),this._graphic.setGeometry(this._graphic.geometry).setSymbol(this.lineSymbol),a=this._tGraphic,c=a.geometry,c.setPoint(0,0,b.offset(0,0)),c.setPoint(0,1,b.offset(0,0)),a.setGeometry(c));break;case d.POLYGON:1===this._points.length?
(d=new p(a.spatialReference),d.addRing(this._points),this._graphic=a.graphics.add(new r(d,this.fillSymbol),!0),a.snappingManager&&a.snappingManager._setGraphic(this._graphic),this._onMouseMoveHandler_connect=k.connect(a,"onMouseMove",this._onMouseMoveHandler),this._tGraphic=a.graphics.add(new r(new s({paths:[[[b.x,b.y],[b.x,b.y]]],spatialReference:a.spatialReference}),this.fillSymbol),!0)):(this._graphic.geometry._insertPoints([b.offset(0,0)],0),this._graphic.setGeometry(this._graphic.geometry).setSymbol(this.fillSymbol),
a=this._tGraphic,c=a.geometry,c.setPoint(0,0,b.offset(0,0)),c.setPoint(0,1,b.offset(0,0)),a.setGeometry(c));break;case d.MULTI_POINT:b=this._points;1===b.length?(c=new z(a.spatialReference),c.addPoint(b[b.length-1]),this._graphic=a.graphics.add(new r(c,this.markerSymbol),!0),a.snappingManager&&a.snappingManager._setGraphic(this._graphic)):(this._graphic.geometry.addPoint(b[b.length-1]),this._graphic.setGeometry(this._graphic.geometry).setSymbol(this.markerSymbol));break;case d.ARROW:b=[[0,0],[-24,
24],[-24,12],[-96,12],[-96,-12],[-24,-12],[-24,-24],[0,0]];a=c.x;c=c.y;this._addShape(b,a,c);break;case d.LEFT_ARROW:b=[[0,0],[24,24],[24,12],[96,12],[96,-12],[24,-12],[24,-24],[0,0]];a=c.x;c=c.y;this._addShape(b,a,c);break;case d.RIGHT_ARROW:b=[[0,0],[-24,24],[-24,12],[-96,12],[-96,-12],[-24,-12],[-24,-24],[0,0]];a=c.x;c=c.y;this._addShape(b,a,c);break;case d.UP_ARROW:b=[[0,0],[-24,24],[-12,24],[-12,96],[12,96],[12,24],[24,24],[0,0]];a=c.x;c=c.y;this._addShape(b,a,c);break;case d.DOWN_ARROW:b=[[0,
0],[-24,-24],[-12,-24],[-12,-96],[12,-96],[12,-24],[24,-24],[0,0]];a=c.x;c=c.y;this._addShape(b,a,c);break;case d.TRIANGLE:b=[[0,-48],[41.56921938165306,24],[-41.56921938165306,24],[0,-48]];a=c.x;c=c.y;this._addShape(b,a,c);break;case d.RECTANGLE:b=[[0,-96],[96,-96],[96,0],[0,0],[0,-96]];a=c.x-48;c=c.y+48;this._addShape(b,a,c);break;case d.CIRCLE:d=new p(a.spatialReference);this._graphic=a.graphics.add(new r(d,this.fillSymbol),!0);this._graphic.geometry=p.createCircle({center:c,r:48,numberOfPoints:60,
map:a});this._graphic.setGeometry(this._graphic.geometry);this._drawEnd(this._graphic.geometry);break;case d.ELLIPSE:d=new p(a.spatialReference),this._graphic=a.graphics.add(new r(d,this.fillSymbol),!0),this._graphic.geometry=p.createEllipse({center:c,longAxis:48,shortAxis:24,numberOfPoints:60,map:a}),this._graphic.setGeometry(this._graphic.geometry),this._drawEnd(this._graphic.geometry)}this._setTooltipMessage(this._points.length)},_addShape:function(b,a,c){b=this.map.graphics.add(new r(this._toPolygon(b,
a,c),this.fillSymbol),!0);this._setTooltipMessage(0);var d;b&&(d=D.fromJson(b.geometry.toJson()),this.map.graphics.remove(b,!0));this._drawEnd(d)},_toPolygon:function(b,a,c){var d=this.map,g=new p(d.spatialReference);g.addRing(y.map(b,function(b){return d.toMap({x:b[0]+a,y:b[1]+c})}));return g},_onDblClickHandler:function(b){var a,c=this._points,d=this.map.spatialReference,g=h;q("esri-touch")&&c.push(b.mapPoint);c=c.slice(0,c.length);switch(this._geometryType){case g.POLYLINE:if(!this._graphic||2>
c.length){k.disconnect(this._onMouseMoveHandler_connect);this._clear();this._onClickHandler(b);return}a=new s(d);a.addPath([].concat(c));break;case g.POLYGON:if(!this._graphic||2>c.length){k.disconnect(this._onMouseMoveHandler_connect);this._clear();this._onClickHandler(b);return}a=new p(d);b=[].concat(c,[c[0].offset(0,0)]);!p.prototype.isClockwise(b)&&!this.respectDrawingVertexOrder&&(console.debug(this.declaredClass+" :  Polygons drawn in anti-clockwise direction will be reversed to be clockwise."),
b.reverse());a.addRing(b);break;case g.MULTI_POINT:a=new z(d),y.forEach(c,function(b){a.addPoint(b)})}k.disconnect(this._onMouseMoveHandler_connect);this._clear();this._setTooltipMessage(0);this._drawEnd(a)},_onKeyDownHandler:function(b){b.keyCode===G.ESCAPE&&(k.disconnect(this._onMouseMoveHandler_connect),this._clear(),this._setTooltipMessage(0))},_toggleTooltip:function(b){this._options.showTooltips&&(b?this._tooltip||(this._tooltip=A.create("div",{"class":"tooltip"},this.map.container),this._tooltip.style.display=
"none",this._tooltip.style.position="fixed",this._setTooltipMessage(0),this._onTooltipMouseEnterHandler_connect=k.connect(this.map,"onMouseOver",this._updateTooltip),this._onTooltipMouseLeaveHandler_connect=k.connect(this.map,"onMouseOut",this._hideTooltip),this._onTooltipMouseMoveHandler_connect=k.connect(this.map,"onMouseMove",this._updateTooltip)):this._tooltip&&(k.disconnect(this._onTooltipMouseEnterHandler_connect),k.disconnect(this._onTooltipMouseLeaveHandler_connect),k.disconnect(this._onTooltipMouseMoveHandler_connect),
A.destroy(this._tooltip),this._tooltip=null))},_hideTooltip:function(){var b=this._tooltip;b&&(b.style.display="none")},_setTooltipMessage:function(b){var a=this._tooltip;if(a){var c="";switch(this._geometryType){case h.POINT:c=t.toolbars.draw.addPoint;break;case h.ARROW:case h.LEFT_ARROW:case h.RIGHT_ARROW:case h.UP_ARROW:case h.DOWN_ARROW:case h.TRIANGLE:case h.RECTANGLE:case h.CIRCLE:case h.ELLIPSE:c=t.toolbars.draw.addShape;break;case h.LINE:case h.EXTENT:case h.FREEHAND_POLYLINE:case h.FREEHAND_POLYGON:c=
t.toolbars.draw.freehand;break;case h.POLYLINE:case h.POLYGON:c=t.toolbars.draw.start;1===b?c=t.toolbars.draw.resume:2<=b&&(c=t.toolbars.draw.complete);break;case h.MULTI_POINT:c=t.toolbars.draw.addMultipoint,1<=b&&(c=t.toolbars.draw.finish)}a.innerHTML=c}},_updateTooltip:function(b){var a=this._tooltip;if(a){var c;b.clientX||b.pageY?(c=b.clientX,b=b.clientY):(c=b.clientX+x.body().scrollLeft-x.body().clientLeft,b=b.clientY+x.body().scrollTop-x.body().clientTop);a.style.display="none";H.set(a,{left:c+
this._options.tooltipOffset+"px",top:b+"px"});a.style.display=""}},_redrawGraphic:function(b,a,c,d){if(c||this.map.wrapAround180)(b=this._graphic)&&b.setGeometry(b.geometry),(b=this._tGraphic)&&b.setGeometry(b.geometry)},onActivate:function(){},onDeactivate:function(){},onDrawComplete:function(){},onDrawEnd:function(){}});l.mixin(h,{POINT:"point",MULTI_POINT:"multipoint",LINE:"line",EXTENT:"extent",POLYLINE:"polyline",POLYGON:"polygon",FREEHAND_POLYLINE:"freehandpolyline",FREEHAND_POLYGON:"freehandpolygon",
ARROW:"arrow",LEFT_ARROW:"leftarrow",RIGHT_ARROW:"rightarrow",UP_ARROW:"uparrow",DOWN_ARROW:"downarrow",TRIANGLE:"triangle",CIRCLE:"circle",ELLIPSE:"ellipse",RECTANGLE:"rectangle"});q("extend-esri")&&l.setObject("toolbars.Draw",h,I);return h});