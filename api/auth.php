<?php 
  require_once('param.php');
  
  header("Content-Type: application/json; charset=UTF-8");
  if (isset($_SERVER["REQUEST_METHOD"]) == "POST")
    $post = json_decode(file_get_contents('php://input'), true);
  if (!isset($post['username']) || !isset($post['password']))
  {
    http_response_code(235);
    die(json_encode(['error' => 'Неверный запрос']));
  }
  $username = sanstr($post['username']);
  $password = sanstr($post['password']);
   
  $result = queryMySQL("SELECT username, password FROM users WHERE username='$username'")->fetch(PDO::FETCH_LAZY);  
  
  if(isset($result->username) &&  isset($result->password) && $result->username == $username && password_verify($password, $result->password)){
    session_start();
    $_SESSION['username'] = $username;
    $_SESSION['password'] = $pass;

    http_response_code(230);
    die();
  }
  else {
    http_response_code(237);
    die();
  }

?>