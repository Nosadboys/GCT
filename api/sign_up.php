<?php   
    require_once('param.php');

    header("Content-Type: application/json; charset=UTF-8");
     
    if (isset($_SERVER["REQUEST_METHOD"]) == "POST"){
    $postData = file_get_contents("php://input");
    echo ($postData);
    //$json_string = '{"username":"Senya","name":"Сеня","surname":"Зуева","email":"eld.kaz@mail.ru","date_of_birth":"2023-06-08","country":"AX","gender":"M","password":"Vepfaath57","password-confirm":"Vepfaath57"}';
    $_POST = json_decode($postData, true);
    //$_POST = json_decode($json_string, true);
    //echo ($json_string);
    var_dump( $_POST);}
    echo json_last_error_msg();
    json_check(json_last_error());
    

   
    if (isset($_SESSION['username'])){
      destroySession();
      die(http_response_code(240));
    }
    
    
     if ( isset($_POST['email']) && isset($_POST['username']) && isset($_POST['password'])){ //$_SERVER["REQUEST_METHOD"] == "POST" &&
        $username = sanstr($_POST['username']);
        $pass = sanstr($_POST['password']);      
        $email = sanstr($_POST['email']);
        $name = sanstr($_POST['name']);
        $surname = sanstr($_POST['surname']);
        $country = sanstr($_POST['country']);
        $date_of_birth = sanstr($_POST['date_of_birth']);      
        $gender = sanstr($_POST['gender']);
        $bio =  "Your description";
        $game_platforms =  "game_platforms";
        $discord_url =  "Discord_url";         
        $platforms_url =  "Platforms url";
        echo 'ok';
        if ($username == "" || $pass == "" ){
          echo 231;
          http_response_code(231);
          die();
        }
        elseif ((queryMysql("SELECT username FROM users WHERE username='$username'")->fetchAll(PDO::FETCH_BOTH))) {
          echo 233;
          http_response_code(233);
          die();
        }elseif ((queryMysql("SELECT email FROM users WHERE email='$email'")->fetchAll(PDO::FETCH_BOTH))) {
          echo 234;
          http_response_code(234);
          die();
        }
        else
        {
          $result = queryMysql("SELECT * FROM users WHERE username='$username'");
    
          if ($result->rowCount() || !email_valid($email) || !checkPass($pass) || 
              !((preg_match("/[a-z]/", $name) || preg_match("/[A-Z]/", $name)) && !preg_match("/[0-9]/", $name) || preg_match("//", $name)) ||
              !((preg_match("/[a-z]/", $surname) || preg_match("/[A-Z]/", $surname)) && !preg_match("/[0-9]/", $surname) || preg_match("//", $surname)) 
          ){
              echo 232;
              http_response_code(232);
            die();
          }
          else{
            if ($date_of_birth == ""){
              $date_of_birth =  '1900-01-01'; } 
            
            
            $user_id = GenUserID();           
            $pass  = password_hash($pass,  PASSWORD_ARGON2I);          
          
            
            
            queryMysql("INSERT INTO users(id, username, password, email) 
            Values('$user_id','$username', '$pass', '$email')");
            queryMysql("INSERT INTO profiles(user_id, name, surname, country, date_of_birth, gender, bio, game_platforms, discord_url, platforms_url)
            Values('$user_id', '$name','$surname','$country', '$date_of_birth','$gender','$bio','$game_platforms', '$discord_url', '$platforms_url')");   
            
      
            session_start();
            
            $_SESSION['username'] = $username;
            $_SESSION['password'] = $pass;
            echo "Otlichno 230";
            http_response_code(230);          
          }
        }
      }

    else {    
      echo 'Ploho 235';
        http_response_code(235);  
      die();
    }

?>