!function(e){"function"==typeof define&&define.amd?define("plugins/rsswidget/jquery.vticker",["jquery"],e):e("object"==typeof module&&module.exports?require("jquery"):jQuery)}(function(e){var t={speed:700,pause:4e3,showItems:1,mousePause:!0,height:0,animate:!0,margin:0,padding:0,startPaused:!1},i={moveUp:function(e,t){i.animate(e,t,"up")},moveDown:function(e,t){i.animate(e,t,"down")},animate:function(t,i,n){var a=t.itemHeight,r=t.options,s=t.element,o=s.children("ul"),l="up"===n?"li:first":"li:last";s.trigger("vticker.beforeTick");var d=o.children(l).clone(!0);if(r.height>0&&(a=o.children("li:first").height()),a+=r.margin+2*r.padding,"down"===n&&o.css("top","-"+a+"px").prepend(d),i&&i.animate){if(t.animating)return;t.animating=!0;var u="up"===n?{top:"-="+a+"px"}:{top:0};o.animate(u,r.speed,function(){e(o).children(l).remove(),e(o).css("top","0px"),t.animating=!1,s.trigger("vticker.afterTick")})}else o.children(l).remove(),o.css("top","0px"),s.trigger("vticker.afterTick");"up"===n&&d.appendTo(o)},nextUsePause:function(){var t=e(this).data("state");if(!t)return void 0;var a=t.options;if(!(t.isPaused||t.itemCount<2)){n.next.call(this,{animate:a.animate});var r=this;t.intervalId=setTimeout(function(){i.nextUsePause.call(r)},a.pause)}},startInterval:function(){var t=e(this).data("state"),n=t.options,a=this;t.intervalId=setTimeout(function(){i.nextUsePause.call(a)},n.pause)},stopInterval:function(){var t=e(this).data("state");t&&(t.intervalId&&clearTimeout(t.intervalId),t.intervalId=void 0)},restartInterval:function(){i.stopInterval.call(this),i.startInterval.call(this)}},n={init:function(a){n.stop.call(this);var r=e.extend({},t),a=e.extend(r,a),s=e(this),o={itemCount:s.children("ul").children("li").length,itemHeight:0,itemMargin:0,element:s,animating:!1,options:a,isPaused:a.startPaused?!0:!1,pausedByCode:!1};if(e(this).data("state",o),s.css({overflow:"hidden",position:"relative"}).children("ul").css({position:"absolute",margin:0,padding:0}).children("li").css({margin:a.margin,padding:a.padding}),isNaN(a.height)||0===a.height){s.children("ul").children("li").each(function(){var t=e(this);t.height()>o.itemHeight&&(o.itemHeight=t.height())}),s.children("ul").children("li").each(function(){var t=e(this);t.height(o.itemHeight)});var l=a.margin+2*a.padding;s.height((o.itemHeight+l)*a.showItems+a.margin)}else s.height(a.height);var d=this;a.startPaused||i.startInterval.call(d),a.mousePause&&s.bind("mouseenter",function(){o.isPaused!==!0&&(o.pausedByCode=!0,i.stopInterval.call(d),n.pause.call(d,!0))}).bind("mouseleave",function(){(o.isPaused!==!0||o.pausedByCode)&&(o.pausedByCode=!1,n.pause.call(d,!1),i.startInterval.call(d))})},pause:function(t){var i=e(this).data("state");if(!i)return void 0;if(i.itemCount<2)return!1;i.isPaused=t;var n=i.element;t?(e(this).addClass("paused"),n.trigger("vticker.pause")):(e(this).removeClass("paused"),n.trigger("vticker.resume"))},next:function(t){var n=e(this).data("state");return n?n.animating||n.itemCount<2?!1:(i.restartInterval.call(this),void i.moveUp(n,t)):void 0},prev:function(t){var n=e(this).data("state");return n?n.animating||n.itemCount<2?!1:(i.restartInterval.call(this),void i.moveDown(n,t)):void 0},stop:function(){var t=e(this).data("state");return t?void i.stopInterval.call(this):void 0},remove:function(){var t=e(this).data("state");if(!t)return void 0;i.stopInterval.call(this);var n=t.element;n.unbind(),n.remove()}};e.fn.vTicker=function(t){return n[t]?n[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist on jQuery.vTicker"):n.init.apply(this,arguments)}}),function(e){"function"==typeof define&&define.amd?define("plugins/rsswidget/jquery.zrssfeed",["jquery"],e):e("object"==typeof module&&module.exports?require("jquery"):jQuery)}(function(e){e.fn.rssfeed=function(i,n,a){var r={limit:10,offset:1,header:!0,titletag:"h4",date:!0,dateformat:"datetime",content:!0,snippet:!0,media:!0,showerror:!0,errormsg:"",key:null,ssl:!1,linktarget:"_self",linkredirect:"",linkcontent:!1,sort:"",sortasc:!0,historical:!1},n=e.extend(r,n);return this.each(function(r,s){var o=e(s),l="";if(n.ssl&&(l="s"),o.hasClass("rssFeed")||o.addClass("rssFeed"),null==i)return!1;n.offset>0&&(n.offset-=1),n.limit+=n.offset;var d="http"+l+"://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q="+encodeURIComponent(i);d+="&num="+n.limit,n.historical&&(d+="&scoring=h"),null!=n.key&&(d+="&key="+n.key),d+="&output=json_xml",e.getJSON(d,function(i){if(200==i.responseStatus)t(s,i.responseData,n),e.isFunction(a)&&a.call(this,o);else{if(n.showerror)if(""!=n.errormsg)var r=n.errormsg;else var r=i.responseDetails;e(s).html('<div class="rssError"><p>'+r+"</p></div>")}})})};var t=function(t,a,r){var l=a.feed;if(!l)return!1;var d=[],u=0,c="",f="odd";if(r.media)var m=s(a.xmlString),h=m.getElementsByTagName("item");r.header&&(c+='<div class="rssHeader"><a href="'+l.link+'" title="'+l.description+'">'+l.title+"</a></div>"),c+='<div class="rssBody"><ul>';for(var g=r.offset;g<l.entries.length;g++){u=g-r.offset,d[u]=[];var p,v=l.entries[g],w="",y=v.link;switch(r.sort){case"title":w=v.title;break;case"date":w=v.publishedDate}if(d[u].sort=w,v.publishedDate){var k=new Date(v.publishedDate),p=k.toLocaleDateString()+" "+k.toLocaleTimeString();switch(r.dateformat){case"datetime":break;case"date":p=k.toLocaleDateString();break;case"time":p=k.toLocaleTimeString();break;case"timeline":p=o(k);break;default:p=n(k,r.dateformat)}}if(r.linkredirect&&(y=encodeURIComponent(y)),d[u].html="<"+r.titletag+'><a href="'+r.linkredirect+y+'" title="View this feed at '+l.title+'">'+v.title+"</a></"+r.titletag+">",r.date&&p&&(d[u].html+="<div>"+p+"</div>"),r.content){if(r.snippet&&""!=v.contentSnippet)var M=v.contentSnippet;else var M=v.content;r.linkcontent&&(M='<a href="'+r.linkredirect+y+'" title="View this feed at '+l.title+'">'+M+"</a>"),d[u].html+="<p>"+M+"</p>"}if(r.media&&h.length>0){var x=h[g].getElementsByTagName("enclosure");if(x.length>0){d[u].html+='<div class="rssMedia"><div>Media files</div><ul>';for(var b=0;b<x.length;b++){var I=x[b].getAttribute("url"),C=x[b].getAttribute("type"),j=x[b].getAttribute("length");d[u].html+='<li><a href="'+I+'" title="Download this media">'+I.split("/").pop()+"</a> ("+C+", "+i(j)+")</li>"}d[u].html+="</ul></div>"}}}r.sort&&d.sort(function(e,t){if(r.sortasc)var i=e.sort,n=t.sort;else var i=t.sort,n=e.sort;return"date"==r.sort?new Date(i)-new Date(n):(i=i.toLowerCase(),n=n.toLowerCase(),n>i?-1:i>n?1:0)}),e.each(d,function(e){c+='<li class="rssRow '+f+'">'+d[e].html+"</li>",f="odd"==f?"even":"odd"}),c+="</ul></div>",e(t).html(c),e("a",t).attr("target",r.linktarget)},i=function(e){var t=["bytes","kb","MB","GB","TB","PB"],i=Math.floor(Math.log(e)/Math.log(1024));return(e/Math.pow(1024,Math.floor(i))).toFixed(2)+" "+t[i]},n=function(e,t){var i=new Date(e);return e=t,e=e.replace("dd",a(i.getDate())),e=e.replace("MMMM",r(i.getMonth())),e=e.replace("MM",a(i.getMonth()+1)),e=e.replace("yyyy",i.getFullYear()),e=e.replace("hh",a(i.getHours())),e=e.replace("mm",a(i.getMinutes())),e=e.replace("ss",a(i.getSeconds()))},a=function(e){return e+="",e.length<2&&(e="0"+e),e},r=function(e){var t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return t[e]},s=function(e){var t,i=navigator.appName;return"Microsoft Internet Explorer"==i?(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t},o=function(e){var t=new Date,i=new Date(e),n=Math.round((t.getTime()-i.getTime())/1e3);if(60>n)return"< 1 min";if(3600>n)var a=Math.round(n/60)-1,r="min";else if(86400>n)var a=Math.round(n/3600)-1,r="hour";else if(604800>n)var a=Math.round(n/86400)-1,r="day";else var a=Math.round(n/604800)-1,r="week";return a>1&&(r+="s"),a+" "+r}}),define("require-css/css!js-css/rsswidget",[],function(){}),define("rss_widget",["jquery","plugins/rsswidget/jquery.vticker","plugins/rsswidget/jquery.zrssfeed","css!js-css/rsswidget"],function(e){var t={defaultConfig:{url:"http://ucommxsrv1.unl.edu/rssfeeds/unlinthenewsrss.xml",elementId:"wdn_rss_widget",pause:5e3,width:"auto",height:"auto",limit:10,num_show:3},initialize:function(i){var n,a=[];if(i&&0!=arguments.length)for(n=0;n<arguments.length;n++)if(i=arguments[n],"string"==typeof i){var r=e.extend({},t.defaultConfig);r.url=i,a.push(r)}else{var r=e.extend({},t.defaultConfig,i);a.push(r)}else a.push(t.defaultConfig);e(function(){t.setup(a)})},setup:function(t){var i,n,a;for(i=0;i<t.length;i++)n=t[i],a=e("#"+n.elementId),a.length&&a.rssfeed(n.url,{titletag:"div",limit:n.limit},function(t){e(t).find("div.rssBody").vTicker({showItems:n.num_show,pause:n.pause})})}};return t}),function(e){var t=document,i="appendChild",n="styleSheet",a=t.createElement("style");a.type="text/css",t.getElementsByTagName("head")[0][i](a),a[n]?a[n].cssText=e:a[i](t.createTextNode(e))}(".wdn-rss-widget .rssContainer{padding:.1em}.wdn-rss-widget .rssBody{margin:0;padding:0}.wdn-rss-widget .rssRow.odd{background-color:#fefdfa;margin:1em;padding:2em;list-style:none}.wdn-rss-widget .rssRow.even{background-color:#f6eccf;margin:1em;padding:2em;list-style:none}.wdn-rss-widget .rssLink{margin:0 1em 0 .5em;padding-left:.5em;padding-top:1em}.wdn-rss-widget .rssContent{margin:0 1em 0 .5em;padding-left:.5em;padding-bottom:1em}.wdn-rss-widget .rssDate{margin:0 1em;padding-left:.5em;font-size:7pt}");
//# sourceMappingURL=rss_widget.js.map