// config.js
requirejs.config({
	// baseUrl : 'js',//建议不用写  基础路径为js文件夹
	paths : {
		"jquery" : "../lib/jquery-3.1.1",
        "cookies" : "../lib/jquery-cookies/jquery.cookie",
		"wlcarousel" : "../lib/jquery-wlcarousel/jquery-wlcarousel",
        "lazyload" : "../lib/jquery-lazyload/jquery.lazyload.min",
        "wlzoom" : "../lib/jquery-wlzoom/jquery-wlzoom",
        "top" : "top",

        "common" : "common"
	},
	shim: {
         "common": {
             deps: ["jquery"] //确保jquery已加载 
             // ,
             // exports: "jQuery.fn.scroll"s
         },
         "cookies": {
             deps: ["jquery"]  
         },
         "wlcarousel": {
             deps: ["jquery"]  
         } ,
          "lazyload": {
             deps: ["jquery"]  
         },
          "wlzoom": {
             deps: ["jquery"]  
         },
         "top": {
             deps: ["jquery","cookies","common"] 
         }
    }
})