<?php

class Credential {
	public $username = "";
	public $description = "";
	public $url = "";
	public $password = "";

	public function __construct($url,$username,$password,$description) {
		$this->username = $username;
		$this->password = $password;
		$this->description = $description;
		$this->url = $url;
	}

	public function getUsername() { return $this->username; }
	public function getDescription() { return $this->description; }
	public function getPassword() { return $this->password; }
	public function getUrl() { return $this->url; }

	public function isComplete() {
		return !( empty($this->username) || empty($this->password) || empty($this->url) );
	}

	static public function compareTo($one,$two) {
		$ar = array($one->getUrl(),$two->getUrl());
		sort($ar);
		if( $one->getUrl() == $two->getUrl() )
			return 0;
		return $one->getUrl() == $ar[0] ? -1 : 1;
	}
}
