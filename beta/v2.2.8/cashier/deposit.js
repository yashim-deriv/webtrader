define(["exports","jquery","websockets/binary_websockets","windows/windows","common/rivetsExtra","lodash","moment","cashier/uk_funds_protection","text!cashier/deposit.html","../common/util"],function(e,t,n,i,s,a,o,r,c){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.init=w;var u=g(t),l=g(n),d=g(i),m=g(s),_=g(a),f=(g(o),g(r)),p=g(c);function g(e){return e&&e.__esModule?e:{default:e}}require(["text!cashier/deposit.html"]),require(["css!cashier/deposit.css"]);var h=null,y=null,v=function(e){u.default.growl.error({message:e.message})};function w(e){e.click(function(){h?h.moveToTop():l.default.cached.authorize().then(function(){b(p.default)}).catch(v)})}function b(e){var t,s;e=(0,u.default)(e).i18n(),h=d.default.createBlankWindow(e,{title:"Deposit funds",resizable:!0,collapsable:!1,minimizable:!0,maximizable:!0,width:700,height:600,"data-authorized":!0,close:function(){h.trigger("dialogclose"),h.remove(),h=null},open:function(){},destroy:function(){y&&y.unbind(),y=null}}),t=e,(s={route:{value:"standard-methods"},empty_fields:{validate:!1,clear:_.default.debounce(function(){s.empty_fields.validate=!1},4e3),show:function(){s.empty_fields.validate=!0,s.empty_fields.clear()}},user:{currency:local_storage.get("currency"),email:local_storage.get("authorize").email,cashier_url:"",residence:"",residence_name:""},is_cryptocurrency:isCryptoCurrency(),standard_methods:{iframe_visible:!1},payment_agents:{list:[],current:{}},binary_url:getBinaryUrl("payment-agent.html")}).route.update=function(e){s.route.value=e},s.standard_methods.iframe_loaded=function(){s.user.cashier_url&&(s.standard_methods.iframe_visible=!0)},s.payment_agents.get_commission_text=function(e){return e.deposit_commission===e.withdrawal_commission?e.deposit_commission+"% "+"commission".i18n():e.deposit_commission+"% "+"deposits".i18n()+" / "+e.withdrawal_commission+"% "+"withdrawals".i18n()},s.payment_agents.onclick=function(e,t){var n=(0,u.default)(t.target).next(),i=s.payment_agents.elem;i&&i.css("max-height","0"),s.payment_agents.current.is_active=!1,s.payment_agents.current===e?s.payment_agents.current={}:(s.payment_agents.current=e,(s.payment_agents.elem=n).css("max-height",n[0].scrollHeight+"px"),e.is_active=!0)},y=m.default.bind(t[0],s),l.default.send({cashier:"deposit"}).then(function(e){s.user.cashier_url=e.cashier}).catch(function(e){if("ASK_UK_FUNDS_PROTECTION"===e.code)return h.dialog("close"),void f.default.init_win().then(function(){b(p.default)}).catch(function(e){v(e)});s.error_text=e.message}),l.default.send({get_settings:1}).then(function(e){s.user.residence=e.get_settings.country_code,s.user.residence_name=e.get_settings.country}).catch(v).then(function(){return s.user.residence?l.default.send({paymentagent_list:s.user.residence,currency:s.user.currency}):{paymentagent_list:{list:[]}}}).then(function(e){var t=e.paymentagent_list.list.map(function(e){return e.commission_text=s.payment_agents.get_commission_text(e),e.supported_banks=e.supported_banks.toLowerCase().split(","),e});s.payment_agents.list=t}).catch(v),h.dialog("open");var n=h.dialog("widget").offset();n.top=110,h.dialog("option","position",{my:n.left,at:n.top}),h.dialog("widget").css({left:n.left+"px",top:n.top+"px"}),h.track({module_id:"deposit",is_unique:!0})}e.default={init:w}});