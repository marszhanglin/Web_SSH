//>>built
define("dgrid/Selection","dojo/_base/kernel dojo/_base/declare dojo/_base/Deferred dojo/on dojo/has dojo/aspect ./List dojo/has!touch?./util/touch put-selector/put dojo/query".split(" "),function(p,q,r,g,h,s,t,k,l){var m=h("mac")?"metaKey":"ctrlKey";return q("dgrid.Selection",null,{selectionDelegate:".dgrid-row",selectionEvents:"mousedown,mouseup,dgrid-cellfocusin",deselectOnRefresh:!0,allowSelectAll:!1,create:function(){this.selection={};return this.inherited(arguments)},postCreate:function(){this.inherited(arguments);
this._initSelectionEvents()},selection:{},selectionMode:"extended",_setSelectionMode:function(a){a!=this.selectionMode&&(this.clearSelection(),this.selectionMode=a)},setSelectionMode:function(a){p.deprecated("setSelectionMode(...)",'use set("selectionMode", ...) instead',"dgrid 1.0");this.set("selectionMode",a)},_handleSelect:function(a,b){if(!("none"==this.selectionMode||"dgrid-cellfocusin"==a.type&&"mousedown"==a.parentType||"mouseup"==a.type&&b!=this._waitForMouseUp)){this._waitForMouseUp=null;
this._selectionTriggerEvent=a;var c=!a.keyCode?a[m]:a.ctrlKey;if(!a.keyCode||!a.ctrlKey||32==a.keyCode){var f=this.selectionMode,e=this.row(b),d=this._lastSelected;if("single"==f)d===b?this.select(b,null,!c||!this.isSelected(b)):(this.clearSelection(),this.select(b),this._lastSelected=b);else if(this.selection[e.id]&&!a.shiftKey&&"mousedown"==a.type)this._waitForMouseUp=b;else{var n;(2!=a.button&&"extended"==f&&!c||2==a.button&&!this.selection[e.id])&&this.clearSelection(e.id,!0);a.shiftKey||(d=n=
c?null:void 0);this.select(b,d,n);d||(this._lastSelected=b)}!a.keyCode&&(a.shiftKey||c)&&a.preventDefault()}this._selectionTriggerEvent=null}},_initSelectionEvents:function(){function a(a){b._handleSelect(a,this)}var b=this,c=this.selectionDelegate;g(this.domNode,"selectstart",function(a){var b=a.target&&a.target.tagName;"INPUT"!=b&&"TEXTAREA"!=b&&a.preventDefault()});h("touch")?g(this.contentNode,k.selector(c,k.tap),function(a){b._handleSelect(a,this)}):g(this.contentNode,g.selector(c,this.selectionEvents),
a);if(this.allowSelectAll)this.on("keydown",function(a){a[m]&&65==a.keyCode&&(a.preventDefault(),b[b.allSelected?"clearSelection":"selectAll"]())});s.before(this,"removeRow",function(a,b){var c;b||(c=this.row(a))&&c.id in this.selection&&this.deselect(a)})},allowSelect:function(a){return!0},_selectionEventQueue:function(a,b){var c=this,f="dgrid-"+(a?"select":"deselect"),e=this[f],d=this._selectionTriggerEvent;d&&(d=d.type);if(e)return e;setTimeout(this._fireSelectionEvent=function(){if(e){var a={bubbles:!0,
grid:c};d&&(a.parentType=d);a[b]=e;g.emit(c.contentNode,f,a);e=null;delete c[f]}},0);return e=this[f]=[]},select:function(a,b,c){void 0===c&&(c=!0);a.element||(a=this.row(a));if(this.allowSelect(a)){var f=this.selection,e=f[a.id];null===c&&(c=!e);var d=a.element;!c&&!this.allSelected?delete this.selection[a.id]:f[a.id]=c;d&&(c?l(d,".dgrid-selected.ui-state-active"):l(d,"!dgrid-selected!ui-state-active"));c!=e&&d&&this._selectionEventQueue(c,"rows").push(a);if(b){b.element||(b=this.row(b));b=b.element;
c=a.element;for(c=b&&(b.compareDocumentPosition?2==b.compareDocumentPosition(c):b.sourceIndex>c.sourceIndex)?"down":"up";a.element!=b&&(a=this[c](a));)this.select(a)}}},deselect:function(a,b){this.select(a,b,!1)},clearSelection:function(a,b){this.allSelected=!1;for(var c in this.selection)a!==c&&this.deselect(c);b||(this._lastSelected=null)},selectAll:function(){this.allSelected=!0;this.selection={};for(var a in this._rowIdToObject){var b=this.row(this._rowIdToObject[a]);this.select(b.id)}},isSelected:function(a){if(!a)return!1;
a.element||(a=this.row(a));return!!this.selection[a.id]},refresh:function(){this.deselectOnRefresh&&(this.clearSelection(),this._fireSelectionEvent&&this._fireSelectionEvent());this._lastSelected=null;this.inherited(arguments)},renderArray:function(){var a=this,b=this.inherited(arguments);r.when(b,function(b){var f=a.selection,e,d,g;for(e=0;e<b.length;e++)d=a.row(b[e]),(g=d.id in f?f[d.id]:a.allSelected)&&a.select(d,null,g)});return b}})});