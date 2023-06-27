<?php 
    require_once 'param.php';
    header("Content-Type: application/json; charset=UTF-8");
    //header("Location: account.html");
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
            $ankets[] = $anket;
        }
        echo json_encode($ankets);

        
        die(http_response_code(230));
    }
    else {
        die(http_response_code(237));
    }
    
        // $user_id = $user_id[0];

        //$anket_path = queryMysql("SELECT anket_id FROM profileankets WHERE user_id = '$user'")->fetchColumn(); //fetchAll(PDO::FETCH_ASSOC)
        //echo json_encode($anket_path);  
        // $ankets=[];     
        // foreach ($anket_path as $anket){
        //     $res = queryMysql("SELECT * FROM ankets WHERE id  = '$anket'")->fetchAll(PDO::FETCH_ASSOC);
        //     echo json_encode($res); 
        //     $ankets+=$res;
        // }
        // echo json_encode($ankets); 
        //$output = array("ankets" => $ankets, "profile_info" => $profile_info, "email" => $email); код плох
        //$ankets = queryMysql("SELECT * FROM ankets WHERE id  = '$anket_path'")->fetchAll(PDO::FETCH_ASSOC);
        //$profile_info = queryMysql("SELECT * FROM profiles WHERE user_id = '$user'")->fetchAll(PDO::FETCH_ASSOC); Это есть в кукисах
        //$email = queryMysql("SELECT email FROM users WHERE id  = '$user'")->fetchColumn();
        //$output = $ankets; //+$profile_info+$email
        //echo json_encode($output);
?>
