
// 模块化加载
requirejs(['config'],function(){//加载config.js后
	requirejs(['jquery','wlcarousel'],function($,wl){
		$(function(){

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
		});
	});
});

