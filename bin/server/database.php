<?php
try {
    $options = array();
    $options[PDO::MYSQL_ATTR_INIT_COMMAND] = "SET NAMES 'utf8'";

    $host = 'host';
    $dbname = 'dbname';
    $user = 'user';
    $password = 'password';

    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8",
        $user,
        $password,
        $options);
}
catch (Exception $e) {
    echo $e->getMessage();
    die('Erreur lors de la connexion à la base de donnée.');
}
?>
