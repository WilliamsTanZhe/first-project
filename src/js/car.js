requirejs(['config'],function(){//加载config.js后
	requirejs(['jquery','cookies','wlcarousel','top'],function($,wl){
		$(function(){


			// 根据cookie 写入购物车
			function setCarHtml(){
				var goods=JSON.parse($.cookie('carlist'));	
				var car_num=0;
				var car_totalprice = 0;  //商品总价	
				var htmlin=goods.map(function(item){
					car_totalprice+=Number(item.price.slice(5))*item.pie;
					// console.log(_totalprice,item.price,Number(item.price.slice(5).split('.')[0]))
					
					if (item.guid) {
						car_num++;
					}
					return '<tr guid="'+item.guid
					+'"><td><img src="'+item.imgurl+'" alt=""></td><td><a href="#" >'
					+item.brand+' '+item.name+'</a></td><td>'
					+item.pie+'</td><td>'
					+item.price.slice(5)
					+'</td><td><a href="#" >移至收藏</a><br><a href="#" class="btn_close">删除商品</a></td></tr>';
				}).join('');
				// console.log(htmlin)
				$('tbody').html(htmlin);//向每个匹配的元素内部前置内容

				// 写入总价
				$('.car_totalprice').html(car_totalprice.toFixed(2));

				// 商品类型 数量
				// console.log(car_num)
				$('.car_num').html(car_num);	
			}

			//如果查找到购物车有物品
			function loggedShow(){
				if ($.cookie('carlist')&&$.cookie('carlist')!='[]') {
					setCarHtml();
					$('.logged').show();
				}else{
					$('.notLogged').show();
					$('.logged').hide();
				}
			}	
			loggedShow();		

			//删除商品
			$('.btn_close').click(function(){
				var goods=JSON.parse($.cookie('carlist'));
				var $goodstx=$(this).parent().parent();
				var $guid=$goodstx.attr('guid');
				// 移除节点
				$goodstx.remove();
				// 移除该cookie
				for(var i=0;i<goods.length;i++){
					if (goods[i].guid===$guid) {
								  // 删除
						// console.log(666);
						goods.splice(i,1);
						break;
					}
				}
				// 重新写入cookie
				$.cookie('carlist',JSON.stringify(goods),{path:'/'});

				location.reload();

				// setCarHtml();

				// loggedShow();

				// carContent();//top的购物车
			});

			//top购物车点击删除
			$('.car_show').click(function(e){
				console.log(e.target)
				var target=e.target;

				if (target.tagName.toLowerCase()==='span') {
					var goods=JSON.parse($.cookie('carlist'));
					var goodstx=target.parentElement.parentElement;
					var guid=target.parentElement.getAttribute('guid');
					console.log(goodstx)
					// 移除节点
					goodstx.remove();
					// 移除该cookie
					for(var i=0;i<goods.length;i++){
						if (goods[i].guid===guid) {
							// 删除
							goods.splice(i,1);
							break;
						}
					}
					// 重新写入cookie
					$.cookie('carlist',JSON.stringify(goods),{path:'/'});

					// if ($.cookie('carlist')=='[]') {		
					// 	$('.car_num').html(0);
					// }
					setCarHtml();

					loggedShow();

					carContent();
				}
			});

			// 点击跳转到购物袋
			$('.cart_l').click(function(){
				window.location.href = '../html/car.html';
			});

			//购物车空时  登录后未登录提示隐藏
			if ($.cookie('meixi_account')) {
				$('.logged_in').hide();
			}
			
		});
	});
});