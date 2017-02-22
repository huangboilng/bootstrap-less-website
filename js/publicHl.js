/* 20160614  huangling */
function GetQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r!=null) return (r[2]); return null; 
} 
			
var huanglingdate = new Date(); 
var Daytotal = 8; //滑动的天数
var ymd,datehuangie,weekday, yearie, monthie, dayie;
for (var i = 1; i < Daytotal; ++i) {
	  GetDateStr(i);
	  yearie = datehuangie.getFullYear(); 
	  monthie = datehuangie.getMonth()+1;
	  dayie = datehuangie.getDate(); 	  
	  $(".tableAppendJs").append("<th><span>" + monthie + "月" + dayie + "日</span><p>" + weekday + "</p></th>");
}

function NewDate(str)
{
	var date=new Date();
	date.setUTCFullYear(str[0], str[1]-1, str[2]);
	date.setUTCHours(0, 0, 0, 0);
	return date;
}
function GetDateStr(AddDayCount) {

	var huanglingdate = new Date();
	huanglingdate.setDate(huanglingdate.getDate()+AddDayCount);
	var year = parseInt(huanglingdate.getFullYear());
	var month = parseInt(huanglingdate.getMonth()+1);
	var nowDate = parseInt(huanglingdate.getDate());
	var dayhling = new Array([ year, month, nowDate]); 

	datehuangie = NewDate(dayhling[0]);
	
	if(AddDayCount == 1){ 
		weekday = "明天";
	}else if(AddDayCount == 2){
		weekday = "后天";
	}else{
		weekday = "星期" + "日一二三四五六".split("")[new Date(datehuangie.getFullYear(), datehuangie.getMonth(), datehuangie.getDate()).getDay()];
	}
	  
    return dayhling;
}


function doctorMoreFun(){
	var xczz = $("#rowheight-jsxczz .jsappend").text().length, jsmsg = $("#rowheight-jsmsg .jsappend").text().length;
	if($("#rowheight-jsxczz p").height() > 45){
		if(xczz > 50){
			var str = $("#rowheight-jsxczz .jsappend").text().substr(0,50) + "...";
			$("#rowheight-jsxczz .jsappend").text(str);
			$("#rowheight-jsxczz .jsappend").append("<span class='moremsg'>更多</span>");
		}	
	}
	if($("#rowheight-jsxczz .jsappend").height() > 45){alert(890);
		if($("#rowheight-jsmsg .jsappend").height() > 60){
			var str = $("#rowheight-jsmsg .jsappend").text().substr(0,80) + "...";
			$("#rowheight-jsmsg .jsappend").text(str);
			$("#rowheight-jsmsg .jsappend").append("<span class='moremsg'>更多</span>");
		}
	}else{
		if($("#rowheight-jsmsg .jsappend").height() > 80){
			if(jsmsg > 160){
				var str = $("#rowheight-jsmsg .jsappend").text().substr(0,110) + "...";
				$("#rowheight-jsmsg .jsappend").text(str);
				$("#rowheight-jsmsg .jsappend").append("<span class='moremsg'>更多</span>");
			}	
		}
	}	

	if($(".departmentslist").height() > 45){
		$(".departmentslist").css({"height":"46px","overflow":"hidden"});
		$(".departmentdeploy").css("display","block");
	}
	
	$(".departmentdeploy").click(function(){
		//event.stopPropagation();  
		$(".departments-ulbox-js").slideDown("slow");
		return false;
	});
	$(".departmentpackup").click(function(){
		$(".departments-ulbox-js").slideUp("slow");
	});
	$(".moremsg").click(function(){
		//event.stopPropagation();  
		$(this).parent(".jsappend").siblings(".doctorContentMsgListGoodShow").slideDown("slow");
		return false;
	});
	$(".dcmlPackup").click(function(){
		$(this).parent(".doctorContentMsgListGoodShow").slideUp("slow");
	});
}
	
$(function($){
	$(".searchOpenClose").click(function(){			
		if($(".departmentsList").hasClass("heightAuto")){
			$(".departmentsList").removeClass("heightAuto");
			//$(".doctorSearchBoxListA").animate({ height: "100%"}, 1000 );
			$(this).find("span").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
		}else{
			$(".departmentsList").addClass("heightAuto");
			//$(".doctorSearchBoxListA").animate({ height: "56px"}, 1000 );
			$(this).find("span").addClass("glyphicon-chevron-down").removeClass("glyphicon-chevron-up");
		}
	})
	
	$(".tabTitle span").on("click", function(e){
		$(this).siblings("span").removeClass("tabTitleActive").end().addClass("tabTitleActive");

		var indexing = $(".tabTitle span").index($(this));
		$(".tabBodyBox").eq(indexing).siblings(".tabBodyBox").hide().end().show();
	});
})
