<?php
	header("Access-Control-Allow-Origin:*");
include("../api/conn.php");//引入连接数据库

//获取用户数据
$username = $_POST["username"];
$password = $_POST["password"];
$tel = $_POST["tel"];

//保存语句
$sql="INSERT INTO ueser (username,password,tel)VALUES('$username','$password','$tel') ";

//执行语句
$result = mysql_query($sql);
	$array = array("res_code"=>1, "res_error"=>"");
	if ($result) {
		$res_body = array("status"=>1, "username"=>$username, "message"=>"");
	} else {
		$res_body = array("status"=>0, "message"=>"有误：" . mysql_error());
	}
	// 构建返回的关联数组
	$array["res_body"] = $res_body;
	// 返回JSON文本
	echo json_encode($array);
	// 关闭
	mysql_close();
?>