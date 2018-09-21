var update = "false";
var myId;

$(document).ready(function(){

	//If you want submit a form on a click.
	$("#btn1").click(function(){//Click on element type button id="btn1" to make ajax call.
	
		var data = $("#forma1").serialize();
		
		data = data+"&update="+update+"&myId="+myId;
		
		event.preventDefault();
		$.ajax({
			type: "GET",//POST or GET
			url: "upis.php",//Where data to send.
			contentType: "text/html",//Regular html format
			data: data,//For displaying use this: print_r($_GET);
			//data: JSON.stringify($("#forma1").serialize()),//Serialization of form. echo(json_encode($_GET));//Should use this if it's jquery ajax json string.
			//contentType:"application/json;charset=utf-8", //If you want json data type.
		   success: function (result) {//If succesfull 
				
				var checkFirstChar = result.substr(0,1);
				
				if(checkFirstChar!=="{"){
					result = result.substr(1);
				}

				var obj = JSON.parse(result);
				var table = "<table id='tabela' class='table table-bordered table-hover table-responsive table-condensed'><thead><th>Summary<button id='bt1' class='btn btn-default btn-xs bord' type='button' onclick='sort(this)'><span id='b1' class='glyphicon glyphicon-triangle-bottom'></span></button></th><th>Status<button id='bt2' class='btn btn-default btn-xs bord' type='button' onclick='sort(this)'><span id='b2' class='glyphicon glyphicon-triangle-bottom'></span></button></th><th>Due date<button id='bt3' class='btn btn-default btn-xs bord' type='button' onclick='sort(this)'><span id='b3' class='glyphicon glyphicon-triangle-bottom'></span></button></th><th>Actions</th></tr></thead><tbody>";

				var len = obj.statId.length;
				var select1 = "";
				for(var i=0;i<len;i++){
					
					if(obj.statId[i]=="1"){//Pending selected
					
						select1 = "<div class='form-group'><select class='form-control' id='sel1'><option value='1' selected>Pending</option><option value='2'>In progress</option><option value='3'>Completed</option></select></div>";
						
					}
					else if(obj.statId[i]=="2"){//In progress selected
					
						select1 = "<div class='form-group'><select class='form-control' id='sel1'><option value='1'>Pending</option><option value='2' selected>In progress</option><option value='3'>Completed</option></select></div>";
						
					}
					else if(obj.statId[i]=="3"){//Completed selected
					
						select1 = "<div class='form-group'><select class='form-control' id='sel1'><option value='1'>Pending</option><option value='2'>In progress</option><option value='3' selected>Completed</option></select></div>";
						
					}
					
					table += "<tr><td>"+obj.summary[i]+"</td><td>"+select1+"</td><td>"+obj.due_date[i]+"</td><td><button id='btnx"+(1*(i+1))+"' type='button' class='btn btn-default btn-xs' data-toggle='modal' data-target='#myModal' onclick='populateModal(this)'><span class='glyphicon glyphicon-edit' title='Edit record'></span></button><button onclick='setToCompleted(this)' title='Set to completed' id='btny"+(2*(i+1))+"' type='button' class='btn btn-default btn-xs'><span class='glyphicon glyphicon-check'></span></button><button id='btnz"+(3*(i+1))+"' type='button' class='btn btn-default btn-xs' onclick='deleteRecord(this)'><span class='glyphicon glyphicon-remove' title='Remove record'></span></button></td></tr>";
				}
				table += "</tbody></table>";
				$("#raport").html(table);//Display in div with id=raport.
				
		   },
		   error: function () {//In case of an error
				alert("Error!!!");
		   }
		});
		
		update = "false";
		
	});
	
	$(".close").on("click", function(){
		
		document.getElementById("forma1").children[1].value = "";
		document.getElementById("forma1").children[3].value = "";
		document.getElementById("forma1").children[5].value = "";
		
	});
	
	$("#newTask").on("click", function(){
		update = "false";
		document.getElementById("forma1").children[1].value = "";
		document.getElementById("forma1").children[3].value = "";
		document.getElementById("forma1").children[5].value = "";
		
	});
	
	$("#completedTasks").change(function() {
		if(this.checked) {
			
			$.ajax({
			type: "GET",//POST or GET
			url: "onlyCompleted.php",//Where data to send.
			contentType: "text/html",//Regular html format
			data: $("#forma1").serialize(),//For displaying use this: print_r($_GET);
			//data: JSON.stringify($("#forma1").serialize()),//Serialization of form. echo(json_encode($_GET));//Should use this if it's jquery ajax json string.
			//contentType:"application/json;charset=utf-8", //If you want json data type.
		   success: function (result) {//If succesfull 
				var obj = JSON.parse(result);
				var table = "<table id='tabela' class='table table-bordered table-hover table-responsive table-condensed'><thead><th>Summary<button id='bt1' class='btn btn-default btn-xs bord' type='button' onclick='sort(this)'><span id='b1' class='glyphicon glyphicon-triangle-bottom'></span></button></th><th>Status<button id='bt2' class='btn btn-default btn-xs bord' type='button' onclick='sort(this)'><span id='b2' class='glyphicon glyphicon-triangle-bottom'></span></button></th><th>Due date<button id='bt3' class='btn btn-default btn-xs bord' type='button' onclick='sort(this)'><span id='b3' class='glyphicon glyphicon-triangle-bottom'></span></button></th><th>Actions</th></tr></thead><tbody>";

				var len = obj.statId.length;
				var select1 = "";
				for(var i=0;i<len;i++){
					
					if(obj.statId[i]=="1"){//Pending selected
					
						select1 = "<div class='form-group'><select class='form-control' id='sel1'><option value='1' selected>Pending</option><option value='2'>In progress</option><option value='3'>Completed</option></select></div>";
						
					}
					else if(obj.statId[i]=="2"){//In progress selected
					
						select1 = "<div class='form-group'><select class='form-control' id='sel1'><option value='1'>Pending</option><option value='2' selected>In progress</option><option value='3'>Completed</option></select></div>";
						
					}
					else if(obj.statId[i]=="3"){//Completed selected
					
						select1 = "<div class='form-group'><select class='form-control' id='sel1'><option value='1'>Pending</option><option value='2'>In progress</option><option value='3' selected>Completed</option></select></div>";
						
					}
					
					table += "<tr><td>"+obj.summary[i]+"</td><td>"+select1+"</td><td>"+obj.due_date[i]+"</td><td><button id='btnx"+(1*(i+1))+"' type='button' class='btn btn-default btn-xs' data-toggle='modal' data-target='#myModal' onclick='populateModal(this)'><span class='glyphicon glyphicon-edit' title='Edit record'></span></button><button onclick='setToCompleted(this)' title='Set to completed' id='btny"+(2*(i+1))+"' type='button' class='btn btn-default btn-xs'><span class='glyphicon glyphicon-check'></span></button><button id='btnz"+(3*(i+1))+"' type='button' class='btn btn-default btn-xs' onclick='deleteRecord(this)'><span class='glyphicon glyphicon-remove' title='Remove record'></span></button></td></tr>";
				}
				table += "</tbody></table>";
				$("#raport").html(table);//Display in div with id=raport.
		   },
		   error: function () {//In case of an error
				alert("Error!!!");
		   }
	});
		}
		else{
			
			$.ajax({
			type: "GET",//POST or GET
			url: "izvestaj.php",//Where data to send.
			contentType: "text/html",//Regular html format
			data: $("#forma1").serialize(),//For displaying use this: print_r($_GET);
			//data: JSON.stringify($("#forma1").serialize()),//Serialization of form. echo(json_encode($_GET));//Should use this if it's jquery ajax json string.
			//contentType:"application/json;charset=utf-8", //If you want json data type.
		   success: function (result) {//If succesfull 
				var obj = JSON.parse(result);
				var table = "<table id='tabela' class='table table-bordered table-hover table-responsive table-condensed'><thead><th>Summary<button id='bt1' class='btn btn-default btn-xs bord' type='button' onclick='sort(this)'><span id='b1' class='glyphicon glyphicon-triangle-bottom'></span></button></th><th>Status<button id='bt2' class='btn btn-default btn-xs bord' type='button' onclick='sort(this)'><span id='b2' class='glyphicon glyphicon-triangle-bottom'></span></button></th><th>Due date<button id='bt3' class='btn btn-default btn-xs bord' type='button' onclick='sort(this)'><span id='b3' class='glyphicon glyphicon-triangle-bottom'></span></button></th><th>Actions</th></tr></thead><tbody>";

				var len = obj.statId.length;
				var select1 = "";
				for(var i=0;i<len;i++){
					
					if(obj.statId[i]=="1"){//Pending selected
					
						select1 = "<div class='form-group'><select class='form-control' id='sel1'><option value='1' selected>Pending</option><option value='2'>In progress</option><option value='3'>Completed</option></select></div>";
						
					}
					else if(obj.statId[i]=="2"){//In progress selected
					
						select1 = "<div class='form-group'><select class='form-control' id='sel1'><option value='1'>Pending</option><option value='2' selected>In progress</option><option value='3'>Completed</option></select></div>";
						
					}
					else if(obj.statId[i]=="3"){//Completed selected
					
						select1 = "<div class='form-group'><select class='form-control' id='sel1'><option value='1'>Pending</option><option value='2'>In progress</option><option value='3' selected>Completed</option></select></div>";
						
					}
					
					table += "<tr><td>"+obj.summary[i]+"</td><td>"+select1+"</td><td>"+obj.due_date[i]+"</td><td><button id='btnx"+(1*(i+1))+"' type='button' class='btn btn-default btn-xs' data-toggle='modal' data-target='#myModal' onclick='populateModal(this)'><span class='glyphicon glyphicon-edit' title='Edit record'></span></button><button onclick='setToCompleted(this)' title='Set to completed' id='btny"+(2*(i+1))+"' type='button' class='btn btn-default btn-xs'><span class='glyphicon glyphicon-check'></span></button><button id='btnz"+(3*(i+1))+"' type='button' class='btn btn-default btn-xs' onclick='deleteRecord(this)'><span class='glyphicon glyphicon-remove' title='Remove record'></span></button></td></tr>";
				}
				table += "</tbody></table>";
				$("#raport").html(table);//Display in div with id=raport.
		   },
		   error: function () {//In case of an error
				alert("Error!!!");
		   }
	});
		}
	});
	
	$.ajax({
			type: "GET",//POST or GET
			url: "izvestaj.php",//Where data to send.
			contentType: "text/html",//Regular html format
			data: $("#forma1").serialize(),//For displaying use this: print_r($_GET);
			//data: JSON.stringify($("#forma1").serialize()),//Serialization of form. echo(json_encode($_GET));//Should use this if it's jquery ajax json string.
			//contentType:"application/json;charset=utf-8", //If you want json data type.
		   success: function (result) {//If succesfull 
				var obj = JSON.parse(result);
				var table = "<table id='tabela' class='table table-bordered table-hover table-responsive table-condensed'><thead><th>Summary<button id='bt1' class='btn btn-default btn-xs bord' type='button' onclick='sort(this)'><span id='b1' class='glyphicon glyphicon-triangle-bottom'></span></button></th><th>Status<button id='bt2' class='btn btn-default btn-xs bord' type='button' onclick='sort(this)'><span id='b2' class='glyphicon glyphicon-triangle-bottom'></span></button></th><th>Due date<button id='bt3' class='btn btn-default btn-xs bord' type='button' onclick='sort(this)'><span id='b3' class='glyphicon glyphicon-triangle-bottom'></span></button></th><th>Actions</th></tr></thead><tbody>";

				var len = obj.statId.length;
				var select1 = "";
				for(var i=0;i<len;i++){
					
					if(obj.statId[i]=="1"){//Pending selected
					
						select1 = "<div class='form-group'><select class='form-control' id='sel1'><option value='1' selected='selected'>Pending</option><option value='2'>In progress</option><option value='3'>Completed</option></select></div>";
						
					}
					else if(obj.statId[i]=="2"){//In progress selected
					
						select1 = "<div class='form-group'><select class='form-control' id='sel1'><option value='1'>Pending</option><option value='2' selected='selected'>In progress</option><option value='3'>Completed</option></select></div>";
						
					}
					else if(obj.statId[i]=="3"){//Completed selected
					
						select1 = "<div class='form-group'><select class='form-control' id='sel1'><option value='1'>Pending</option><option value='2'>In progress</option><option value='3' selected='selected'>Completed</option></select></div>";
						
					}
					
					table += "<tr><td>"+obj.summary[i]+"</td><td>"+select1+"</td><td>"+obj.due_date[i]+"</td><td><button id='btnx"+(1*(i+1))+"' type='button' class='btn btn-default btn-xs' data-toggle='modal' data-target='#myModal' onclick='populateModal(this)'><span class='glyphicon glyphicon-edit' title='Edit record'></span></button><button onclick='setToCompleted(this)' title='Set to completed' id='btny"+(2*(i+1))+"' type='button' class='btn btn-default btn-xs'><span class='glyphicon glyphicon-check'></span></button><button id='btnz"+(3*(i+1))+"' type='button' class='btn btn-default btn-xs' onclick='deleteRecord(this)'><span class='glyphicon glyphicon-remove' title='Remove record'></span></button></td></tr>";
					
				}
				table += "</tbody></table>";
				$("#raport").html(table);//Display in div with id=raport.
		   },
		   error: function () {//In case of an error
				alert("Error!!!");
		   }
	});
	
});

