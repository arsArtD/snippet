Math.uuid = function (len, radix) {
	var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	var chars = CHARS, uuid = [], i;
	radix = radix || chars.length;
	
	if (len) {
		for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
	} else {
		var r;
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';
		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random()*16;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
	}
	return uuid.join('');
};

/**
 * 获得UUID的方法
 * @name uuid
 * @function
 * @returns {string} uuid字符串
 * @example
 * var a = AppUtil.uuid();
 */
function uuid(){
    return Math.uuid(35);
}