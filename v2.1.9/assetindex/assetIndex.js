define(["jquery","windows/windows","websockets/binary_websockets","navigation/menu","lodash","datatables","jquery-growl"],function(a,b,c,d){function e(c){c.click(function(){j?j.moveToTop():(j=b.createBlankWindow(a("<div/>"),{title:"Asset Index".i18n(),width:700,height:400}),j.track({module_id:"assetIndex",is_unique:!0,data:null}),j.dialog("open"),require(["text!assetindex/assetIndex.html"],h))})}function f(a){a=d.extractChartableMarkets(a);var b={};return a.forEach(function(a){var c=b[a.display_name]={};a.submarkets.forEach(function(a){c[a.display_name]=a.instruments.map(function(a){return a.display_name})})}),b}function g(){var d=[],e={},g=function(a,b){var c=e[a][b],f=d.filter(function(a){return c.indexOf(a[1])>-1}).map(function(a){var b=a[2].map(function(a){return a[2]+" - "+a[3]});return b.unshift(a[1]),b});i.api().rows().remove(),i.api().rows.add(f),i.api().draw()},h=a("#"+i.attr("id")+"_processing").show();Promise.all([c.cached.send({trading_times:(new Date).toISOString().slice(0,10)}),c.cached.send({asset_index:1})]).then(function(c){try{d=c[1].asset_index,e=f(c[0]);var i=(j.parent().find(".ui-dialog-title").addClass("with-content"),j.parent().find(".ui-dialog-titlebar-buttonpane")),k=b.makeSelectmenu(a("<select />").insertBefore(i),{list:Object.keys(e),inx:1,changed:function(a){var b=Object.keys(e[a]);l.update_list(b),g(k.val(),l.val())},width:"180px"});k.selectmenu("widget").addClass("asset-index-selectmenu");var l=b.makeSelectmenu(a("<select />").insertBefore(i),{list:Object.keys(e[k.val()]),inx:0,changed:function(){g(k.val(),l.val())},width:"200px"});l.selectmenu("widget").addClass("asset-index-selectmenu"),g(k.val(),l.val()),h.hide()}catch(m){}})["catch"](function(b){a.growl.error({message:b.message})})}function h(b){b=a(b),i=b.filter("table"),b.appendTo(j),i=i.dataTable({data:[],columnDefs:[{className:"dt-body-center dt-header-center",targets:[0,1,2,3,4]},{defaultContent:"-",targets:[0,1,2,3,4]}],paging:!1,ordering:!1,searching:!0,processing:!0}),i.parent().addClass("hide-search-input"),i.api().column(0).every(function(){var b=this;a("input",this.header()).on("keyup change",function(){b.search()!==this.value&&b.search(this.value).draw()})}),g()}var i=null,j=null;return{init:e}});