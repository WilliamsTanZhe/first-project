<?php
	include "connect.php";

	$sql = "select * from wares";

	$conn->set_charset('utf8');

	$result = $conn->query($sql);


	//使用查询结果	
	$row = $result->fetch_all(MYSQLI_ASSOC);

	echo json_encode($row, JSON_UNESCAPED_UNICODE);
	// JSONP.stringify(obj)
?>