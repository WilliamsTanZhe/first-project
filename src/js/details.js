requirejs(['config'],function(){//加载config.js后
	requirejs(['jquery','cookies','wlcarousel','lazyload','wlzoom','top','common'],function($,wl,la){
		$(function(){

			// 点击跳转到购物袋
			$('.cart_l').click(function(){
				window.location.href = '../html/car.html';
			});

			$('.take').on('click',function(e){
				
				var $goodImg=$('.simgFirst').attr('src');
				var $oLeft=$(this).offset().left;
				var $oTop=$(this).offset().top;
				// 创建节点
				var $good=$('<img src="'+$goodImg+'">')
				.css({width:50,height:60,position:'fixed',left:$oLeft,top:$oTop});
				$good.appendTo('body');

				;
				// 飞入购物车
				$good.animate({left:$('.cart_l').offset().left,top:$('.cart_l').offset().top,
				width:25,height:30},function(){

					// 飞入后隐藏
					$good.hide();
					carContent();	
					$('.cart_car').show();			
				});

			// 保存添加商品的信息 如果已有商品获取/读取cookie值
				var goodslist=$.cookie('carlist');
				goodslist=goodslist? JSON.parse(goodslist): [];
				// console.log(goodslist);
				// 
				var $prot=$('.pro_title');

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
						brand:$prot.children().eq(0).text(),
						name:$prot.children().eq(2).text(),
						price:$('.price').text(),
						imgurl:$goodImg,
						pie:1
					}
					// 将商品信息 写入数组  goodslist
					goodslist.push(goods);
				}						
				// 写入cookie
				$.cookie('carlist',JSON.stringify(goodslist),{path:'/'});
				// setCookie();
			});
			
			// 懒加载                 当图片距离窗口180px时加载
			$(".content img").lazyload({ threshold :180});

			// 放大镜
			$('.proImg').wlzoom({
    			position:'right'
    		});

			// 添加大图路径
    		$('.simg').on('mouseenter','img',function(){
    			var $imgSrc = $(this).attr('data');   			
				$('.proimg_r img').attr({
					src:$imgSrc,
					'data-big':$imgSrc
				});
			})
			
			// $(window).scroll(function(){
				
			// 	console.log($('.content_title').offset());
			// 	if ($(document).scrollTop()>300) {

			// 		$('.content').load('details_content.html');
			// 	}
			// })
			


		});
	});
});