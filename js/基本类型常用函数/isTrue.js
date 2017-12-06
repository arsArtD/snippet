  /**
	 * 判断是否为一个function的方法
	 * @function isFunction
	 * @param {object} fc 
	 * @returns {boolean}
	 * @example
	 * var a = function(){};
	 * AppUtil.isFunction(a) 返回true;
	 */
    function isFunction(fc){
        var r = false;
        if(fc!=undefined && typeof(fc)=='function'){
            r = true;
        }
        return r;
    }

    /**
	 * 判断是否为一个Array的方法
	 * @function isArray
	 * @param {object} obj
	 * @returns {boolean}
	 * @example
	 * var a = [1,2];
	 * AppUtil.isArray(a) 返回true;
	 */
    function isArray(obj){
        var v = 'Array';
        return Object.prototype.toString.apply(obj) == '[object ' + v + ']';
    }
    /**
	 * 判断是否为一个String的方法
	 * @function isString
	 * @param {object} obj
	 * @returns {boolean}
	 * @example
	 * var a = "str";
	 * AppUtil.isString(a) 返回true;
	 */
    function isString(obj){
        var v = 'String';
        return Object.prototype.toString.apply(obj) == '[object ' + v + ']';
    }
    /**
	 * 判断是否为一个数字的方法
	 * @function isNumber
	 * @param {object} obj
	 * @returns {boolean}
	 * @example
	 * var a = 1;
	 * AppUtil.isNumber(a) 返回true;
	 */
    function isNumber(obj){
        var v = 'Number';
        return Object.prototype.toString.apply(obj) == '[object ' + v + ']';
    }
    /**
	 * 判断是否为一个Object的方法
	 * @function isObject
	 * @param {object} obj
	 * @returns {boolean}
	 * @example
	 * var a = {a:1};
	 * AppUtil.isObject(a) 返回true;
	 */
    function isObject(obj){
        var v = 'Object';
        return Object.prototype.toString.apply(obj) == '[object ' + v + ']';
    }
    /**
	 * 判断字符串是否为空
	 * @function strIsNotEmpty
	 * @param {string} str
	 * @returns {boolean}
	 * @example
	 * var a = "";
	 * AppUtil.strIsNotEmpty(a) 返回false;
	 */
    function strIsNotEmpty(str){
        var r = false;
        if(str!=undefined && str.length > 0){
            r = true;
        }
        return r;
    };