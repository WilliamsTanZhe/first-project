/*
轮播图jq插件
最终格式：;(function($){$.fn.插件名=function(){}})(jQuery);
编写轮播图插件，要求如下：
	是否自动轮播
	是否显示小图
	是否显示左右按钮
	可设置轮播间隔时间
	轮播类型: fade:淡入淡出, vertial:垂直滚动, horizontal:水平滚动,
			  show:幻灯片
	默认显示第几张图片
 */
; (function($){
	$.fn.wlcarousel=function(options){

		// 设置默认值		
		var defaults={
			width:810,
			height:320,

			// 滚动间隔时间
			duration:3000,

			// 当前索引值（默认0）
			index:0,
			auto:true,// 移入移出是否自动轮播
			btns:true //是否显示左右按钮
		}

		// 遍历  实现多个调用
		return this.each(function(){
			// jquery扩展对象$.extend()
			// var opt = Object.assign({},defaults,options);
			var opt = $.extend({},defaults,options);//在options后复制添加

			// 接受外部this
			var that=$(this);
			var timer;
			var $ul;			
			var $smallList;//小图集合
			init();

			function init(){
				//设置样式
				that.addClass('wlcarousel');
				// 创建ul
				$ul = $('<ul/>');
				$ul.children().css({
					width:opt.width,
					height:opt.height
				})

				// 写入图片li
				$ul.html(opt.imgs.map(function(item){
					return `<li><img src="${item}"></li>`;
				}).join(''));

				// 写入页面
				that.append($ul);

				if (opt.vertial) {					
					$ul.css({top:-opt.index*opt.height});// 默认显示第几张图片
					setIner(vertial);
					bas(vertial);//功能函数
				}
				else if(opt.fade){	
					
					// $ul下的所有的li 并添加对应的类
					$ul.children().addClass('fade');

			        // 定义透明度  除第一张为1			       
			        for(var i=0;i<opt.imgs.length;i++){
			            if (i===opt.index) {// 默认显示第几张图片
			                continue;
			            }
			            $ul.children().eq(i).css({opacity:0})
			        }				
					setIner(fade);					
					bas(fade);//功能函数
				}
				else if(opt.show){
					$ul.children().eq(opt.index).show().siblings().hide();// 默认显示第几张图片				
					setIner(show);
					bas(show);//功能函数
				}
				else if(opt.horizontal){//水平移动
					//设置ul宽度 				 li添加浮动
					$ul.css({width:opt.width*opt.imgs.length}).children().addClass('horizontalli');
					$ul.css({left:-opt.index*opt.width});// 默认显示第几张图片
					setIner(horizontal);
					bas(horizontal);
				}
				else if(opt.seamless){//无缝滚动
					// 克隆第一张图片
					var newli=$ul.children().eq(0).clone(true);
					$ul.append(newli);

					// 添加imgs
					opt.imgs.push(opt.imgs[0]);
					
					//设置ul宽度 				                   li添加浮动
					$ul.css({width:opt.width*opt.imgs.length}).children().addClass('horizontalli');
					$ul.css({left:-opt.index*opt.width});// 默认显示第几张图片

					setIner(seamless);
					bas(seamless);//功能函数	
				}else{
					// 克隆第一张图片
					var newli=$ul.children().eq(0).clone(true);
					$ul.append(newli);

					// 添加imgs
					opt.imgs.push(opt.imgs[0]);
					
					//设置ul宽度 				                   li添加浮动
					$ul.css({width:opt.width*opt.imgs.length}).children().addClass('horizontalli');
					$ul.css({left:-opt.index*opt.width});// 默认显示第几张图片

					setIner(seamless);
					bas(seamless);//功能函数	
				}
			}

			// 功能按键显示   setbas为对应轮播类型函数传参执行
			function bas(setbas){
				// 是否显示左右按键
				if (opt.btns) {
					
					// 创建上一张按钮
					var $prev = $('<a/>');
					// $prev.html('&lt');
					$prev.addClass('prev');

					// 创建下一张按钮
					var $next = $('<a/>');
					// $next.html('&gt');
					$next.addClass('next');

					that.append($prev);
					that.append($next);
				
					$prev.on('click',function(){ 
						$ul.stop(false,true);//则完成队列。可以立即完成动画。

			            opt.index--;
			            setbas();//对应轮播类型函数执行 
			           
			            clearInterval(timer);
			           	setIner(setbas);
			        });
			        $next.on('click',function(){
			        	$ul.stop(false,true);//则完成队列。可以立即完成动画。
 						
			            opt.index++;
			            setbas();//对应轮播类型函数执行
			            
			            clearInterval(timer);
			            setIner(setbas);
			        });
				}

				// 移入移出是否自动轮播
				if (opt.auto) {
					$ul.on('mouseenter',function(){
			            clearInterval(timer);            
			        });
			        $ul.on('mouseleave',function(){
			           setIner(setbas);
			        });
				}

				// 是否显示小图
				if (opt.smallPic) {
					// 写入小图
					var $small=$('<ul/>');
					$small.addClass('smallpic');
					$small.html(opt.imgs.map(function(item){
						return `<li><img src="${item}"></li>`;
					}).join(''));

					that.parent().append($small);

					$smallList=$small.children();

					// 初始化
					$smallList.animate({opacity:0.5}).eq(opt.index).animate({opacity:1});
					// 小图点击
					$smallList.on('click',function(){

						var idx=$(this).index();
						opt.index=idx;
						setbas();//对应轮播类型函数执行
						clearInterval(timer);
			            setIner(setbas);//对应轮播类型函数写入定时函数
						$smallList.eq(idx).animate({opacity:1}).
						siblings().animate({opacity:0.5});
					});
				}				
			}

			// 设定回应的 轮播函数的定时函数
			function setIner(setb){
				timer=setInterval(function(){
					opt.index++;
					setb();//对应轮播类型函数执行					
				},opt.duration);
			}

			//小图的上下点击执行函数
			function smallOngo(){
				if (opt.smallPic) {
					$smallList.eq(opt.index).animate({opacity:1}).
					siblings().animate({opacity:0.5});	
				}
			}

			// 判断index范围
			function optIndex(){
				if (opt.index>opt.imgs.length-1) {
					opt.index=0;
				}else if (opt.index<0) {
					opt.index=opt.imgs.length-1;
				}
			}

			// 无缝滚动
			function seamless(){
				if (opt.index>opt.imgs.length-1) {
					opt.index=1;
					$ul.css({left:0});//无缝滚动 关键  显示添加的最后一张时，重置left
				}else if (opt.index<0) {
					opt.index=opt.imgs.length-2;
					$ul.css({left:-(opt.index+1)*opt.width});//重置left
				}
				
				$ul.animate({left:-opt.index*opt.width});
				smallOngo();
			}

			// 垂直轮播函数
			function vertial(){
				optIndex();
				$ul.animate({top:-opt.index*opt.height});
				smallOngo();
			}

			//淡入淡出
			function fade(){				
				optIndex();
				$ul.children().eq(opt.index).animate({opacity:1}).
				siblings().animate({opacity:0});
            	
             	smallOngo();
			}

			// 幻灯片
			function show(){
				optIndex();
				$ul.children().eq(opt.index).show().siblings().hide();

				smallOngo();
			}

			//水平移动
			function horizontal(){
				optIndex();
				$ul.animate({left:-opt.index*opt.width});

				smallOngo();
			}			
		});				
	}
})(jQuery);