function getRow(my){
	var currentRow=$("#"+my.id).closest("tr");
	var rowIndex = currentRow.index();
	
	return rowIndex;
}

function setToCompleted(my){
	
	var rowIndex = getRow(my);
	var target = document.getElementById("tabela").children[1].children[rowIndex];
	var targetLen = target.childElementCount;
	var getOptVal = target.children[1].children[0].children[0].value;
	
	var arr1 = [];
	var temp;
	for(var i=0;i<targetLen-1;i++){
		
		if(i==1){
			temp = target.children[i].children[0].children[0].value;
			arr1.push(temp);
		
		}
		else{
			temp = target.children[i].innerHTML;
			arr1.push(temp);
		}
		
	}

	let months = {
		name: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		value: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
	}
	
	var res = arr1[2].split(" ");
	
	for(var i=0;i<months.name.length;i++){
		
		if(res[1]==months.name[i]){
			res[1] = months.value[i];
		}
		
	}
	
	res = res.reverse();
	let tempStr = "";
	for(let i=0;i<res.length;i++){
		
		tempStr += res[i];
		
		if(i!=res.length-1){
			tempStr += "-";
		}
		
	}
	arr1[2]=tempStr;
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			
			var obj = JSON.parse(this.responseText);

			var table = "<table id='tabela' class='table table-bordered table-hover table-responsive table-condensed'><thead><th>Summary<button id='bt1' class='btn btn-default btn-xs bord' type='button' onclick='sort(this)'><span id='b1' class='glyphicon glyphicon-triangle-bottom'></span></button></th><th>Status<button id='bt2' class='btn btn-default btn-xs bord' type='button' onclick='sort(this)'><span id='b2' class='glyphicon glyphicon-triangle-bottom'></span></button></th><th>Due date<button id='bt3' class='btn btn-default btn-xs bord' type='button' onclick='sort(this)'><span id='b3' class='glyphicon glyphicon-triangle-bottom'></span></button></th><th>Actions</th></tr></thead><tbody>";

			var len = obj.statId.length;
			var select1 = "";
			for(var i=0;i<len;i++){
				
				if(obj.statId[i]=="1"){//Pending selected
				
					select1 = "<div class='form-group'><select class='form-control' id='sel1'><option value='1' selected='selected'>Pending</option><option value='2'>In progress</option><option value='3'>Completed</option></select></div>";
					
				}
				else if(obj.statId[i]=="2"){//In progress selected
				
					select1 = "<div class='form-group'><select class='form-control' id='sel1'><option value='1'>Pending</option><option value='2' selected='selected'>In progress</option><option value='3'>Completed</option></select></div>";
					
				}
				else if(obj.statId[i]=="3"){//Completed selected
				
					select1 = "<div class='form-group'><select class='form-control' id='sel1'><option value='1'>Pending</option><option value='2'>In progress</option><option value='3' selected='selected'>Completed</option></select></div>";
					
				}
				
				table += "<tr><td>"+obj.summary[i]+"</td><td>"+select1+"</td><td>"+obj.due_date[i]+"</td><td><button id='btnx"+(1*(i+1))+"' type='button' class='btn btn-default btn-xs' data-toggle='modal' data-target='#myModal' onclick='populateModal(this)'><span class='glyphicon glyphicon-edit' title='Edit record'></span></button><button onclick='setToCompleted(this)' title='Set to completed' id='btny"+(2*(i+1))+"' type='button' class='btn btn-default btn-xs'><span class='glyphicon glyphicon-check'></span></button><button id='btnz"+(3*(i+1))+"' type='button' class='btn btn-default btn-xs' onclick='deleteRecord(this)'><span class='glyphicon glyphicon-remove' title='Remove record'></span></button></td></tr>";
				
			}
			table += "</tbody></table>";
			document.getElementById("raport").innerHTML = table;
	
		}
	};
	
	xmlhttp.open("GET", "setToCompleted.php?query=" + arr1, true);
	xmlhttp.send();

}



