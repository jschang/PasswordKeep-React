<?php

$mgr = new PasswordManager($_POST['password']);
$opened = $mgr->open();
if($opened) {
  $response->error = false;
  $response->entries = $mgr->getCredentials();
} if($opened===null) {
  $response->error = false;
  $response->newStore = true;
  $response->message = "No password store has been created.";
} elseif($opened===false) {
  throw new Exception("Invalid password or corrupt store xml.");
}
