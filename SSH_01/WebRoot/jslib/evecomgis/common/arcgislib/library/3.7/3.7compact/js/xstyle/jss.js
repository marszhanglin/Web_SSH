//>>built
define("xstyle/jss",[],function(){var g={}.watch;return function(a){return{layout:function(e,c){return{render:function(c){for(var b=0;b<e.length;b++){var d=e[b],f=d.selector.substring(1);a.get&&a.get(f);a.watch!=g&&a.watch(f,function(a,c,b){void 0!==b&&(a=document.createElement("div"),d.renderInto(a))});d.renderInto(target);c.appendChild(target)}},cssText:c.selector.replace(/\//g,"[data-path\x3d$1]")}}}}});