$(document).ready(function(){
	$(".select-form").hide();
})


/* Create Survey Event Functions */
$("#selectOption").change(function() {
	var state = $(this).val();
	switch(state) {
		case "alt" :
			$(".select-form-alt").show();
			$(".select-form").hide();
			break;
		case "one" :
			$(".select-form-alt").hide();
			$(".select-form").show();
			break;
		case "multi" :
			$(".select-form-alt").hide();
			$(".select-form").show();
			break;
	}
});


$("#btAddAnswer").click(function() {
	var getIndex = $(".select-form").find("tr:last-child").children("td:first-child").text();
	var index = Number(getIndex.split("번")[0]);
	var html = "";
	html += '<tr class="text-center">';
	html += '<td class="p-2">'+ (index+1) + '번' +' ';
	html += '</td>';
	html += '<td class="p-2">';
	html += '<input class="form-control">';
	html += '</td>';
	html += '<td class="p-2 text-danger">';
	html += '<button class="text-danger" id="removeAnswer">삭제';
	html += '</button>';
	html += '</td>';
	html += '</tr>';
	$(".select-form tbody").append(html);
});

$("#removeAnswer").click(function(){
	$(this).parent("td").parent("tr").remove();
	console.log(this);
}) 

