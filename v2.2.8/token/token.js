define(["exports","websockets/binary_websockets","windows/windows","common/rivetsExtra","moment","clipboard","text!token/token.html","lodash","css!token/token.css"],function(a,b,c,d,e,f,g,h){"use strict";function i(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(a,"__esModule",{value:!0}),a.init=void 0;var j=i(b),k=i(c),l=i(d),m=i(e),n=i(f),o=i(g),p=null,q=null;l["default"].binders.clipboard={routine:function(a,b){var c=new n["default"](a,{text:function(){return b}});c.on("success",function(){$.growl.notice({message:'Copied "'+b+'"'})}),c.on("error",function(){$.growl.error({message:"Your browser doesn't support copy to clipboard".i18n()})}),a._rv_clipboard_&&a._rv_clipboard_.destroy(),a._rv_clipboard_=c},unbind:function(a){a._rv_clipboard_.destroy()}};var r=function(a){var b={route:"token-list",search_input:"",tokens:[],token:{name:"",scopes:{read:!0,trade:!1,payments:!1,admin:!1},btn_disabled:!1,checkTokenName:function(a,b){var c=b.token.name;c.length>32&&($.growl.error({message:"Token name can have a maximum of 32 characters".i18n()}),b.token.name=c.substr(0,32)),null!=c.match(/[^\w\s]+/g)&&($.growl.error({message:"Token name can contain alphanumeric characters with spaces and underscores".i18n()}),b.token.name=c.replace(/[^\w\s]+/g,"")),/^[\w]/.test(c)||($.growl.error({message:"Token name should begin with alphanumeric characters only".i18n()}),b.token.name=c.replace(/^[^\w]+/g,""))}},confirm:{visible:!1,top:"0px",token:{}}};return b.tokens_filtered=function(){var a=b.search_input.toLowerCase();return b.tokens.filter(function(b){return""===a||-1!==b.display_name.toLowerCase().indexOf(a)||-1!==b.token.toLowerCase().indexOf(a)||-1!==b.permissions.toLowerCase().indexOf(a)})},b.confirm.show=function(a){var c=$(a.target),d=c.position().top-c.parent().parent().height(),e=c.attr("token-id");e=h.find(b.tokens,{token:e}),b.confirm.top=d+"px",b.confirm.visible=!0,b.confirm.token=e},b.confirm.no=function(){b.confirm.visible=!1},b.confirm.yes=function(){var a=b.confirm.token;b.confirm.visible=!1,j["default"].send({api_token:1,delete_token:a.token}).then(function(a){var c=a.api_token&&a.api_token.tokens||[];b.update_tokens(c)})["catch"](function(a){$.growl.error({message:a.message})})},b.change_route=function(a){"token-list"!==a&&(b.confirm.visible=!1),b.route=a},b.update_tokens=function(a){a.forEach(function(a){var b=a.scopes;a.permissions=4==b.length?"All":b.join(", "),a.last_used_tooltip=a.last_used,a.last_used=a.last_used?m["default"].utc(a.last_used,"YYYY-MM-DD HH:mm:ss").fromNow():"-"}),b.tokens=a},b.token.add=function(){if(b.token.name.length<2)return void $.growl.error({message:"Token name must contain atleast 2 characters".i18n()});var a={api_token:1,new_token:b.token.name,new_token_scopes:[]};b.token.scopes.read&&a.new_token_scopes.push("read"),b.token.scopes.trade&&a.new_token_scopes.push("trade"),b.token.scopes.payments&&a.new_token_scopes.push("payments"),b.token.scopes.admin&&a.new_token_scopes.push("admin");var c="";return a.new_token_scopes.length||(c="Please choose at least one token scope".i18n()),a.new_token&&a.new_token.length||(c="Please enter the token name".i18n()),c?void $.growl.error({message:c}):(b.token.btn_disabled=!0,void j["default"].send(a).then(function(c){b.token.name="",b.token.btn_disabled=!1,$.growl.notice({message:"Successfully added new token ".i18n()+" "+a.new_token});var d=c.api_token&&c.api_token.tokens||[];b.update_tokens(d),b.change_route("token-list")})["catch"](function(a){b.token.btn_disabled=!1,$.growl.error({message:a.message})}))},q=l["default"].bind(a[0],b),j["default"].send({api_token:1}).then(function(a){var c=a.api_token&&a.api_token.tokens||[];b.update_tokens(c)})["catch"](function(a){$.growl.error({message:a.message})})},s=function(a){a=$(a).i18n(),p=k["default"].createBlankWindow(a,{title:"Token management".i18n(),resizable:!1,collapsable:!1,minimizable:!0,maximizable:!1,width:700,minHeight:60,"data-authorized":!0,close:function(){q&&q.unbind(),q=null,p.destroy(),p=null}}),p.track({module_id:"token",is_unique:!0,data:null}),r(a).then(function(){p.dialog("open")})},t=a.init=function(a){a.click(function(){p?p.moveToTop():s(o["default"])})};a["default"]={init:t}});