// config.js
requirejs.config({
	// baseUrl : 'js',//建议不用写
	paths : {
		"jquery" : "../lib/jquery-3.1.1",
		"wlcarousel" : "../lib/jquery-wlcarousel/jquery-wlcarousel"
	},
	shim: {
         "common": {
             deps: ["jquery"] //确保jquery已加载 
             // ,
             // exports: "jQuery.fn.scroll"
         },
         "wlcarousel": {
             deps: ["jquery"] //确保jquery已加载 

         }
    }
})