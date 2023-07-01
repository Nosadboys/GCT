<?php //Вернёт лайкнутые анкеты
    require_once 'param.php';
    header("Content-Type: application/json; charset=UTF-8");
    
    session_start();
    
    if($_SERVER["REQUEST_METHOD"] == "GET"){
        header("Content-Type: application/json; charset=UTF-8");

        $username = $_SESSION['username'];             
        
        $user = queryMysql("SELECT id FROM users WHERE username = '$username'")->fetchColumn();
        $currentDate = date('Y-m-d');
        $currentDateArray = explode('-', $currentDate);
        $anket_prof = queryMysql("SELECT anket_id, owner_id FROM likes WHERE liker_id = '$user'")->fetchAll(PDO::FETCH_ASSOC);
        $res = [];
        foreach ($anket_prof as $row) {              
            $date_of_birth =  queryMysql("SELECT date_of_birth FROM profiles WHERE user_id  = '{$row['owner_id']}'")->fetchColumn();            
            $birthdayArray = explode('-', $date_of_birth);           
            $age = $currentDateArray[0] - $birthdayArray[0];    
            if ($currentDateArray[1] < $birthdayArray[1] || ($currentDateArray[1] == $birthdayArray[1] && $currentDateArray[2] < $birthdayArray[2])) {
                $age--;
            }
            $anket = queryMysql("SELECT * FROM ankets WHERE id  = '{$row['anket_id']}'")->fetch(PDO::FETCH_ASSOC);
            $userdat = queryMysql("SELECT username, email FROM users WHERE id  = '{$row['owner_id']}'")->fetch(PDO::FETCH_ASSOC);
            $profile = queryMysql("SELECT name, surname, country, gender, bio, game_platforms, discord_url, platforms_url FROM profiles WHERE user_id  = '{$row['owner_id']}'")->fetch(PDO::FETCH_ASSOC);
            $profile['age'] = $age;
            $res[] = array_merge($anket, $profile, $userdat);
            
        }
        echo json_encode($res);                
        die(http_response_code(230));
    }
    else {
        die(http_response_code(237));
    }
?>