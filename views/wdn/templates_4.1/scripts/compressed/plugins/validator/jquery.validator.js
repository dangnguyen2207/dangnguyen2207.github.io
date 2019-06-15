!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof module&&module.exports?require("jquery"):jQuery)}(function(e){var t="2.0",n="validation",r=n,i="validate",a=":input",s=":visible",o=":checked",l='[type="radio"], [type="checkbox"]',u='[type="reset"]',d="advice",c=d+"-container",h="input-box",f="required-entry",m="passed",p="failed",v="error",g=n+"-"+m,C=n+"-"+p,w=n+"-"+v,y=n+"-"+d,b="."+y+" li",x=i+"-form",F=i+"-element",P=i+"-update",z=function(e){return e},N=function(e){if("string"!=typeof e)return parseFloat(e);var t=e.indexOf("."),n=e.indexOf(",");return-1!=t&&-1!=n?e=n>t?e.replace(".","").replace(",","."):e.replace(",",""):-1!=n&&(e=e.replace(",",".")),parseFloat(e)};e.all=function(t,n){var r=!0;return t&&(n=n||z,e.each(t,function(e,t){return r=r&&n(t,e)})),r},e.any=function(t,n){var r=!1;return t&&(n=n||z,e.each(t,function(e,t){return r=n(t,e),!r})),r};var $,A;$=function(e,t,n,r){"function"==typeof n?(this.options=r,this._test=n):(this.options=n,this._test=function(){return!0}),this.error=t||"Validation failed."},$.prototype={test:function(t,n,r){var i=this._test(t,n,r);return i&&(i=e.all(this.options,function(e,i){return $.methods[i]?$.methods[i](t,n,e,r):!0})),i}},$.methods={pattern:function(e,t,n){return n.test(e)},minLength:function(e,t,n){return e.length>=n},maxLength:function(e,t,n){return e.length<=n},min:function(e,t,n){return e>=parseFloat(n)},max:function(e,t,n){return e<=parseFloat(n)},notOneOf:function(t,n,r){return e.all(r,function(e){return t!=e})},oneOf:function(t,n,r){return e.any(r,function(e){return t==e})},is:function(e,t,n){return e==n},isNot:function(e,t,n){return e!=n},equalToField:function(t,n,r){return t==e(r).val()},notEqualToField:function(t,n,r){return t!=e(r).val()},include:function(t,n,r,i){return e.all(r,function(e){return A.methods[e]?A.methods[e].test(t,n,i):!0})}},A=function(t,n){this.form=t,this.form&&(this.options=n,this.options.onSubmit&&this.form.submit(e.proxy(this.onSubmit,this)),this.options.immediate&&this.form.on("change blur",a,e.proxy(this.onChange,this)),this.options.onReset&&this.form.on("click",u,e.proxy(this.reset,this)))},A.prototype={onChange:function(e){A.isOnChange=!0;var t=e.target;this.resetElement(t),this.validateField(t),A.isOnChange=!1},onSubmit:function(){return this.validate()?void 0:!1},validate:function(){var t=!1,n=[],r=this;e(b,this.form).hide();try{e(a,this.form).each(function(){var e=r.validateField(this);return n.push(e),r.options.stopOnFirst&&!e?e:void 0})}catch(i){n.push(!1)}var t=e.all(n);return!t&&this.options.focusOnError&&e("."+C,this.form).filter(a+s).first().focus(),this.form.triggerHandler(x,[t]),t},validateField:function(t){var n=this,r=t.classList||t.className.split(/\s+/);t=e(t);var i=e.all(r,function(e){if(e&&A.methods[e]){var r=n.validateTest(e,t);return t.triggerHandler(F,[r]),r}return!0});return i},validateTest:function(t,n){var r=A.methods[t];if(n.is(s)&&!r.test(n.val(),n,this))return A.showAdvice(t,n,this.options),n.triggerHandler(P,[p]),!1;if(n.triggerHandler(P,[m]),n.removeClass(C).addClass(g),this.options.addClassNameToContainer){var i=A.getContainer(n,this.options);e("."+C,i).length||(e.trim(n.val())||!n.is(s)?i.addClass(g):i.removeClass(g),i.removeClass(w))}return!0},reset:function(){var t=this;e(a,this.form).each(function(){t.resetElement(this)})},resetElement:function(t){t=e(t);var n=A.getAdviceContainer(t,this.options);if(e(b,n).hide(),t.removeClass(C),t.removeClass(g),this.options.addClassNameToContainer){var r=A.getContainer(t,this.options);r.removeClass(g).removeClass(C)}}};var T="IsEmpty",O=T,q={};q[T]=new $(T,"",function(t){return""===e.trim(t)}),T=f,q[T]=new $(T,"This is a required field.",function(e){return!q[O].test(e)}),T=i+"-number",q[T]=new $(T,"Please enter a valid number in this field.",function(e){return q[O].test(e)||!isNaN(N(e))}),T=i+"-digits",q[T]=new $(T,"Please use numbers only in this field. please avoid spaces or other characters such as dots or commas.",function(e){return q[O].test(e)||!/[^\d]/.test(e)}),T=i+"-alpha",q[T]=new $(T,"Please use letters only (a-z or A-Z) in this field.",function(e){return q[O].test(e)||/^[a-zA-Z]+$/.test(e)}),T=i+"-code",q[T]=new $(T,"Please use only letters (a-z), numbers (0-9) or underscore(_) in this field, first character should be a letter.",function(e){return q[O].test(e)||/^[a-z]+[a-z0-9_]+$/.test(e)}),T=i+"-alphanum",q[T]=new $(T,"Please use only letters (a-z or A-Z) or numbers (0-9) only in this field. No spaces or other characters are allowed.",function(e){return q[O].test(e)||/^[a-zA-Z0-9]+$/.test(e)}),T=i+"-phoneStrict",q[T]=new $(T,"Please enter a valid phone number. For example (123) 456-7890 or 123-456-7890.",function(e){return q[O].test(e)||/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(e)}),T=i+"-phoneLax",q[T]=new $(T,"Please enter a valid phone number. For example (123) 456-7890 or 123-456-7890.",function(e){return q[O].test(e)||/^((\d[-. ]?)?((\(\d{3}\))|\d{3}))?[-. ]?\d{3}[-. ]?\d{4}$/.test(e)}),T=i+"-date",q[T]=new $(T,"Please enter a valid date.",function(e){var t=new Date(e);return q[O].test(e)||!isNaN(t)}),T=i+"-email",q[T]=new $(T,"Please enter a valid email address. For example johndoe@domain.com",function(e){return q[O].test(e)||/^[a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]+(\.[a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,})/i.test(e)}),T=i+"-url",q[T]=new $(T,"Please enter a valid URL. http:// is required",function(e){return q[O].test(e)||/^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i.test(e)}),T=i+"-zip",q[T]=new $(T,"Please enter a valid zip code. For example 90602 or 90602-1234.",function(e){return q[O].test(e)||/^\d{5}(-\d{4})?$/.test(e)}),T=i+"-currency-dollar",q[T]=new $(T,"Please enter a valid $ amount. For example $100.00.",function(e){return q[O].test(e)||/^\$?\-?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}\d*(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/.test(e)}),T=i+"-one-required",q[T]=new $(T,"Please select one of the above options.",function(t,n,r){var i=e(a,A.getContainer(n,r.options));return e.any(i,function(t){var n=e(t).val();return e(t).is(l)&&(n=n&&e(t).is(o)),n})}),T=i+"-one-required-by-name",q[T]=new $(T,"Please select one of the options.",function(t,n){var r=n.attr("name").replace(/([\\"])/g,"\\$1"),i=e('input[name="'+r+'"]'+o,n[0].form);return i.length>0}),T=i+"-unsigned-number",q[T]=new $(T,"Please enter a valid number in this field.",function(e){return e=N(e),!isNaN(e)&&e>=0}),T=i+"-greater-than-zero",q[T]=new $(T,"Please enter a number greater than 0 in this field.",function(e){return e.length?parseFloat(e)>0:!0}),T=i+"-zero-or-greater",q[T]=new $(T,"Please enter a number 0 or greater in this field.",function(e){return e.length?parseFloat(e)>=0:!0}),T=i+"-percents",q[T]=new $(T,"Please enter a number lower than 100",{min:0,max:100}),A.methods=q,A.getContainer=function(e,t){var n;if(t.containerClassName){var r=e.parents("."+t.containerClassName);r.length&&(n=r.first())}return n||(n=e.parent()),n},A.getAdviceContainer=function(e,t){var n=e.closest("."+c);return n.length||(n=A.getContainer(e,t)),n},A.showAdvice=function(t,n,r){var i=A.getContainer(n,r);r.addClassNameToContainer&&i.removeClass(g).addClass(w);var a=n.closest("."+c);a.length?(a.removeClass(g).addClass(C),i=a):n.removeClass(g).addClass(C);var s=i.children("."+y);s.length||(s=e("<ul/>",{"class":y}),i.append(s));var o=d+"-"+t,l=e("li."+o,s);if(!l.length){l=e("<li/>",{"class":o}).hide();var u,h=A.methods[t];r.useTitles&&n.attr("title")&&(u=n.attr("title")),u||(u=h.error),l.text(u).appendTo(s)}l.show()},e.fn.validation=function(t){var n=e.extend({},e.fn.validation.defaults,t);return this.each(function(){e(this).data(r)||e(this).data(r,new A(e(this),n))}),this},e.fn.validation.defaults={onSubmit:!0,onReset:!0,stopOnFirst:!1,immediate:!1,focusOnError:!0,useTitles:!1,addClassNameToContainer:!1,containerClassName:h},e.validation={addMethod:function(e,t,n,r){A.methods[e]=new $(e,t,n,r)},version:t}});
//# sourceMappingURL=jquery.validator.js.map