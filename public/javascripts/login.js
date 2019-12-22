/* 로그인 오류 처리 */
function adminLogin(f) {
	if($("#loginid").val().trim() === "") {
		alert("아이디를 입력해주세요.");
		$("#loginid").focus();
		return false;
	}
	if($("#loginpw").val().trim() === "") {
		alert("패스워드를 입력해주세요.");
		$("#loginpw").focus();
		return false;
	}
	var data = {
		loginid : f.loginid,
		loginpw : f.loginpw
	}
/* 	$.ajax({
		type: "post",
		url: "/",
		data: data,
		dataType: "dataType",
		success: function (response) {
			if(response.code == 400) alert("아이디 혹은 비번 오류");
			else location.href = "/admin";
		}
	}); */
	return true;
}