function sort(my){

	var elem=document.getElementById(my.id).childNodes[0];
	var checkCompleted = document.getElementById("completedTasks");
	
	var temp;
	
	var temp1 = "glyphicon glyphicon-triangle-bottom";
	var temp2 = "glyphicon glyphicon-triangle-bottom";
	var temp3 = "glyphicon glyphicon-triangle-bottom";

	if(elem.id=="b1" && elem.className=="glyphicon glyphicon-triangle-bottom"){
		temp1 = "glyphicon glyphicon-triangle-top";
		temp = temp1;
	}
	else if(elem.id=="b1" && elem.className=="glyphicon glyphicon-triangle-top"){
		temp1 = "glyphicon glyphicon-triangle-bottom";
		temp = temp1;
	}
	
	if(elem.id=="b2" && elem.className=="glyphicon glyphicon-triangle-bottom"){
		temp2 = "glyphicon glyphicon-triangle-top";
		temp = temp2;
	}
	else if(elem.id=="b2" && elem.className=="glyphicon glyphicon-triangle-top"){
		temp2 = "glyphicon glyphicon-triangle-bottom";
		temp = temp2;
	}
	
	if(elem.id=="b3" && elem.className=="glyphicon glyphicon-triangle-bottom"){
		temp3 = "glyphicon glyphicon-triangle-top";
		temp = temp3;
	}
	else if(elem.id=="b3" && elem.className=="glyphicon glyphicon-triangle-top"){
		temp3 = "glyphicon glyphicon-triangle-bottom";
		temp = temp3;
	}
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			
			var obj = JSON.parse(this.responseText);
			
			var table = "<table id='tabela' class='table table-bordered table-hover table-responsive table-condensed'><thead><th>Summary<button id='bt1' class='btn btn-default btn-xs bord' type='button' onclick='sort(this)'><span id='b1' class='"+temp1+"'></span></button></th><th>Status<button id='bt2' class='btn btn-default btn-xs bord' type='button' onclick='sort(this)'><span id='b2' class='"+temp2+"'></span></button></th><th>Due date<button id='bt3' class='btn btn-default btn-xs bord' type='button' onclick='sort(this)'><span id='b3' class='"+temp3+"'></span></button></th><th>Actions</th></tr></thead><tbody>";

				var len = obj.statId.length;
				var select1 = "";
				for(var i=0;i<len;i++){
					
					if(obj.statId[i]=="1"){//Pending selected
					
						select1 = "<div class='form-group'><select class='form-control' id='sel1'><option value='1' selected='selected'>Pending</option><option value='2'>In progress</option><option value='3'>Completed</option></select></div>";
						
					}
					else if(obj.statId[i]=="2"){//In progress selected
					
						select1 = "<div class='form-group'><select class='form-control' id='sel1'><option value='1'>Pending</option><option value='2' selected='selected'>In progress</option><option value='3'>Completed</option></select></div>";
						
					}
					else if(obj.statId[i]=="3"){//Completed selected
					
						select1 = "<div class='form-group'><select class='form-control' id='sel1'><option value='1'>Pending</option><option value='2'>In progress</option><option value='3' selected='selected'>Completed</option></select></div>";
						
					}
					
					table += "<tr><td>"+obj.summary[i]+"</td><td>"+select1+"</td><td>"+obj.due_date[i]+"</td><td><button id='btnx"+(1*(i+1))+"' type='button' class='btn btn-default btn-xs' data-toggle='modal' data-target='#myModal' onclick='populateModal(this)'><span class='glyphicon glyphicon-edit' title='Edit record'></span></button><button onclick='setToCompleted(this)' title='Set to completed' id='btny"+(2*(i+1))+"' type='button' class='btn btn-default btn-xs'><span class='glyphicon glyphicon-check'></span></button><button id='btnz"+(3*(i+1))+"' type='button' class='btn btn-default btn-xs' onclick='deleteRecord(this)'><span class='glyphicon glyphicon-remove' title='Remove record'></span></button></td></tr>";
					
				}
				table += "</tbody></table>";
				document.getElementById("raport").innerHTML = table;
		}
	};
	
	var arr1 = [];
	arr1[0] = temp;
	arr1[1] = my.id;
	arr1[2] = ""+checkCompleted.checked;
	
	xmlhttp.open("GET", "sort.php?query=" + arr1, true);
	xmlhttp.send();
	
}

