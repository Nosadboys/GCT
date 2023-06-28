<?php 
    require_once 'param.php';
    header("Content-Type: application/json; charset=UTF-8");
    
    session_start();
    
    if($_SERVER["REQUEST_METHOD"] == "POST"){
    $postdata = json_decode(file_get_contents('php://input'), true);
    }

    if(isset($postdata)){
        
        $username = sanstr($postdata['username']);  
              
        
        $user = queryMysql("SELECT id FROM users WHERE username = '$username'")->fetchColumn();
      

        $anket_paths = queryMysql("SELECT anket_id FROM profileankets WHERE user_id = '$user'")->fetchAll(PDO::FETCH_COLUMN);
        $ankets = [];
        foreach ($anket_paths as $anket_path) {
            $anket = queryMysql("SELECT * FROM ankets WHERE id  = '$anket_path'")->fetch(PDO::FETCH_ASSOC);
            $userdat = queryMysql("SELECT username, email FROM users WHERE id  = '$user'")->fetch(PDO::FETCH_ASSOC);
            $profile = queryMysql("SELECT name, surname, country, date_of_birth, gender, bio, game_platforms, discord_url, platforms_url FROM profiles WHERE user_id  = '$user'")->fetch(PDO::FETCH_ASSOC);
            $ankets[] = array_merge($anket,$profile,$userdat);
        }
        http_response_code(230);
        echo json_encode($ankets);        
        die();
    }
    else {
        die(http_response_code(237));
    }
?>
