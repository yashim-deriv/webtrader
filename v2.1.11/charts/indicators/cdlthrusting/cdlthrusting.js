define(["jquery","common/rivetsExtra","jquery-ui","color-picker"],function(a,b){function c(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function d(d,e){require(["text!charts/indicators/cdlthrusting/cdlthrusting.html","text!charts/indicators/indicators.json"],function(f,g){f=a(f),f.appendTo("body"),g=JSON.parse(g);var h=g.cdlthrusting,i={title:h.long_display_name,description:h.description};b.bind(f[0],i),f.dialog({autoOpen:!1,resizable:!1,width:350,height:400,modal:!0,my:"center",at:"center",of:window,buttons:[{text:"OK",click:function(){var b=a(a(".cdlthrusting").data("refererChartID")).highcharts().series[0];b.addIndicator("cdlthrusting",{cdlIndicatorCode:"cdlthrusting",onSeriesID:b.options.id}),c.call(f)}},{text:"Cancel",click:function(){c.call(this)}}]}),"function"==typeof e&&e(d)})}return{open:function(b){return 0==a(".cdlthrusting").length?void d(b,this.open):void a(".cdlthrusting").data("refererChartID",b).dialog("open")}}});