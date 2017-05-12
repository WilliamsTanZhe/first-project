// 关注显示
	$(".follow_us").on('mouseenter',function(){
		$('.foolow_uslinks').show();
	});
	$(".follow_us").on('mouseleave',function(){
		$('.foolow_uslinks').hide();
	});

	// 购物车显示
	$(".cart").on('mouseenter',function(){
		$('.cart_car').show();
	});
	$(".cart").on('mouseleave',function(){
		$('.cart_car').hide();
	});


// 读取cookie 查看用户是否登录
	if ($.cookie('meixi_account')) {
		$(".register").html('欢迎您，美西贵宾');
		$(".login").html('<a href="mymeixi.html">我的美西</a>');
		$(".out").css({display:'block'});


		$(".out").on('click',function(){

			$(".out").hide();
			$(".register").html('<a href="register.html">注册</a>');
			$(".login a").html('<a href="login.html">登录</a>');
			$.cookie('meixi_account','',{ path: '/' });
		})
	}
	
// 写入读取商品cookie 写入购物车
	carContent();
	
	// 购物车显示商品 类型数量
	// if ($.cookie('carlist')&&$.cookie('carlist')!='[]') {
	// 	var car_num=0;
	// 	var goods=JSON.parse($.cookie('carlist'));
	// 	goods.map(function(item){
	// 		if (item.guid) {
	// 			car_num++;
	// 		}
	// 	});
	// 	if(goods[0].guid){
	// 		$('.car_num').html(car_num);
	// 	}
	// }
	

	function carContent(){
		//必须查找到carlist的cookie才能运行  
		if($.cookie('carlist')){
			if ($.cookie('carlist')!='[]'){
				$('.empty').hide();				
				// 读取cookie
				var goods=JSON.parse($.cookie('carlist'));
				
				if (!$('.car_show div').hasClass('commodity')) {
					// console.log(12)
					setHtml();
					$('.cart_out').show();
				}else{
					// 如果商品大于1 则查找car_show中是否有对应商品
					for(var i=0; i<goods.length;i++){
						if (goods[i].pie>1) {
							// console.log(13)
							// if ($('.commodity div').attr('guid')==goods[0].guid) {
								// console.log(goods[0].guid)
								var $pie=goods[i].guid;
								$('.'+$pie+'').html(goods[i].pie);
								var _totalprice = 0;
								goods.map(function(item){
									_totalprice+=Number(item.price.slice(5))*item.pie;
								});
								// 写入总价
								$('.totalprice').html(_totalprice.toFixed(2));
							// }
						}else{
							setHtml();
							if (i<goods.length) {
								//购物车清空后添加 需再次刷新购物车显示
								$('.cart_out').show();
							}
						}
					}	
				}
			}else{
				$('.empty').show();
				$('.cart_out').hide();
			}
		}else{
			$('.empty').show();
			$('.cart_out').hide();
		}
	}
		
	// 根据cookie 写入购物车
	function setHtml(){

		var goods=JSON.parse($.cookie('carlist')).reverse();	
		var car_num=0;
		var _totalprice = 0;  //商品总价	
		var htmlin=goods.map(function(item){
			_totalprice+=Number(item.price.slice(5))*item.pie;
			// console.log(_totalprice,item.price,Number(item.price.slice(5).split('.')[0]))
			if (item.guid) {
				car_num++;
			}
			
			return '<div class="commodity" ><div guid="'+item.guid
			+'"><a href="#"><img class="comImg" src="'+item.imgurl+'" alt=""><p>'+item.brand+'</p>'
			+item.name+'</p><strong>'
			+item.price.slice(4)+'&times;'
			+'<b class="'+item.guid+'">'+item.pie+'</b></strong></a><span class="btn-close">&times;</span></div></div>';
		}).join('');
		//html插入  刷新插入
		$('.car_show').html(htmlin);//向每个匹配的元素内部前置内容

		// 写入总价
		$('.totalprice').html(_totalprice.toFixed(2));

		// 商品类型 数量
		$('.car_num').html(car_num);
	}

	// 删除个别商品
	$('.car_show').click(function(e){
		var target=e.target;

		if (target.tagName.toLowerCase()==='span') {
			var goods=JSON.parse($.cookie('carlist'));
			var goodstx=target.parentElement.parentElement;
			var guid=target.parentElement.getAttribute('guid');
			// 移除节点
			goodstx.parentNode.removeChild(goodstx);
			// 移除该cookie
			for(var i=0;i<goods.length;i++){
				if (goods[i].guid===guid) {
					// 删除
					goods.splice(i,1);
					break;
				}
			}
			// 重新写入cookie
			// setCookie('carlist',JSON.stringify(goods));
			$.cookie('carlist',JSON.stringify(goods),{path:'/'});

			if ($.cookie('carlist')=='[]') {		
				$('.car_num').html(0);
			}
			carContent();
		}
	});