function deleteRecord(my) {
    
	var rowIndex = getRow(my);
	var target = document.getElementById("tabela").children[1].children[rowIndex];
	var targetLen = target.childElementCount;
	var getOptVal = target.children[1].children[0].children[0].value;
	
	var arr1 = [];
	var temp;
	for(var i=0;i<targetLen-1;i++){
		
		if(i==1){
			temp = target.children[i].children[0].children[0].value;
			arr1.push(temp);
		
		}
		else{
			temp = target.children[i].innerHTML;
			arr1.push(temp);
		}
		
	}
	
	let months = {
		name: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		value: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
	}
	
	var res = arr1[2].split(" ");
	
	for(var i=0;i<months.name.length;i++){
		
		if(res[1]==months.name[i]){
			res[1] = months.value[i];
		}
		
	}
	
	res = res.reverse();
	let tempStr = "";
	for(let i=0;i<res.length;i++){
		
		tempStr += res[i];
		
		if(i!=res.length-1){
			tempStr += "-";
		}
		
	}
	arr1[2]=tempStr;
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {

			var obj = JSON.parse(this.responseText);

			var table = "<table id='tabela' class='table table-bordered table-hover table-responsive table-condensed'><thead><th>Summary<button id='bt1' class='btn btn-default btn-xs bord' type='button' onclick='sort(this)'><span id='b1' class='glyphicon glyphicon-triangle-bottom'></span></button></th><th>Status<button id='bt2' class='btn btn-default btn-xs bord' type='button' onclick='sort(this)'><span id='b2' class='glyphicon glyphicon-triangle-bottom'></span></button></th><th>Due date<button id='bt3' class='btn btn-default btn-xs bord' type='button' onclick='sort(this)'><span id='b3' class='glyphicon glyphicon-triangle-bottom'></span></button></th><th>Actions</th></tr></thead><tbody>";

			var len = obj.statId.length;
			var select1 = "";
			for(var i=0;i<len;i++){
				
				if(obj.statId[i]=="1"){//Pending selected
				
					select1 = "<div class='form-group'><select class='form-control' id='sel1'><option value='1' selected='selected'>Pending</option><option value='2'>In progress</option><option value='3'>Completed</option></select></div>";
					
				}
				else if(obj.statId[i]=="2"){//In progress selected
				
					select1 = "<div class='form-group'><select class='form-control' id='sel1'><option value='1'>Pending</option><option value='2' selected='selected'>In progress</option><option value='3'>Completed</option></select></div>";
					
				}
				else if(obj.statId[i]=="3"){//Completed selected
				
					select1 = "<div class='form-group'><select class='form-control' id='sel1'><option value='1'>Pending</option><option value='2'>In progress</option><option value='3' selected='selected'>Completed</option></select></div>";
					
				}
				
				table += "<tr><td>"+obj.summary[i]+"</td><td>"+select1+"</td><td>"+obj.due_date[i]+"</td><td><button id='btnx"+(1*(i+1))+"' type='button' class='btn btn-default btn-xs' data-toggle='modal' data-target='#myModal' onclick='populateModal(this)'><span class='glyphicon glyphicon-edit' title='Edit record'></span></button><button onclick='setToCompleted(this)' title='Set to completed' id='btny"+(2*(i+1))+"' type='button' class='btn btn-default btn-xs'><span class='glyphicon glyphicon-check'></span></button><button id='btnz"+(3*(i+1))+"' type='button' class='btn btn-default btn-xs' onclick='deleteRecord(this)'><span class='glyphicon glyphicon-remove' title='Remove record'></span></button></td></tr>";
				
			}
			table += "</tbody></table>";
			document.getElementById("raport").innerHTML = table;
		}
	};
        xmlhttp.open("GET", "delete.php?query=" + arr1, true);
        xmlhttp.send();
   
}

