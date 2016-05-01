<?php

$mgr = new PasswordManager($_POST['password']);
$opened = $mgr->open();
if($opened===null) {
  if(empty($_POST['password']) || empty($_POST['password_confirm'])) {
    throw new Exception("Both password and password_confirm must be passed in.");
  }
  if($_POST['password']!=$_POST['password_confirm']) {
    throw new Exception("The passwords submitted do not match.");
  }
  if($mgr->create($_POST['password'])) {
    $response->message = "Successfully created the credentials store.";
    $response->error = false;
  } else {
    throw new Exception("Unable to create credentials store.");
  }
} else {
  throw new Exception("A password store already exists.");
}
