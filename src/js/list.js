requirejs(['config'],function(){
	requirejs(['jquery','lazyload','cookies','top','common'],function(){
		$(function(){

			// 懒加载                 滚动到位置 淡出加载
			$(".con_r img").lazyload({effect: "fadeIn"});

			// 吸顶栏
			if ($(document).scrollTop()>133) {
				$('.fix_top').show();
			}
			//维持监听
			$(document).scroll(function(){
				if ($(document).scrollTop()>133) {
					$('.fix_top').show();
				}else{
					$('.fix_top').hide();
				}
			});

			// 点击跳转到购物袋
			$('.cart_l').click(function(){
				window.location.href = '../html/car.html';
			});
			//跳转详情页
			$('.simgFirst').click(function(){
				window.location.href = '../html/details.html';
			});

			// 加入购物车
			$('.prop_r').on('click',function(e){
				e.preventDefault();
				var $scrollTop=$(document).scrollTop();
				var $prot=$(this).closest('.product');//最近的类
				var $goodImg=$prot.find('.simgFirst').attr('src');//图片路径
				var $oLeft=$(this).offset().left;
				var $moveTop=$('.cart_l').offset().top;//要移动到的top值
				if ($scrollTop<133) {
					//吸顶栏未出现
					var $moveTop=$('.cart_l').offset().top+$scrollTop/2;
				}
				var $oTop=$(this).offset().top-$scrollTop;
				// 创建节点
				var $good=$('<img src="'+$goodImg+'">')
				.css({width:50,height:60,position:'fixed',left:$oLeft,top:$oTop,zIndex:1000,borderRadius:'50%'});
				$good.appendTo('body');

				// 飞入购物车
				$good.animate({left:$('.cart_l').offset().left,top:$moveTop,
				width:25,height:30},function(){

					// 飞入后隐藏
					$good.hide();
					carContent();	
					$('.cart_car').show();			
				});

				// 保存添加商品的信息 如果已有商品获取/读取cookie值
				var goodslist=$.cookie('carlist');
				goodslist=goodslist? JSON.parse(goodslist): [];

				// 点击添加按钮    判断是添加   还是增加数量
				var guid=$prot.attr('data-guid');

				// 通过for遍历  判断是否存在商品
				var hasgood=false;
				for(var i=0;i<goodslist.length;i++){
					if (goodslist[i].guid===guid) {
						hasgood=true;
						// 如有该商品  则pie++
						goodslist[i].pie++;
						break;
					}
				}

				if (!hasgood) {
					var goods={
						guid:guid,
						brand:$prot.find('.product_n p').text(),
						name:$prot.find('.product_n b').text(),
						price:'美西价：'+$prot.find('.prop_l span').text(),
						imgurl:$goodImg,
						pie:1
					}
					// 将商品信息 写入数组  goodslist
					goodslist.push(goods);
				}						
				// 写入cookie
				$.cookie('carlist',JSON.stringify(goodslist),{path:'/'});
				// setCookie('carlist',JSON.stringify(goodslist));
			});

			
			var $ul=$('.bags_main li ul').find('ul');
			var $lla =$('.bags_main li ul').find('ul').siblings();
			for(var i=0;i<$lla.length;i++){
				$($lla[i]).on('click',function(e){
					e.preventDefault();
					$ul.hide();
					$(this).next().show();
				});
			}
			// $lla.click(function(e){
			// 	e.preventDefault();
			// 	var $idx=$(this).index();
			// 	$ul.hide().eq($idx).show();
			// })

		});
	});
});