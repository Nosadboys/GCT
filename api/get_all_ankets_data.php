<?php // просто выплёвыввет всю информацию 
    require_once 'param.php';
    
    
    session_start();
    
    if($_SERVER["REQUEST_METHOD"] == "GET"){
        header("Content-Type: application/json; charset=UTF-8");
        $username = $_SESSION['username']; 
        $currentDate = date('Y-m-d');
        $currentDateArray = explode('-', $currentDate);
        $user = queryMysql("SELECT id FROM users WHERE username = '$username'")->fetchColumn();
        $anket_prof = queryMysql("SELECT anket_id, user_id FROM profileankets WHERE user_id != '$user'")->fetchAll(PDO::FETCH_ASSOC);
        $res = [];        
        foreach ($anket_prof as $row) {              
            $date_of_birth =  queryMysql("SELECT date_of_birth FROM profiles WHERE user_id  = '{$row['user_id']}'")->fetchColumn();            
            $age = getAge($date_of_birth, $currentDateArray);
            $anket = queryMysql("SELECT * FROM ankets WHERE id  = '{$row['anket_id']}'")->fetch(PDO::FETCH_ASSOC);
            $userdat = queryMysql("SELECT username, email FROM users WHERE id  = '{$row['user_id']}'")->fetch(PDO::FETCH_ASSOC);
            $profile = queryMysql("SELECT name, surname, country, gender, bio, game_platforms, discord_url, platforms_url FROM profiles WHERE user_id  = '{$row['user_id']}'")->fetch(PDO::FETCH_ASSOC);
            $profile['age'] = $age;
            $res[] = array_merge($anket, $profile, $userdat);
            
        }
        http_response_code(230);
        echo json_encode($res);                
        die();
    }