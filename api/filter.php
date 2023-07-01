<?php  

    require_once('param.php');
    session_start();
    header("Content-Type: application/json; charset=UTF-8");    
   
    if (($_SERVER["REQUEST_METHOD"]) == "POST"){
        $postData = file_get_contents("php://input");        
        $post = json_decode($postData, true);        
    
        $username = $_SESSION['username']; 
        $currentDate = date('Y-m-d');
        $currentDateArray = explode('-', $currentDate);
        $user =  $user_id = queryMysql("SELECT id FROM users WHERE username = '$username'")->fetchColumn();        
        $game_name = sanstr($post['game_name']);
        $gender_prep = sanstr($post['gender_prep']);
        $age_min = sanstr($post['age_min']);
        $age_max = sanstr($post['age_max']);
        $age_conditions = array();	
        $anket_prof = queryMysql("SELECT anket_id, user_id FROM profileankets WHERE user_id != '$user'")->fetchAll(PDO::FETCH_ASSOC);

        $res = [];        
        foreach ($anket_prof as $row) {
            $date_of_birth =  queryMysql("SELECT date_of_birth FROM profiles WHERE user_id  = '{$row['user_id']}'")->fetchColumn();            
            $age = getAge($date_of_birth, $currentDateArray);
            
            if ((!empty($age_min) && $age < $age_min) || (!empty($age_max) && $age > $age_max)) {
                // Пропускаем анкету, если возраст не удовлетворяет условию
                continue;
            }

            $conditions = array(); //  массив для условий
            if (!empty($game_name)) {
                $conditions[] = "game_name = '$game_name'";
            }
            if (!empty($gender_prep)) {
                $conditions[] = "gender_prep = '$gender_prep'";
            }

            $whereClause = ""; // Инициализация пустой строки для WHERE-условия
            if (!empty($conditions)) {
                $whereClause = "WHERE " . implode(" AND ", $conditions);
            }            

            $check = queryMysql("SELECT * FROM ankets WHERE id = '{$row['anket_id']}' $whereClause")->fetch(PDO::FETCH_ASSOC);
            if($check){         
                
                $anket = queryMysql("SELECT * FROM ankets WHERE id  = '{$row['anket_id']}'")->fetch(PDO::FETCH_ASSOC);
                $userdat = queryMysql("SELECT username, email FROM users WHERE id  = '{$row['user_id']}'")->fetch(PDO::FETCH_ASSOC);
                $profile = queryMysql("SELECT name, surname, country, gender, bio, game_platforms, discord_url, platforms_url FROM profiles WHERE user_id  = '{$row['user_id']}'")->fetch(PDO::FETCH_ASSOC);
                $profile['age'] = $age;
                $res[] = array_merge($anket, $profile, $userdat);
            }
        }
        http_response_code(230);
        echo json_encode($res);                
        die();
    }else {
        http_response_code(232);                      
        die("Wrong method");
    }