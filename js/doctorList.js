/* 20160616  huangling */
//科室类型
$.getJSON("http://tm.519e.com.cn/proxy/static/Dictionary/StandardDept.json", function(jsondata){
		if (!jsondata) { return; }	
		var jsonprovince = jsondata; 
		function provincejson(jsonprovince){
			var provincehtml = "";
			$.each(jsonprovince, function (id, node) {
				if(node.ParentCode == null || node.ParentCode == ""){	
					provincehtml=provincehtml+"<span class='StandardDeptFun' code="+ node.Code +">"+ node.Name +"</span>"; 
				}
		   }); 
		   $(".departmentsList").append(provincehtml);
	   }
	   provincejson(jsonprovince);					   
});	

var doctorTitle = [
	{
		"Name": "主任医师",
		"Code": 231
	}, {
		"Name": "副主任医师",
		"Code": 232
	}, {
		"Name": "主治医师",
		"Code": 233
	}, {
		"Name": "医师",
		"Code": 234
	}
];

var doctorTitleHtml = "";
$.each(doctorTitle, function (id, node) {
	doctorTitleHtml=doctorTitleHtml+"<span class='doctorTitleFun' code="+ node.Code +">"+ node.Name +"</span>"; 
}); 
$(".doctorTitleHtml").append(doctorTitleHtml);

var SpecialityCode = "", TitleCode = "";	   
$(".departmentsList").on("click", ".StandardDeptFun",function(){
	if($(this).attr("code")){
		SpecialityCode = $(this).attr("code");
	}
	getDoctorsList();	
})

$(".doctorTitleHtml").on("click", ".doctorTitleFun",function(){
	if($(this).attr("code")){
		TitleCode = $(this).attr("code");
	}
	getDoctorsList();	
})

function getDoctorsList(){
	
	var searchDoctor = {"SpecialityCode":SpecialityCode,"TitleCode":TitleCode};
	$.ajax({		   
		url: "http://inst.tm.api.519e.com.cn:8000/Api/Institution/Doctors_Get",
		contentType: "application/json",
		cache: "false",
		type: "POST",
		processData: false,
		data: JSON.stringify(searchDoctor),   
		success: function(json){
		
			if(json.StatusCode == 0){ 
				var jsonData = json.Result;				
//console.log(jsonData);
				var pageCount = jsonData.TotalCount, currentPage = jsonData.PageIndex;
				$(".sumDoctor").html(pageCount);
				
				if(!jsonData){
					$(".doctorListBoxHtml").append("<div class=\"col-md-3 col-sm-4 col-xs-4 text-center\">暂未找到相关医生</div>");
				}
				
				$(".doctorListBoxHtml").html("");
				
				var doctorListHtml = "";
				$.each(jsonData.Items, function (id, node) {
					if(node.Doctor.Speciality == null){
						node.Doctor.Speciality = "";
					}
					//node.Doctor.Speciality?node.Doctor.Speciality:"123";
					doctorListHtml=doctorListHtml+"<div class=\"col-md-3 col-sm-4 col-xs-4 text-center\">"+
									"<div class=\"col-md-12 doctorListBoxDiv\">"+
									"<img src="+ node.Doctor.PhotoUrl +">"+
									"<p class='DoctorTitleName'><span>"+node.Doctor.Name+"</span><span>"+node.Doctor.Title.Name+"</span></p>"+
									"<h5>"+node.Department.Name+"</h5>"+
									"<h5>"+node.Institution.Name+"</h5>"+
									"<hr class=\"borderHr\">"+
									"<div class=\"text-left doctorListBoxDivMsg doctorListBoxDivMsgHtml\">擅长："+node.Doctor.Speciality+"</div>"+
									"<a href='doctor.html?DoctorID="+node.Doctor.ID+"' class=\"btn btn-appointment\">预约</a>"+
								"</div></div>" 
				});
				$(".doctorListBoxHtml").append(doctorListHtml);
				
				
/*var initPagination = function() {
	$(".paginationBox").pagination(pageCount, {
		num_edge_entries: 1, //边缘页数
		num_display_entries: 6, //主体页数
		callback: pageselectCallback,
		items_per_page:2 //每页显示1项
	});
}();
 
function pageselectCallback(pageIndex, jq){
	alert(pageIndex);
	
	var searchDoctor = {"SpecialityCode":SpecialityCode,"TitleCode":TitleCode};
	$.ajax({		   
		url: "http://inst.tm.api.519e.com.cn:8000/Api/Institution/Doctors_Get",
		contentType: "application/json",
		cache: "false",
		type: "POST",
		processData: false,
		data: JSON.stringify(searchDoctor),   
		success: function(data){
		
		}
	});	
}*/
	
	
			}
		}	
	});
}

getDoctorsList();
