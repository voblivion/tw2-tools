<?php
session_start();
include('headers.php');

if(!isset($_SESSION['id'])) {
    http_response_code(401);
}

include('database.php');

include('buildings_name.php');

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Vérifier que le rapport n'est pas déjà enregistré
    $que = $db->prepare("SELECT * FROM `tw2_buildings` WHERE date = :date
        AND x = :x AND y = :y AND `server` = :server");
    $que->bindValue(':date', $_POST['date']);
    $que->bindValue(':x', $_POST['x']);
    $que->bindValue(':y', $_POST['y']);
    $que->bindValue(':server', $_POST['server']);
    $que->execute();
    if($que->rowCount() == 0) {
        // Ajout du rapport d'état des unités
        $que_str = "INSERT INTO `tw2_buildings` (`date`, `x`, `y`, `player`, `type`, `server`";
        foreach($buildings_name as $k => $name) {
            $que_str .= ", `".$name."`";
        }
        $que_str .= ") VALUES (:date, :x, :y, :player, :type, :server";
        foreach($buildings_name as $k => $name) {
            $que_str .= ", :".$name;
        }
        $que_str .= ")";
        $que = $db->prepare($que_str);
        $que->bindValue(':player', $_POST['player']);
        $que->bindValue(':date', $_POST['date']);
        $que->bindValue(':x', $_POST['x'], PDO::PARAM_INT);
        $que->bindValue(':y', $_POST['y'], PDO::PARAM_INT);
        $que->bindValue(':type', $_POST['type'], PDO::PARAM_STR);
        $que->bindValue(':server', $_POST['server'], PDO::PARAM_STR);
        foreach($buildings_name as $k => $name) {
            $que->bindValue(':'.$name, $_POST[$name], PDO::PARAM_INT);
        }
        if($que->execute()) {
            http_response_code(201);
        }
        else {
            http_response_code(400);
            var_dump($que->errorInfo());
        }
    }
    else {
        http_response_code(200);
    }
}
else {
    $x = $_GET['x'];
    $y = $_GET['y'];
    $server = $_GET['server'];
    $que_str = "SELECT * FROM `tw2_buildings` WHERE `x` = :x AND `y` = :y AND `server` = :server
        ORDER BY `date` DESC LIMIT 1";
    $que = $db->prepare($que_str);
    $que->bindValue(':x', $x, PDO::PARAM_INT);
    $que->bindValue(':y', $y, PDO::PARAM_INT);
    $que->bindValue(':server', $server, PDO::PARAM_STR);
    if($que->execute()) {
        if($result = $que->fetch(PDO::FETCH_ASSOC)) {
            echo json_encode($result);
        }
        else {
            echo "{}";
        }
    }
    else {
        http_response_code(400);
    }
}
?>
