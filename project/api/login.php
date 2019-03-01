<?php 
	header("Access-Control-Allow-Origin:*");
	// 包含连接文件
	include("../api/conn.php");

	// 获取修改数据
	$username = $_POST["username"];
	$password = $_POST["password"];

	// SQL语句
	$sql = "SELECT * FROM ueser WHERE username='$username' AND password='$password'";
	// 执行SQL语句
	$res = mysql_query($sql);
	if($row=mysql_fetch_assoc($res)) {
		$arr = array('res_code'=>1,'res_body'=> $row);
	} else {
		$arr = array('res_code' =>0,'res_body'=> '');
	}
	// 返回JSON文本
	echo json_encode($arr);
	// 关闭
	mysql_close();
 ?>
 