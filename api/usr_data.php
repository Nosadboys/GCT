<?php 
    require_once 'param.php';
    header("Content-Type: application/json; charset=UTF-8");

    session_start();

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $post = json_decode(file_get_contents('php://input'), true);
    }

    if(isset($_SESSION['username']) && isset($post)){
        
        $username = $_SESSION['username'];
        $get_usrdat = queryMysql("SELECT id, username, email FROM users WHERE username = '$username'")->fetch(PDO::FETCH_LAZY);
        
        $profdat = queryMysql("SELECT name, surname, country, date_of_birth, gender, bio, game_platforms, discord_url, platforms_url FROM profiles WHERE user_id = '$get_usrdat->id'")->fetch(PDO::FETCH_ASSOC);
        $usrdat = queryMysql("SELECT username, email FROM users WHERE username = '$username'")->fetch(PDO::FETCH_ASSOC);
        $output = $profdat + $usrdat;
        echo json_encode($output);
        http_response_code(230);
        die();
    }
    else{
        http_response_code(237);
        die();
    }

?>