<?php

class PasswordManager {

	private $key = null;
	private $cryptasticKey = null;
	private $credentials = array();
	private $crypter = null;

	public function __construct($key) {
		$this->key = $key;
		$this->crypter = new Cryptastic();
		$this->initKey();
	}

	public function encrypt($str) {
		return $this->crypter->encrypt($str,$this->cryptasticKey,true);
	}

	public function decrypt($str) {
		return $this->crypter->decrypt($str,$this->cryptasticKey,true);
	}

	public function create($overwrite=false) {
	  if($this->open()===null || $overwrite) {
      $dom = new DOMDocument();
      $dom->loadXml('<?xml version="1.0"?><credentials></credentials>');
      $enc = $dom->saveXML();
      return file_put_contents(PKR_CREDENTIALS_PATH,$this->encrypt($enc))!==false;
    }
    return false;
	}
	
	/**
	 * @return null if dne, true on success, false on bad key
	 */
	public function open() {
		$key = $this->key;
		if( file_exists(PKR_CREDENTIALS_PATH) ) {
			$rawXml = $this->decrypt(file_get_contents(PKR_CREDENTIALS_PATH));
			if( strpos($rawXml,"credentials")===false ) {
				return false;
			}
			$dom = new DOMDocument();
			$dom->loadXml($rawXml);
		} else {
			return null;
		}
		$credentials = $dom->getElementsByTagName("credential");
		if( $credentials instanceof DOMNodeList && $credentials->length>0 ) {
			for( $i=0; $i<$credentials->length; $i++ ) {
				$cred = $credentials->item($i);
				$url = $cred->getAttribute("url");
				$name = $cred->getAttribute("username");
				$pass = $cred->getAttribute("password");
				$desc = $cred->getAttribute("description");
				$this->credentials[] = new Credential($url,$name,$pass,$desc);
			}
		}
		return true;
	}

	public function store() {
		$dom = new DOMDocument();
		$creds = $dom->createElement("credentials");
		$dom->appendChild($creds);
		foreach( $this->credentials as $c ) {
			$cred = $dom->createElement("credential");
			$cred->setAttribute("url",$c->getUrl());
			$cred->setAttribute("username",$c->getUsername());
			$cred->setAttribute("password", $c->getPassword() );
			$cred->setAttribute("description",$c->getDescription());
			$creds->appendChild($cred);
		}
		$enc = $dom->saveXML();
		file_put_contents(PKR_CREDENTIALS_PATH,$this->encrypt($enc));
	}

	private function initKey() {
		$this->cryptasticKey = $this->crypter->pbkdf2($this->key,PKR_SALT,2353,32);
	}

	public function setKey($key) {
		$this->key = $key;
	}
	private function getKeyValue() {
		return pack('H*',sha1($this->key.PKR_SALT));
	}

	public function getCredentials() {
		return $this->credentials;
	}
	public function setCredentials($credentials) {
		$this->credentials = $credentials;
	}
}
