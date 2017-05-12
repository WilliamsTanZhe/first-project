requirejs(['config'],function(){//加载config.js后
	requirejs(['jquery','cookies','top'],function(){
		$(function(){

			// 点击跳转到购物袋
			$('.cart_l').click(function(){
				window.location.href = '../html/car.html';
			});
			// 点击登录
			$('.submit_btn').click(function(){
				
				if (!$('#login_pohne').val()) {					
					$('.output').html('请输入注册时的邮箱或手机号码。');
				}else{
					$.post('../php/account.php',{
			          account: $('#login_pohne').val(),
			          password: $('#login_password').val()
			        }, function(response){
			          var $obj = eval('(' + response + ')');
			          if($obj.state){
			          	
			          	// 写入cookies      默认浏览器关闭删除cookie
			          	$.cookie('meixi_account',  $('#login_pohne').val() 
			          		,{ path: '/' });
			          	location.reload();//先刷新页面  确保index页面能获取用户名
			            window.location.href = '../index.html';

			          } else {
			            $('.output').html('请检查用户名与密码是否正确！');
			          }
			        }) ;       
				}
	     	});

	     	// 密码框内容改变
	     	$('#login_password').change(function(){	
	     		// 回车登录
	     		$(document).keyup(function(e){	
	     			if (e.keyCode===13) {
		     			if (!$('#login_pohne').val()) {					
							$('.output').html('请输入注册时的邮箱或手机号码。');
						}else{
							$.post('../php/account.php',{
					          account: $('#login_pohne').val(),
					          password: $('#login_password').val()
					        }, function(response){
					          var $obj = eval('(' + response + ')');
					          if($obj.state){
					          	
					          	// 写入cookies      默认浏览器关闭删除cookie
					          	$.cookie('meixi_account',  $('#login_pohne').val() 
					          		,{ path: '/' });
					          	location.reload();//先刷新页面  确保index页面能获取用户名
					            window.location.href = '../index.html';

					          } else {
					            $('.output').html('请检查用户名与密码是否正确！');
					          }
					        }) ;       
						}
	     			}			
		     	});
	     	});
		});
	});
});