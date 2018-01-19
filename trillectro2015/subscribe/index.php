<?php

if (isset($_POST['email'])){

  $submit_url = "http://us6.api.mailchimp.com/1.3/?method=listSubscribe";

  $email = strip_tags($_POST['email']);
  $groupid = strip_tags($_POST['groupid']);
  $group1 = strip_tags($_POST['group1']);
  // $group2 = strip_tags($_POST['group2']);

  $data = array(
    'email_address' => $email,
    'merge_vars' => array('GROUPINGS' => array(
      array('id' => $_POST['groupid'], 'groups' => $_POST['group1'])
      // array('id' => $_POST['groupid'], 'groups' => $_POST['group2'])
      )),
    'apikey' => '7431ac0d239551ff39c858422f10ceb3-us6',
    'id' => '4fcdf8391d',
    'double_optin' => false,
    'send_welcome' => false,
    'replace_interests' => false,
    'update_existing' => true,
    'email_type' => 'html'
  );
  $payload = json_encode($data);

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $submit_url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, urlencode($payload));

  $result = curl_exec($ch);
  curl_close ($ch);

  $data   = json_decode($result);
  $error  = (isset($data->error)) ? $data->error : false;

  //print_r($result);

  if ($error){
      if ($data->code == '214'){
        echo '{"code": "' . $data->code . '", "message": "Thank You! Follow Us - @trillectro", "error": "no"}';
      } else {
        echo '{"code": "' . $data->code . '", "message": "Please try again.", "error": "yes"}';
      }
  } else if ($result === 'true') {
      echo '{"code": "200", "message": "Thank You! Follow Us - @trillectro", "error": "no"}';
  }

}