<?php

define("SALT","78@3#~~~!712asdf383*45");
define("KEY_STORE",__DIR__."/../../credentials.xml");

require('../php/Cryptastic.php');
require('../php/Credential.php');
require('../php/PasswordManager.php');

error_log(json_encode($_POST));
$response = new stdClass();
try {
  if(empty($_POST['action'])) {
    throw new Exception("Action is required.  Contact technical support.  This should never happen.");
  } else if($_POST['action']=='fetch') {
    $mgr = new PasswordManager($_POST['password']);
    if($mgr->open()) {
      $response->entries = $mgr->getCredentials();
    } else {
      throw new Exception("Invalid password or corrupt store xml.");
    }
  }
} catch(Exception $e) {
  $response->error = true;
  $response->message = $e->getMessage();
}

echo json_encode($response);
