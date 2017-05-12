
// 模块化加载
requirejs(['config'],function(){//加载config.js后
	requirejs(['jquery','cookies','wlcarousel','lazyload','top'],function($,wl){
		$(function(){
			// 点击跳转到购物袋
			$('.cart_l').click(function(){
				window.location.href = 'html/car.html';
			})
			
			// 轮播图 无缝滚动
			$('.banner').wlcarousel({
				// auto:true,// 移入移出是否自动轮播 默认true
				// btns:true,//是否显示左右按钮  默认true
				seamless:true,//无缝滚动				
				imgs:['img/banner1.jpg','img/banner2.jpg','img/banner3.jpg'],
				width:960,
				height:500,
				// 滚动间隔时间
				duration:5000
			});

			// 轮播图移入 左右标签显示
			$('.banner').on('mouseenter',function(){
				// 左右标签显示
				$('.prev').show();
				$('.next').show();

			});

			$('.banner').on('mouseleave',function(){
				//隐藏
				$('.prev').hide();
				$('.next').hide();
			});

			// 懒加载                 滚动到位置 淡出加载
			$("article img").lazyload({effect: "fadeIn"});



			var $soldImgs=[];
			// 遍历获取图片
			$(".sold_go img").each(function(){
				$soldImgs.push($(this).attr("data-original"));
			   // this.src = "test" + i + ".jpg";
			 });

			$('.sold_main').wlcarousel({
				// auto:true,// 移入移出是否自动轮播 默认true
				btns:true,//是否显示左右按钮  默认true
				horizontal:true,//水平滚动				
				imgs:$soldImgs,//多个li滚动
				more:true,
				width:190,
				height:265,
				// 滚动间隔时间
				duration:2000
			});

		});
	});
});

