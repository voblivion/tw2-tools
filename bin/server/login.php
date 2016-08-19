<?php
session_start();
include('headers.php');

include('database.php');
$salt = 'f&àéçz_rsh6fd5u7tèdutyqfd';

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $que = $db->prepare("SELECT * FROM `tw2_users` WHERE `username` = :username
        AND `password` = SHA1(:password)");
    $que->bindValue(':username', $_POST['username']);
    $que->bindValue(':password', $salt.$_POST['password']);
    $que->execute();
    if($que->rowCount() == 0) {
        http_response_code(400);
    }
    else {
        $user = $que->fetch(PDO::FETCH_ASSOC);
        $_SESSION['id'] = $user['id'];
        echo json_encode($user);
    }
}
?>
