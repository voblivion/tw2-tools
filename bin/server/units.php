<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

include('database.php');

include('units_name.php');

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Vérifier que le rapport n'est pas déjà enregistré
    $que = $db->prepare("SELECT * FROM `tw2_units` WHERE date = :date
        AND x = :x AND y = :y");
    $que->bindValue(':date', $_POST['date']);
    $que->bindValue(':x', $_POST['x']);
    $que->bindValue(':y', $_POST['y']);
    $que->execute();
    if($que->rowCount() == 0) {
        // Ajout du rapport d'état des unités
        $que_str = "INSERT INTO `tw2_units` (`date`, `x`, `y`, `player`, `type`";
        foreach($units_name as $k => $name) {
            $que_str .= ", `".$name."`";
        }
        $que_str .= ") VALUES (:date, :x, :y, :player, :type";
        foreach($units_name as $k => $name) {
            $que_str .= ", :".$name;
        }
        $que_str .= ")";
        $que = $db->prepare($que_str);
        $que->bindValue(':player', $_POST['player']);
        $que->bindValue(':date', $_POST['date']);
        $que->bindValue(':x', $_POST['x'], PDO::PARAM_INT);
        $que->bindValue(':y', $_POST['y'], PDO::PARAM_INT);
        $que->bindValue(':type', $_POST['type'], PDO::PARAM_STR);
        foreach($units_name as $k => $name) {
            $que->bindValue(':'.$name, $_POST[$name], PDO::PARAM_INT);
        }
        if($que->execute()) {
            http_response_code(201);
        }
        else {
            http_response_code(400);
        }
    }
    else {
        http_response_code(200);
    }
}
else {
    $x = $_GET['x'];
    $y = $_GET['y'];
    $que_str = "SELECT * FROM `tw2_units` WHERE `x` = :x AND `y` = :y
        ORDER BY `date` DESC LIMIT 1";
    $que = $db->prepare($que_str);
    $que->bindValue(':x', $x, PDO::PARAM_INT);
    $que->bindValue(':y', $y, PDO::PARAM_INT);
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
