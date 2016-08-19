<?php
session_start();
include('headers.php');
include('database.php');

if(!isset($_SESSION['id'])) {
    http_response_code(401);
}
else {
    $que = $db->prepare("SELECT * FROM `tw2_users` WHERE `id` = :id");
    $que->bindValue(':id', $_SESSION['id']);
    $que->execute();
    $user = $que->fetch(PDO::FETCH_ASSOC);
    echo json_encode($user);
}
?>
