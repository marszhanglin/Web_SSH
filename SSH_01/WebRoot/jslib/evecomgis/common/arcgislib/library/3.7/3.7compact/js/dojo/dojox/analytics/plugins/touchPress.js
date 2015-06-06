//>>built
define("dojox/analytics/plugins/touchPress","dojo/_base/lang ../_base dojo/_base/config dojo/_base/window dojo/on dojo/touch".split(" "),function(f,h,g,k,l,m){return h.plugins.touchPress=new function(){this.showTouchesDetails=void 0!==g.showTouchesDetails&&!g.showTouchesDetails?!1:!0;this.targetProps=g.targetProps||"id className nodeName localName href spellcheck lang".split(" ");this.textContentMaxChars=g.textContentMaxChars||50;this.addData=f.hitch(h,"addData","touch.press");this.onTouchPress=function(a){this.addData(this.trimEvent(a))};
this.addDataRelease=f.hitch(h,"addData","touch.release");this.onTouchRelease=function(a){this.addDataRelease(this.trimEvent(a))};l(k.doc,m.press,f.hitch(this,"onTouchPress"));l(k.doc,m.release,f.hitch(this,"onTouchRelease"));this.handleTarget=function(a,d,b){var c=this.targetProps;a[b]={};for(var e=0;e<c.length;e++)if(("object"==typeof d||"function"==typeof d)&&c[e]in d)"text"==c[e]||"textContent"==c[e]?d.localName&&("HTML"!=d.localName&&"BODY"!=d.localName)&&(a[b][c[e]]=d[c[e]].substr(0,this.textContentMaxChars)):
a[b][c[e]]=d[c[e]]};this.trimEvent=function(a){var d={},b;for(b in a)switch(b){case "target":this.handleTarget(d,a[b],b);break;case "touches":0!==a[b].length&&(d["touches.length"]=a[b].length);if(this.showTouchesDetails)for(var c=0;c<a[b].length;c++)for(var e in a[b][c])switch(e){case "target":this.handleTarget(d,a[b][c].target,"touches["+c+"][target]");break;case "clientX":case "clientY":case "screenX":case "screenY":a[b][c]&&(d["touches["+c+"]["+e+"]"]=a[b][c][e]+"")}break;case "clientX":case "clientY":case "screenX":case "screenY":d[b]=
a[b]}return d}}});