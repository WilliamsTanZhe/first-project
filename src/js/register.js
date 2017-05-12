requirejs(['config'],function(){//加载config.js后
	requirejs(['jquery','cookies','top'],function(){
		$(function(){

			// 点击跳转到购物袋
			$('.cart_l').click(function(){
				window.location.href = '../html/car.html';
			});

			
			var submit_key=0;
			$('.input_t input').on('blur',function(){
				register();
			});

			// 注册验证函数
			function register(){
				// 验证注册手机号 邮箱
				var $phone=$('#register_pohne').val();
				if(!/^1[34578]\d{9}$/.test($phone)) {
					$('#register_pohne').addClass('active');
					$('.output').html('请正常的手机号码');
					// submit_key=0;
					return false;					
				}
				// else if(!/^[a-z\.\-\d]+@[a-z\d\-]+\.[a-z]{2,6}$/.test($phone)){
				// 	$('#register_pohne').addClass('active')
				// 	$('.output').html('请正常的邮箱号')
				// }
				else{
					$('#register_pohne').removeClass('active');
					$('.output').html('');
					// submit_key=1;	
				} 

				// 密码验证
				var $password=$('#register_password').val();	
				if (!/^[\d\D\S]{6,}$/.test($password)) {
					$('#register_password').addClass('active');
					$('.output').html('密码不能少于6位且不带空格');
					// submit_key=0;
					return false;		
				} else{
					$('#register_password').removeClass('active');
					$('.output').html('');
					// submit_key=2;
				} 

				// 判断密码是否一至
				var $password=$('#register_password').val();
				var $confirm=$('#register_cfpw').val();

				if ($password!==$confirm) {
					$('#register_cfpw').addClass('active');
					$('.output').html('密码不一致');
					// submit_key=0;	
					return false;			
				}else{
					$('#register_cfpw').removeClass('active');
					$('.output').html('');
					// submit_key=3;
				} 
			}

			$('.submit_btn').on('click',function(){
				register();	
				
				// 通过查找 active类名  验证注册填写是否都正确
				// console.log($('.input_t input').hasClass('active'));
				if ($('.input_t input').hasClass('active')){

				}else{
					$.post('../php/register.php',{
						account: $('#register_pohne').val(),
						password: $('#register_password').val(),
						phone: $('#register_pohne').val()
					}, function(response){
						var $obj = eval('(' + response + ')');
						if($obj.state){
							alert('注册成功！');
						} else {
							alert($obj.message);
						}
					});				
				}
			})
			
		});
	});
});