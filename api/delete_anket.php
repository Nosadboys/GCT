<?php 
    require_once 'param.php';
    header("Content-Type: application/json; charset=UTF-8");
    
    session_start();
    
    if($_SERVER["REQUEST_METHOD"] == "POST"){
    $postdata = json_decode(file_get_contents('php://input'), true);
    }
    if(isset($postdata)){
        $username =  $_SESSION['username'];
        $anket_id = sanstr($postdata['id']);
        $user_id = queryMysql("SELECT id FROM users WHERE username = '$username'")->fetchColumn();
        $check = queryMysql("SELECT anket_id FROM profileankets
        WHERE anket_id = '$anket_id' AND user_id = '$user_id'");
         if ($check -> rowCount()>0){            
            queryMysql("DELETE FROM profileankets WHERE anket_id = '$anket_id'  AND user_id = '$user_id'");
            queryMysql("DELETE FROM likes WHERE likes.owner_id = '$user_id' AND likes.anket_id = '$anket_id'");
            queryMysql("DELETE FROM ankets WHERE anket_id = '$anket_id'");
            
            http_response_code(230); // анкета удалена
            die();
        }else{
            
            http_response_code(231); // анкета не существует, либо не принадлежит пользователю
            die();
        }       
    }