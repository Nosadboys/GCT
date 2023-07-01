<?php
require_once 'param.php';
header("Content-Type: application/octet-stream; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] == "POST"){
  $postdata = json_decode(file_get_contents('php://input'), true);
  }
session_start();

if (isset($postdata)) {
    if (isset($_SESSION['username'])){
        $username = $_SESSION['username'];   
        $liker_id = queryMysql("SELECT id FROM users WHERE username = '$username'")->fetchColumn();
        $anket_id = sanstr($postdata['anket_id']);
        $owner_id = queryMysql("SELECT user_id FROM profileankets WHERE anket_id='$anket_id' ")->fetchColumn();

        $check = queryMysql("SELECT anket_id FROM likes
        WHERE anket_id = '$anket_id' AND owner_id = '$owner_id' AND liker_id = '$liker_id'");
        if ($check -> rowCount()>0){
            queryMysql("DELETE anket_id FROM likes
        WHERE anket_id = '$anket_id' AND owner_id = '$owner_id' AND liker_id = '$liker_id'");
            http_response_code(237); // лайк уже поставлен либо тут сделать удалить лайк
            die();
        }else{
            queryMysql("INSERT INTO likes(owner_id, anket_id, liker_id) 
            Values('$owner_id','$anket_id', '$liker_id')");
            http_response_code(230);
            die();
        }       
    }
}