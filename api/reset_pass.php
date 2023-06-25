<?php #reset password

    require_once 'param.php';
    
    header("Content-Type: application/json; charset=UTF-8");
    
    session_start();

    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["reset_password"]) && isset($_SESSION['username'])) {
        $data = json_decode(file_get_contents('php://input'), true);
        
        $email = sanstr($data['email']);
        $username = sanstr($data['username']);
        $new_pass = sanstr($_data['new_pass']);
        $sql = queryMysql("SELECT password from Users WHERE email = '$email' AND username = '$username'")->fetch(PDO::FETCH_LAZY);
        
        if (password_verify($new_pass, $sql->password) && checkPass($new_pass)){
            $sql_new_pass = queryMysql("UPDATE user SET password = '$new_pass' WHERE email = '$email' AND username = '$username'")->fetch(PDO::FETCH_LAZY);
            http_response_code(230);
        }
        else {
            http_response_code(235);
            die();
        }
        
    }
    else {
        http_response_code(240);
        die();
    }

?>