<?php
/*
 *
 * App ID: 9591589
 *
 * API Key: KHvYFzr8qdvPoECKQcFF2Et8
 *
 * Secret Key: 4g8fSQ9K2vnL7sC3dHCinpWnzwRmwtxh
 */

/*
 * 百度语音合成api接口
 * 通过URL，直接把文字变语音输出
 * 更多请参看readme.md
 * gethub https://github.com/qcomdd/hi-voice
 * 调用方式./voice.php?t=要合成语音的文字
 * 百度token有效期30天，缓存在文本文件（对目录有写要求）15天一更换
 * by it0512
 * 2017-6补充
 * 修改了一些不合理逻辑判断，
 * 百度语音每天1W次，如果不够用请升级或是多注册几个key轮询。这个功能我就不加了。
 *
 */
error_reporting ( E_ALL ^ E_NOTICE );
//header ( "content-type:audio/mp3;" );
// ************基本定义
define ( 'DS', DIRECTORY_SEPARATOR );
define ( 'AROOT', dirname ( __FILE__ ) . DS );
// ************逻辑功能
$o = new OA2 ();
$text = ! empty ( $_GET ['t'] ) ? $_GET ['t'] : "MynameisBob?";
$bb = $o->getVoice ( $text );
//var_dump($bb);
//echo ($bb);
/**
 * ************
 * 百度OA2认证
 * 有存到本地超过15天，重取
 * 每次调用token都验证时间
 * **************
 */
class OA2 {
	private $appid = 'KHvYFzr8qdvPoECKQcFF2Et8';
	private $secret = '4g8fSQ9K2vnL7sC3dHCinpWnzwRmwtxh';
	private $Open_url = 'https://openapi.baidu.com/oauth/2.0/token?';
	private $url_voice = 'http://tsn.baidu.com/text2audio?';
	private $_logname = 'bd_log.txt';
	private $_filename = 'bd_token.txt';
	private $is_log = true;
	private $scope;
	public $access_token;
	
	function __construct() {
		global $n, $t;
	}
	function getVoice($txt) { // 百度请求语音
		$params = array (
				'tex' => urlencode($txt),
				'tok' => $this->getToken (),
				'spd' => 5, // 语速，取值 0-9，默认为 5
				'pit' => 5, // 音调，取值 0-9，默认为 5
				'vol' => 5, // 音量，取值 0-9，默认为 5
				'per' => 0, // 取值 0-1 ；0 为女声，1 为男声，默认为女声
				
				'cuid' => '9591589',
				'ctp' => 1,
				'lan' => 'zh' 
		);
	
		
		$c = $this->file_get_content ( $this->url_voice, $params, true);
		if (! $c)
			$this->put ( 'Oauth2服务器连接失败' );
		return $c;
	}
	function _getToken() { // 百度直接返回AccessToken
		$params = array (
				'client_id' => $this->appid,
				'client_secret' => $this->secret,
				'grant_type' => 'client_credentials' 
		);
		$c = $this->file_get_content ( $this->Open_url, $params );
		if (! $c)
			$this->put ( 'Oauth2服务器连接失败' );
		return $c;
	}
	function getToken() { // 写日志
		$filename = AROOT . ($this->_filename);
		$file = fopen ( $filename, 'a+' ) or die ( "Unable to open file!" );
		$str = fread ( $file, 1024 );
		$arr = json_decode ( $str, true );
		if (! $arr || ! isset ( $arr ['_time'] ) || time () > intval ( $arr ['_time'] )) {
			$str = $this->_getToken ();
			$arr = ( array ) json_decode ( $str, true );
			$arr ['_time'] = time () + intval ( $arr ['expires_in'] ) / 2;
			
			$string = json_encode ( $arr ); // 支持数组和对象;
			fclose ( $file );
			$file = fopen ( $filename, 'w+' );
			fwrite ( $file, $string );
		}
		fclose ( $file );
		unset ( $file );
		$this->openid = $arr ['refresh_token'];
		$this->access_token = $arr ['access_token'];
		
		return $this->access_token;
	}
	/**
	 * ******************************
	 */
	function put($par) { // 输出提示
		exit ( $par . "请联系管理员，谢谢" );
	}
	function _log($data) { // 写日志
		if ($this->is_log) {
			$string = var_export ( $data, true ); // 不加true和VAR_DUMP一样
			$file = fopen ( $this->_logname, 'a+' );
			fwrite ( $file, $string . "\r\n" );
			fclose ( $file );
			unset ( $file );
		}
	}
	private function file_get_content($url, $par, $echoFlag = false) {
		$ch = curl_init ();
		$timeout = 30;
		curl_setopt ( $ch, CURLOPT_SSL_VERIFYPEER, false );
		curl_setopt ( $ch, CURLOPT_URL, $url );
		curl_setopt ( $ch, CURLOPT_POST, 1 );
		
// 		curl_setopt($ch, CURLOPT_HEADER, 1); 
// 		curl_setopt($ch, CURLINFO_HEADER_OUT, true);
		
		curl_setopt ( $ch, CURLOPT_POSTFIELDS, http_build_query ( $par ) ); 
		curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, 1 );
		curl_setopt ( $ch, CURLOPT_CONNECTTIMEOUT, $timeout );
		$file_contents = curl_exec ( $ch );
		if ($echoFlag) {
			$mp3Url = $url.http_build_query ( $par );
			echo  "<a href=".$mp3Url." target='_blank'>查看结果</a>";
// 			var_dump(curl_getinfo($ch, CURLINFO_HEADER_OUT));
		}
		curl_close ( $ch );
		return $file_contents;
	}
}