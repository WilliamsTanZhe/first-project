;(function($){
	$.fn.wlzoom = function(options){

		// 默认值
		var defaults = {
			//大图的位置
			position:'bottom',

			//大图与小图的间距
			gap:15,

			//放大区域的大小
			width:400,
			height:300
		}

		return this.each(function(){
			// 扩展默认值
			var opt=$.extend({},defaults,options);

			var $zoom=$(this).addClass('wl-zoom');
			var $smallPic = $(this).children('img');

	        // 全局变量
	        // 放大镜
            var $minZoom;

            // 大图显示区域
            var $bigZoom;

            // 大图
            var $bigPic;

            // 大图与小图的比率
            var ratio;

	        // 初始化
	        // 创建放大镜
	        // 并写入.zoom
	        $minZoom = $('<span/>').addClass('minzoom');
	        $zoom.append($minZoom);

	        // 创建大图
	        $bigZoom = $('<div/>').addClass('wl-bigzoom');
	        $bigPic = $('<img/>').attr('src',$smallPic.attr('data-big'));
	        $bigZoom.append($bigPic);

	        // 设置$bigZoom的宽高
	        $bigZoom.css({
	        	width:opt.width,
	        	height:opt.height
	        });

	        // 设置大图放置位置
	        if(opt.position === 'right'){
            	$bigZoom.css({
            		left:$smallPic.offset().left + $smallPic.outerWidth() + opt.gap,
            		top:$smallPic.offset().top
            	});
            }else if(opt.position === 'left'){
            	$bigZoom.css({
            		left:$smallPic.offset().left - $bigZoom.outerWidth() - opt.gap,
            		top:$smallPic.offset().top
            	});
            }

	        $bigZoom.appendTo('body');


	        // 2）鼠标移入小图
	        $zoom.on('mouseenter',function(){
	        	// 移入时把小图设定大图的src写入大图
	        	$bigPic.attr('src',$smallPic.attr('data-big'));

				$bigZoom.show();
	           	$minZoom.show();
	           
	           	ratio = $bigPic.width()/$smallPic.width();
	          	 // 改变放大镜的宽高
	           	$minZoom.css({
	           		width:$bigZoom.outerWidth()/ratio,
	           		height:$bigZoom.outerHeight()/ratio
	           	}); 
	        });

	        // 3）鼠标移动
	        $zoom.on('mousemove',function(e){

	        	
	        	// 计算移动的距离  当滚动条滚动时必须将滚动距离计算在内
	            var left = e.clientX - $zoom.get(0).offsetLeft - $minZoom.outerWidth()/2;
	            var top = e.clientY - $zoom.get(0).offsetTop - $minZoom.outerHeight()/2
	            + $(document).scrollTop();
	            // console.log($(document).scrollTop());
	            // 放置移出小图之外的区域
	            if(left<=0){
	                left = 0 ;
	            }else if(left > $smallPic.outerWidth() - $minZoom.outerWidth()){
	                left = $smallPic.outerWidth() - $minZoom.outerWidth();
	            }
	            
	            if(top<0){
	                top = 0;
	            }else if(top>$smallPic.outerHeight() - $minZoom.outerHeight()){
	                top = $smallPic.outerHeight() - $minZoom.outerHeight();
	            }

	            // 放大镜跟随效果
	            $minZoom.css({
	            	left:left,
	            	top:top
	            });

	            // 显示大图对应区域
	            $bigPic.css({
	            	left:-left*ratio,
	            	top:-top*ratio
	            });
	        });

	        // 4）鼠标离开小图
	        $zoom.on('mouseleave',function(){
            	$bigZoom.hide();
            	$minZoom.hide();
            });
		});      
	}
})(jQuery);