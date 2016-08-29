"use strict";define(["jquery","websockets/binary_websockets","windows/windows","common/rivetsExtra","lodash","moment"],function(a,b,c,d,e){function f(a){a.click(function(){i?i.moveToTop():require(["text!cashier/deposit.html"],g)})}function g(b){b=a(b),i=c.createBlankWindow(b,{title:"Deposit funds",resizable:!0,collapsable:!1,minimizable:!0,maximizable:!0,width:700,height:600,"data-authorized":!0,close:function(){i.dialog("destroy"),i.trigger("dialogclose"),i.remove(),i=null},open:function(){},destroy:function(){j&&j.unbind(),j=null}}),h(b),i.dialog("open");var d=i.dialog("widget").offset();d.top=110,i.dialog("option","position",{my:d.left,at:d.top}),i.dialog("widget").css({left:d.left+"px",top:d.top+"px"}),i.fixFooterPosition(),i.track({module_id:"deposit",is_unique:!0})}function h(c){var f=(b.app_id,{route:{value:"standard-methods"},empty_fields:{validate:!1,clear:e.debounce(function(){f.empty_fields.validate=!1},4e3),show:function(){f.empty_fields.validate=!0,f.empty_fields.clear()}},user:{email:local_storage.get("authorize").email,cashier_url:"",residence:"",residence_name:""},standard_methods:{iframe_visible:!1},payment_agents:{list:[],current:{}}});f.route.update=function(a){f.route.value=a},f.standard_methods.iframe_loaded=function(){f.user.cashier_url&&(f.standard_methods.iframe_visible=!0)},f.payment_agents.get_commission_text=function(a){return a.deposit_commission===a.withdrawal_commission?a.deposit_commission+"% "+"commission".i18n():a.deposit_commission+"% "+"deposits".i18n()+" / "+a.withdrawal_commission+"% "+"withdrawals".i18n()},f.payment_agents.onclick=function(b,c){var d=a(c.target).next(),e=f.payment_agents.elem;e&&e.css("max-height","0"),f.payment_agents.current.is_active=!1,f.payment_agents.current===b?f.payment_agents.current={}:(f.payment_agents.current=b,f.payment_agents.elem=d,d.css("max-height",d[0].scrollHeight+"px"),b.is_active=!0)},j=d.bind(c[0],f),b.send({cashier:"deposit"}).then(function(a){f.user.cashier_url=a.cashier})["catch"](k);var g=b.send({get_settings:1}).then(function(a){f.user.residence=a.get_settings.country_code,f.user.residence_name=a.get_settings.country})["catch"](k);g.then(function(){return f.user.residence?b.cached.send({paymentagent_list:f.user.residence}):{paymentagent_list:{list:[]}}}).then(function(a){var b=a.paymentagent_list.list.map(function(a){return a.commission_text=f.payment_agents.get_commission_text(a),a.supported_banks=a.supported_banks.toLowerCase().split(","),a});f.payment_agents.list=b})["catch"](k)}require(["text!cashier/deposit.html"]),require(["css!cashier/deposit.css"]);var i=null,j=null,k=function(b){a.growl.error({message:b.message})};return{init:f}});