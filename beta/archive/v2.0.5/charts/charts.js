define(["jquery","charts/chartingRequestMap","websockets/binary_websockets","websockets/ohlc_handler","currentPriceIndicator","common/util","highstock","highcharts-exporting"],function(a,b,c,d,e){"use strict";function f(d,e,f){if(e&&f){var g=convertToTimeperiodObject(e).timeInSeconds(),h=(f+g).toUpperCase();if(b[h]){for(var i in b[h].chartIDs){var j=b[h].chartIDs[i];if(j.containerIDWithHash==d){b[h].chartIDs.splice(i,1);break}}if(a.isEmptyObject(b[h].chartIDs)){var k={ticks_history:f,granularity:g,end:"latest",count:1,subscribe:0};c.send(k),b[h].timerHandler&&a(document).stopTime(b[h].timerHandler),delete b[h]}}}}return a(function(){Highcharts.setOptions({global:{useUTC:!0}})}),{drawChart:function(b,f,g){var h=this;a(b).highcharts()&&(this.destroy(b,f.timePeriod,f.instrumentCode),a(b).highcharts().destroy()),a(b).data({instrumentCode:f.instrumentCode,instrumentName:f.instrumentName,timePeriod:f.timePeriod,type:f.type,delayAmount:f.delayAmount}),a(b).highcharts("StockChart",{chart:{events:{load:function(){this.showLoading(),e.init(),c.execute(function(){d.retrieveChartDataAndRender({timePeriod:f.timePeriod,instrumentCode:f.instrumentCode,containerIDWithHash:b,type:f.type,instrumentName:f.instrumentName,series_compare:f.series_compare,delayAmount:f.delayAmount})}),a.isFunction(g)&&g()}}},navigator:{enabled:!0,series:{id:"navigator"}},plotOptions:{candlestick:{lineColor:"black",color:"red",upColor:"green",upLineColor:"black",shadow:!0},series:{events:{afterAnimate:function(){if(this.options.isInstrument&&"navigator"!==this.options.id){this.addCurrentPrice();var c=this;require(["charts/draw/highcharts_custom/horizontal_line","charts/draw/highcharts_custom/vertical_line"],function(d,e){d.init(),e.init();var f=parseInt(getParameterByName("startTime")),g=parseInt(getParameterByName("endTime")),i=parseInt(getParameterByName("entrySpotTime")),j=parseFloat(getParameterByName("barrierPrice"));if(f>0&&c.addVerticalLine({value:1e3*f,name:"Start Time"}),g>0){c.addVerticalLine({value:1e3*g,name:"End Time"});var k="_timer_"+Date.now();a(document).everyTime(500,k,function(){if(Date.now()>1e3*(g+1)){var d=a(c.chart.options.chart.renderTo).data();h.destroy(b,d.timePeriod,d.instrumentCode),a(document).stopTime(k)}})}i>0&&c.addVerticalLine({value:1e3*i,name:"Entry Spot"}),j&&c.addHorizontalLine({value:j,name:"Barrier"})})}this.chart.hideLoading()}}}},title:{text:f.instrumentName+" ("+f.timePeriod+")"},credits:{href:"http://www.binary.com",text:"Binary.com"},xAxis:{events:{afterSetExtremes:function(){}}},yAxis:[{opposite:!1,labels:{formatter:function(){return a(b).data("overlayIndicator")?(this.value>0?" + ":"")+this.value+"%":this.value}}}],rangeSelector:{enabled:!1},tooltip:{crosshairs:[{width:2,color:"red",dashStyle:"dash"},{width:2,color:"red",dashStyle:"dash"}],enabled:!0,enabledIndicators:!0},exporting:{enabled:!1}})},destroy:f,triggerReflow:function(b){a(b).highcharts()&&a(b).highcharts().reflow()},refresh:function(b){var c=a(b).highcharts(),d=[],e=void 0;a(c.series).each(function(a,b){b.options.isInstrument&&(d.push(b.name),e=b.options.compare)}),this.drawChart(b,{instrumentCode:a(b).data("instrumentCode"),instrumentName:a(b).data("instrumentName"),timePeriod:a(b).data("timePeriod"),type:a(b).data("type"),series_compare:e,delayAmount:a(b).data("delayAmount")});var f=this;require(["instruments/instruments"],function(c){d.forEach(function(d){var e=c.getSpecificMarketData(d);void 0!=e.symbol&&a.trim(e.symbol)!=a(b).data("instrumentCode")&&f.overlay(b,e.symbol,d,e.delay_amount)})})},addIndicator:function(b,c){if(a(b).highcharts()){var d=a(b).highcharts(),e=d.series[0];e&&d.addIndicator(a.extend({id:e.options.id},c))}},overlay:function(b,f,g,h){if(a(b).highcharts()){var i=a(b).highcharts(),j=a(b).data("timePeriod"),k=a(b).data("type");i.showLoading();for(var l=0;l<i.series.length;l++){var m=i.series[l];if(m.options.isInstrument){var n=m.options.data;m.setData([]);for(var o=0;o<n.length;o++)n[o].x&&n[o].y&&(n[o]=[n[o].x,n[o].y]);m.update({compare:"percent"}),m.setData(n),m.options.isInstrument=!0}else a(m).data("onChartIndicator")&&m.update({compare:"percent"})}e.init(),c.execute(function(){d.retrieveChartDataAndRender({timePeriod:j,instrumentCode:f,containerIDWithHash:b,type:k,instrumentName:g,series_compare:"percent",delayAmount:h})})}}}});