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
require({cache:{"url:esri/dijit/geoenrichment/templates/EnrichOptionsPage.html":'\ufeff\x3cdiv data-dojo-type\x3d"dijit/layout/ContentPane" data-dojo-props\x3d"row: 0" style\x3d"padding-bottom: 0;"\x3e\r\n    \x3cdiv class\x3d"EnrichOptionsPage_Stacking EnrichOptionsPage_TrimWithEllipsis"\x3e\r\n        ${nls.selectedVariables}\r\n        \x3cspan data-dojo-attach-point\x3d"dataCollectionNames"\x3e\x3c/span\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"bufferDiv" class\x3d"EnrichOptionsPage_Stacking"\x3e\r\n        ${nls.bufferOptions}\r\n        \x3cspan data-dojo-attach-point\x3d"bufferString"\x3e\x3c/span\x3e\r\n        \x3cspan data-dojo-attach-point\x3d"bufferEdit"\x3e(\x3cspan class\x3d"Wizard_Link" data-dojo-attach-event\x3d"click: _editBuffer"\x3e${nls.edit}\x3c/span\x3e)\x3c/span\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"bufferEditDiv" class\x3d"Wizard_AltRow EnrichOptionsPage_Stacking" style\x3d"display: none;"\x3e\x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"totalVars" class\x3d"EnrichOptionsPage_Stacking"\x3e\x26nbsp;\x3c/div\x3e\r\n\x3c/div\x3e\r\n\x3cdiv data-dojo-type\x3d"dijit/layout/ContentPane" data-dojo-attach-point\x3d"fieldsPane" data-dojo-props\x3d"row: 1" style\x3d"padding-top: 0; padding-bottom: 0;"\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"fieldsDiv" class\x3d"EnrichOptionsPage_Fields"\x3e\x3c/div\x3e\r\n\x3c/div\x3e\r\n\x3cdiv data-dojo-type\x3d"dijit/layout/ContentPane" data-dojo-props\x3d"row: 2" style\x3d"padding-top: 0;"\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"overwriteExisting" class\x3d"EnrichOptionsPage_OverwriteExisting EnrichOptionsPage_Stacking"\x3e${nls.overwriteExisting}\x3c/div\x3e\r\n    \x3cbutton class\x3d"Wizard_Button" data-dojo-attach-point\x3d"backButton" data-dojo-attach-event\x3d"click: _back"\x3e${nls.back}\x3c/button\x3e\r\n    \x3cbutton class\x3d"Wizard_Button" data-dojo-attach-point\x3d"finishButton" data-dojo-attach-event\x3d"click: _finish" disabled\x3d"disabled"\x3e${nls.finish}\x3c/button\x3e\r\n\x3c/div\x3e\r\n'}});
define("esri/dijit/geoenrichment/EnrichOptionsPage","../../declare dojo/_base/lang dojo/dom-construct dojo/dom-class dojo/Stateful dojo/number dojo/string dojo/aspect ./_WizardPage dojo/i18n!../../nls/jsapi dojo/text!./templates/EnrichOptionsPage.html ../../tasks/geoenrichment/RingBuffer ../../tasks/geoenrichment/DriveBuffer ./BufferOptions dojox/html/entities ./_Invoke dgrid/OnDemandGrid dgrid/extensions/DijitRegistry dojo/store/Memory dojo/data/ObjectStore dgrid/tree dijit/form/Select dijit/form/CheckBox dojox/mvc/sync ./config esri/request ./lang dijit/layout/ContentPane dijit/form/NumberSpinner dijit/form/RadioButton".split(" "),
function(f,g,l,r,k,s,m,t,u,e,v,w,x,y,p,z,A,B,C,D,E,F,G,q,n,H,I){e=e.geoenrichment.dijit.EnrichOptionsPage;var J=f([D],{getChildren:function(a){return a.getChildren()},mayHaveChildren:function(a){return!!a.getChildren}});k=f([k],{checked:!0,getLabel:function(){},getClass:function(){return""}});var L=f([k],{_children:null,constructor:function(a,d,b){this.set("id2",a.id);this._children=[];for(var c=0;c<a.variables.length;c++){var e=new K(a.variables[c],b),h=a.id+"."+a.variables[c].id;e.set("id2",h);
h=d[h];e.set("checked",g.isString(h));h&&e.set("mapTo",h);this._children.push(e)}},_checkedSetter:function(a){this.checked=a;if(this._children)for(a=0;a<this._children.length;a++)this._children[a].set("checked",this.checked)},getLabel:function(){return this.metadata.title},getChildren:function(){return this._children}}),K=f([k],{mapTo:null,_page:null,constructor:function(a,d){this._page=d},_checkedSetter:function(a){this.checked!=a&&(this.checked=a,this._page.invoke("_updateTotalVars"))},_mapToSetter:function(a){this.mapTo!=
a&&(this.mapTo=a,this._page.invoke("_updateTotalVars"))},getLabel:function(){return this.alias},getClass:function(){return"EnrichOptionsPage_VariableCheckbox"},getOptions:function(){var a=[];a.push({value:"_",label:p.encode(this._page.allowNewColumns?e.newColumn:e.noColumn)});if(this._page.fields)for(var d=0;d<this._page.fields.length;d++){var b=this._page.fields[d];if(b.type&&b.type!=this.type){var c=!1;"esriFieldTypeInteger"==b.type&&"esriFieldTypeDouble"==this.type&&0==this.precision?c=!0:"esriFieldTypeInteger"==
this.type&&"esriFieldTypeDouble"==b.type&&(c=!0);if(!c)continue}a.push({value:b.id,label:p.encode(b.label||b.id)})}return a}}),M=f([A,B],{removeRow:function(a,d){var b=dijit.findWidgets(a);if(b)for(var c=0;c<b.length;c++)b[c].destroy();this.inherited(arguments)}});return f("esri.dijit.geoenrichment.EnrichOptionsPage",[u,z],{templateString:v,nls:e,geomType:null,buffer:null,fields:null,allowNewColumns:!0,dataCollections:null,studyAreaCount:null,_bufferOptions:null,_fieldSelects:null,_grid:null,_model:null,
_eventMap:{back:!0,finish:!0},constructor:function(){this.buffer=new w},_setGeomTypeAttr:function(a){this._set("geomType",a);switch(this.geomType){case "esriGeometryPolygon":this.bufferEdit.style.display="none";this.bufferString.innerHTML=e.bufferPolygon;break;case "esriGeometryPoint":this.bufferEdit.style.display="";this.bufferString.innerHTML=e.bufferRing;break;case "esriGeometryPolyline":this.bufferEdit.style.display="",this.bufferString.innerHTML=e.bufferRing,this.driveTimeRadio.set("disabled",
!0)}},_setFieldsMapAttr:function(a){var d={},b;for(b in a)d[b.split(".")[0]]=!0;b=[];this._model=[];for(var c=0;c<this.dataCollections.length;c++)d[this.dataCollections[c].id]&&(b.push(this.dataCollections[c].metadata.title),this._model.push(new L(this.dataCollections[c],a,this)));this.dataCollectionNames.innerHTML=b.join(", ");this.dataCollectionNames.title=b.join("\n");a=new C({data:this._model,idProperty:"id2"});a=new J(a);this._grid?this._grid.set("store",a):(d=[E({label:" ",field:"expander",
shouldExpand:g.hitch(this,this._shouldExpand)}),{label:e.varName,field:"varName",sortable:!1,renderCell:g.hitch(this,this._renderCheckBox)}],this.fields&&d.push({label:e.column,field:"column",sortable:!1,renderCell:g.hitch(this,this._renderSelect)}),this._grid=new M({store:a,columns:d},this.fieldsDiv),t.after(this._grid,"expand",g.hitch(this,this.invoke,"resize")),this._grid.startup());this.invoke("_updateTotalVars")},_shouldExpand:function(a,d,b){return void 0!==b?b:1==this._model.length},_renderCheckBox:function(a,
d,b,c){d=new G;b=a.getLabel();q(a,"checked",d,"checked");c=l.create("label",{"class":"EnrichOptionsPage_TrimWithEllipsis EnrichOptionsPage_CheckboxLabel",title:b});r.add(c,a.getClass());d.placeAt(c);l.create("span",{innerHTML:b},c);return c},_renderSelect:function(a,d,b,c){if(a.getOptions)return d=new F({options:a.getOptions(),maxHeight:151}),q(a,"mapTo",d,"value",{converter:{format:function(a){return a||"_"},parse:function(a){return"_"!=a?a:null}}}),d.domNode},_updateTotalVars:function(){function a(a,
c){I.isNumber(a)&&(a=m.substitute(e.credits,{credits:s.format(a)}));var f={varCount:b,rowCount:rowCount,credits:a};d.totalVars.innerHTML=m.substitute(h,f);void 0===c&&(c=m.substitute(g,f));d.totalVars.title=c}var d=this,b=0,c=!1;this._enumCheckedVars(function(a,d){b++;d.mapTo&&(c=!0)});this.overwriteExisting.style.visibility=c?"visible":"hidden";this.finishButton.disabled=0==b;var f={enrichVariableCount:b,f:"json"};this.get("buffer")instanceof x&&(f.serviceAreaCount=1);var h,g;this.studyAreaCount?
(h=e.totalVars,g=e.totalVarsTooltip,rowCount=this.studyAreaCount):(h=e.varsPerRow,g=e.varsPerRowTooltip,rowCount=1);n.token&&(f.token=n.token);var k=n.portalUrl;0>k.indexOf("://")&&(k=window.location.protocol+"//"+k);a(e.creditsCalc,"");H({url:k+"/sharing/rest/portals/self/cost",content:f}).then(function(b){a(b.transactionCreditCost*rowCount)},function(b){a("error",b.toString())})},_getBufferAttr:function(){return this._bufferOptions?this._bufferOptions.get("buffer"):this.buffer},_setBufferAttr:function(a){this._set("buffer",
a);this._bufferOptions&&this._bufferOptions.set("buffer",a)},_editBuffer:function(){l.destroy(this.bufferDiv);this.bufferEditDiv.style.display="";this._bufferOptions=new y({buffer:this.buffer,onChange:g.hitch(this,this.invoke,"_updateTotalVars")});this.buffer=void 0;this._bufferOptions.placeAt(this.bufferEditDiv);this.resize()},_getFieldsMapAttr:function(){var a={};this._enumCheckedVars(function(d,b){a[d.id+"."+b.id]=b.mapTo||""});return a},_enumCheckedVars:function(a){for(var d=0;d<this._model.length;d++)for(var b=
this._model[d].getChildren(),c=0;c<b.length;c++)b[c].checked&&(this.allowNewColumns||b[c].mapTo)&&a(this._model[d],b[c])},_back:function(){this.onBack()},onBack:function(){},_finish:function(){this.onFinish()},onFinish:function(){}})});