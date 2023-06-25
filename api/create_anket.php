<?php
require_once 'param.php';
header("Content-Type: application/octet-stream; charset=UTF-8");
$_POST = json_decode(file_get_contents('php://input'), true);
session_start();

if (isset($_SESSION['username'])){

  $username = sanstr($_SESSION['username']);
  $user_id = queryMysql("SELECT user_id FROM Users WHERE username = '$username'")->fetchColumn();
  $col = count(queryMysql("SELECT anket_id FROM ProfileAnkets WHERE user_id = '$user_id'")->fetchAll(PDO::FETCH_BOTH));
  
  
  if ($col<5){  

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $anket_id = GenUserID();
    $game_name = sanstr($_POST["game_name"]);  
    $description = sanstr($_POST["description"]);
    $role_play = sanstr($_POST["role_play"]);
    $statistics = sanstr($_POST["statistics"]);
    $top_skills = sanstr($_POST["top_skills"]);
    $age_diap = sanstr($_POST["age_diap"]);
    $gender_prep = sanstr($_POST["gender_prep"]);

   
    queryMysql("INSERT INTO ankets (id, game_name, description, role_play, statistics, top_skills, age_diap, gender_prep) VALUES ('$anket_id','$game_name', '$description', '$role_play', '$statistics', '$top_skills', '$age_diap', '$gender_prep')");
    queryMysql("INSERT INTO orofileankets (user_id, anket_id) VALUES ('$user_id','$anket_id')");
    http_response_code(230);
    die();
}
}else die(http_response_code(483));
}
?>  // Ограничить формой с option  $game_name
