<?php

    require "api/routing.php";
    session_start();
    function get_request_page_path() {
        $query = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        return $query;
    }

    
    $r = new router();

    if(isset($_SESSION['username'])){
        $r->add_route("/", "auth.html");
        $r->add_route("/auth", "auth.html");
        $r->add_route("/account", "account.html");
        
    }
    else{
        $r->add_route("/", "auth.html");
        $r->add_route("/auth", "auth.html");        
    }
   
    $r->route(get_request_page_path());
   

?>