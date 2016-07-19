define(["jquery","jquery-ui","color-picker","ddslick"],function(){function a(){$(this).dialog("close"),$(this).find("*").removeClass("ui-state-error")}function b(b,c){var d=function(a,b,c,d){this.level=a,this.stroke=b,this.strokeWidth=c,this.dashStyle=d},e=[new d(30,"red",1,"Dash"),new d(70,"red",1,"Dash")];require(["text!charts/indicators/stoch/stoch.html","text!charts/indicators/indicators.json","css!charts/indicators/stoch/stoch.css"],function(d,f){d=$(d),d.appendTo("body"),f=JSON.parse(f);var g=f.stoch;d.attr("title",g.long_display_name),d.find("input[type='button']").button(),d.find("#stoch_k_stroke,#stoch_d_stroke").each(function(){$(this).colorpicker({position:{at:"right+100 bottom",of:"element",collision:"fit"},part:{map:{size:128},bar:{size:128}},select:function(a,b){$(this).css({background:"#"+b.formatted}).val(""),$(this).data("color","#"+b.formatted)},ok:function(a,b){$(this).css({background:"#"+b.formatted}).val(""),$(this).data("color","#"+b.formatted)}})}),$("#stoch_k_stroke").css("background","#1c1010"),$("#stoch_d_stroke").css("background","#cd0a0a");var h="Solid";$("#stoch_dashStyle").ddslick({imagePosition:"left",width:148,background:"white",onSelected:function(a){$("#stoch_dashStyle .dd-selected-image").css("max-width","115px"),h=a.selectedData.value}}),$("#stoch_dashStyle .dd-option-image").css("max-width","115px");var i=d.find("#stoch_levels").DataTable({paging:!1,scrollY:100,autoWidth:!0,searching:!1,info:!1,columnDefs:[{className:"dt-center",targets:[0,1,2,3]}],aoColumnDefs:[{bSortable:!1,aTargets:[1,3]}]});$.each(e,function(a,b){$(i.row.add([b.level,'<div style="background-color: '+b.stroke+';width:100%;height:20px;"></div>',b.strokeWidth,'<div style="width:50px;overflow:hidden;"><img src="images/dashstyle/'+b.dashStyle+'.svg" /></div>']).draw().node()).data("level",b).on("click",function(){$(this).toggleClass("selected")})}),d.find("#stoch_level_delete").click(function(){i.rows(".selected").indexes().length<=0?require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Select level(s) to delete!"})}):i.rows(".selected").remove().draw()}),d.find("#stoch_level_add").click(function(){require(["indicator_levels"],function(a){a.open(b,function(a){$.each(a,function(a,b){$(i.row.add([b.level,'<div style="background-color: '+b.stroke+';width:100%;height:20px;"></div>',b.strokeWidth,'<div style="width:50px;overflow:hidden;"><img src="images/dashstyle/'+b.dashStyle+'.svg" /></div>']).draw().node()).data("level",b).on("click",function(){$(this).toggleClass("selected")})})})})}),d.dialog({autoOpen:!1,resizable:!1,width:350,height:400,modal:!0,my:"center",at:"center",of:window,dialogClass:"stoch-ui-dialog",buttons:[{text:"OK",click:function(){var b=!0;if($(".stoch_input_width_for_period").each(function(){var a=$(this);return _.isInteger(_.toNumber(a.val()))&&_.inRange(a.val(),parseInt(a.attr("min")),parseInt(a.attr("max"))+1)?void 0:(require(["jquery","jquery-growl"],function(b){b.growl.error({message:"Only numbers between "+a.attr("min")+" to "+a.attr("max")+" is allowed for "+a.closest("tr").find("td:first").text()+"!"})}),a.val(a.prop("defaultValue")),void(b=!1))}),b){var c=[];$.each(i.rows().nodes(),function(){var a=$(this).data("level");a&&c.push({color:a.stroke,dashStyle:a.dashStyle,width:a.strokeWidth,value:a.level,label:{text:a.level}})});var e={fastKPeriod:parseInt($("#stoch_k_period").val()),fastDPeriod:parseInt($("#stoch_d_period").val()),fastDMaType:$("#stoch_d_ma_type").val(),stroke:$("#stoch_k_stroke").css("background-color"),dStroke:$("#stoch_d_stroke").css("background-color"),strokeWidth:parseInt($("#stoch_stroke_width").val()),dashStyle:h,appliedTo:parseInt($("#stoch_applied_to").val()),levels:c};$($(".stoch").data("refererChartID")).highcharts().series[0].addIndicator("stoch",e),a.call(d)}}},{text:"Cancel",click:function(){a.call(this)}}]}),d.find("select").each(function(a,b){$(b).selectmenu({width:150}).selectmenu("menuWidget").css("max-height","85px")}),"function"==typeof c&&c(b)})}return{open:function(a){return 0==$(".stoch").length?void b(a,this.open):void $(".stoch").data("refererChartID",a).dialog("open")}}});