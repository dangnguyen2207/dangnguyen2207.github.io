define("require-css/css!js-css/notices",[],function(){}),define("notice",["jquery","css!js-css/notices.css"],function(e){var n=".wdn_notice",o="slow",t=1e3,i=1e3,a=!1,s=function(e){e.fadeOut(o,function(){e.remove()})},r={initialize:function(){a||(e(document).on("click",n+" .close",function(){return s(e(this).closest(n)),!1}),a=!0),e(r.launch)},launch:function(){e(n).each(function(){var n,o,a=e(this),r="duration",c=!1,d="overlay",m="header",l="maincontent";n=d+"-"+m,(a.data(d)===m||a.is("."+n))&&(c=!0,a.addClass(d).removeClass(n),e("#"+m).append(a)),n=d+"-"+l,c||a.data(d)!==l&&!a.is("."+n)||(c=!0,a.addClass(d).removeClass(n),e("#"+l).prepend(a)),(a.data(r)||a.is("[class*="+r+"-]"))&&(o=a.data(r)*i,(isNaN(o)||1>o)&&e.each(a[0].classList||a[0].className.split(/\s+/),function(e,n){var t=n.match(new RegExp("^"+r+"-(.+)$"));return t?(o=t[1]*i,!1):void 0}),(isNaN(o)||1>o)&&(o=t),setTimeout(function(){s(a)},o))})}};return r}),function(e){var n=document,o="appendChild",t="styleSheet",i=n.createElement("style");i.type="text/css",n.getElementsByTagName("head")[0][o](i),i[t]?i[t].cssText=e:i[o](n.createTextNode(e))}('.wdn_notice{margin-bottom:1em;border-radius:3px;padding:1em 1em .75em;box-shadow:0 1px 1px 0 rgba(0,0,0,.5);background-color:#137cbd;-webkit-transition:background ease-out .2s;-moz-transition:background ease-out .2s;-o-transition:background ease-out .2s;-ms-transition:background ease-out .2s;transition:background ease-out .2s}.wdn_notice:hover{background-color:#1276b4}.wdn_notice:hover .message:before{color:#0c4e77}.wdn_notice .message:before{color:#0e5e8f}.wdn_notice .close{color:#fff}.wdn_notice .close a,.wdn_notice .close a:hover{color:#fff}.wdn_notice .message{position:relative;padding:0 0 0 4.1538em;color:#fff}@media (min-width:768px){.wdn_notice .message{padding:0 0 0 4.209em}}.wdn_notice .message *{margin:0;color:inherit}.wdn_notice .message .title,.wdn_notice .message h4{font-family:"Gotham SSm A","Gotham SSm B",Verdana,"Verdana Ref",Geneva,Tahoma,"Lucida Grande","Lucida Sans Unicode","Lucida Sans","DejaVu Sans","Bitstream Vera Sans","Liberation Sans",sans-serif;font-weight:400;font-style:normal;line-height:1.333;text-transform:uppercase;letter-spacing:.02em;font-size:inherit}.wdn_notice .message:before{position:absolute;top:.1em;left:0;width:41px;height:41px;font-size:30px;font-size:2.3076923rem;line-height:normal;text-align:center;font-family:wdn-icon;content:"\\e807"}@media (min-width:768px){.wdn_notice .message:before{font-size:38px;font-size:2.375rem}}@media (min-width:768px){.wdn_notice .message:before{width:54px}}.wdn_notice.affirm{background-color:#00892c;-webkit-transition:background ease-out .2s;-moz-transition:background ease-out .2s;-o-transition:background ease-out .2s;-ms-transition:background ease-out .2s;transition:background ease-out .2s}.wdn_notice.affirm:hover{background-color:#007f29}.wdn_notice.affirm:hover .message:before{color:#003d13}.wdn_notice.affirm .message:before{color:#00561c;content:"\\e80b"}.wdn_notice.negate{background-color:#d00000;-webkit-transition:background ease-out .2s;-moz-transition:background ease-out .2s;-o-transition:background ease-out .2s;-ms-transition:background ease-out .2s;transition:background ease-out .2s}.wdn_notice.negate:hover{background-color:#c60000}.wdn_notice.negate:hover .message:before{color:#840000}.wdn_notice.negate .message:before{color:#9d0000;content:"\\e805"}.wdn_notice.alert{background-color:#d4440b;-webkit-transition:background ease-out .2s;-moz-transition:background ease-out .2s;-o-transition:background ease-out .2s;-ms-transition:background ease-out .2s;transition:background ease-out .2s}.wdn_notice.alert:hover{background-color:#ca410a}.wdn_notice.alert:hover .message:before{color:#8b2d07}.wdn_notice.alert .message:before{color:#a43408;content:"\\e806"}.wdn_notice .close,.wdn_notice .maximize,.wdn_notice .minimize{float:right}.wdn_notice .close:before,.wdn_notice .maximize:before,.wdn_notice .minimize:before{position:absolute;line-height:normal;font-family:wdn-icon}.wdn_notice .close a,.wdn_notice .close a:hover,.wdn_notice .maximize a,.wdn_notice .maximize a:hover,.wdn_notice .minimize a,.wdn_notice .minimize a:hover{width:16px;height:16px;text-indent:-2000em;display:block;text-decoration:none;position:relative;z-index:1}.wdn_notice .close:before{content:"\\e805"}.wdn_notice .close a,.wdn_notice .close a:hover{border:none}.wdn_notice .minimize:before{content:"\\e80d"}.wdn_notice .maximize:before{content:"\\e80c"}.wdn_notice.overlay{position:absolute;left:5%;right:5%;top:51px;margin-left:auto;margin-right:auto;max-width:50rem;z-index:202;text-align:left}@media (min-width:960px){.wdn_notice.overlay{left:0;right:0}}#maincontent>.wdn_notice.overlay{margin-left:auto;margin-right:auto;max-width:50rem}');
//# sourceMappingURL=notice.js.map