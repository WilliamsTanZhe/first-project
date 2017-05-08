<?php
	include 'DBHelper.php';
	
	$account = $_POST["account"];
	$password = $_POST["password"];
	$phone = $_POST["phone"];
	//判断当前 account 是否已存在数据表中
	$accountCheck = "select * from account where `account` ='$account'";
	$result = query($accountCheck);

	//当前 account 不存在，执行插入操作
	if(count($result) < 1){
		$sql = "insert into account(account, password) values('$account', '$password')";
		// echo $sql;
		$excute = excute($sql);
		if($excute){
			echo "{state: true}";
		} else {
			echo "{state: false, message: '插入失败！！！'}";
		}
	} else {
		echo "{state: false, message: 'account 已被注册！！！'}";
	}
?>