 /**
	 * 此方法扩展了String的原型，检测字符串中是否含有链接，如果有则通过a标签包裹
	 * @name replaceAll
	 * @function
	 * @param {string} s1 - 将要匹配的字符串.
	 * @param {string} s2 - 替换的字符串.
	 * @returns {string} 最终被替换后的字符串
	 * @example
	 * var v = "欢迎访问我的个人网站：http://www.zhangxinxu.com/";
	 * var s1 = v.httpHtml();
	 * console.log(s1) 输出的结果是 欢迎访问我的个人网站：<a href='http://www.zhangxinxu.com/'>http://www.zhangxinxu.com/</a>
	 */
    String.prototype.httpHtml = function(_blank){
    	var htmlstr = this;
        var strRegex = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;
        var blankStr = "";
    	if(_blank==true){
    		blankStr = "target='_blank'";
    	}
        htmlstr = htmlstr.replace(strRegex, function (match, capture) {
            if (capture) {
                var newuri = match.substr(0,7).toLowerCase()=="http://"?match:"http://"+match;
                return "<a class='snap-message-link' href='"+newuri+"' "+blankStr+">"+match+"</a>";
            }
        });
    	return htmlstr;
    };
    
	/**
	 * 此方法扩展了String的原型，实现了一个类似于java的replaceAll方法
	 * @name replaceAll
	 * @function
	 * @param {string} s1 - 将要匹配的字符串.
	 * @param {string} s2 - 替换的字符串.
	 * @returns {string} 最终被替换后的字符串
	 * @example
	 * var s = "abcabcabc";
	 * var s1 = s.replaceAll('ab','d');
	 * console.log(s1) 输出的结果是dcdcdc，替换了原有字符串中所有的ab字符
	 */
	String.prototype.replaceAll = function(s1,s2){ 
		return this.replace(new RegExp(s1,"gm"),s2); 
	}
	
	
	/**
	 * 此方法扩展了String的原型，实现了一个类似于java的startWith方法
	 * @name startWith
	 * @function
	 * @param {string} s1 - 将要匹配的字符串.
	 * @returns {boolean} true or false
	 * @example
	 * var s = "abcabcabc";
	 * var result = s.startWith('ab');
	 * console.log(result) //true or false
	 * */
	String.prototype.startWith=function(str){     
		var reg=new RegExp("^"+str);     
		return reg.test(this);        
	}  
	
	
	/**
	 * 此方法扩展了String的原型，实现了一个类似于java的endWith方法
	 * @name endWith
	 * @function
	 * @param {string} s1 - 将要匹配的字符串.
	 * @returns {boolean} true or false
	 * @example
	 * var s = "abcabcabc";
	 * var result = s.startWith('bc');
	 * console.log(result) //true or false
	 * */
	String.prototype.endWith=function(str){     
		var reg=new RegExp(str+"$");     
		return reg.test(this);        
	}