define(["wdn","jquery","require"],function(e,n,t){"use strict";var i,o=function(e){return n("link[rel="+e+"]")},r=function(){var n=o("login"),t=o("logout");return n.length&&e.setPluginParam("idm","login",n.attr("href")),t.length&&e.setPluginParam("idm","logout",t.attr("href")),e.getPluginParam("idm")||{}},u="#wdn_",a=u+"identity_management",l=u+"idm_",s=l+"notice_container",g=l+"username",d=l+"profile",c=l+"logout",f=l+"toggle_label",m="https://login.unl.edu/",p="unl_sso",h=encodeURIComponent(window.location),v=m+"cas/logout?url="+h,N=m+"cas/login?service="+h,L=m+"services/whoami/?id=",y="https://planetred.unl.edu/pg/",P=!1,k=function(e){var n=e;return e?P.uid&&P.uid===e?U():n:U()},U=function(){var e="";return P.eduPersonNickname?e=P.eduPersonNickname[0]:P.givenName?e=P.givenName[0]:P.displayName&&(e=P.displayName[0]),e},I=function(e){return P&&P[e]?P[e][0]:!1},_={initialize:function(o){var u=function(){n(function(){var e=r();i=n(g).html(),e.login?_.setLoginURL(e.login):_.displayLogin()}),o&&o()},a=e.getCookie(p);a?t([L+a],function(){e.idm.user&&(P=e.idm.user,delete e.idm.user),_.getUserId()?(o&&o(),n(function(){_.displayNotice(_.getUserId())})):(_.logout(),u())}):u()},logout:function(){e.setCookie(p,"0",-1),P=!1},isLoggedIn:function(){return!!_.getUserId()},getUserId:function(){return P&&P.uid},getDisplayName:function(){return U()},getFirstName:function(){return I("givenName")},getLastName:function(){return I("sn")},getPrimaryAffiliation:function(){return I("eduPersonPrimaryAffiliation")},getEmailAddress:function(){return I("mail")},getPostalAddress:function(){return I("postalAddress")},getTelephoneNumber:function(){return I("telephoneNumber")},getTitle:function(){return I("title")},displayNotice:function(e){var t=r(),i=n(a),o=(n(g),"unl_");o+="s-"===e.substring(2,0)?e.replace("-","_"):e,i.addClass("loggedin"),n(f).css("backgroundImage","url("+y+"icon/"+o+"/medium/)").html('<span class="wdn-text-hidden">Account actions for </span>'+k(e)),n(d).attr("href",y+"profile/"+o),n(s).removeClass("hidden"),n(g).hide();var u=n(c);u.off("click").click(_.logout),_.setLogoutURL(t.logout)},displayLogin:function(){var e=n(a),t=n(g);e.removeClass("loggedin"),t.css("backgroundImage",null).attr("href",N).html(i),n(g).show()},setLogoutURL:function(e){var t=n(c);e&&(v=e),t.attr("href",v)},setLoginURL:function(e){e&&(N=e),_.displayLogin()}};return e.idm={},_});
//# sourceMappingURL=idm.js.map