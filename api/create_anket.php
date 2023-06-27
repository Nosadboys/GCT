<?php
require_once 'param.php';
header("Content-Type: application/octet-stream; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] == "POST"){
  $postdata = json_decode(file_get_contents('php://input'), true);
  }
echo json_encode( $postdata);
session_start();

if (isset($postdata)) {

  $username = $_SESSION['username'];   
  $user_id = queryMysql("SELECT id FROM users WHERE username = '$username'")->fetchColumn();
  $col = count(queryMysql("SELECT anket_id FROM profileankets WHERE user_id = '$user_id'")->fetchAll(PDO::FETCH_BOTH));
  
  
  if ($col<7){  
    
      $anket_id = GenUserID();
      $game_name = sanstr($postdata["game_name"]);  
      $description = sanstr($postdata["description"]);
      $role_play = sanstr($postdata["role_play"]);
      $statistics = sanstr($postdata["statistics"]);
      $top_skills = sanstr($postdata["top_skills"]);
      $age_diap = sanstr($postdata["age_diap"]);
      $gender_prep = sanstr($postdata["gender_prep"]);

    
      queryMysql("INSERT INTO ankets (id, game_name, description, role_play, statistics, top_skills, age_diap, gender_prep)
      VALUES ('$anket_id','$game_name', '$description', '$role_play', '$statistics', '$top_skills', '$age_diap', '$gender_prep')");
      queryMysql("INSERT INTO profileankets (user_id, anket_id) VALUES ('$user_id','$anket_id')");
      
      echo json_encode("Создано");
      http_response_code(230);
      die();

}else die(http_response_code(231));
}
?>  // Ограничить формой с option  $game_name
