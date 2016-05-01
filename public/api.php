<?php

define("PKR_SALT",
  !empty($_SERVER['PKR_SALT'])
  ? $_SERVER['PKR_SALT']
  : "78@3#~~~!712asdf383*45" );
define("PKR_CREDENTIALS_PATH",
  !empty($_SERVER['PKR_CREDENTIALS_PATH'])
  ? $_SERVER['PKR_CREDENTIALS_PATH']
  : __DIR__."/../../credentials.xml" );

require('../php/Cryptastic.php');
require('../php/Credential.php');
require('../php/PasswordManager.php');

error_log('request: '.json_encode($_POST));
$response = new stdClass();
try {
  if (empty($_POST['action'])) {
    throw new Exception("Action is required.  Contact technical support.  This should never happen.");
  } elseif ($_POST['action']=='fetch') {
    require('../php/controller/fetch.php');
  } elseif ($_POST['action']=='create') {
    require('../php/controller/create.php');
  } elseif ($_POST['action']=='save') {
    require('../php/controller/save.php');
  }
} catch(Exception $e) {
  $response->error = true;
  $response->message = $e->getMessage();
}
$response = json_encode($response);
error_log('response: '.$response);
echo $response;
