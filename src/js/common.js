//cookie操作
//写入，读取，删除

/**
 * [设置cookie]
 * @param {[String]} name    [cookie名]
 * @param {[String]} val     [cookie值]
 * @param {[Date]} expires 	 [cookie有效期]
 * @param {[String]} path    [cookie保存路径]
 */
function setCookie(name,val,expires,path){
	var str = name + '=' + val;

	if(expires){
		str +=';expires=' + expires;
	}

	if(path){
		str += ';path=' + path;
	}

	document.cookie = str;
}
// setCookie('left',100);


function getCookie(name){
	// 得到所有的cookie
	var cookies = document.cookie;

	var res = '';

	if(cookies.length){
		cookies = cookies.split('; ');
		cookies.forEach(function(item){
			var arr = item.split('=');
			if(arr[0] === name){
				res = arr[1];
			}
		})
	}

	return res;
}
//var left = getCookie('left');//100


function removeCookie(name){
	var now = new Date();
	now.setDate(now.getDate()-7);

	// setCookie(name,null,now);
	document.cookie = name + '=null;expires=' + now;
}
//removeCookie('left')