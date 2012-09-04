define("#switchable/0.9.9/const",[],function(e,t){var n="ui-switchable";t.UI_SWITCHABLE=n,t.NAV_CLASS=n+"-nav",t.CONTENT_CLASS=n+"-content",t.TRIGGER_CLASS=n+"-trigger",t.PANEL_CLASS=n+"-panel",t.ACTIVE_CLASS=n+"-active",t.PREV_BTN_CLASS=n+"-prev-btn",t.NEXT_BTN_CLASS=n+"-next-btn",t.DISABLED_BTN_CLASS=n+"-disabled-btn"}),define("#switchable/0.9.9/plugins/effects",["#jquery/1.7.2/jquery"],function(e,t,n){var r=e("#jquery/1.7.2/jquery"),i="scrollx",s="scrolly",o="fade";n.exports={isNeeded:function(){return this.get("effect")!=="none"},install:function(){var e=this.panels;e.show();var t=this.get("effect"),n=this.get("step");if(t.indexOf("scroll")===0){var s=this.content,a=e.eq(0);s.css("position","absolute"),s.parent().css("position")==="static"&&s.parent().css("position","relative"),t===i&&(e.css("float","left"),s.width("9999px"));var f=this.get("viewSize");f[0]||(f[0]=a.outerWidth()*n,f[1]=a.outerHeight()*n,this.set("viewSize",f));if(!f[0])throw new Error("Please specify viewSize manually")}else if(t===o){var l=this.get("activeIndex"),c=l*n,h=c+n-1;e.each(function(e,t){var n=e>=c&&e<=h;r(t).css({opacity:n?1:0,position:"absolute",zIndex:n?9:1})})}this._switchPanel=function(e){var t=this.get("effect"),n=r.isFunction(t)?t:u[t];n.call(this,e)}}};var u={fade:function(e){if(this.get("step")>1)throw new Error('Effect "fade" only supports step === 1');var t=e.fromPanels.eq(0),n=e.toPanels.eq(0),r=this.anim;r&&r.stop(!1,!0),n.css("opacity",1);if(t[0]){var i=this.get("duration"),s=this.get("easing"),o=this;this.anim=t.animate({opacity:0},i,s,function(){o.anim=null,n.css("zIndex",9),t.css("zIndex",1)})}else n.css("zIndex",9)},scroll:function(e){var t=this.get("effect")===i,n=this.get("viewSize")[t?0:1]*e.toIndex,r={};r[t?"left":"top"]=-n+"px",this.anim&&this.anim.stop();if(e.fromIndex>-1){var s=this,o=this.get("duration"),u=this.get("easing");this.anim=this.content.animate(r,o,u,function(){s.anim=null})}else this.content.css(r)}};u[s]=u.scroll,u[i]=u.scroll,n.exports.Effects=u}),define("#switchable/0.9.9/plugins/autoplay",["#jquery/1.7.2/jquery"],function(e,t,n){function i(e,t){function r(){r.stop(),n=setTimeout(e,t)}t=t||200;var n;return r.stop=function(){n&&(clearTimeout(n),n=0)},r}function o(e){var t=s.scrollTop(),n=t+s.height(),r=e.offset().top,i=r+e.height();return r<n&&i>t}var r=e("#jquery/1.7.2/jquery");n.exports={attrs:{autoplay:!0,interval:5e3,pauseOnScroll:!0,pauseOnHover:!0},isNeeded:function(){return this.get("autoplay")},install:function(){function a(){f(),u.paused=!1,n=setInterval(function(){if(u.paused)return;u.next()},r)}function f(){n&&(clearInterval(n),n=null),u.paused=!0}var e=this.element,t="."+this.cid,n,r=this.get("interval"),u=this;a(),this.stop=f,this.start=a,this.get("pauseOnScroll")&&(this._scrollDetect=i(function(){u[o(e)?"start":"stop"]()}),s.on("scroll"+t,this._scrollDetect)),this.get("pauseOnHover")&&this.element.hover(f,a)},destroy:function(){var e="."+this.cid;this.stop(),this._scrollDetect&&(this._scrollDetect.stop(),s.off("scroll"+e))}};var s=r(window)}),define("#switchable/0.9.9/plugins/circular",["./effects","#jquery/1.7.2/jquery"],function(e,t,n){function u(e,t,n){var i=this.get("step"),s=this.get("length"),o=e?s-1:0,u=o*i,a=(o+1)*i,f=e?n:-n*s,l=r(this.panels.get().slice(u,a));return l.css("position","relative"),l.css(t,-f+"px"),f}function a(e,t,n){var i=this.get("step"),s=this.get("length"),o=e?s-1:0,u=o*i,a=(o+1)*i,f=r(this.panels.get().slice(u,a));f.css("position",""),f.css(t,""),this.content.css(t,e?-n*(s-1):"")}var r=e("#jquery/1.7.2/jquery"),i="scrollx",s="scrolly",o=e("./effects").Effects;n.exports={isNeeded:function(){var e=this.get("effect"),t=this.get("circular");return t&&(e===i||e===s)},install:function(){this.set("scrollType",this.get("effect")),this.set("effect","scrollCircular")}},o.scrollCircular=function(e){var t=e.toIndex,n=e.fromIndex,r=this.get("length"),s=n===0&&t===r-1,o=n===r-1&&t===0,f=s||!o&&t<n,l=s||o,c=this.get("scrollType")===i,h=c?"left":"top",p=this.get("viewSize")[c?0:1],d=-p*t;this.anim&&this.anim.stop(!1,!0),l&&(d=u.call(this,f,h,p));var v={};v[h]=d+"px";if(n>-1){var m=this.get("duration"),g=this.get("easing"),y=this;this.anim=this.content.animate(v,m,g,function(){y.anim=null,l&&a.call(y,f,h,p)})}else this.content.css(v)}}),define("#switchable/0.9.9/plugins/multiple",["../const"],function(e,t,n){var r=e("../const");n.exports={isNeeded:function(){return this.get("multiple")},methods:{_switchTrigger:function(e){this.triggers.eq(e).toggleClass(r.ACTIVE_CLASS)},_triggerIsValid:function(){return!0},_switchPanel:function(e){e.toPanels.toggle()}}}}),define("#switchable/0.9.9/switchable",["./const","./plugins/effects","./plugins/autoplay","./plugins/circular","./plugins/multiple","#jquery/1.7.2/jquery","#widget/1.0.0/widget","#base/1.0.0/base","#class/1.0.0/class","#events/1.0.0/events","#easing/1.0.0/easing"],function(e,t,n){function h(e,t){var n=r("<ul>");for(var i=0;i<e;i++){var s=i===t?o.ACTIVE_CLASS:"";r("<li>",{"class":s,html:i+1}).appendTo(n)}return n}var r=e("#jquery/1.7.2/jquery"),i=e("#widget/1.0.0/widget"),s=e("#easing/1.0.0/easing"),o=e("./const"),u=e("./plugins/effects"),a=e("./plugins/autoplay"),f=e("./plugins/circular"),l=e("./plugins/multiple"),c=i.extend({attrs:{triggers:{value:[],getter:function(e){return r(e)}},panels:{value:[],getter:function(e){return r(e)}},hasTriggers:!0,triggerType:"hover",delay:100,effect:"none",easing:"linear",duration:500,activeIndex:0,step:1,length:{readOnly:!0,getter:function(){return this.panels.length/this.get("step")}},viewSize:[]},setup:function(){this._parseRole(),this._initElement(),this._initPanels(),this._initTriggers(),this._initPlugins(),this.render()},_parseRole:function(){var e=this._getDatasetRole();if(!e)return;var t=this.element,n=this.get("triggers"),r=this.get("panels");n.length===0&&(e.trigger||e.nav)&&(n=e.trigger||e.nav.find("> *")),r.length===0&&(e.panel||e.content)&&(r=e.panel||e.content.find("> *")),this.set("triggers",n),this.set("panels",r)},_getDatasetRole:function(){var e=this.element,t={},n=!1,i=["trigger","panel","nav","content"];return r.each(i,function(i,s){var o=r("[data-role="+s+"]",e);o.length&&(t[s]=o,n=!0)}),n?t:null},_initElement:function(){this.element.addClass(o.UI_SWITCHABLE)},_initPanels:function(){var e=this.panels=this.get("panels");if(e.length===0)throw new Error("panels.length is ZERO");this.content=e.parent().addClass(o.CONTENT_CLASS),e.addClass(o.PANEL_CLASS)},_initTriggers:function(){var e=this.triggers=this.get("triggers");e.length===0&&this.get("hasTriggers")?(this.nav=h(this.get("length"),this.get("activeIndex")).appendTo(this.element),this.triggers=this.nav.children()):this.nav=e.parent(),this.triggers.addClass(o.TRIGGER_CLASS),this.nav.addClass(o.NAV_CLASS),this.triggers.each(function(e,t){r(t).data("value",e)}),this._bindTriggers()},_initPlugins:function(){this._plugins=[],this._plug(u),this._plug(a),this._plug(f),this._plug(l)},_bindTriggers:function(){function t(t){e._onFocusTrigger(t.type,r(this).data("value"))}function n(){clearTimeout(e._switchTimer)}var e=this;this.get("triggerType")==="click"?this.triggers.click(t):this.triggers.hover(t,n)},_onFocusTrigger:function(e,t){var n=this;e==="click"?this.switchTo(t):this._switchTimer=setTimeout(function(){n.switchTo(t)},this.get("delay"))},switchTo:function(e){return this.set("activeIndex",e),this},_onRenderActiveIndex:function(e,t){this._triggerIsValid(e,t)&&this._switchTo(e,t)},_switchTo:function(e,t){this.trigger("switch",e,t),this._switchTrigger(e,t),this._switchPanel(this._getPanelInfo(e,t)),this.trigger("switched",e,t)},_triggerIsValid:function(e,t){return e!==t},_switchTrigger:function(e,t){var n=this.triggers;if(n.length<1)return;n.eq(t).removeClass(o.ACTIVE_CLASS),n.eq(e).addClass(o.ACTIVE_CLASS)},_switchPanel:function(e){e.fromPanels.hide(),e.toPanels.show()},_getPanelInfo:function(e,t){var n=this.panels.get(),i=this.get("step"),s,o;if(t>-1){var u=t*i,a=(t+1)*i;s=n.slice(u,a)}return o=n.slice(e*i,(e+1)*i),{toIndex:e,fromIndex:t,toPanels:r(o),fromPanels:r(s)}},prev:function(){var e=this.get("activeIndex"),t=(e-1+this.get("length"))%this.get("length");this.switchTo(t)},next:function(){var e=this.get("activeIndex"),t=(e+1)%this.get("length");this.switchTo(t)},_plug:function(e){if(!e.isNeeded.call(this))return;var t=e.attrs,n=e.methods;if(t)for(var r in t)t.hasOwnProperty(r)&&!(r in this.attrs)&&this.set(r,t[r]);if(n)for(var i in n)n.hasOwnProperty(i)&&(this[i]=n[i]);e.install&&e.install.call(this),this._plugins.push(e)},destroy:function(){r.each(this._plugins,function(e,t){t.destroy&&t.destroy.call(this)}),c.superclass.destroy.call(this)}});n.exports=c});