function populateModal(my) {
    
	var rowIndex = getRow(my);
	var target = document.getElementById("tabela").children[1].children[rowIndex];
	var targetLen = target.childElementCount;
	var getOptVal = target.children[1].children[0].children[0].value;
	
	var arr1 = [];
	var temp;
	for(var i=0;i<targetLen-1;i++){
		
		if(i==1){
			temp = target.children[i].children[0].children[0].value;
			arr1.push(temp);
		
		}
		else{
			temp = target.children[i].innerHTML;
			arr1.push(temp);
		}
		
	}
	
	let months = {
		name: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		value: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
	}
	
	var res = arr1[2].split(" ");
	
	for(var i=0;i<months.name.length;i++){
		
		if(res[1]==months.name[i]){
			res[1] = months.value[i];
		}
		
	}

	res = res.reverse();
	let tempStr = "";
	for(let i=0;i<res.length;i++){
		
		tempStr += res[i];
		
		if(i!=res.length-1){
			tempStr += "-";
		}
		
	}
	arr1[2]=tempStr;
	
	update = "true";
	var p1 = document.getElementById("forma1").children[1];
	var p2 = document.getElementById("forma1").children[3];
	var p3 = document.getElementById("forma1").children[5];
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			
			var obj = JSON.parse(this.responseText);

			myId = obj.myId;
			p1.value = obj.summary;
			p2.value = obj.due_date;
			p3.value = obj.description;

		}
	};
	
        xmlhttp.open("GET", "populateModal.php?query=" + arr1, true);
        xmlhttp.send();

}