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
        $currentDate = date('Y-m-d');
        $currentDateArray = explode('-', $currentDate);
        $anket_paths = queryMysql("SELECT anket_id FROM profileankets WHERE user_id = '$user'")->fetchAll(PDO::FETCH_COLUMN);
        $ankets = [];
        foreach ($anket_paths as $anket_path) {
            $date_of_birth =  queryMysql("SELECT date_of_birth FROM profiles WHERE user_id  = '$user'")->fetchColumn();            
            $birthdayArray = explode('-', $date_of_birth);           
            $age = $currentDateArray[0] - $birthdayArray[0];    
            if ($currentDateArray[1] < $birthdayArray[1] || ($currentDateArray[1] == $birthdayArray[1] && $currentDateArray[2] < $birthdayArray[2])) {
                $age--;
            }

            $anket = queryMysql("SELECT * FROM ankets WHERE id  = '$anket_path'")->fetch(PDO::FETCH_ASSOC);
            $userdat = queryMysql("SELECT username, email FROM users WHERE id  = '$user'")->fetch(PDO::FETCH_ASSOC);
            $profile = queryMysql("SELECT name, surname, country, gender, bio, game_platforms, discord_url, platforms_url FROM profiles WHERE user_id  = '$user'")->fetch(PDO::FETCH_ASSOC);
            $profile['age'] = $age;
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
