<?php //доделать проверки:
    // проверка имени и фамилии   

    require_once('param.php');
    session_start();

    header("Content-Type: application/json; charset=UTF-8");
    // echo json_encode ("hey");

    if (isset($_SERVER["REQUEST_METHOD"]) == "POST"){
        $postData = file_get_contents("php://input");
        //echo ($postData);
        $post = json_decode($postData, true);
        //var_dump($post);
    }

    if (!isset($_SESSION['username'])){
        destroySession();
        echo json_encode("ne ok");
        http_response_code(240);
        die();
    }
  
    if (isset($post)){
        $username = $_SESSION['username'];        
       
        
        $user_id = queryMysql("SELECT id FROM users WHERE username = '$username'")->fetchColumn();
        
                
        $name = sanstr($post['name']);
        $name = preg_replace('/\s\s+/', ' ', $name);
        
        $surname = sanstr($post['surname']);
        $surname = preg_replace('/\s\s+/', ' ', $surname);

        $country = sanstr($post['country']);
        $country = preg_replace('/\s\s+/', ' ', $country);
        

        $date_of_birth = sanstr($post['date_of_birth']);
        $date_of_birth = preg_replace('/\s\s+/', ' ', $date_of_birth);
             

        $bio = sanstr($post['bio']);
        $bio = preg_replace('/\s\s+/', ' ', $bio);

        $game_platforms = sanstr($post['game_platforms']);
        $game_platforms = preg_replace('/\s\s+/', ' ', $game_platforms); //'platforms_url'='$platforms_url',

        $discord_url = sanstr($post['discord_url']);
        $discord_url = preg_replace('/\s\s+/', ' ', $discord_url);

        $platforms_url = sanstr($post['platforms_url']);
        $platforms_url = preg_replace('/\s\s+/', ' ', $platforms_url);

        queryMysql("UPDATE profiles SET name='$name', surname='$surname',  country='$country', date_of_birth='$date_of_birth',bio='$bio', 
        game_platforms='$game_platforms', discord_url='$discord_url',platforms_url='$platforms_url' WHERE user_id='$user_id'");
        
        echo json_encode("ok");
        http_response_code(230);
        die();
    }  
    else {
        echo json_encode("ne ok");
        http_response_code(241);
        die();
    }

?>